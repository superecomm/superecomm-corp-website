import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import Stripe from "stripe";

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Stripe
const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: "2025-02-24.acacia",
});

/**
 * Create Stripe Checkout Session
 * Called from frontend to initiate payment
 */
export const createCheckoutSession = functions.https.onCall(
  async (data, context) => {
    // Verify user is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated"
      );
    }

    const { priceId, successUrl, cancelUrl } = data;
    const userId = context.auth.uid;
    const userEmail = context.auth.token.email;

    try {
      // Check if user already has a reservation
      const userDoc = await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .get();

      if (userDoc.exists && userDoc.data()?.reservation?.paid) {
        throw new functions.https.HttpsError(
          "already-exists",
          "User already has an active reservation"
        );
      }

      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: userEmail,
        client_reference_id: userId,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId: userId,
          email: userEmail || "",
        },
      });

      return {
        sessionId: session.id,
        url: session.url,
      };
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      throw new functions.https.HttpsError(
        "internal",
        error.message || "Failed to create checkout session"
      );
    }
  }
);

/**
 * Stripe Webhook Handler
 * Processes webhook events from Stripe
 */
export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  const webhookSecret = functions.config().stripe.webhook_secret;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
      break;

    case "payment_intent.succeeded":
      console.log("PaymentIntent succeeded:", event.data.object);
      break;

    case "payment_intent.payment_failed":
      console.log("PaymentIntent failed:", event.data.object);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

/**
 * Handle successful checkout session
 * Creates Grid Account and updates user profile
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id || session.metadata?.userId;
  const paymentIntentId = session.payment_intent as string;

  if (!userId) {
    console.error("No userId found in checkout session");
    return;
  }

  console.log(`Processing reservation for user: ${userId}`);

  try {
    // Check if already processed
    const userRef = admin.firestore().collection("users").doc(userId);
    const userSnap = await userRef.get();

    const userData = userSnap.data();
    if (userSnap.exists && userData?.reservation?.paid) {
      console.log("Reservation already processed for user:", userId);
      return;
    }

    // Generate Grid Account ID using transaction
    const counterRef = admin.firestore().collection("counters").doc("HOME_US_TX");
    
    const gridAccountData = await admin.firestore().runTransaction(async (transaction) => {
      const counterSnap = await transaction.get(counterRef);
      let nextSerial = 100000;

      if (counterSnap.exists) {
        const counterData = counterSnap.data();
        nextSerial = counterData?.nextSerial || 100000;
      }

      const tier = "HOME";
      const country = "US";
      const region = "TX";
      const serial = String(nextSerial).padStart(6, "0");
      const displayId = `AI-GRID-${tier}-${country}-${region}-${serial}`;
      
      // Generate random grid address
      const gridAddress = "ga:" + Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // Update counter
      transaction.set(counterRef, { nextSerial: nextSerial + 1 }, { merge: true });

      // Create grid account document
      const gridAccountDoc = {
        gridAccountId: displayId,
        uid: userId,
        tier,
        country,
        region,
        serial,
        gridAddress,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        edition: "FoundingGrid",
      };
      transaction.set(admin.firestore().collection("grid_accounts").doc(displayId), gridAccountDoc);

      return {
        displayId,
        tier,
        country,
        region,
        gridAddress,
      };
    });

    // Update user profile with reservation and grid account
    await userRef.set(
      {
        reservation: {
          paid: true,
          amount: 10,
          stripePaymentId: paymentIntentId,
          refundable: true,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        gridAccount: {
          displayId: gridAccountData.displayId,
          tier: gridAccountData.tier,
          country: gridAccountData.country,
          region: gridAccountData.region,
          edition: "FoundingGrid",
          reservedAt: admin.firestore.FieldValue.serverTimestamp(),
          activated: false,
          gridAddress: gridAccountData.gridAddress,
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    console.log(`✅ Successfully created Grid Account: ${gridAccountData.displayId} for user: ${userId}`);

    // TODO: Send confirmation email here
    // await sendReservationConfirmationEmail(userEmail, gridAccountData.displayId);
    
  } catch (error) {
    console.error("Error processing checkout session:", error);
    throw error;
  }
}

