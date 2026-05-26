'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { BadgeCheck, Mail, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ClaimPage() {
  const params = useParams()
  const listingId = params.id as string

  const [step, setStep] = useState<'email' | 'verify' | 'profile' | 'done'>('email')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSendMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/claim/${listingId}/verify`,
        data: { listing_id: listingId, action: 'claim' },
      },
    })

    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      setStep('verify')
    }
  }

  if (step === 'verify') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-plum/10 flex items-center justify-center mx-auto mb-6">
          <Mail size={28} className="text-brand-plum" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-3">Check your email</h1>
        <p className="text-gray-500 mb-2">
          We sent a magic link to <strong>{email}</strong>
        </p>
        <p className="text-gray-400 text-sm">
          Click the link in the email to verify your identity and continue claiming your listing.
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
            'Upgrade to Verified for priority placement ($99/year)',
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

      <form onSubmit={handleSendMagicLink} className="space-y-4">
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
          {loading ? 'Sending...' : (
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
