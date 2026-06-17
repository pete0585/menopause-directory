import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Tampa, FL — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers in Tampa, Florida. 80+ providers listed across the Tampa Bay metro. Telehealth available.',
  openGraph: {
    title: 'Menopause Doctors in Tampa, FL',
    description:
      'Find menopause specialists and HRT-friendly doctors in Tampa, FL. MSCP-certified, telehealth available, accepting new patients.',
  },
}

async function getTampaListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('city', ['Tampa', 'St. Petersburg', 'Clearwater'])
    .eq('state', 'FL')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function TampaMenopausePage() {
  const listings = await getTampaListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Tampa who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers in Tampa. The Tampa Bay area has providers affiliated with Tampa General Hospital, AdventHealth, BayCare Health System, and Moffitt Cancer Center — plus independent women's health practices throughout Hillsborough, Pinellas, and Pasco counties.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified practitioners in Tampa?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Tampa Bay is one of Florida's largest healthcare markets, and it has multiple Menopause Society Certified Practitioners (MSCP). Use the MSCP filter in the directory to find certified providers in Tampa, St. Petersburg, Clearwater, and the surrounding suburbs.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a Tampa menopause doctor by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many Tampa Bay providers offer telehealth for Florida patients. Florida is a large state, and telehealth extends the reach of Tampa Bay specialists to patients in rural central Florida, the Suncoast, and smaller communities where in-person menopause specialists are limited.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does Florida Medicaid cover menopause treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Florida Medicaid (managed through plans like Sunshine Health, Simply Healthcare, Humana, and Molina) covers OB-GYN visits including menopause consultations. Coverage for specific HRT medications varies by formulary. Ask whether your specific Medicaid managed care plan is accepted before scheduling.",
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
          <Link href="/menopause-doctors/florida" className="hover:text-gray-600">Florida</Link>
          <span>/</span>
          <span className="text-gray-600">Tampa</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Tampa, FL</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Menopause Doctors in Tampa, FL
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Tampa Bay is one of the fastest-growing metro areas in Florida — and its menopause care
            landscape reflects that growth. With major hospital systems including Tampa General,
            AdventHealth, and BayCare, plus a robust network of independent women&apos;s health
            practices across Hillsborough, Pinellas, and Pasco counties, Tampa Bay patients have
            strong access to OB-GYNs, nurse practitioners, and MSCP-certified menopause specialists.
            Florida&apos;s telehealth rules also mean many providers can see patients from anywhere
            in the state.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '80+'} providers listed</span>
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
                Menopause Specialists in Tampa Bay
              </h2>
              <Link
                href="/listings?city=Tampa&state=FL"
                className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
                See all <ArrowRight className="h-4 w-4" />
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
            <p className="text-gray-500 mb-4">Search menopause specialists in Tampa below.</p>
            <Link href="/listings?city=Tampa&state=FL" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search Tampa Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in Tampa Bay
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">More Florida Menopause Providers</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/menopause-doctors/florida" className="text-sm text-pink-600 hover:text-pink-700 font-medium">All Florida Providers →</Link>
            <Link href="/menopause-doctors/atlanta-ga" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Menopause Doctors in Atlanta →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
