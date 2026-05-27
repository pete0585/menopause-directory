import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Baltimore, MD — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers in Baltimore, Maryland. 50+ providers listed. Johns Hopkins, UMMC area providers and independent practices.',
  openGraph: {
    title: 'Menopause Doctors in Baltimore, MD',
    description:
      'Find menopause specialists and HRT-friendly doctors in Baltimore. MSCP-certified options, telehealth available, accepting new patients.',
  },
}

async function getBaltimoreListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Baltimore')
    .eq('state', 'MD')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function BaltimoreMenopausePage() {
  const listings = await getBaltimoreListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find an HRT prescriber in Baltimore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers in Baltimore. Filter by \"Prescribes HRT\" to find OB-GYNs, NPs, and other licensed prescribers in the Baltimore metro — including providers affiliated with Johns Hopkins and UMMC, as well as independent women's health practices.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Baltimore?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Menopause Society Certified Practitioner (MSCP) credential is the gold standard in menopause care. Several practitioners in the Baltimore area hold MSCP certification. Filter by certification in the directory to find them quickly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a Baltimore menopause specialist by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Baltimore-area menopause providers offer telehealth appointments for Maryland patients — useful for initial evaluations, HRT management, and follow-up care without traveling into the city.',
        },
      },
      {
        '@type': 'Question',
        name: "Does my Maryland insurance cover a menopause specialist visit?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Most Maryland insurance plans cover OB-GYN and internal medicine visits, which is where menopause care typically starts. If your provider is out-of-network, check your plan's out-of-network benefits. Many telehealth menopause platforms also accept major insurers.",
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
          <span className="text-gray-600">Baltimore, MD</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Baltimore, MD</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Baltimore, MD
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Baltimore is home to major academic medical centers — Johns Hopkins, UMMC, Mercy Medical —
            alongside an active community of independent women's health practices. Whether you are looking
            for a hormone specialist affiliated with a major institution or a private-practice menopause
            provider with same-week availability, Baltimore has both.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '50+'} providers listed</span>
            <span>·</span>
            <span>Academic and independent practices</span>
            <span>·</span>
            <span>Telehealth available</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Baltimore
              </h2>
              <Link
                href="/listings?city=Baltimore&state=MD"
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
            <p className="text-gray-500 mb-4">Search Baltimore menopause specialists below.</p>
            <Link
              href="/listings?city=Baltimore&state=MD"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Baltimore Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mb-12 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Finding a Menopause Specialist in Baltimore
          </h2>
          {faqLd.mainEntity.map((item) => (
            <div key={item.name} className="rounded-2xl border border-gray-100 p-6">
              <h3 className="font-serif text-base font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">More Nearby</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/menopause-doctors/boston-ma" className="text-sm text-brand-plum hover:underline font-medium">Boston, MA →</Link>
            <Link href="/menopause-doctors/charlotte-nc" className="text-sm text-brand-plum hover:underline font-medium">Charlotte, NC →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
