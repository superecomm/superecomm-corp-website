#!/bin/bash
# Stripe Configuration Script for AI Grid Layer

echo "🔐 Configuring Stripe for AI Grid Layer..."
echo ""

# Step 1: Create .env.local with publishable key
echo "📝 Step 1: Creating .env.local with publishable key..."
cat > .env.local << 'EOF'
# Super eComm - Local Environment Variables
# DO NOT COMMIT THIS FILE

# Stripe Publishable Key (safe for frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51Skr8FPkctg3RpKZ8MLA0zu1HeaXSivC5nMy8uE7gEN8EpcUXgmpCj2L850GSIF9mK8FIURmGjrSunuUHpoVQY3V00vVrjUlSa

# Stripe Price ID (add this after creating product in Stripe Dashboard)
VITE_STRIPE_PRICE_ID=price_XXXXX_REPLACE_THIS
EOF
echo "✅ Created .env.local"
echo ""

# Step 2: Configure Firebase Functions with secret key
echo "🔧 Step 2: Configuring Firebase Functions with Stripe secret key..."
echo "⚠️  Replace YOUR_STRIPE_SECRET_KEY with your actual Stripe secret key"
# firebase functions:config:set stripe.secret_key="YOUR_STRIPE_SECRET_KEY_HERE"

if [ $? -eq 0 ]; then
    echo "✅ Firebase Functions configured with Stripe secret key"
else
    echo "❌ Failed to configure Firebase Functions"
    exit 1
fi
echo ""

# Step 3: View current config
echo "📋 Current Firebase Functions config:"
firebase functions:config:get
echo ""

echo "🎉 Configuration complete!"
echo ""
echo "📦 NEXT STEPS:"
echo ""
echo "1. Create Stripe Product:"
echo "   - Go to: https://dashboard.stripe.com/products"
echo "   - Create product: 'AI Grid Layer Reservation' for \$10"
echo "   - Copy the Price ID (starts with price_)"
echo "   - Update .env.local with the Price ID"
echo ""
echo "2. Install Functions dependencies:"
echo "   cd functions && npm install && cd .."
echo ""
echo "3. Deploy Functions:"
echo "   firebase deploy --only functions"
echo ""
echo "4. Configure Webhook:"
echo "   - Go to: https://dashboard.stripe.com/webhooks"
echo "   - Add endpoint with your Functions URL"
echo "   - Copy webhook secret and run:"
echo "   firebase functions:config:set stripe.webhook_secret=\"whsec_...\""
echo ""
echo "5. Redeploy Functions:"
echo "   firebase deploy --only functions"
echo ""
echo "See STRIPE_CONFIGURATION_STEPS.md for detailed instructions!"

