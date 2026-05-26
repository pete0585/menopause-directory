'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { BadgeCheck, Loader2, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ClaimVerifyPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const listingId = params.id as string

  const [step, setStep] = useState<'loading' | 'claimed' | 'error'>('loading')
  const [listingName, setListingName] = useState('')
  const [listingSlug, setListingSlug] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [error, setError] = useState('')
  const [upgrading, setUpgrading] = useState(false)

  useEffect(() => {
    async function handleVerify() {
      const supabase = createClient()

      // Exchange PKCE auth code for session
      const code = searchParams.get('code')
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        if (exchangeError) {
          setError('Verification link expired or invalid. Please try claiming again.')
          setStep('error')
          return
        }
      }

      // Get the authenticated user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setError('Could not verify your identity. The link may have expired.')
        setStep('error')
        return
      }

      setUserEmail(user.email ?? '')

      // Mark the listing as claimed
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId, userId: user.id, email: user.email }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Failed to claim listing. Please try again.')
        setStep('error')
        return
      }

      setListingName(data.listingName ?? 'Your listing')
      setListingSlug(data.listingSlug ?? '')
      setStep('claimed')
    }

    handleVerify()
  }, [listingId, searchParams])

  async function handleUpgrade() {
    setUpgrading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId,
          listingSlug,
          email: userEmail,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Failed to start checkout. Please try again.')
      }
    } catch {
      setError('Failed to start checkout. Please try again.')
    } finally {
      setUpgrading(false)
    }
  }

  if (step === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-plum mx-auto mb-4" />
          <p className="text-gray-500">Verifying your identity…</p>
        </div>
      </div>
    )
  }

  if (step === 'error') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-3">Verification failed</h1>
        <p className="text-gray-500 mb-6">{error}</p>
        <a
          href={`/claim/${listingId}`}
          className="inline-flex items-center gap-2 bg-brand-plum text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-plum-dark transition-colors"
        >
          Try again
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-brand-sage/15 flex items-center justify-center mx-auto mb-5">
          <BadgeCheck size={32} className="text-brand-sage" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Listing claimed!</h1>
        <p className="text-gray-500">
          <strong>{listingName}</strong> is now yours. Upgrade for priority placement and more client inquiries.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <div className="inline-block bg-brand-plum/10 text-brand-plum text-sm font-semibold px-3 py-1 rounded-full mb-4">
          Verified Specialist — $149/year
        </div>
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
          Get found by more patients
        </h2>
        <p className="text-gray-500 mb-6">
          Appear at the top of search results with a verified badge, full bio, and direct booking link.
        </p>
        <ul className="text-left space-y-2 mb-8 text-sm text-gray-600">
          {[
            'Priority placement above unclaimed listings',
            'Verified badge — patients trust you more',
            'Full bio, photo, credentials, and specialties',
            'Direct booking link and contact details',
            'Telehealth, HRT, and insurance visibility',
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-brand-sage/20 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-sage" />
              </div>
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={handleUpgrade}
          disabled={upgrading}
          className="w-full bg-brand-plum hover:bg-brand-plum-dark text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {upgrading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Upgrade to Verified — $149/year
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl text-center">
          {error}
        </div>
      )}

      <div className="mt-6 text-center">
        <a
          href={listingSlug ? `/listings/${listingSlug}` : '/listings'}
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          Skip for now — keep my free listing
        </a>
      </div>
    </div>
  )
}
