# 🚀 Quick Start: AI Grid Layer Reservation

## Testing Now (Development Mode)

The system is **ready to test** right now with simulated payments!

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Test the Flow

1. Navigate to **http://localhost:5173**
2. Click **"Join Early Access"** button
3. Sign up with any email (e.g., `test@example.com`, password: `test123`)
4. Click **"Reserve for $10"**
5. Watch it simulate payment and create your Grid Account
6. See your Grid ID: `GRID-HOME-US-TX-100000`
7. Click social share buttons
8. Navigate to **Dashboard** to see your account

### 3. Check Firebase Console

Open Firebase Console and verify:
- **Authentication** → New user created
- **Firestore** → `users/{userId}` document with `gridAccount` and `reservation`
- **Firestore** → `grid_accounts/GRID-HOME-US-TX-100000` document
- **Firestore** → `counters/HOME_US_TX` document with `nextSerial: 100001`

### 4. Check Email (Console)

Open browser console (F12) and see the email that would be sent with:
- Grid Account ID
- Reservation details
- Dashboard link

---

## Going to Production

### Required: Install Stripe

```bash
npm install @stripe/stripe-js
```

### Required: Environment Variables

Create `.env`:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
VITE_API_URL=https://api.superecomm.com
```

### Required: Backend API

Create backend with:

**POST /api/create-checkout-session**
- Takes: userId, email, amount
- Returns: Stripe session ID and URL

**POST /api/webhook**
- Handles: checkout.session.completed
- Updates: Firestore with reservation + grid account
- Sends: Confirmation email

**POST /api/send-email**
- Sends reservation confirmation emails

### Required: Uncomment Production Code

In `src/pages/ReservePage.tsx` (line ~140), replace:

```typescript
// DEVELOPMENT:
const paymentResult = await simulatePaymentSuccess(user.uid, 1000);

// PRODUCTION:
const checkoutData = await createCheckoutSession({
  userId: user.uid,
  email: user.email!,
  amount: 1000,
  successUrl: `${window.location.origin}/dashboard`,
  cancelUrl: `${window.location.origin}/reserve`
});
await redirectToCheckout(checkoutData.sessionId);
```

---

## How Users Will Experience It

### Step 1: Homepage → "Join Early Access"
User clicks the CTA button on homepage

### Step 2: Sign Up / Sign In
Firebase Auth modal for email/password

### Step 3: Reserve for $10
- Sees reservation details
- Clicks "Reserve for $10"
- Redirected to Stripe Checkout
- Enters card info (Stripe handles security)

### Step 4: Success!
- Returns to site
- Sees Grid ID: `GRID-HOME-US-TX-XXXXXX`
- Gets confirmation email
- Can share on social media

### Step 5: Dashboard
- Views Grid Account details
- Sees Founding Member status
- Reads updates about AI Grid Layer
- Waits for metering launch

---

## URLs

| Page | URL | Purpose |
|------|-----|---------|
| Homepage | `/` | Main landing page |
| Reserve | `/reserve` | Reservation flow (auth + payment) |
| Dashboard | `/dashboard` | User account dashboard |

*Note: This is a SPA, so URLs are state-based (`setCurrentPage("reserve")`)

---

## Grid ID Format

```
GRID-HOME-US-TX-120457
│    │    │  │  │
│    │    │  │  └─ Serial (6 digits, starts at 100000)
│    │    │  └──── Region (TX = Texas)
│    │    └─────── Country (US = United States)
│    └────────────  Tier (HOME for individuals)
└─────────────────  Fixed prefix
```

**First Grid ID**: `GRID-HOME-US-TX-100000`
**Second Grid ID**: `GRID-HOME-US-TX-100001`
...and so on.

---

## What's Included

### ✅ Fully Implemented
- Firebase Auth (email/password)
- Firestore database
- Grid ID generation
- Reservation page (beautiful UI)
- Dashboard page (comprehensive)
- Social sharing (Twitter, LinkedIn, Copy)
- Email templates (console logging)
- Payment simulation
- Dark/light mode
- Mobile responsive
- TypeScript types
- Error handling

### ⚠️ Stubs (Need Backend)
- Stripe payment processing
- Email sending
- Refund handling

---

## Common Questions

### Q: Can I test this without Stripe?
**A**: Yes! It's set up with simulated payments. Just run `npm run dev` and test the full flow.

### Q: Where is the payment data stored?
**A**: In Firestore under `users/{userId}.reservation`:
```typescript
{
  paid: true,
  amount: 10,
  stripePaymentId: "pi_xxx",
  refundable: true,
  createdAt: Timestamp
}
```

### Q: How do I add more Grid Tiers?
**A**: Edit `src/types/grid.ts`:
```typescript
export type GridTier = "HOME" | "BUSINESS" | "ENTERPRISE";
```

Then update pricing logic in `ReservePage.tsx`.

### Q: Can users have multiple Grid Accounts?
**A**: No, by design. One user = one Grid Account. The system checks and prevents double-reservation.

### Q: What happens if payment fails?
**A**: User stays on payment step, sees error message, can retry.

### Q: How do I handle refunds?
**A**: Create an admin dashboard that calls Stripe Refunds API and updates Firestore.

---

## Troubleshooting

### Error: "User already has a grid account"
This is expected if the user already reserved. They'll be shown their existing Grid ID.

### Error: "Firebase initialization error"
Check that `firebase.ts` is properly configured with your Firebase project credentials.

### Firestore permission denied
Add security rules (see `AI_GRID_LAYER_IMPLEMENTATION.md` for examples).

### Payment not working
1. Check if Stripe SDK is installed: `npm list @stripe/stripe-js`
2. Verify environment variables are set
3. Ensure backend API is running
4. In development, use the stub: `simulatePaymentSuccess()`

---

## Files to Know

| File | Purpose |
|------|---------|
| `src/pages/ReservePage.tsx` | Main reservation flow |
| `src/pages/DashboardPage.tsx` | User dashboard |
| `src/lib/grid/account.ts` | Grid ID generation |
| `src/lib/payment/stripe.ts` | Payment integration |
| `src/lib/email/service.ts` | Email service |
| `src/types/grid.ts` | TypeScript types |
| `src/config/firebase.ts` | Firebase config |

---

## Next Steps

1. ✅ Test the development flow
2. Install Stripe SDK
3. Create backend API
4. Set up email service
5. Add Firestore security rules
6. Deploy to production
7. Announce to users!

---

## 🎉 You're Ready!

The AI Grid Layer Reservation system is **fully functional** in development mode.

Run `npm run dev` and test it now! 🚀

---

For complete documentation, see `AI_GRID_LAYER_IMPLEMENTATION.md`.

