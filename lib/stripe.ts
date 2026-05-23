import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

export const VERIFIED_PRICE_CENTS = 4900 // $49/year
export const FEATURED_PRICE_CENTS = 24900 // $249/year
