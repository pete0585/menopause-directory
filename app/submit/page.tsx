import type { Metadata } from 'next'
import { CheckCircle, BadgeCheck, Star } from 'lucide-react'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'List Your Practice — MenopauseDirectory.co',
  description: 'Add your menopause practice. Free listing available. Verified (149/year) and Featured (299/year) listings get priority placement, verified badge, and full profiles.',
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
      'Claim link displayed',
      'Auto-created from public data',
    ],
    cta: 'Submit Free Listing',
    highlighted: false,
    featured: false,
  },
  {
    name: 'Verified',
    price: '$149',
    period: 'per year',
    description: 'Priority placement that converts searchers to patients.',
    features: [
      'Everything in Free',
      'Priority placement above free listings',
      'Verified badge — patients trust you more',
      'Full bio, photo, credentials, specialties',
      'Direct booking link and contact details',
      'MSCP, HRT, telehealth filters surface you first',
      'Higher placement in city and state pages',
    ],
    cta: 'Get Verified',
    highlighted: true,
    featured: false,
  },
  {
    name: 'Featured',
    price: '$299',
    period: 'per year',
    description: 'Top of every search. Maximum visibility.',
    features: [
      'Everything in Verified',
      'TOP placement — above all verified and free listings',
      '1 of only 3 featured spots per city page',
      'Highlighted card stands out in search results',
      'Monthly newsletter mention to subscribers',
      'Priority support and onboarding',
    ],
    cta: 'Get Featured',
    highlighted: false,
    featured: true,
  },
]

export default function SubmitPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-gray-900">
          List Your Practice on MenopauseDirectory.co
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Thousands of women are actively searching for a menopause specialist. Free to list. One new patient from a Verified listing pays for the year twice over.
        </p>
      </div>

      {/* Pricing cards */}
      <div id="pricing" className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-16">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.name}
            className={[
              'rounded-2xl p-6 flex flex-col relative',
              tier.highlighted
                ? 'border-2 border-brand-plum bg-brand-plum/5'
                : tier.featured
                ? 'border-2 border-brand-rose bg-brand-rose/5'
                : 'border border-gray-200 bg-white',
            ].join(' ')}
          >
            {tier.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-brand-plum text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            {tier.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-brand-rose text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Best Value
                </span>
              </div>
            )}

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                {tier.name === 'Verified' && <BadgeCheck className="h-4 w-4 text-brand-plum" />}
                {tier.name === 'Featured' && <Star className="h-4 w-4 text-brand-rose" />}
                <span className="font-semibold text-gray-800">{tier.name}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-3xl font-bold text-gray-900">{tier.price}</span>
                <span className="text-sm text-gray-400">/{tier.period}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{tier.description}</p>
            </div>

            <ul className="space-y-2 mb-6 flex-1">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-brand-sage mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#submit-form"
              className={[
                'block w-full text-center rounded-full py-2.5 text-sm font-semibold transition-colors',
                tier.highlighted
                  ? 'bg-brand-plum text-white hover:bg-brand-plum-dark'
                  : tier.featured
                  ? 'bg-brand-rose text-white hover:opacity-90'
                  : 'border border-gray-200 text-gray-600 hover:border-brand-plum hover:text-brand-plum',
              ].join(' ')}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      {/* ROI callout */}
      <div className="rounded-2xl bg-brand-cream border border-brand-plum/10 p-6 mb-12 text-center">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">The math is simple:</span>{' '}
          Menopause specialists charge $200–$500 per initial consultation. One new patient from a Verified listing pays for the year — twice. Women searching here have already decided they need a specialist. They just need to find you.
        </p>
      </div>

      {/* Form */}
      <div id="submit-form">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
          Submit Your Listing
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Start with a free listing. After submission you&apos;ll receive a claim link to upgrade to Verified or Featured and complete your profile.
        </p>
        <SubmitForm />
      </div>
    </div>
  )
}
