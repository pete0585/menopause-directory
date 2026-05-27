import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Albuquerque, NM — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT-prescribing doctors in Albuquerque, New Mexico. 50+ providers listed. Telehealth options available statewide.',
  openGraph: {
    title: 'Menopause Doctors in Albuquerque, NM',
    description:
      'Find menopause specialists and HRT-friendly doctors in Albuquerque. MSCP-certified options, telehealth available, accepting new patients.',
  },
}

async function getAlbuquerqueListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Albuquerque')
    .eq('state', 'NM')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function AlbuquerqueMenopausePage() {
  const listings = await getAlbuquerqueListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find an HRT prescriber in Albuquerque?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use MenopauseDirectory.co to search for HRT-prescribing providers in Albuquerque. Filter by "Prescribes HRT" to find OB-GYNs, nurse practitioners, and other licensed prescribers in the Albuquerque metro who offer hormone replacement therapy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Albuquerque?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Menopause Society Certified Practitioner (MSCP) designation is the gold standard in menopause care. Use the directory to filter by MSCP certification and find credentialed specialists in the Albuquerque area.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see an Albuquerque menopause specialist by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many Albuquerque-area providers offer telehealth appointments for patients throughout New Mexico — useful for initial consultations, HRT follow-ups, and symptom management without needing to travel.',
        },
      },
      {
        '@type': 'Question',
        name: 'What symptoms should prompt me to see a menopause doctor in Albuquerque?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hot flashes, night sweats, sleep disruption, mood changes, brain fog, vaginal dryness, joint pain, and irregular periods are all signs that a menopause specialist can help. You do not need to wait until symptoms are severe — earlier evaluation leads to better outcomes.',
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
          <span className="text-gray-600">Albuquerque, NM</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Albuquerque, NM</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Albuquerque, NM
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Albuquerque has a growing network of menopause-focused providers — from OB-GYNs at the
            University of New Mexico Health Sciences Center to independent women's health practices across
            the Rio Grande Valley. Whether you need an HRT-prescribing physician, a nurse practitioner
            specializing in perimenopause, or telehealth care that reaches anywhere in New Mexico, you have
            real options here.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '50+'} providers listed</span>
            <span>·</span>
            <span>HRT-prescribers available</span>
            <span>·</span>
            <span>Telehealth statewide</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Albuquerque
              </h2>
              <Link
                href="/listings?city=Albuquerque&state=NM"
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
            <p className="text-gray-500 mb-4">Search Albuquerque menopause specialists below.</p>
            <Link
              href="/listings?city=Albuquerque&state=NM"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Albuquerque Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mb-12 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            Finding a Menopause Specialist in Albuquerque
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
            <Link href="/menopause-doctors/colorado-springs-co" className="text-sm text-brand-plum hover:underline font-medium">Colorado Springs, CO →</Link>
            <Link href="/menopause-doctors/denver-co" className="text-sm text-brand-plum hover:underline font-medium">Denver, CO →</Link>
            <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">All Providers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
