import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

// Tier mapping: premium = Pro ($29/mo), featured = Verified ($49/mo)
export const PLAN_PRICE_IDS = {
  premium: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    annual: process.env.STRIPE_PRO_ANNUAL_PRICE_ID!,
  },
  featured: {
    monthly: process.env.STRIPE_VERIFIED_MONTHLY_PRICE_ID!,
    annual: process.env.STRIPE_VERIFIED_ANNUAL_PRICE_ID!,
  },
}

// Legacy — still used by actions.ts sidebar CTA
export const VERIFIED_PRICE_ID = process.env.STRIPE_PRO_MONTHLY_PRICE_ID ?? 'price_1TpxNOGzK9SiblueR0hRmeSo'
