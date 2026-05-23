import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing, PractitionerType } from '@/lib/types'

interface CategoryConfig {
  title: string
  h1: string
  description: string
  metaDescription: string
  filters: {
    practitioner_type?: PractitionerType
    mscp_certified?: boolean
    accepts_telehealth?: boolean
  }
  faq?: { q: string; a: string }[]
}

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  'certified-menopause-practitioner': {
    title: 'MSCP Certified Practitioners',
    h1: 'Find a Certified Menopause Practitioner (MSCP)',
    description:
      'MSCP stands for Menopause Society Certified Practitioner — the gold-standard credential awarded by The Menopause Society. These practitioners have passed a rigorous exam and demonstrate advanced knowledge in menopause management.',
    metaDescription:
      'Find MSCP-certified menopause practitioners near you. The Menopause Society Certified Practitioner credential is the gold standard for menopause care.',
    filters: { mscp_certified: true },
    faq: [
      {
        q: 'What is a Certified Menopause Practitioner (MSCP)?',
        a: 'An MSCP is a healthcare provider who has earned certification from The Menopause Society by passing a comprehensive exam on menopause management, including HRT, symptom management, cardiovascular risk, and bone health.',
      },
      {
        q: 'Why should I see an MSCP-certified provider?',
        a: 'MSCP-certified providers have demonstrated expertise specifically in menopause care. Many general OB-GYNs and primary care doctors have limited training in menopause — an MSCP has invested in specialized knowledge.',
      },
      {
        q: 'Do MSCPs prescribe HRT?',
        a: 'Most MSCP-certified providers can prescribe HRT, but this varies by license type (MD, DO, NP, PA). Use the "Prescribes HRT" filter on our search page to find providers who specifically offer hormone therapy.',
      },
    ],
  },
  'obgyn-menopause': {
    title: 'OB-GYN Menopause Specialists',
    h1: 'Find an OB-GYN Who Specializes in Menopause',
    description:
      'Not every OB-GYN will take menopause seriously. These gynecologists have specifically indicated expertise in perimenopause and menopause care — including hormone therapy, surgical menopause, and premature ovarian insufficiency.',
    metaDescription:
      'Find OB-GYNs who specialize in menopause and HRT. Filter for MSCP-certified, HRT-prescribing gynecologists near you.',
    filters: { practitioner_type: 'obgyn' },
  },
  'pelvic-floor-therapist': {
    title: 'Pelvic Floor Therapists',
    h1: 'Find a Pelvic Floor Physical Therapist for Menopause',
    description:
      'Pelvic floor physical therapists are specialists in the muscles, connective tissue, and nerves of the pelvic region. During and after menopause, decreased estrogen can cause genitourinary syndrome of menopause (GSM) — pelvic floor PT can significantly improve quality of life.',
    metaDescription:
      'Find pelvic floor physical therapists who specialize in menopause, GSM (genitourinary syndrome of menopause), and post-menopausal pelvic health.',
    filters: { practitioner_type: 'pelvic_floor_pt' },
    faq: [
      {
        q: 'What is genitourinary syndrome of menopause (GSM)?',
        a: 'GSM is a collection of symptoms caused by declining estrogen, including vaginal dryness, pain during sex, urinary urgency, and pelvic discomfort. Pelvic floor PT is a first-line treatment for GSM.',
      },
      {
        q: 'What does pelvic floor therapy for menopause involve?',
        a: 'Treatment typically includes manual therapy, biofeedback, and home exercises to strengthen or relax the pelvic floor, reduce pain, improve bladder control, and address sexual health concerns.',
      },
    ],
  },
  'functional-medicine': {
    title: 'Functional Medicine Practitioners',
    h1: 'Find a Functional Medicine Doctor for Menopause',
    description:
      'Functional medicine practitioners take a root-cause approach to menopause, addressing hormone balance, gut health, sleep, stress, and nutrition as a whole system. Many offer both bioidentical hormone therapy and lifestyle-based approaches.',
    metaDescription:
      'Find functional medicine and integrative medicine practitioners who specialize in menopause, bioidentical hormones, and whole-body hormone balance.',
    filters: { practitioner_type: 'functional_medicine' },
  },
  'menopause-coach': {
    title: 'Menopause Coaches',
    h1: 'Find a Certified Menopause Coach',
    description:
      'Menopause coaches provide education, lifestyle guidance, and support for women navigating perimenopause and menopause. They fill the gap that medical appointments can\'t — consistent, personalized support for symptoms, mindset, nutrition, and lifestyle.',
    metaDescription:
      'Find certified menopause coaches for lifestyle support, symptom management, and personalized guidance through perimenopause and menopause.',
    filters: { practitioner_type: 'coach' },
  },
  telehealth: {
    title: 'Telehealth Menopause Specialists',
    h1: 'Find a Menopause Specialist Available by Telehealth',
    description:
      'No good menopause specialist in your area? Telehealth changes everything. These practitioners see patients virtually — often nationwide — so geography is no longer a barrier to finding a doctor who actually understands menopause.',
    metaDescription:
      'Find menopause specialists available via telehealth. See an HRT-prescribing doctor, MSCP-certified practitioner, or menopause coach online — available nationwide.',
    filters: { accepts_telehealth: true },
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getListings(filters: CategoryConfig['filters']): Promise<Listing[]> {
  const supabase = createClient()
  let query = supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(30)

  if (filters.practitioner_type) {
    query = query.eq('practitioner_type', filters.practitioner_type)
  }
  if (filters.mscp_certified) {
    query = query.eq('mscp_certified', true)
  }
  if (filters.accepts_telehealth) {
    query = query.eq('accepts_telehealth', true)
  }

  const { data } = await query
  return (data as Listing[]) ?? []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const config = CATEGORY_CONFIG[slug]
  if (!config) return { title: 'Not Found' }
  return {
    title: config.title,
    description: config.metaDescription,
    openGraph: {
      title: config.title,
      description: config.metaDescription,
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const config = CATEGORY_CONFIG[slug]
  if (!config) notFound()

  const listings = await getListings(config.filters)

  const faqStructuredData = config.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: config.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null

  return (
    <>
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            {' › '}
            <span className="text-gray-600">{config.title}</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {config.h1}
          </h1>
          <p className="text-gray-600 leading-relaxed">{config.description}</p>
        </div>

        {/* Listings */}
        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-6">
            {listings.length} {listings.length === 1 ? 'provider' : 'providers'} found
          </p>
          {listings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 mb-4">No listings in this category yet.</p>
              <Link href="/submit" className="text-brand-plum font-medium hover:underline">
                Know a specialist? Add them →
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>

        {/* FAQ */}
        {config.faq && config.faq.length > 0 && (
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {config.faq.map((item, i) => (
                <details key={i} className="bg-white rounded-xl border border-gray-100 p-5 group">
                  <summary className="font-medium text-gray-900 cursor-pointer list-none flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-brand-plum text-lg group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed text-sm">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
