'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { BadgeCheck, Mail, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

type Step = 'email' | 'verifying' | 'verified' | 'error'

export default function ClaimPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const listingId = params.id as string

  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [listingName, setListingName] = useState('')
  const [monthlyViews, setMonthlyViews] = useState(0)

  useEffect(() => {
    if (searchParams.get('verified') === 'true' || searchParams.get('upgrade') === 'true') {
      setStep('verified')
    }
  }, [searchParams])

  useEffect(() => {
    if (step === 'verified' && listingId) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
      supabase
        .from('listing_views')
        .select('*', { count: 'exact', head: true })
        .eq('directory_slug', 'menopause')
        .eq('listing_id', listingId)
        .gte('viewed_at', monthStart)
        .then(({ count }) => setMonthlyViews(count ?? 0))
    }
  }, [step, listingId])

  async function handleSendClaimLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId, email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to send claim link')
      setListingName(data.listingName ?? 'your listing')
      setStep('verifying')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'verifying') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-plum/10 flex items-center justify-center mx-auto mb-6">
          <Mail size={28} className="text-brand-plum" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-3">Check your email</h1>
        <p className="text-gray-500 mb-2">
          We sent a verification link to <strong>{email}</strong>
        </p>
        <p className="text-gray-400 text-sm">
          Click the link to confirm your identity and claim{listingName ? ` ${listingName}` : ' your listing'}. The link expires in 72 hours.
        </p>
        <button
          onClick={() => setStep('email')}
          className="mt-8 text-sm text-brand-plum hover:underline"
        >
          Use a different email
        </button>
      </div>
    )
  }

  if (step === 'verified') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={28} className="text-green-500" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Listing claimed!</h1>
        </div>

        <div className='text-center mb-6'>
          <div className='text-5xl font-bold text-gray-900'>{monthlyViews}</div>
          <div className='text-gray-500 mt-1'>people viewed your profile this month</div>
          <div className='mt-3 text-red-600 font-semibold'>
            0 could contact you — your phone and website are hidden
          </div>
        </div>

        <div className='space-y-3 mb-8 text-left'>
          {[
            ['Your phone number visible to searchers', 'They can call you directly from your listing'],
            ['Your website linked', 'Drive traffic to your practice site'],
            ['Your full bio displayed', 'Build trust before they reach out'],
            ['Verified badge', 'Stand out from unclaimed profiles'],
          ].map(([title, sub]) => (
            <div key={title} className='flex items-start gap-3'>
              <span className='text-green-500 text-lg leading-tight'>✓</span>
              <div>
                <div className='font-medium text-gray-900'>{title}</div>
                <div className='text-sm text-gray-500'>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 p-6 bg-white shadow-sm">
            <h2 className="font-semibold text-gray-900 mb-1">Free Listing</h2>
            <p className="text-3xl font-bold text-gray-900 mb-1 font-serif">$0<span className="text-base font-normal text-gray-400"> /forever</span></p>
            <p className="text-sm text-gray-500 mb-4">Name, credentials, location. Shown in search.</p>
            <a href="/" className="block text-center border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:border-brand-plum hover:text-brand-plum transition-colors">
              Keep free listing
            </a>
          </div>

          <div className="rounded-2xl border-2 border-brand-plum p-6 bg-white shadow-sm relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-plum text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </div>
            <div className="flex items-center gap-2 mb-1">
              <BadgeCheck size={18} className="text-brand-plum" />
              <h2 className="font-semibold text-gray-900">Verified Specialist</h2>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1 font-serif">$149<span className="text-base font-normal text-gray-400"> /year</span></p>
            <p className="text-sm text-gray-500 mb-4">Photo, bio, telehealth badge, priority placement.</p>
            <a
              href={`/api/upgrade?listingId=${listingId}&tier=verified`}
              className="block text-center bg-brand-plum hover:bg-brand-plum-dark text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              Upgrade to Verified
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-brand-plum/10 flex items-center justify-center mx-auto mb-4">
          <BadgeCheck size={28} className="text-brand-plum" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Claim Your Listing</h1>
        <p className="text-gray-500 leading-relaxed">
          This listing was added from public NPI data. Claiming it lets you add your bio, photo, website, booking link, and more — completely free.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">What you get when you claim</h2>
        <ul className="space-y-3">
          {[
            'Add your bio, photo, and practice description',
            'Link your website and online booking system',
            'Show your MSCP certification and specialties',
            'Toggle telehealth availability and new patient status',
            'Upgrade to Verified for priority placement ($149/year)',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
              <div className="w-5 h-5 rounded-full bg-brand-sage/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-brand-sage" />
              </div>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSendClaimLink} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your professional email address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourpractice.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-plum/30 focus:border-brand-plum text-gray-800"
          />
          <p className="text-xs text-gray-400 mt-1.5">
            We'll send a verification link to this email. Use your practice email for faster verification.
          </p>
        </div>
        <button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-brand-plum hover:bg-brand-plum-dark text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Send Verification Link
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 mt-6">
        By claiming this listing, you confirm you are the listed practitioner or an authorized representative of the practice.
      </p>
    </div>
  )
}
