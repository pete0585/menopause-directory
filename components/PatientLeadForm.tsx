'use client'

import { useState } from 'react'

interface PatientLeadFormProps {
  listingId: string
  providerName: string
  city: string
  state: string
}

export default function PatientLeadForm({ listingId, providerName, city, state }: PatientLeadFormProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/patient-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          listing_id: listingId,
          directory_slug: 'menopause',
          provider_name: providerName,
          city,
          state,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Failed to submit')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-center text-sm text-green-800">
        Thanks! We&apos;ll notify the provider.
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-brand-plum/20 bg-brand-cream p-5">
      <h3 className="font-serif font-semibold text-gray-900 mb-3">Request an appointment</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-plum focus:outline-none focus:ring-1 focus:ring-brand-plum"
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand-plum py-2.5 text-sm font-semibold text-white hover:bg-brand-plum/90 disabled:opacity-60 transition-colors"
        >
          {loading ? 'Sending…' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  )
}
