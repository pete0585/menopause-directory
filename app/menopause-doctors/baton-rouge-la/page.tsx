import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Baton Rouge, LA — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers in Baton Rouge, Louisiana. 30+ providers listed. Telehealth available.',
  openGraph: {
    title: 'Menopause Doctors in Baton Rouge, LA',
    description:
      'Find menopause specialists and HRT-friendly doctors in Baton Rouge, LA. MSCP-certified, telehealth available.',
  },
}

async function getBatonRougeListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('city', ['Baton Rouge', 'Prairieville', 'Gonzales', 'Zachary', 'Central'])
    .eq('state', 'LA')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function BatonRougeMenopausePage() {
  const listings = await getBatonRougeListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Baton Rouge who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers in Baton Rouge. The city's healthcare landscape is anchored by Our Lady of the Lake Regional Medical Center, Baton Rouge General, and LSU Health Baton Rouge — all of which have women's health departments with menopause-experienced OB-GYNs. Independent women's health practices throughout the metro serve patients seeking hormone therapy and integrative menopause care.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Baton Rouge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. The Baton Rouge area has MSCP-certified (Menopause Society Certified Practitioner) providers, particularly through academic affiliates of LSU Health and larger women's health practices. Use the MSCP filter in this directory to find credentialed specialists.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I access telehealth menopause care in Louisiana?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Louisiana has telehealth-friendly rules for hormone prescribing, and several menopause specialists serve Baton Rouge and surrounding communities via video appointment. Telehealth is particularly valuable for patients in the surrounding parishes — Livingston, Ascension, and East Baton Rouge — where specialist access is more limited.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does Louisiana Medicaid cover menopause treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Louisiana Medicaid (Healthy Louisiana) covers OB-GYN visits including menopause consultations. Coverage for specific HRT medications depends on your managed care plan (Aetna Better Health, AmeriHealth, Healthy Blue, Louisiana Healthcare Connections, United Healthcare Community Plan) and the formulary. Ask your provider whether they accept Louisiana Medicaid before scheduling.",
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
          <Link href="/menopause-doctors/florida" className="hover:text-gray-600">Louisiana</Link>
          <span>/</span>
          <span className="text-gray-600">Baton Rouge</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Baton Rouge, LA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Menopause Doctors in Baton Rouge, LA
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Baton Rouge has a growing community of OB-GYNs and women&apos;s health specialists who are
            experienced with hormone therapy and menopause management. The city&apos;s major health
            systems — Our Lady of the Lake, Baton Rouge General, and LSU Health affiliates — provide
            a foundation of academic menopause expertise, complemented by private practices serving
            patients throughout East Baton Rouge Parish and the surrounding communities.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '30+'} providers listed</span>
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
                Menopause Specialists in Baton Rouge, LA
              </h2>
              <Link
                href="/listings?city=Baton Rouge&state=LA"
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
            <p className="text-gray-500 mb-4">Search menopause specialists in Baton Rouge below.</p>
            <Link href="/listings?city=Baton Rouge&state=LA" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search Baton Rouge Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in Baton Rouge
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Louisiana Menopause Providers</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=LA" className="text-sm text-pink-600 hover:text-pink-700 font-medium">All Louisiana Providers →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT Doctor →</Link>
            <Link href="/categories/telehealth-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Telehealth Menopause Care →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
