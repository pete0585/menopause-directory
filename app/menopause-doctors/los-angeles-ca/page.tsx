import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find a Menopause Doctor in Los Angeles, CA | Menopause Directory',
  description:
    'Find menopause specialists, HRT prescribers, and MSCP-certified practitioners in Los Angeles, California. Serving Santa Monica, Beverly Hills, Pasadena, Burbank. Telehealth available.',
  openGraph: {
    title: 'Find a Menopause Doctor in Los Angeles, CA',
    description:
      'Find menopause specialists and HRT-friendly doctors in Los Angeles, CA. Telehealth available.',
  },
}

async function getLosAngelesListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('city', ['Los Angeles', 'Santa Monica', 'Beverly Hills', 'Pasadena', 'Burbank'])
    .eq('state', 'CA')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function LosAngelesMenopausePage() {
  const listings = await getLosAngelesListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
            {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Los Angeles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use this directory to search HRT-prescribing providers in LA, Santa Monica, Beverly Hills, Pasadena, Burbank, and Long Beach. Los Angeles has an unusually high concentration of MSCP-certified and menopause-focused OB/GYNs, particularly in West LA, the San Fernando Valley, and the South Bay. Cedars-Sinai Women\'s Health, UCLA Health, and USC Keck all have menopause care programs. Telehealth is widely available for patients across the sprawling LA basin.",
        },
      },
      {
        '@type': 'Question',
        name: 'What menopause doctors are near me in LA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Cedars-Sinai Medical Center, UCLA Health (Westwood, Santa Monica, Torrance), and Providence Saint John\'s in Santa Monica all have strong menopause programs. The West Side and Beverly Hills have a particularly high concentration of private menopause specialists and functional medicine practitioners offering boutique hormone management. Korean-speaking providers are available in Koreatown and Torrance; Spanish-speaking providers are abundant throughout East LA and the South Bay.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does insurance cover menopause treatment in California?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "California law (SB 855, ACA Section 2713) requires most health insurance plans to cover preventive women\'s health services including OB/GYN consultations. Medi-Cal covers OB/GYN services for enrolled patients. Anthem Blue Cross of California, Blue Shield of California, Kaiser Permanente, Health Net, and Covered California plans all cover OB/GYN visits where menopause is discussed. Coverage for specific HRT medications depends on your formulary — confirm with your plan before the appointment.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is telehealth available for menopause care in Los Angeles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, and it is especially practical in LA given traffic. Many LA-based menopause specialists and telehealth-first platforms prescribe FDA-approved hormone therapy via video visit with lab results. California law is favorable for telehealth prescribing of estrogen and progesterone. Telehealth is appropriate for initial consultation, HRT adjustments, and ongoing management — though an in-person pelvic exam is still recommended annually.",
        },
      }
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
          <Link href="/listings?state=CA" className="hover:text-gray-600">California</Link>
          <span>/</span>
          <span className="text-gray-600">Los Angeles</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Los Angeles, CA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Find a Menopause Doctor in Los Angeles, CA
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Los Angeles has the most diverse menopause patient population of any U.S. metro — Spanish, Korean, Armenian, and Mandarin-speaking providers are readily available — and a dense ecosystem of OB/GYNs, functional medicine doctors, and MSCP-certified menopause specialists. Cedars-Sinai, UCLA Health, and USC Keck School of Medicine all have women's health programs with menopause expertise.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '20+'} providers listed</span>
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
                Menopause Specialists in Los Angeles, CA
              </h2>
              <Link
                href="/listings?state=CA"
                className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
                See all California providers <ArrowRight className="h-4 w-4" />
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
            <p className="text-gray-500 mb-4">Search menopause specialists in Los Angeles below.</p>
            <Link href="/listings?state=CA" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search California Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in Los Angeles
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">California Menopause Providers</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=CA" className="text-sm text-pink-600 hover:text-pink-700 font-medium">All California Providers →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/categories/telehealth-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Telehealth Menopause Care →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT Doctor →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
