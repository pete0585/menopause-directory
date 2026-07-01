import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find a Menopause Doctor in New Orleans, LA | Menopause Directory',
  description:
    'Find menopause specialists, HRT prescribers, and MSCP-certified practitioners in New Orleans, Louisiana. Serving Metairie, Kenner, Gretna, and the greater NOLA area. Telehealth available.',
  openGraph: {
    title: 'Find a Menopause Doctor in New Orleans, LA',
    description:
      'Find menopause specialists and HRT-friendly doctors in New Orleans, LA. MSCP-certified, telehealth available.',
  },
}

async function getNewOrleansListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('city', ['New Orleans', 'Metairie', 'Kenner', 'Gretna', 'Slidell', 'Chalmette'])
    .eq('state', 'LA')
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(12)
  return (data as Listing[]) ?? []
}

export default async function NewOrleansMenopausePage() {
  const listings = await getNewOrleansListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a menopause specialist in New Orleans?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Use MenopauseDirectory.co to search for HRT-prescribing providers in the New Orleans metro. The city's healthcare landscape includes Tulane Medical Center, Ochsner Health System (the dominant regional health system), and University Medical Center — all of which have women's health departments. For menopause-specific expertise, private OB-GYNs and functional medicine practitioners throughout Metairie, Kenner, and the greater NOLA area often provide more dedicated time for hormone management.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does Ochsner Health treat menopause in Louisiana?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Ochsner Health is the largest health system in Louisiana and has women's health and menopause-experienced specialists across its network of hospitals and clinics. Ochsner has locations throughout Orleans, Jefferson, and St. Tammany parishes. For patients seeking MSCP-certified or menopause-specialist care, this directory also lists independent women's health practices that offer dedicated menopause consultations.",
        },
      },
      {
        '@type': 'Question',
        name: 'What HRT options are available in Louisiana?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "All standard hormone therapy forms are available in Louisiana — estradiol patches, gels, sprays, and pills; progesterone (Prometrium); and testosterone. Bioidentical hormone replacement therapy (BHRT) is also available through functional medicine and integrative health practices throughout the New Orleans metro. Louisiana's subtropical climate can make vasomotor symptoms like hot flashes feel more intense, which is a common motivator for women in the region to seek treatment.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does insurance cover menopause treatment in Louisiana?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "BlueCross BlueShield of Louisiana, UnitedHealthcare, and Aetna typically cover OB-GYN visits including menopause consultations. Coverage for specific HRT medications depends on your formulary. Louisiana Medicaid (Healthy Louisiana) covers OB-GYN visits through managed care plans including Aetna Better Health, Healthy Blue, and Louisiana Healthcare Connections. Confirm with your specific plan before scheduling.",
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
          <Link href="/listings?state=LA" className="hover:text-gray-600">Louisiana</Link>
          <span>/</span>
          <span className="text-gray-600">New Orleans</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-2 text-pink-500 mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">New Orleans, LA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Find a Menopause Doctor in New Orleans, LA
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            New Orleans has a robust healthcare community anchored by Tulane Medical Center and
            Ochsner Health System. For women navigating perimenopause and menopause, the city&apos;s
            subtropical heat can make vasomotor symptoms like hot flashes and night sweats more
            disruptive — a strong motivation to find a knowledgeable provider who takes your symptoms
            seriously and understands your treatment options. This directory lists HRT-prescribing
            specialists throughout New Orleans, Metairie, Kenner, and surrounding areas.
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
                Menopause Specialists in New Orleans, LA
              </h2>
              <Link
                href="/listings?state=LA"
                className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600"
              >
                See all Louisiana providers <ArrowRight className="h-4 w-4" />
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
            <p className="text-gray-500 mb-4">Search menopause specialists in New Orleans below.</p>
            <Link href="/listings?state=LA" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Search Louisiana Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="space-y-5 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">
            Menopause Care in New Orleans
          </h2>
          {faqLd.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Louisiana Menopause Providers</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/listings?state=LA" className="text-sm text-pink-600 hover:text-pink-700 font-medium">All Louisiana Providers →</Link>
            <Link href="/menopause-doctors/baton-rouge-la" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Baton Rouge Menopause Doctors →</Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/categories/telehealth-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Telehealth Menopause Care →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
