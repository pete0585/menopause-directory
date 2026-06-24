import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Menopause Doctors in Pittsburgh, PA — Find HRT Specialists | MenopauseDirectory.co',
  description:
    'Find menopause specialists, MSCP-certified practitioners, and HRT prescribers in Pittsburgh, Pennsylvania. 50+ providers listed. Telehealth available.',
  openGraph: {
    title: 'Menopause Doctors in Pittsburgh, PA',
    description:
      'Find menopause specialists and HRT-friendly doctors in Pittsburgh, PA. UPMC and Allegheny Health Network affiliates. MSCP-certified options.',
  },
}

async function getPittsburghListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('city', ['Pittsburgh', 'Monroeville', 'Bethel Park', 'Mt. Lebanon', 'Cranberry Township'])
    .eq('state', 'PA')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function PittsburghMenopausePage() {
  const listings = await getPittsburghListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Pittsburgh who prescribes HRT?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Pittsburgh has exceptional academic medical resources for menopause care. UPMC Magee-Womens Hospital is one of the leading women's health centers in the country and has dedicated menopause specialists. Allegheny Health Network's women's health division also has experienced HRT prescribers. Use MenopauseDirectory.co to filter by HRT prescribers and MSCP certification.",
        },
      },
      {
        '@type': 'Question',
        name: 'Are there MSCP-certified menopause practitioners in Pittsburgh?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Pittsburgh's concentration of academic medical systems — particularly UPMC and West Penn Hospital — supports a strong community of MSCP-certified practitioners. Magee-Womens Hospital has historically been a national leader in menopause research and treatment, which elevates the quality of menopause care across the Pittsburgh market.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does UPMC cover menopause treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "UPMC Health Plan and most commercial insurers in Pennsylvania — Highmark BCBS, Aetna, UnitedHealthcare, and UPMC Health Plan — cover OB-GYN visits and menopause consultations. Prescription HRT coverage depends on your specific plan formulary. UPMC Magee has providers within the UPMC Health Plan network, which simplifies billing for many Pittsburgh patients.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I access telehealth menopause care in Pittsburgh?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Pennsylvania has flexible telehealth rules, and both UPMC and independent practices offer video appointments for menopause consultations and hormone follow-up. Telehealth is helpful for patients in the outer Pittsburgh suburbs — Butler, Canonsburg, McMurray, and Washington, PA — where specialist access is more limited.",
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
          <span className="text-gray-600">Pittsburgh, PA</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Pittsburgh, PA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Menopause Doctors in Pittsburgh, PA
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Pittsburgh is home to UPMC Magee-Womens Hospital — one of the top women&apos;s health
            institutions in the United States — which has shaped the quality of menopause care across
            the entire Western Pennsylvania region. Whether you seek hormone therapy through a UPMC
            specialist, an Allegheny Health Network provider, or an independent integrative women&apos;s
            health practice, Pittsburgh has experienced menopause practitioners across the city and
            its surrounding communities.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '50+'} providers listed</span>
            <span>·</span>
            <span>UPMC &amp; AHN affiliates</span>
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
                Menopause Specialists in Pittsburgh, PA
              </h2>
              <Link
                href="/listings?city=Pittsburgh&state=PA"
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
            <p className="text-gray-500 mb-4">Search menopause specialists in Pittsburgh below.</p>
            <Link href="/listings?city=Pittsburgh&state=PA" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search Pittsburgh Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in Pittsburgh
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Pennsylvania Menopause Providers</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=PA" className="text-sm text-pink-600 hover:text-pink-700 font-medium">All Pennsylvania Providers →</Link>
            <Link href="/guides/bioidentical-vs-conventional-hrt" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Bioidentical vs. Conventional HRT →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/categories/hrt-doctors" className="text-sm text-pink-600 hover:text-pink-700 font-medium">HRT Prescribers →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
