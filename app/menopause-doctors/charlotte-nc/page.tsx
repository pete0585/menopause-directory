import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Charlotte, NC — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers in Charlotte, North Carolina. 33+ providers listed. Telehealth options for patients across the Carolinas.',
  openGraph: {
    title: 'Menopause Doctors in Charlotte, NC',
    description:
      'Find menopause specialists and HRT-friendly doctors in Charlotte. MSCP-certified, telehealth available, accepting new patients.',
  },
}

async function getCharlotteListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Charlotte')
    .eq('state', 'NC')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function CharlotteMenopausePage() {
  const listings = await getCharlotteListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find an HRT prescriber in Charlotte, NC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers in Charlotte. Filter by \"Prescribes HRT\" to find OB-GYNs, NPs, and other licensed prescribers in Charlotte — including providers at Atrium Health, Novant Health, and independent women's health practices across the city.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Charlotte?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Menopause Society Certified Practitioner (MSCP) credential is the top credential in menopause care. Charlotte has a growing number of MSCP-certified providers. Use the certification filter in the directory to find them.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a Charlotte menopause specialist by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Charlotte-area providers offer telehealth for North Carolina and South Carolina patients — making specialist access possible from Huntersville, Concord, Gastonia, and across both states without traveling to Charlotte proper.',
        },
      },
      {
        '@type': 'Question',
        name: 'What questions should I ask a Charlotte menopause doctor at my first visit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Ask about their approach to HRT (bioidentical vs. conventional), what baseline labs they run, how they monitor treatment, and whether they offer telehealth follow-ups. Also ask about their experience with perimenopause specifically — the transition phase before menopause is where many women first seek help, and not all providers have deep expertise there.",
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
          <span className="text-gray-600">Charlotte, NC</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Charlotte, NC</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Charlotte, NC
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Charlotte has strong women's health infrastructure — Atrium Health and Novant Health anchor
            the medical side, while a growing number of independent menopause-focused practices offer
            more personalized, longer-appointment care across SouthPark, Ballantyne, and the surrounding
            Charlotte metro. Whether you need an HRT prescriber or a specialist who takes a comprehensive
            approach to perimenopause, Charlotte has experienced providers.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '33+'} providers listed</span>
            <span>·</span>
            <span>HRT prescribers available</span>
            <span>·</span>
            <span>Telehealth across the Carolinas</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Charlotte
              </h2>
              <Link
                href="/listings?city=Charlotte&state=NC"
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
            <p className="text-gray-500 mb-4">Search Charlotte menopause specialists below.</p>
            <Link
              href="/listings?city=Charlotte&state=NC"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Charlotte Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mb-12 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Finding a Menopause Specialist in Charlotte
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
            <Link href="/menopause-doctors/atlanta-ga" className="text-sm text-brand-plum hover:underline font-medium">Atlanta, GA →</Link>
            <Link href="/menopause-doctors/nashville-tn" className="text-sm text-brand-plum hover:underline font-medium">Nashville, TN →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
