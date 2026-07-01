import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find a Menopause Doctor in Salt Lake City, UT | Menopause Directory',
  description:
    'Find menopause specialists, HRT prescribers, and MSCP-certified practitioners in Salt Lake City, Utah. Serving Murray, Sandy, West Jordan, and the greater SLC metro. Telehealth available.',
  openGraph: {
    title: 'Find a Menopause Doctor in Salt Lake City, UT',
    description:
      'Find menopause specialists and HRT-friendly doctors in Salt Lake City, UT. MSCP-certified, telehealth available.',
  },
}

async function getSaltLakeListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('city', ['Salt Lake City', 'Murray', 'Sandy', 'West Jordan', 'South Jordan', 'Taylorsville', 'Midvale'])
    .eq('state', 'UT')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function SaltLakeCityMenopausePage() {
  const listings = await getSaltLakeListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Salt Lake City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to find HRT-prescribing providers in the Salt Lake City metro. Utah's largest health systems — Intermountain Health and the University of Utah Health — both have women's health programs with OB/GYNs who manage menopause and perimenopause. For more focused, dedicated menopause consultation, private OB/GYNs and functional medicine practitioners throughout the Salt Lake valley often provide longer appointment times and more specialized expertise.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is unique about menopause care in Utah?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Utah has the highest birth rate of any US state, driven in part by strong cultural values around family. This also means many Utah women have a different menopausal experience — entering menopause after larger families, sometimes at a later age, and sometimes having had more prolonged estrogen exposure from multiple pregnancies. Utah's altitude (Salt Lake City sits at 4,300 feet) can influence sleep quality, and altitude-related sleep issues may compound menopause insomnia and night sweats for some women. Discussing your full medical and reproductive history with your menopause provider is important.",
        },
      },
      {
        '@type': 'Question',
        name: 'What HRT options are available in Salt Lake City?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "All standard hormone therapy formulations are available in Salt Lake City — estradiol patches, gels, sprays, and oral preparations; micronized progesterone (Prometrium); and testosterone. Bioidentical hormone therapy through FDA-approved products and compounding pharmacies is available through functional medicine and integrative medicine practices in the SLC metro. Intermountain Health's pharmacy network and University of Utah Health pharmacies can fill standard HRT prescriptions.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does insurance cover menopause treatment in Utah?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "SelectHealth (the Intermountain Health insurance plan), DMBA (Deseret Mutual Benefit Administrators — widely used by LDS Church employees), BCBS of Utah, UnitedHealthcare, and Cigna typically cover OB/GYN visits including menopause consultations. Coverage for hormone therapy medications depends on your specific formulary. Utah Medicaid (through managed care plans) covers OB/GYN visits. Confirm specific HRT medication coverage with your insurer before scheduling.",
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
          <Link href="/listings?state=UT" className="hover:text-gray-600">Utah</Link>
          <span>/</span>
          <span className="text-gray-600">Salt Lake City</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Salt Lake City, UT</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Find a Menopause Doctor in Salt Lake City, UT
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Salt Lake City is home to two major health systems with strong women&apos;s health programs —
            Intermountain Health and the University of Utah Health. Utah&apos;s high birth rate and
            large-family culture creates a distinct menopause context: many Utah women enter
            perimenopause after larger families and benefit from providers who understand
            their unique reproductive history. This directory lists HRT-prescribing specialists
            throughout Salt Lake City, Murray, Sandy, West Jordan, and surrounding areas.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '30+'} providers listed</span>
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
                Menopause Specialists in Salt Lake City, UT
              </h2>
              <Link
                href="/listings?state=UT"
                className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
                See all Utah providers <ArrowRight className="h-4 w-4" />
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
            <p className="text-gray-500 mb-4">Search menopause specialists in Salt Lake City below.</p>
            <Link href="/listings?state=UT" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search Utah Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in Salt Lake City
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Utah Menopause Providers</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=UT" className="text-sm text-pink-600 hover:text-pink-700 font-medium">All Utah Providers →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/categories/telehealth-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Telehealth Menopause Care →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT Doctor →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
