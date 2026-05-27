import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Columbus, OH — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers in Columbus, Ohio. 50+ providers listed across the Columbus metro. Telehealth options available.',
  openGraph: {
    title: 'Menopause Doctors in Columbus, OH',
    description:
      'Find menopause specialists and HRT-friendly doctors in Columbus, Ohio. MSCP-certified, telehealth available, accepting new patients.',
  },
}

async function getColumbusListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Columbus')
    .eq('state', 'OH')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function ColumbusMenopausePage() {
  const listings = await getColumbusListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find an HRT prescriber in Columbus, Ohio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers in Columbus. Filter by \"Prescribes HRT\" to find OB-GYNs, NPs, and other licensed prescribers in Columbus, including providers at OhioHealth, Ohio State Wexner Medical Center, and independent women's health practices.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Columbus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Menopause Society Certified Practitioner (MSCP) designation is the top credential in menopause care. Use the MSCP filter in the directory to find certified providers in the Columbus metro area.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see a Columbus menopause doctor by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Columbus providers offer telehealth for Ohio patients — covering the Columbus metro, Westerville, Dublin, Worthington, and rural Ohio counties where in-person specialists are limited.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is perimenopause and when should I see a specialist in Columbus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Perimenopause is the transition phase before menopause — often starting in your 40s — marked by irregular periods, hot flashes, sleep disruption, and mood changes. You don't need to wait for symptoms to become severe. A Columbus menopause specialist can evaluate your hormone levels and develop a plan earlier in the transition.",
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
          <span className="text-gray-600">Columbus, OH</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Columbus, OH</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Columbus, OH
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Columbus has a strong women's health ecosystem — Ohio State Wexner Medical Center and
            OhioHealth anchor the academic side, while independent practices across Dublin, Westerville,
            Upper Arlington, and Gahanna bring accessible, personalized menopause care to women across
            Central Ohio. Whether you need an HRT prescriber or an MSCP-certified specialist, the
            Columbus area has experienced options.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '50+'} providers listed</span>
            <span>·</span>
            <span>HRT prescribers available</span>
            <span>·</span>
            <span>Telehealth options</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Columbus
              </h2>
              <Link
                href="/listings?city=Columbus&state=OH"
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
            <p className="text-gray-500 mb-4">Search Columbus menopause specialists below.</p>
            <Link
              href="/listings?city=Columbus&state=OH"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Columbus Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mb-12 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Finding a Menopause Specialist in Columbus
          </h2>
          {faqLd.mainEntity.map((item) => (
            <div key={item.name} className="rounded-2xl border border-gray-100 p-6">
              <h3 className="font-serif text-base font-semibold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">More in Ohio</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/menopause-doctors/charlotte-nc" className="text-sm text-brand-plum hover:underline font-medium">Charlotte, NC →</Link>
            <Link href="/menopause-doctors/chicago-il" className="text-sm text-brand-plum hover:underline font-medium">Chicago, IL →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
