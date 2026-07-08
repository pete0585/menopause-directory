import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find a Menopause Doctor in Sacramento, CA | Menopause Directory',
  description:
    'Find menopause specialists, HRT prescribers, and MSCP-certified practitioners in Sacramento, California. Serving Elk Grove, Roseville, Folsom, Davis. Telehealth available.',
  openGraph: {
    title: 'Find a Menopause Doctor in Sacramento, CA',
    description:
      'Find menopause specialists and HRT-friendly doctors in Sacramento, CA. Telehealth available.',
  },
}

async function getSacramentoListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('city', ['Sacramento', 'Elk Grove', 'Roseville', 'Folsom', 'Davis'])
    .eq('state', 'CA')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function SacramentoMenopausePage() {
  const listings = await getSacramentoListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
            {
        '@type': 'Question',
        name: 'What menopause specialists are in Sacramento, CA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "UC Davis Health (Sacramento) has a Women\'s Health department with menopause-experienced OB/GYNs. Sutter Health (Sutter Medical Foundation, PAMF) and Dignity Health (Mercy Medical Group) also have OB/GYN practices serving Sacramento and surrounding areas. The Roseville and Folsom private practice community has grown significantly with suburban growth. This directory lists Sacramento-area providers accepting new menopause patients.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does Kaiser Permanente in Sacramento cover menopause?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Kaiser Permanente Northern California has a large Sacramento presence (South Sacramento Medical Center and multiple clinic locations). Kaiser members in the Sacramento region receive OB/GYN care through their regional plan, with menopause evaluation and HRT prescribing available. Kaiser\'s women\'s health programs follow evidence-based guidelines for menopause management. Request a menopause-focused appointment through your MyChart account.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does California law require menopause coverage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. California\'s SB 855 and the ACA require most health plans to cover preventive women\'s health services including OB/GYN visits at no cost-sharing. Covered California marketplace plans, employer plans, and Medi-Cal (for income-qualified residents) all cover OB/GYN visits. Sacramento\'s Medi-Cal managed care plans (Anthem Blue Cross Community Plan, Health Net Community Solutions) cover women\'s health. Specific HRT medications coverage depends on your plan\'s formulary.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there menopause specialists in Roseville or Folsom?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. The Roseville and Folsom suburbs have a growing private OB/GYN community. Sutter Roseville Medical Center and Mercy (Dignity Health) in Folsom both have OB/GYN departments. Private practices in Roseville, Rocklin, and El Dorado Hills often have shorter wait times than Sacramento medical center systems. This directory includes providers in the full Sacramento metro including these suburban areas.",
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
          <span className="text-gray-600">Sacramento</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Sacramento, CA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Find a Menopause Doctor in Sacramento, CA
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Sacramento's women's health market has grown significantly with the region's population. UC Davis Health (University of California, Davis Health System) is the premier academic resource for complex menopause cases in the Central Valley, while the Sutter Health network and Dignity Health (Mercy) provide accessible OB/GYN services across Sacramento County and the surrounding suburbs.
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
                Menopause Specialists in Sacramento, CA
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
            <p className="text-gray-500 mb-4">Search menopause specialists in Sacramento below.</p>
            <Link href="/listings?state=CA" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search California Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in Sacramento
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
