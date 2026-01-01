# 🔐 Stripe Configuration - Action Items

## ✅ Step 1: Publishable Key (DONE)
Your publishable key has been added to `.env.local`

## 📦 Step 2: Create Stripe Product & Get Price ID

### Go to Stripe Dashboard:
1. Visit: https://dashboard.stripe.com/products
2. Click **"Add Product"**
3. Fill in:
   - **Name**: `AI Grid Layer Reservation`
   - **Description**: `Founding Member reservation - $10 refundable, converts to $10 AI usage credit`
   - **Pricing Model**: Select "One-time"
   - **Price**: `10.00` USD
   - **Currency**: USD
4. Click **"Add Product"**
5. **COPY THE PRICE ID** - it looks like: `price_1Skr8FPkctg3RpKZ...`

### Update .env.local:
After creating the product, open `.env.local` and replace:
```
VITE_STRIPE_PRICE_ID=price_XXXXX_REPLACE_THIS
```
with your actual Price ID.

## 🔧 Step 3: Configure Firebase Functions

Run these commands to securely store your secret key in Firebase:

```bash
firebase functions:config:set stripe.secret_key="YOUR_STRIPE_SECRET_KEY_HERE"
```

Replace `YOUR_STRIPE_SECRET_KEY_HERE` with your actual Stripe secret key (starts with `sk_live_` or `sk_test_`).

**Note**: The webhook secret will be added after we deploy and configure the webhook endpoint.

## 📦 Step 4: Install Functions Dependencies

```bash
cd functions
npm install
cd ..
```

**If you get disk space errors**, please free up space first.

## 🚀 Step 5: Deploy Firebase Functions

```bash
firebase deploy --only functions
```

This will deploy:
- `createCheckoutSession` - Creates Stripe checkout sessions
- `stripeWebhook` - Handles Stripe payment webhooks

After deployment, you'll see URLs like:
```
Function URL (createCheckoutSession): https://us-central1-superecomm-corp-website.cloudfunctions.net/createCheckoutSession
Function URL (stripeWebhook): https://us-central1-superecomm-corp-website.cloudfunctions.net/stripeWebhook
```

## 🔔 Step 6: Configure Stripe Webhook

1. Go to: https://dashboard.stripe.com/webhooks
2. Click **"Add endpoint"**
3. **Endpoint URL**: 
   ```
   https://us-central1-superecomm-corp-website.cloudfunctions.net/stripeWebhook
   ```
4. **Description**: `AI Grid Layer Payment Webhook`
5. **Events to send**:
   - Click "Select events"
   - Search and select:
     - ✅ `checkout.session.completed`
     - ✅ `payment_intent.succeeded`
     - ✅ `payment_intent.payment_failed`
6. Click **"Add endpoint"**
7. **COPY THE WEBHOOK SECRET** - it looks like: `whsec_...`

### Add Webhook Secret to Firebase:
```bash
firebase functions:config:set stripe.webhook_secret="whsec_YOUR_WEBHOOK_SECRET_HERE"
```

### Redeploy Functions:
```bash
firebase deploy --only functions
```

## 🧪 Step 7: Test the Integration

### Use Stripe Test Cards:
Even though you have live keys, you can use test mode for initial testing.

**For testing, switch to test keys temporarily**:
- Test Publishable: starts with `pk_test_`
- Test Secret: starts with `sk_test_`

**Test Card Numbers**:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires Auth: `4000 0025 0000 3155`

Any future expiry date, any 3-digit CVC, any ZIP code.

### Test Flow:
1. Visit your site: `http://localhost:5173`
2. Click "Reserve Now" or "Join Early Access"
3. Sign up with test email
4. Should redirect to Stripe Checkout
5. Enter test card info
6. Complete payment
7. Should redirect back to success page
8. Check Firestore - Grid Account should be created

## ✅ Step 8: Deploy Frontend

Once everything is tested and working:

```bash
npm run build
firebase deploy --only hosting
```

## 🎯 Quick Command Reference

```bash
# Configure Stripe secret key
firebase functions:config:set stripe.secret_key="sk_live_..."

# Configure webhook secret (after creating webhook endpoint)
firebase functions:config:set stripe.webhook_secret="whsec_..."

# View current config
firebase functions:config:get

# Install functions dependencies
cd functions && npm install && cd ..

# Deploy functions
firebase deploy --only functions

# Deploy everything
firebase deploy

# View logs
firebase functions:log

# View real-time logs
firebase functions:log --only stripeWebhook
```

## 🔍 Troubleshooting

### If checkout doesn't redirect to Stripe:
- Check browser console for errors
- Verify Price ID is correct in `.env.local`
- Restart dev server: `npm run dev`

### If webhook doesn't fire:
- Verify webhook URL matches your Functions URL
- Check webhook secret is configured: `firebase functions:config:get`
- Check Firebase Functions logs: `firebase functions:log`

### If Grid Account not created:
- Check Stripe webhook events in dashboard
- Check Firebase Functions logs
- Verify Firestore rules allow writes

## 📊 Monitor Production

### Stripe Dashboard:
- Payments: https://dashboard.stripe.com/payments
- Customers: https://dashboard.stripe.com/customers
- Webhooks: https://dashboard.stripe.com/webhooks
- Logs: https://dashboard.stripe.com/logs

### Firebase Console:
- Functions: https://console.firebase.google.com/project/superecomm-corp-website/functions
- Firestore: https://console.firebase.google.com/project/superecomm-corp-website/firestore
- Authentication: https://console.firebase.google.com/project/superecomm-corp-website/authentication

## 🎉 You're Ready!

Current Status:
- ✅ Publishable key configured
- ⏳ Need to create Stripe product and get Price ID
- ⏳ Need to install functions dependencies
- ⏳ Need to deploy functions
- ⏳ Need to configure webhook

Follow the steps above and you'll be accepting real payments soon! 🚀

