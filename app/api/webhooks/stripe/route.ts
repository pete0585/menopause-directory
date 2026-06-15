import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return new Response('Missing stripe-signature header', { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return new Response('Invalid signature', { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    { auth: { persistSession: false } }
  )

  // Return 200 for event types we don't handle — prevents Stripe retry loops
  // from cross-account events (e.g. Substack subscription events hitting directory webhooks)
  const HANDLED_EVENTS = new Set([
    'checkout.session.completed',
    'invoice.payment_succeeded',
    'customer.subscription.deleted',
  ])
  if (!HANDLED_EVENTS.has(event.type)) {
    return new Response('OK', { status: 200 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const listingId = session.metadata?.listing_id
        if (!listingId) {
          console.error('STRIPE WEBHOOK: checkout.session.completed missing listing_id metadata', {
            sessionId: session.id,
            amount: session.amount_total,
            customer: session.customer,
            metadata: session.metadata,
          })
          // Alert admin via email
          const resendKey = process.env.RESEND_API_KEY
          if (resendKey) {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                from: 'hello@menopausedirectory.co',
                to: 'adam@thestrategicveteran.com',
                subject: '⚠️ MenopauseDirectory: Stripe payment received but listing NOT upgraded',
                html: `<p>A Stripe checkout completed but <strong>listing_id metadata was missing</strong>. The customer was charged but their listing was NOT upgraded.</p><p><strong>Session ID:</strong> ${session.id}<br/><strong>Amount:</strong> $${(session.amount_total ?? 0) / 100}<br/><strong>Customer:</strong> ${session.customer}</p><p>Manually upgrade this listing via the Stripe dashboard.</p>`,
              }),
            }).catch(e => console.error('Failed to send webhook alert email:', e))
          }
          break
        }

        // Determine tier from metadata (preferred) or amount as fallback
        const tierFromMetadata = session.metadata?.tier
        const tier: 'premium' | 'featured' =
          tierFromMetadata === 'featured' ||
          (session.amount_total !== null && session.amount_total >= 29900)
            ? 'featured'
            : 'premium'

        const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()

        await supabase
          .from('menopause_listings')
          .update({
            listing_tier: tier,
            is_verified: true,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            subscription_expires_at: expiresAt,
          })
          .eq('id', listingId)

        await supabase.from('menopause_payments').insert({
          listing_id: listingId,
          stripe_payment_intent_id: session.payment_intent as string | null,
          stripe_subscription_id: session.subscription as string,
          amount_cents: session.amount_total ?? 14900,
          currency: session.currency ?? 'usd',
          tier,
          status: 'succeeded',
          period_start: new Date().toISOString(),
          period_end: expiresAt,
        })
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        if (!invoice.subscription) break

        const { data: listings } = await supabase
          .from('menopause_listings')
          .select('id')
          .eq('stripe_subscription_id', invoice.subscription)
          .limit(1)

        if (listings && listings.length > 0) {
          const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          await supabase
            .from('menopause_listings')
            .update({ subscription_expires_at: expiresAt })
            .eq('stripe_subscription_id', invoice.subscription as string)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await supabase
          .from('menopause_listings')
          .update({
            listing_tier: 'free',
            is_verified: false,
            subscription_expires_at: null,
          })
          .eq('stripe_subscription_id', subscription.id)
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return new Response('Internal error', { status: 500 })
  }

  return new Response('OK', { status: 200 })
}
