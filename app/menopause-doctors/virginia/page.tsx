import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Virginia — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers across Virginia. Richmond, Virginia Beach, Charlottesville, Roanoke, and more. Telehealth available statewide.',
  openGraph: {
    title: 'Menopause Doctors in Virginia',
    description:
      'Find menopause specialists and HRT-friendly doctors across Virginia. MSCP-certified, telehealth available, accepting new patients.',
  },
}

const VA_CITIES = [
  { city: 'Richmond', slug: null, label: 'Richmond' },
  { city: 'Virginia Beach', slug: null, label: 'Virginia Beach' },
  { city: 'Charlottesville', slug: null, label: 'Charlottesville' },
  { city: 'Roanoke', slug: null, label: 'Roanoke' },
  { city: 'Norfolk', slug: null, label: 'Norfolk' },
  { city: 'Fredericksburg', slug: null, label: 'Fredericksburg' },
  { city: 'Chesapeake', slug: null, label: 'Chesapeake' },
  { city: 'Alexandria', slug: null, label: 'Alexandria' },
]

async function getVirginiaListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'VA')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(9)
  return (data as Listing[]) ?? []
}

export default async function VirginiaMenopausePage() {
  const listings = await getVirginiaListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Virginia who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Search MenopauseDirectory.co for Virginia providers and filter by \"Prescribes HRT\" or \"MSCP Certified.\" Virginia's largest provider concentrations are in Richmond (VCU Health, Bon Secours, HCA Virginia), Northern Virginia (Inova Health), and Charlottesville (UVA Health). Telehealth providers can reach patients in rural Southwest Virginia and the Shenandoah Valley where specialists are less available.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is telehealth available for menopause care in Virginia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Virginia has favorable telehealth laws for hormonal and women's health care. Many providers based in Richmond, Northern Virginia, and Hampton Roads offer telehealth statewide — particularly valuable for patients in the Appalachian coalfields, the Eastern Shore, and the Northern Neck where in-person specialist access is limited.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Virginia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Virginia has a strong population of MSCP (Menopause Society Certified Practitioner) credentialed providers, particularly in Richmond and Northern Virginia. The MSCP designation requires specialized training and an exam — it's the benchmark credential to look for in menopause care.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does Virginia Medicaid cover HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Virginia Medicaid (Medallion 4.0, managed through plans like Aetna Better Health, Anthem HealthKeepers Plus, and Optima Health) covers OB-GYN visits including menopause consultations. Coverage for specific HRT medications depends on the managed care plan formulary. Confirm with your plan before scheduling.",
        },
      },
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
          <span className="text-gray-600">Virginia</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Menopause Doctors in Virginia
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Virginia has over 280 menopause specialists and HRT prescribers listed on MenopauseDirectory.co,
            with the heaviest concentrations in Richmond, Northern Virginia, Charlottesville,
            Virginia Beach, and Roanoke. Academic medical centers at VCU Health and UVA Health
            anchor the state&apos;s menopause care infrastructure, complemented by a large
            independent women&apos;s health practice community and telehealth providers who
            serve the entire state.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>280+ providers statewide</span>
            <span>·</span>
            <span>HRT prescribers</span>
            <span>·</span>
            <span>MSCP-certified options</span>
            <span>·</span>
            <span>Telehealth statewide</span>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-6">Browse by City</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {VA_CITIES.map(({ city, slug, label }) => (
              <Link
                key={city}
                href={slug ? `/menopause-doctors/${slug}` : `/listings?city=${encodeURIComponent(city)}&state=VA`}
                className="bg-white rounded-xl border border-gray-100 p-4 hover:border-pink-200 hover:shadow-sm transition-all group"
              >
                <p className="font-semibold text-gray-800 group-hover:text-pink-600 text-sm">{label}</p>
                <p className="text-xs text-gray-400 mt-1">Virginia</p>
              </Link>
            ))}
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-gray-800">
                Featured Virginia Providers
              </h2>
              <Link
                href="/listings?state=VA"
                className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
                See all Virginia providers <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listings/${listing.slug}`}
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm hover:border-pink-200 transition-all group"
                >
                  <p className="font-semibold text-gray-800 group-hover:text-pink-600 text-sm">{listing.full_name}</p>
                  <p className="text-xs text-gray-400 mt-1">{listing.city}, {listing.state}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in Virginia
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Nearby States</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/menopause-doctors/maryland" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Maryland →</Link>
            <Link href="/menopause-doctors/washington-dc" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Washington DC →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT-Friendly Doctor →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
