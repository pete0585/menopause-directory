import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Nashville, TN — Find HRT-Friendly Providers | MenopauseDirectory.co',
  description:
    'Find menopause specialists, HRT-prescribing doctors, and MSCP-certified practitioners in Nashville, Tennessee. 9+ providers listed serving the greater Nashville metro.',
  openGraph: {
    title: 'Menopause Doctors in Nashville, TN',
    description:
      'Find menopause specialists in Nashville who take your symptoms seriously — HRT prescribers, MSCP-certified, pelvic floor therapists, and coaches.',
  },
}

async function getNashvilleListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Nashville')
    .eq('state', 'TN')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function NashvilleMenopausePage() {
  const listings = await getNashvilleListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where do I find a menopause specialist in Nashville who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use MenopauseDirectory.co to search Nashville and filter by "Prescribes HRT" or "MSCP Certified." Nashville has several providers who have built menopause-specific practices and actively prescribe hormone therapy.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Franklin, TN have menopause specialists?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — the greater Nashville metro includes providers in Franklin, Brentwood, Murfreesboro, and Hendersonville. Search the directory and expand your radius to include surrounding communities.',
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
          <span className="text-gray-600">Nashville, TN</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-brand-rose mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Nashville, TN</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Menopause Doctors in Nashville, TN
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Nashville's healthcare community has grown significantly, and with it a growing cohort of providers
            who specialize in women's midlife health. From OB-GYNs who have completed specialized menopause
            training to functional medicine practitioners and pelvic floor PTs — here's how to find them.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : 'Multiple'} providers listed</span>
            <span>·</span>
            <span>HRT prescribers available</span>
            <span>·</span>
            <span>Serving Nashville metro + suburbs</span>
          </div>
        </div>

        {listings.length > 0 ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Menopause Specialists in Nashville
              </h2>
              <Link
                href="/listings?city=Nashville&state=TN"
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
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 mb-12">
            <p className="text-gray-500 mb-4">Search for menopause specialists in Nashville below.</p>
            <Link
              href="/listings?city=Nashville&state=TN"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
            >
              Search Nashville Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
            Menopause Care in Nashville
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'What kinds of menopause specialists are in Nashville?',
                a: 'Nashville has OB-GYNs who specialize in perimenopause and menopause, functional medicine practitioners who focus on hormone balance and whole-body health, pelvic floor physical therapists who address GSM and pelvic pain, and menopause coaches who provide support and lifestyle guidance. This directory lists all of them — filter by provider type to find what you need.',
              },
              {
                q: 'Is menopause care available in Franklin or Brentwood?',
                a: 'Yes. Several providers in the greater Nashville metro serve patients in Franklin, Brentwood, Murfreesboro, and surrounding communities. Use the directory search and expand your location radius if you don\'t find results directly in Nashville.',
              },
              {
                q: 'What is the difference between a menopause coach and a menopause doctor?',
                a: 'A menopause doctor (OB-GYN, internist, NP) can diagnose, order labs, and prescribe medication including HRT. A menopause coach is typically a health coach or certified wellness practitioner who provides education, lifestyle guidance, and support — but cannot prescribe. Many women work with both: a medical provider for HRT management and a coach for the day-to-day navigation of symptoms, sleep, stress, and lifestyle.',
              },
            ].map((faq) => (
              <details key={faq.q} className="bg-white rounded-xl border border-gray-100 p-5 group">
                <summary className="font-medium text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.q}</span>
                  <span className="text-brand-plum text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-3">More in Tennessee</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=TN" className="text-sm text-brand-plum hover:underline font-medium">
              All Tennessee Providers →
            </Link>
            <Link href="/categories/certified-menopause-practitioner" className="text-sm text-brand-plum hover:underline font-medium">
              MSCP-Certified Nationwide →
            </Link>
            <Link href="/categories/telehealth" className="text-sm text-brand-plum hover:underline font-medium">
              Telehealth Options →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
