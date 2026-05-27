import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Austin, TX — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers in Austin, Texas. 48+ providers listed across the Austin metro. Telehealth options available statewide.',
  openGraph: {
    title: 'Menopause Doctors in Austin, TX',
    description:
      'Find menopause specialists and HRT-friendly doctors in Austin, Texas. MSCP-certified, telehealth available, accepting new patients.',
  },
}

async function getAustinListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Austin')
    .eq('state', 'TX')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function AustinMenopausePage() {
  const listings = await getAustinListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find an HRT prescriber in Austin, TX?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers in Austin. Filter by \"Prescribes HRT\" to find OB-GYNs, nurse practitioners, and functional medicine doctors in Austin who specialize in hormone replacement therapy and menopause management.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Austin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Menopause Society Certified Practitioner (MSCP) designation is the gold standard in menopause care. Austin has a growing number of MSCP-certified providers — use the certification filter in the directory to find them.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see an Austin menopause specialist by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Austin-area menopause providers offer telehealth for Texas patients — accessible from Round Rock, Cedar Park, Pflugerville, Kyle, Buda, and beyond. Telehealth is especially practical for HRT follow-ups and initial consultations.',
        },
      },
      {
        '@type': 'Question',
        name: 'What types of menopause providers are in Austin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Austin's menopause provider landscape includes OB-GYNs, integrative medicine doctors, nurse practitioners, and functional medicine practitioners. Some specialize in perimenopause; others focus on post-menopause bone health, cardiovascular risk, and HRT management. Use the specialty filters to narrow your search.",
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
          <Link href="/menopause-doctors/texas" className="hover:text-gray-600">Texas</Link>
          {' › '}
          <span className="text-gray-600">Austin</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Austin, TX</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Austin, TX
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Austin has a rapidly growing community of menopause-focused providers — from conventional
            OB-GYNs in the medical corridor to integrative and functional medicine practices that take a
            whole-person approach to hormonal health. Whether you are in South Austin, the Domain area,
            or commuting from Round Rock or Buda, you have real options for HRT, symptom management, and
            ongoing menopause care.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '48+'} providers listed</span>
            <span>·</span>
            <span>HRT prescribers available</span>
            <span>·</span>
            <span>Telehealth across Texas</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Austin
              </h2>
              <Link
                href="/listings?city=Austin&state=TX"
                className="flex items-center gap-1 text-sm font-semibold text-brand-plum hover:text-brand-plum/80"
              >
                All results <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-12 rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-500 mb-4">Search Austin menopause specialists below.</p>
            <Link
              href="/listings?city=Austin&state=TX"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Austin Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mb-12 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Finding a Menopause Specialist in Austin
          </h2>
          {faqLd.mainEntity.map((item) => (
            <div key={item.name} className="rounded-2xl border border-gray-100 p-6">
              <h3 className="font-serif text-base font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">More in Texas</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/menopause-doctors/dallas-tx" className="text-sm text-brand-plum hover:underline font-medium">Dallas, TX →</Link>
            <Link href="/menopause-doctors/texas" className="text-sm text-brand-plum hover:underline font-medium">All Texas Providers →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
