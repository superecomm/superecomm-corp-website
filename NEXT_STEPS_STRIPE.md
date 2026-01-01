# ✅ Stripe Integration - Next Steps

## 🎉 What's Configured

✅ **Stripe Secret Key** - Stored securely in Firebase Functions  
✅ **Firebase Functions Dependencies** - Installed successfully  
✅ **Functions Code** - Created and ready to deploy  
✅ **Firestore Rules** - Configured for security  

## 📋 Your Action Items

### Step 1: Create .env.local File

Create a file called `.env.local` in the root directory with:

```
# Super eComm - Local Environment Variables
# DO NOT COMMIT THIS FILE

# Stripe Publishable Key (safe for frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51Skr8FPkctg3RpKZ8MLA0zu1HeaXSivC5nMy8uE7gEN8EpcUXgmpCj2L850GSIF9mK8FIURmGjrSunuUHpoVQY3V00vVrjUlSa

# Stripe Price ID (add after creating product in Stripe Dashboard)
VITE_STRIPE_PRICE_ID=price_XXXXX_REPLACE_THIS
```

### Step 2: Create Stripe Product

1. Go to: **https://dashboard.stripe.com/products**
2. Click **"Add Product"**
3. Fill in:
   - **Name**: `AI Grid Layer Reservation`
   - **Description**: `Founding Member reservation - $10 refundable, converts to $10 AI usage credit`
   - **Pricing Model**: One-time
   - **Price**: `10.00` USD
4. Click **"Add Product"**
5. **COPY THE PRICE ID** (looks like: `price_1Skr8FPkctg...`)

### Step 3: Update .env.local

Replace `price_XXXXX_REPLACE_THIS` with your actual Price ID from Step 2.

### Step 4: Deploy Firebase Functions

```bash
cd functions
npm run build
cd ..
firebase deploy --only functions
```

**Expected output:**
```
✔  functions: Finished running predeploy script.
i  functions: preparing functions directory for uploading...
✔  functions: functions folder uploaded successfully
i  functions: creating Node.js 18 function createCheckoutSession...
i  functions: creating Node.js 18 function stripeWebhook...
✔  functions[createCheckoutSession]: Successful create operation.
✔  functions[stripeWebhook]: Successful create operation.
```

### Step 5: Configure Stripe Webhook

1. Go to: **https://dashboard.stripe.com/webhooks**
2. Click **"Add endpoint"**
3. Enter URL:
   ```
   https://us-central1-superecomm-corp-website.cloudfunctions.net/stripeWebhook
   ```
4. Click **"Select events"** and choose:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
5. Click **"Add endpoint"**
6. **COPY THE WEBHOOK SECRET** (starts with `whsec_`)

### Step 6: Add Webhook Secret to Firebase

```bash
firebase functions:config:set stripe.webhook_secret="whsec_YOUR_SECRET_HERE"
```

### Step 7: Redeploy Functions

```bash
firebase deploy --only functions
```

### Step 8: Test the Integration

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:5173`

3. Click "Reserve Now" or "Join Early Access"

4. Sign up with a test email

5. You should be redirected to **Stripe Checkout** (the official Stripe payment page)

6. Use Stripe test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any ZIP code

7. Complete payment

8. Check Firestore:
   - Go to: https://console.firebase.google.com/project/superecomm-corp-website/firestore
   - Check `users` collection - should see your user with `reservation` and `gridAccount`
   - Check `grid_accounts` collection - should see your Grid Account ID

### Step 9: Deploy Frontend

```bash
npm run build
firebase deploy --only hosting
```

### Step 10: Test Production

Visit your live site and test with **real money** (or keep test mode for now).

## 🔍 Monitoring

### Firebase Functions Logs
```bash
firebase functions:log
```

### Stripe Dashboard
- **Payments**: https://dashboard.stripe.com/payments
- **Webhooks**: https://dashboard.stripe.com/webhooks (check delivery status)
- **Events**: https://dashboard.stripe.com/events

## 🆘 Troubleshooting

### "Price ID not configured"
- Make sure you updated `.env.local` with your actual Price ID
- Restart dev server: `npm run dev`

### Webhook not firing
- Check webhook URL matches your Functions URL
- Verify webhook secret is configured: `firebase functions:config:get`
- Check Stripe Dashboard > Webhooks > Click on your endpoint > "Attempts"

### Grid Account not created
- Check Firebase Functions logs: `firebase functions:log --only stripeWebhook`
- Verify Firestore rules allow writes
- Check Stripe webhook event in dashboard

### "Firebase Functions not found"
- Make sure you deployed: `firebase deploy --only functions`
- Check Functions are live: https://console.firebase.google.com/project/superecomm-corp-website/functions

## 📊 What Happens Next?

1. **User clicks "Reserve Now"**
2. **Signs in/up** with Firebase Auth
3. **Frontend calls** `createCheckoutSession` Firebase Function
4. **Redirected to Stripe** Checkout (secure hosted page)
5. **User pays** on Stripe
6. **Stripe webhook** fires to `stripeWebhook` Function
7. **Function creates** Grid Account in Firestore
8. **User redirected** back to success page

##🎉 You're Almost Live!

Just follow the steps above and you'll be accepting real AI Grid Layer reservations! 🚀

