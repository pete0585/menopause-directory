import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Washington, DC — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers in Washington, DC and the DMV. 80+ providers listed. Telehealth available.',
  openGraph: {
    title: 'Menopause Doctors in Washington, DC',
    description:
      'Find menopause specialists and HRT-friendly doctors in Washington DC, Northern Virginia, and Maryland. MSCP-certified, telehealth available.',
  },
}

async function getDCListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Washington')
    .eq('state', 'DC')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function WashingtonDCMenopausePage() {
  const listings = await getDCListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Washington, DC who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers in DC and the DMV. Washington DC has an exceptional concentration of academic medical centers — GW Medical Faculty Associates, MedStar Georgetown, Howard University Hospital, and George Washington University Hospital — plus a dense network of private OB-GYN and women's health practices throughout the city.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Washington, DC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Washington DC has among the highest concentrations of MSCP-certified practitioners on the East Coast, reflecting the area's academic medical infrastructure and highly educated patient population. Use the MSCP filter in the directory to find certified providers in DC, Northern Virginia, and Maryland.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can DC menopause doctors also see patients in Virginia or Maryland?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many DC-based providers are also licensed in Virginia and Maryland, and several offer telehealth that covers all three jurisdictions. The DMV tri-state healthcare market is highly integrated — it's common for providers to see patients from across the region. Be sure to confirm your provider's licensing for your state before booking.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does DC Medicaid cover menopause treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "DC Medicaid (DC Healthy Families) covers OB-GYN visits including menopause consultations and hormone lab work. Coverage for specific HRT medications depends on the DC Medicaid formulary. DC's public insurance market has strong prescription coverage compared to many states.",
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
          <span className="text-gray-600">Washington, DC</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Washington, DC</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Menopause Doctors in Washington, DC
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Washington DC has one of the most sophisticated healthcare ecosystems in the country, and
            its menopause care resources reflect that. The capital&apos;s concentration of academic
            medical centers, federal employee health plans, and highly informed patients has produced
            a rich community of OB-GYNs and MSCP-certified practitioners who specialize in hormone
            therapy and menopause management. DC providers often serve patients from across the DMV
            tri-state area via telehealth and in-person visits.
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
                Menopause Specialists in Washington, DC
              </h2>
              <Link
                href="/listings?city=Washington&state=DC"
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
            <p className="text-gray-500 mb-4">Search menopause specialists in Washington DC below.</p>
            <Link href="/listings?city=Washington&state=DC" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search DC Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in the DC Metro Area
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">DMV Area Menopause Providers</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/menopause-doctors/maryland" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Menopause Doctors in Maryland →</Link>
            <Link href="/menopause-doctors/virginia" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Menopause Doctors in Virginia →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
