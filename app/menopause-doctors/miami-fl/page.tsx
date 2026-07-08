import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find a Menopause Doctor in Miami, FL | Menopause Directory',
  description:
    'Find menopause specialists, HRT prescribers, and MSCP-certified practitioners in Miami, Florida. Serving Coral Gables, Brickell, Aventura, Doral. Telehealth available.',
  openGraph: {
    title: 'Find a Menopause Doctor in Miami, FL',
    description:
      'Find menopause specialists and HRT-friendly doctors in Miami, FL. Telehealth available.',
  },
}

async function getMiamiListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('city', ['Miami', 'Coral Gables', 'Brickell', 'Aventura', 'Doral'])
    .eq('state', 'FL')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function MiamiMenopausePage() {
  const listings = await getMiamiListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
            {
        '@type': 'Question',
        name: 'How do I find a menopause doctor in Miami, FL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use this directory to find OB/GYNs, internists, and menopause-focused practitioners in Miami, Coral Gables, Brickell, and the broader South Florida metro. Miami has a high concentration of Spanish-speaking women\'s health providers — many practices in Coral Way, Doral, and Hialeah offer care primarily in Spanish. Baptist Health South Florida, Cleveland Clinic Florida (Weston), and Jackson Health System all have women\'s health departments with menopause expertise.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there Spanish-speaking menopause specialists in Miami?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Miami has one of the highest concentrations of Spanish-speaking OB/GYNs and women\'s health practitioners in the country. Many providers in Hialeah, Doral, Coral Way, and Little Havana offer menopause consultations entirely in Spanish, including HRT discussion and follow-up. Several Aventura and Brickell practices also have bilingual staff. Use the language filter in this directory if Spanish-language care is important to you.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does Florida require insurance to cover menopause care?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Florida does not have a state mandate specifically for menopause care beyond federal ACA requirements. ACA Section 2713 requires most non-grandfathered health plans to cover preventive women\'s health services including OB/GYN visits at no cost-sharing. Florida Blue (BCBS), UnitedHealthcare, Aetna, Cigna, and Florida Medicaid all cover OB/GYN visits. Specific HRT medication coverage depends on your plan\'s drug formulary — confirm coverage before prescribing.",
        },
      },
      {
        '@type': 'Question',
        name: 'What about menopause care in Fort Lauderdale or Aventura?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "The greater Miami-Fort Lauderdale corridor is well-served for menopause care. Broward Health (Fort Lauderdale) and Memorial Healthcare System (Hollywood, Miramar) both have women\'s health programs. Aventura has a high concentration of concierge medicine and private OB/GYN practices serving an affluent patient population. This directory includes providers across Miami-Dade and Broward counties.",
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
          <Link href="/listings?state=FL" className="hover:text-gray-600">Florida</Link>
          <span>/</span>
          <span className="text-gray-600">Miami</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Miami, FL</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Find a Menopause Doctor in Miami, FL
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Miami has a large, culturally diverse Latin American and Caribbean patient population with strong demand for Spanish-speaking menopause specialists. The region's hot, humid climate can amplify hot flash and sweating symptoms, making effective hormone management more important. Jackson Health System, Baptist Health South Florida, and Cleveland Clinic Florida all have active women's health programs serving the greater Miami metro.
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
                Menopause Specialists in Miami, FL
              </h2>
              <Link
                href="/listings?state=FL"
                className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
                See all Florida providers <ArrowRight className="h-4 w-4" />
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
            <p className="text-gray-500 mb-4">Search menopause specialists in Miami below.</p>
            <Link href="/listings?state=FL" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search Florida Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in Miami
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Florida Menopause Providers</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=FL" className="text-sm text-pink-600 hover:text-pink-700 font-medium">All Florida Providers →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/categories/telehealth-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Telehealth Menopause Care →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT Doctor →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
