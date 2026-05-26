'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { US_STATES } from '@/lib/utils'

const schema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  credentials: z.string().optional(),
  practice_name: z.string().optional(),
  practitioner_type: z.enum([
    'obgyn', 'endocrinologist', 'internist', 'np', 'pa',
    'functional_medicine', 'pelvic_floor_pt', 'coach', 'other',
  ]),
  bio: z.string().min(50, 'Please write at least 50 characters about your practice').max(1000),
  phone: z.string().optional(),
  website: z.string().url('Enter a valid URL (include https://)').optional().or(z.literal('')),
  booking_url: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  email: z.string().email('Valid email required'),
  address_line1: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Enter a valid ZIP code'),
  mscp_certified: z.boolean().optional(),
  hrt_prescriber: z.boolean().optional(),
  accepts_telehealth: z.boolean().optional(),
  accepting_new_patients: z.boolean().optional(),
})

type FormData = z.infer<typeof schema>

async function submitListing(data: FormData): Promise<{ error?: string }> {
  const res = await fetch('/api/listings/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const json = await res.json().catch(() => ({}))
    return { error: json.error ?? 'Something went wrong. Please try again.' }
  }
  return {}
}

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      accepting_new_patients: true,
    },
  })

  async function onSubmit(data: FormData) {
    setServerError('')
    const result = await submitListing(data)
    if (result.error) {
      setServerError(result.error)
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🌿</div>
        <h2 className="font-serif text-2xl text-brand-plum font-bold mb-2">You're in the queue!</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Your listing has been submitted and will be reviewed within 1–2 business days. We'll email you once it's live.
        </p>
      </div>
    )
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-plum/30 focus:border-brand-plum text-gray-800 text-sm transition-colors'
  const errorClass = 'text-red-500 text-xs mt-1'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {serverError}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input {...register('full_name')} className={inputClass} placeholder="Dr. Jane Smith" />
          {errors.full_name && <p className={errorClass}>{errors.full_name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Credentials</label>
          <input {...register('credentials')} className={inputClass} placeholder="MD, DO, NP, DPT..." />
        </div>
      </div>

      <div>
        <label className={labelClass}>Practice / Clinic Name</label>
        <input {...register('practice_name')} className={inputClass} placeholder="Women's Wellness Center" />
      </div>

      <div>
        <label className={labelClass}>Provider Type *</label>
        <select {...register('practitioner_type')} className={inputClass}>
          <option value="">Select type...</option>
          <option value="obgyn">OB-GYN</option>
          <option value="np">Nurse Practitioner</option>
          <option value="pa">Physician Assistant</option>
          <option value="endocrinologist">Endocrinologist</option>
          <option value="internist">Internal Medicine</option>
          <option value="functional_medicine">Functional Medicine</option>
          <option value="pelvic_floor_pt">Pelvic Floor Physical Therapist</option>
          <option value="coach">Menopause Coach</option>
          <option value="other">Other Specialist</option>
        </select>
        {errors.practitioner_type && <p className={errorClass}>{errors.practitioner_type.message}</p>}
      </div>

      <div>
        <label className={labelClass}>About Your Practice *</label>
        <textarea
          {...register('bio')}
          rows={5}
          className={inputClass}
          placeholder="Tell patients about your approach to menopause care, your experience, and what makes your practice different..."
        />
        {errors.bio && <p className={errorClass}>{errors.bio.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Phone</label>
          <input {...register('phone')} type="tel" className={inputClass} placeholder="(555) 555-5555" />
        </div>
        <div>
          <label className={labelClass}>Contact Email *</label>
          <input {...register('email')} type="email" className={inputClass} placeholder="you@practice.com" />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          <p className="text-xs text-gray-400 mt-1">Not displayed publicly — for verification only.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Website</label>
          <input {...register('website')} className={inputClass} placeholder="https://yourpractice.com" />
          {errors.website && <p className={errorClass}>{errors.website.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Online Booking Link</label>
          <input {...register('booking_url')} className={inputClass} placeholder="https://calendly.com/..." />
        </div>
      </div>

      <div>
        <label className={labelClass}>Address *</label>
        <input {...register('address_line1')} className={inputClass} placeholder="123 Main Street, Suite 200" />
        {errors.address_line1 && <p className={errorClass}>{errors.address_line1.message}</p>}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className={labelClass}>City *</label>
          <input {...register('city')} className={inputClass} placeholder="Orlando" />
          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
        </div>
        <div>
          <label className={labelClass}>State *</label>
          <select {...register('state')} className={inputClass}>
            <option value="">State...</option>
            {US_STATES.map((s) => (
              <option key={s.abbr} value={s.abbr}>{s.abbr}</option>
            ))}
          </select>
          {errors.state && <p className={errorClass}>{errors.state.message}</p>}
        </div>
        <div>
          <label className={labelClass}>ZIP *</label>
          <input {...register('zip')} className={inputClass} placeholder="32801" />
          {errors.zip && <p className={errorClass}>{errors.zip.message}</p>}
        </div>
      </div>

      <div className="bg-brand-cream rounded-2xl p-5 space-y-3">
        <h3 className="font-semibold text-gray-900 text-sm">About Your Practice</h3>
        {[
          { name: 'mscp_certified' as const, label: 'I am MSCP Certified (Menopause Society Certified Practitioner)' },
          { name: 'hrt_prescriber' as const, label: 'I prescribe hormone replacement therapy (HRT)' },
          { name: 'accepts_telehealth' as const, label: 'I offer telehealth / virtual appointments' },
          { name: 'accepting_new_patients' as const, label: 'I am currently accepting new patients' },
        ].map(({ name, label }) => (
          <label key={name} className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register(name)}
              className="mt-0.5 w-4 h-4 rounded border-gray-300 text-brand-plum focus:ring-brand-plum/30 cursor-pointer"
            />
            <span className="text-sm text-gray-700">{label}</span>
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-plum hover:bg-brand-plum-dark text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-60 text-base"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Your Listing (Free)'}
      </button>

      <p className="text-center text-xs text-gray-400">
        Free listings are reviewed and approved within 1–2 business days. Upgrade to Verified for $99/year to get a badge, priority placement, and direct booking link.
      </p>
    </form>
  )
}
