# Stripe Integration Setup Guide

## Overview
This guide will help you set up Stripe Checkout and webhooks for the AI Grid Layer reservation system.

## Step 1: Create Product in Stripe Dashboard

1. Go to: https://dashboard.stripe.com/products
2. Click "Add Product"
3. Fill in:
   - **Name**: AI Grid Layer Reservation
   - **Description**: Founding Member reservation - $10 refundable, converts to $10 AI usage credit
   - **Pricing**: 
     - One-time payment
     - $10.00 USD
   - **Product ID**: Note this down (e.g., `prod_xxxxx`)
   - **Price ID**: Note this down after creation (e.g., `price_xxxxx`)

## Step 2: Get Stripe API Keys

1. Go to: https://dashboard.stripe.com/apikeys
2. Copy:
   - **Publishable Key** (starts with `pk_live_` or `pk_test_`)
   - **Secret Key** (starts with `sk_live_` or `sk_test_`)

## Step 3: Set Environment Variables

### Frontend (.env.local)
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
VITE_STRIPE_PRICE_ID=price_...
```

### Backend (Firebase Functions)
```bash
firebase functions:config:set \
  stripe.secret_key="sk_live_..." \
  stripe.webhook_secret="whsec_..." \
  stripe.price_id="price_..."
```

## Step 4: Deploy Firebase Functions

```bash
cd functions
npm install stripe
npm run deploy
```

## Step 5: Set Up Webhook Endpoint

1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add Endpoint"
3. Enter URL: `https://us-central1-superecomm-corp-website.cloudfunctions.net/stripeWebhook`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Webhook Secret** (starts with `whsec_`)
6. Add to Firebase config:
   ```bash
   firebase functions:config:set stripe.webhook_secret="whsec_..."
   ```

## Step 6: Test the Integration

### Test Card Numbers
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires Auth: `4000 0025 0000 3155`

### Testing Flow
1. Click "Reserve Now" on website
2. Sign up/Sign in
3. Redirected to Stripe Checkout
4. Enter test card info
5. Complete payment
6. Redirected back to success page
7. Check Firestore for created user + grid account

## Architecture

```
User clicks Reserve
    ↓
Frontend creates Checkout Session via Cloud Function
    ↓
User redirected to Stripe Checkout (secure hosted page)
    ↓
User completes payment on Stripe
    ↓
Stripe sends webhook to Cloud Function
    ↓
Cloud Function creates Grid Account in Firestore
    ↓
User redirected to success page with Grid ID
```

## Security Notes

1. **Never** expose secret key in frontend
2. **Always** verify webhook signatures
3. **Use** Firebase Functions for server-side operations
4. **Enable** Stripe test mode during development
5. **Validate** all inputs on server side

## Troubleshooting

### Webhook not firing
- Check webhook URL is correct
- Verify webhook secret matches
- Check Firebase Functions logs: `firebase functions:log`

### Payment succeeds but no Grid Account created
- Check Firestore rules allow writes
- Verify webhook handler is processing correctly
- Check Firebase Functions logs

### Checkout session creation fails
- Verify Stripe API keys are set correctly
- Check price_id is valid
- Ensure Functions are deployed

## Production Checklist

- [ ] Switch from test keys to live keys
- [ ] Update webhook endpoint to production URL
- [ ] Test end-to-end flow with real card
- [ ] Set up error monitoring (Sentry/LogRocket)
- [ ] Configure email notifications for failed payments
- [ ] Set up Stripe Dashboard alerts

