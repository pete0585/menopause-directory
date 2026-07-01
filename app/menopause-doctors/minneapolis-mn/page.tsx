import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find a Menopause Doctor in Minneapolis, MN | Menopause Directory',
  description:
    'Find menopause specialists, HRT prescribers, and MSCP-certified practitioners in Minneapolis, Minnesota. Serving Saint Paul, Edina, Minnetonka, and the Twin Cities metro. Telehealth available.',
  openGraph: {
    title: 'Find a Menopause Doctor in Minneapolis, MN',
    description:
      'Find menopause specialists and HRT-friendly doctors in Minneapolis, MN. MSCP-certified, telehealth available.',
  },
}

async function getMinneapolisListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('city', ['Minneapolis', 'Saint Paul', 'Edina', 'Minnetonka', 'Plymouth', 'Bloomington', 'Maple Grove'])
    .eq('state', 'MN')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function MinneapolisMenopausePage() {
  const listings = await getMinneapolisListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in Minneapolis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers in the Minneapolis-Saint Paul metro. Minneapolis is served by M Health Fairview (University of Minnesota) and Hennepin Healthcare for academic medical care, and by HealthPartners (including Park Nicollet) as the dominant integrated health system. Mayo Clinic's menopause specialists are 85 miles away in Rochester — many Minneapolis patients see Mayo for complex hormonal issues. For dedicated menopause consultation, private OB/GYNs and functional medicine practitioners throughout the Twin Cities often provide more focused, longer appointments.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does HealthPartners or Park Nicollet treat menopause in Minneapolis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. HealthPartners and its Park Nicollet clinics have women's health departments that include OB/GYNs experienced in perimenopause and menopause management. M Health Fairview (University of Minnesota) and Allina Health are the other major systems with women's health programs across the metro. For women seeking MSCP-certified or menopause-specialist care with dedicated appointment time, this directory also lists independent practitioners who specialize in hormone management.",
        },
      },
      {
        '@type': 'Question',
        name: 'What HRT options are available in Minnesota?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "All standard hormone therapy options are available in Minnesota — estradiol patches, gels, sprays, and oral forms; micronized progesterone (Prometrium); and testosterone. Minnesota has one of the higher rates of hormone therapy prescription in the Midwest, reflecting a healthcare system and patient population with relatively high health literacy. Bioidentical hormone therapy (BHRT) through both FDA-approved formulations and compounding pharmacies is available from functional medicine and integrative medicine practices throughout the Twin Cities.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does insurance cover menopause treatment in Minnesota?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Blue Cross Blue Shield of Minnesota, HealthPartners, Medica, UCare, and PreferredOne — the major Minnesota health insurers — typically cover OB/GYN visits including menopause consultations. Coverage for specific hormone therapy medications depends on your formulary; most plans cover standard FDA-approved forms. Minnesota Medicaid (Medical Assistance, through managed care plans) covers OB/GYN visits. Confirm specific HRT coverage with your plan before scheduling.",
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
          <Link href="/listings?state=MN" className="hover:text-gray-600">Minnesota</Link>
          <span>/</span>
          <span className="text-gray-600">Minneapolis</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Minneapolis, MN</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Find a Menopause Doctor in Minneapolis, MN
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Minneapolis women seeking menopause care have strong options across the Twin Cities —
            from HealthPartners and Park Nicollet to M Health Fairview (University of Minnesota)
            and Allina Health. Mayo Clinic&apos;s menopause specialists are 85 miles south in Rochester,
            drawing patients from across the state. Minnesota has one of the highest rates of hormone
            therapy prescription in the Midwest, and the Twin Cities has a well-developed community
            of OB/GYNs and functional medicine practitioners experienced in perimenopause care.
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
                Menopause Specialists in Minneapolis, MN
              </h2>
              <Link
                href="/listings?state=MN"
                className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
                See all Minnesota providers <ArrowRight className="h-4 w-4" />
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
            <p className="text-gray-500 mb-4">Search menopause specialists in Minneapolis below.</p>
            <Link href="/listings?state=MN" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search Minnesota Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in Minneapolis
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Minnesota Menopause Providers</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=MN" className="text-sm text-pink-600 hover:text-pink-700 font-medium">All Minnesota Providers →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/categories/telehealth-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Telehealth Menopause Care →</Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-pink-600 hover:text-pink-700 font-medium">How to Find an HRT Doctor →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
