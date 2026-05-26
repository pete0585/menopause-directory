import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

export const VERIFIED_PRICE_CENTS = 14900 // $149/year
export const FEATURED_PRICE_CENTS = 29900 // $299/year
