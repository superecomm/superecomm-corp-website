/**
 * Stripe Payment Integration for AI Grid Layer Reservations
 * Uses Firebase Functions + Stripe Checkout
 */

import { getFunctions, httpsCallable } from 'firebase/functions';

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

/**
 * Create a Stripe Checkout session via Firebase Functions
 * This will redirect the user to Stripe's hosted payment page
 */
export async function createCheckoutSession(): Promise<CreateCheckoutSessionResponse> {
  try {
    const functions = getFunctions();
    const createCheckout = httpsCallable<
      { priceId: string; successUrl: string; cancelUrl: string },
      CreateCheckoutSessionResponse
    >(functions, 'createCheckoutSession');

    const priceId = import.meta.env.VITE_STRIPE_PRICE_ID;
    
    if (!priceId) {
      throw new Error('Stripe Price ID not configured. Please set VITE_STRIPE_PRICE_ID');
    }

    const result = await createCheckout({
      priceId,
      successUrl: `${window.location.origin}/reserve?success=true`,
      cancelUrl: `${window.location.origin}/reserve?canceled=true`,
    });

    return result.data;
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    throw new Error(error.message || 'Failed to create checkout session');
  }
}

/**
 * Redirect to Stripe Checkout
 * Simply redirects to the checkout URL provided by Stripe
 */
export function redirectToStripeCheckout(checkoutUrl: string): void {
  window.location.href = checkoutUrl;
}

/**
 * STUB: Simulate successful payment (FOR DEVELOPMENT ONLY)
 * Used when Firebase Functions are not configured
 */
export async function simulatePaymentSuccess(
  _userId: string,
  _amount: number = 1000
): Promise<{ success: boolean; paymentId: string }> {
  console.warn('⚠️ DEVELOPMENT MODE: Simulating payment success');
  console.log(`Simulating payment for user: ${_userId}, amount: $${_amount / 100}`);
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    paymentId: `sim_${Date.now()}_${Math.random().toString(36).substring(7)}`
  };
}

