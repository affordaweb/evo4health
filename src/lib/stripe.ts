import Stripe from 'stripe'

// Lazy singleton — initialised on first request, not at build time
let _stripe: Stripe | null = null
export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not set')
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' })
  }
  return _stripe
}

/** @deprecated use getStripe() */
export const stripe = { get webhooks() { return getStripe().webhooks } } as unknown as Stripe
