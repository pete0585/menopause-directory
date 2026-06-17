import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Oklahoma City, OK — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers in Oklahoma City, Oklahoma. 90+ providers listed. Telehealth options available.',
  openGraph: {
    title: 'Menopause Doctors in Oklahoma City, OK',
    description:
      'Find menopause specialists and HRT-friendly doctors in Oklahoma City. MSCP-certified, telehealth available, accepting new patients.',
  },
}

async function getOklahomaCityListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', 'Oklahoma City')
    .eq('state', 'OK')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function OklahomaCityMenopausePage() {
  const listings = await getOklahomaCityListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find an HRT prescriber in Oklahoma City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers in Oklahoma City. Filter by \"Prescribes HRT\" to find OB-GYNs, nurse practitioners, and other licensed prescribers in OKC — including providers affiliated with OU Health, SSM Health St. Anthony, and independent women's health practices across the metro.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Oklahoma City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. The Menopause Society Certified Practitioner (MSCP) credential is the gold standard in menopause care. Use the MSCP filter in the directory to find certified providers in the Oklahoma City area.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I see an Oklahoma City menopause doctor by telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Many Oklahoma City providers offer telehealth appointments for patients across Oklahoma — valuable for those in rural areas of the state where in-person menopause specialists are scarce. Telehealth providers can prescribe and manage HRT remotely for most patients.",
        },
      },
      {
        '@type': 'Question',
        name: 'What should I bring to my first menopause appointment in Oklahoma City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Bring a symptom diary covering the past 2-3 weeks — hot flash frequency, sleep disruption, mood changes, irregular periods. Bring your current medication list and any recent lab work. Note your family history of breast cancer, heart disease, and osteoporosis, as these affect HRT candidacy. Your provider will likely order hormone labs at or after the first visit.",
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
          <Link href="/menopause-doctors/oklahoma" className="hover:text-gray-600">Oklahoma</Link>
          <span>/</span>
          <span className="text-gray-600">Oklahoma City</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Oklahoma City, OK</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Menopause Doctors in Oklahoma City, OK
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Oklahoma City has a growing network of menopause specialists and HRT-prescribing providers
            serving patients across the metro and throughout central Oklahoma. From OU Health and SSM
            Health St. Anthony to independent women&apos;s health practices in Edmond, Yukon, and
            Moore, you have access to board-certified OB-GYNs, nurse practitioners, and Menopause
            Society Certified Practitioners — plus telehealth options for patients anywhere in the state.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '90+'} providers listed</span>
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
                Menopause Specialists in Oklahoma City
              </h2>
              <Link
                href="/listings?city=Oklahoma+City&state=OK"
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
            <p className="text-gray-500 mb-4">Search menopause specialists in Oklahoma City below.</p>
            <Link href="/listings?city=Oklahoma+City&state=OK" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search Oklahoma City Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Finding Menopause Care in Oklahoma City
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">More Oklahoma Menopause Providers</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=OK" className="text-sm text-pink-600 hover:text-pink-700 font-medium">All Oklahoma Providers →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT-Friendly Doctor →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
