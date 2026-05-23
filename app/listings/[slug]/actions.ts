'use server'

import { redirect } from 'next/navigation'
import { stripe, VERIFIED_PRICE_CENTS } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function createCheckoutSession(listingId: string, listingSlug: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://menopausedirectory.co'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Verified Listing — MenopauseDirectory.co',
            description:
              'Annual verified practitioner listing: priority placement, verified badge, full profile with direct booking link.',
          },
          unit_amount: VERIFIED_PRICE_CENTS,
          recurring: {
            interval: 'year',
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/listings/${listingSlug}?upgraded=1`,
    cancel_url: `${siteUrl}/listings/${listingSlug}`,
    customer_email: user?.email,
    metadata: {
      listing_id: listingId,
      listing_slug: listingSlug,
    },
  })

  redirect(session.url!)
}
