import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find a Menopause Doctor in San Francisco, CA | Menopause Directory',
  description:
    'Find menopause specialists, HRT prescribers, and MSCP-certified practitioners in San Francisco, California. Serving Oakland, Berkeley, Marin County, San Jose. Telehealth available.',
  openGraph: {
    title: 'Find a Menopause Doctor in San Francisco, CA',
    description:
      'Find menopause specialists and HRT-friendly doctors in San Francisco, CA. Telehealth available.',
  },
}

async function getSanFranciscoListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('city', ['San Francisco', 'Oakland', 'Berkeley', 'Marin County', 'San Jose'])
    .eq('state', 'CA')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function SanFranciscoMenopausePage() {
  const listings = await getSanFranciscoListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
            {
        '@type': 'Question',
        name: 'What menopause specialists are in San Francisco?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "UCSF Health (University of California, San Francisco) is the premier academic resource for menopause care in the Bay Area — their Women\'s Health Center and OB/GYN department have clinicians focused on perimenopause and HRT. The private practice community in Pacific Heights, Noe Valley, and Cole Valley offers more accessible scheduling for working professionals. Bay Area IBCLCs and women\'s health NPs frequently provide menopause care outside the hospital system, often with same-week availability.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does UCSF or Kaiser cover menopause treatment in SF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "UCSF Health accepts most major insurance including Blue Shield of California, Anthem, Aetna, Cigna, and MediCal (for those who qualify). Kaiser Permanente Northern California — the dominant health system in much of the Bay Area — has OB/GYN services including menopause management at its San Francisco Medical Center on Geary. Kaiser members should request a referral through their PCP to the Women\'s Health or OB/GYN department for menopause evaluation.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is telehealth available for menopause care in the Bay Area?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Many SF-area providers offer telehealth for menopause consultations and HRT management. UCSF Health offers MyChart video visits. Several Bay Area concierge women\'s health platforms prescribe FDA-approved HRT via video visit — particularly practical for tech workers in South Bay or East Bay who prefer not to commute into the city.",
        },
      },
      {
        '@type': 'Question',
        name: 'What should I expect from a first menopause appointment in San Francisco?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "A thorough first menopause appointment includes a review of your symptom history (hot flashes, sleep disturbances, mood changes, vaginal dryness, brain fog), a hormone panel (FSH, estradiol, TSH to rule out thyroid causes), cardiovascular and bone density risk assessment, and a discussion of HRT options — patches, gels, oral micronized progesterone, and vaginal estrogen. San Francisco providers are generally well-versed in evidence-based HRT prescribing and the current medical consensus supporting its safety for most women under 60.",
        },
      }
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-gray-600">Find a Specialist</Link>
          <span>/</span>
          <Link href="/listings?state=CA" className="hover:text-gray-600">California</Link>
          <span>/</span>
          <span className="text-gray-600">San Francisco</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">San Francisco, CA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Find a Menopause Doctor in San Francisco, CA
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            San Francisco's women's health ecosystem is exceptionally well-resourced for menopause care. UCSF Health (University of California, San Francisco) has one of the country's leading menopause research and clinical programs, and the Bay Area's health-literate, high-income professional population drives strong demand for MSCP-certified specialists and evidence-based HRT.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '20+'} providers listed</span>
            <span>·</span>
            <span>HRT prescribers</span>
            <span>·</span>
            <span>MSCP-certified options</span>
            <span>·</span>
            <span>Telehealth available</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-gray-800">
                Menopause Specialists in San Francisco, CA
              </h2>
              <Link
                href="/listings?state=CA"
                className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
                See all California providers <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        ) : (
          <div className="card p-12 text-center mb-12">
            <p className="text-gray-500 mb-4">Search menopause specialists in San Francisco below.</p>
            <Link href="/listings?state=CA" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search California Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in San Francisco
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">California Menopause Providers</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=CA" className="text-sm text-pink-600 hover:text-pink-700 font-medium">All California Providers →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/categories/telehealth-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Telehealth Menopause Care →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT Doctor →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
