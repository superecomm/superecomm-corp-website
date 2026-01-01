# Stripe Configuration Script for AI Grid Layer (PowerShell)

Write-Host "🔐 Configuring Stripe for AI Grid Layer..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Create .env.local with publishable key
Write-Host "📝 Step 1: Creating .env.local with publishable key..." -ForegroundColor Yellow

$envContent = @"
# Super eComm - Local Environment Variables
# DO NOT COMMIT THIS FILE

# Stripe Publishable Key (safe for frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51Skr8FPkctg3RpKZ8MLA0zu1HeaXSivC5nMy8uE7gEN8EpcUXgmpCj2L850GSIF9mK8FIURmGjrSunuUHpoVQY3V00vVrjUlSa

# Stripe Price ID (add this after creating product in Stripe Dashboard)
VITE_STRIPE_PRICE_ID=price_XXXXX_REPLACE_THIS
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8
Write-Host "✅ Created .env.local" -ForegroundColor Green
Write-Host ""

# Step 2: Configure Firebase Functions with secret key
Write-Host "🔧 Step 2: Configuring Firebase Functions with Stripe secret key..." -ForegroundColor Yellow
Write-Host "⚠️  Replace YOUR_STRIPE_SECRET_KEY with your actual Stripe secret key" -ForegroundColor Red
# firebase functions:config:set stripe.secret_key="YOUR_STRIPE_SECRET_KEY_HERE"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Firebase Functions configured with Stripe secret key" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to configure Firebase Functions" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 3: View current config
Write-Host "📋 Current Firebase Functions config:" -ForegroundColor Yellow
firebase functions:config:get
Write-Host ""

Write-Host "🎉 Configuration complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 NEXT STEPS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create Stripe Product:" -ForegroundColor White
Write-Host "   - Go to: https://dashboard.stripe.com/products"
Write-Host "   - Create product: 'AI Grid Layer Reservation' for `$10"
Write-Host "   - Copy the Price ID (starts with price_)"
Write-Host "   - Update .env.local with the Price ID"
Write-Host ""
Write-Host "2. Install Functions dependencies:" -ForegroundColor White
Write-Host "   cd functions"
Write-Host "   npm install"
Write-Host "   cd .."
Write-Host ""
Write-Host "3. Deploy Functions:" -ForegroundColor White
Write-Host "   firebase deploy --only functions"
Write-Host ""
Write-Host "4. Configure Webhook:" -ForegroundColor White
Write-Host "   - Go to: https://dashboard.stripe.com/webhooks"
Write-Host "   - Add endpoint with your Functions URL"
Write-Host "   - Copy webhook secret and run:"
Write-Host '   firebase functions:config:set stripe.webhook_secret="whsec_..."'
Write-Host ""
Write-Host "5. Redeploy Functions:" -ForegroundColor White
Write-Host "   firebase deploy --only functions"
Write-Host ""
Write-Host "See STRIPE_CONFIGURATION_STEPS.md for detailed instructions!" -ForegroundColor Cyan


