import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Indianapolis, IN — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers in Indianapolis, Indiana. Providers across the Indianapolis metro. Telehealth available statewide.',
  openGraph: {
    title: 'Menopause Doctors in Indianapolis, IN',
    description:
      'Find menopause specialists and HRT-friendly doctors in Indianapolis, Indiana. MSCP-certified, telehealth available, accepting new patients.',
  },
}

async function getIndianapolisListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Indianapolis')
    .eq('state', 'IN')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(10)
  return (data as Listing[]) ?? []
}

export default async function IndianapolisMenopausePage() {
  const listings = await getIndianapolisListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many menopause specialists are in Indianapolis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `MenopauseDirectory.co lists ${listings.length > 0 ? `${listings.length}+` : 'growing numbers of'} menopause specialists in Indianapolis, IN. The Indianapolis healthcare ecosystem is anchored by Indiana University Health — the largest health system in the state — and Franciscan Health, both of which have women's health programs with menopause expertise. A growing number of independent and integrative practices also serve Indianapolis women.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do Indianapolis menopause doctors prescribe HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many Indianapolis OB-GYNs, internists, and nurse practitioners are comfortable prescribing hormone replacement therapy. The most knowledgeable providers use a personalized approach — assessing your symptoms, health history, and risk factors before recommending a specific HRT regimen. Use the "Prescribes HRT" filter in the directory to narrow your search.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a menopause specialist near Carmel or Fishers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many Indianapolis-area menopause providers practice in the northern suburbs including Carmel, Fishers, Noblesville, and Westfield. IU Health and Franciscan Health both have suburban locations. Telehealth is also widely available for Indiana patients who prefer not to drive downtown.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see an Indianapolis menopause specialist by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many Indianapolis menopause providers offer telehealth for Indiana patients — accessible from Carmel, Fishers, Zionsville, Greenwood, and communities throughout central Indiana. Telehealth is especially practical for initial consultations and ongoing HRT management.',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          {' › '}
          <Link href="/listings" className="hover:text-gray-600">Find a Specialist</Link>
          {' › '}
          <Link href="/listings?state=IN" className="hover:text-gray-600">Indiana</Link>
          {' › '}
          <span className="text-gray-600">Indianapolis</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Indianapolis, IN</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Find a Menopause Doctor in Indianapolis, IN
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Indianapolis has a growing network of menopause-focused providers backed by the strength
            of Indiana University Health — the largest health system in Indiana — and Franciscan Health.
            From OB-GYNs and internists at major medical centers to nurse practitioners in independent
            practice, Indianapolis women have real options for HRT, perimenopause management, and ongoing
            hormonal health care. Midwestern practicality meets increasingly sophisticated menopause care
            in a city that takes women&apos;s health seriously.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : 'Multiple'} providers listed</span>
            <span>·</span>
            <span>HRT prescribers available</span>
            <span>·</span>
            <span>Telehealth across Indiana</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Indianapolis
              </h2>
              <Link
                href="/listings?city=Indianapolis&state=IN"
                className="flex items-center gap-1 text-sm font-semibold text-brand-plum hover:text-brand-plum/80"
              >
                All results <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/listings/${listing.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow group"
                >
                  <p className="font-semibold text-gray-800 group-hover:text-brand-plum transition-colors">
                    {listing.full_name}
                    {listing.credentials ? `, ${listing.credentials}` : ''}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{listing.city}, IN</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {listing.mscp_certified && (
                      <span className="text-xs font-medium text-brand-plum bg-brand-plum/10 rounded-full px-2 py-0.5">
                        MSCP Certified
                      </span>
                    )}
                    {listing.accepts_telehealth && (
                      <span className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-2 py-0.5">
                        Telehealth
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-12 rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-500 mb-4">Search Indianapolis menopause specialists below.</p>
            <Link
              href="/listings?city=Indianapolis&state=IN"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Indianapolis Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mb-12 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Finding a Menopause Specialist in Indianapolis
          </h2>
          {faqLd.mainEntity.map((item) => (
            <div key={item.name} className="rounded-2xl border border-gray-100 p-6">
              <h3 className="font-serif text-base font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">Browse All Indiana Menopause Doctors</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=IN" className="text-sm text-brand-plum hover:underline font-medium">All Indiana Providers →</Link>
            <Link href="/menopause-doctors/columbus-oh" className="text-sm text-brand-plum hover:underline font-medium">Columbus, OH →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-brand-plum hover:underline font-medium">How to Find an HRT-Friendly Doctor →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
