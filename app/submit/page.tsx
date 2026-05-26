import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Star, ShieldCheck } from 'lucide-react'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'List Your Practice | MenopauseDirectory.co',
  description:
    'Add your menopause specialty practice to MenopauseDirectory.co. Free listing available. Verified ($49/year) and Featured ($79/year) listings get full profiles, booking links, and priority placement.',
}

const PRICING_TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get discovered. No credit card required.',
    features: [
      'Name, credentials, city, state listed',
      'Shown in search results',
      'Practitioner type displayed',
      'Claim link to complete your profile',
    ],
    cta: 'Submit Free Listing',
    highlighted: false,
  },
  {
    name: 'Verified',
    price: '$49',
    period: 'per year',
    description: 'Full profile that converts searchers to patients.',
    features: [
      'Everything in Free',
      'Profile photo',
      'Full bio (up to 500 words)',
      'Specialties listed',
      'Insurance accepted',
      'HRT prescriber badge',
      'Accepts telehealth badge',
      'Direct booking link',
      '"Verified" badge on listing',
      'Higher search placement',
    ],
    cta: 'Get Verified',
    highlighted: true,
  },
  {
    name: 'Featured',
    price: '$79',
    period: 'per year',
    description: 'Maximum trust. Maximum visibility.',
    features: [
      'Everything in Verified',
      'MSCP credential verified',
      '"Featured Provider" banner',
      'Priority placement in all searches',
      'Featured on city and category pages',
    ],
    cta: 'Get Featured',
    highlighted: false,
  },
]

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-gray-900">
          List Your Practice on MenopauseDirectory.co
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          The only nationwide directory built for menopause specialists. Free to list.
          One new patient from a Verified listing pays for the year — four times over.
        </p>
      </div>

      {/* Pricing */}
      <div id="pricing" className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-16">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl p-6 ${
              tier.highlighted
                ? 'border-2 border-brand-plum bg-brand-plum/5 relative'
                : 'border border-gray-200 bg-white'
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-brand-plum text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                {tier.name === 'Verified' && <Star className="h-4 w-4 text-brand-plum" />}
                {tier.name === 'Featured' && <ShieldCheck className="h-4 w-4 text-brand-rose" />}
                <span className="font-semibold text-gray-800">{tier.name}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-3xl font-bold text-gray-900">{tier.price}</span>
                <span className="text-sm text-gray-400">/{tier.period}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{tier.description}</p>
            </div>

            <ul className="space-y-2 mb-6">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-brand-plum mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#submit-form"
              className={`block w-full text-center rounded-full py-2.5 text-sm font-semibold transition-colors ${
                tier.highlighted
                  ? 'bg-brand-plum text-white hover:bg-brand-plum-dark'
                  : 'border border-gray-200 text-gray-600 hover:border-brand-plum hover:text-brand-plum'
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      {/* ROI callout */}
      <div className="rounded-2xl bg-brand-cream border border-brand-cream-dark p-6 mb-12 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">The math is simple:</span>{' '}
          Menopause specialists charge $200–$400 per initial consultation. One new patient from a
          Verified listing pays for the year — four times over. No other directory puts this many
          menopause-focused patients in front of you.
        </p>
      </div>

      {/* Form */}
      <div id="submit-form">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
          Submit Your Listing
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Start with a free listing. After submission you'll receive a claim link to upgrade to
          Verified or Featured and complete your profile.
        </p>
        <SubmitForm />
      </div>
    </div>
  )
}
