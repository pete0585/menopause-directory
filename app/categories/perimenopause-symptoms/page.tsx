import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Perimenopause Symptoms: When to See a Doctor | Menopause Directory',
  description:
    'Hot flashes, irregular periods, night sweats, mood changes, brain fog — perimenopause symptoms can begin in the mid-40s and earlier. Find a menopause-literate provider who can help.',
  openGraph: {
    title: 'Perimenopause Symptoms: When to See a Doctor',
    description:
      'Perimenopause symptoms range from mild to severely disruptive. Find a menopause-literate specialist who can help.',
  },
}

async function getPerimenoListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(9)
  return (data as Listing[]) ?? []
}

const faqData = [
  {
    q: 'What are the most common perimenopause symptoms?',
    a: "The most commonly reported perimenopause symptoms are: irregular periods (the hallmark early sign), hot flashes, night sweats, sleep disruption, mood changes (anxiety, irritability, low mood), brain fog (difficulty concentrating, word-finding), joint pain and stiffness, vaginal dryness and discomfort, and decreased libido. Symptoms vary widely — some women experience mild, intermittent symptoms; others find perimenopause significantly disrupts daily life and work. Both experiences are valid, and both warrant care.",
  },
  {
    q: 'How early can perimenopause symptoms start?',
    a: "Perimenopause typically begins in the mid-to-late 40s — average onset in the US is around age 47-48, with menopause occurring at average age 51. However, some women experience perimenopause symptoms in their early 40s or even late 30s. Premature Ovarian Insufficiency (POI), sometimes called premature menopause, can cause menopausal symptoms before age 40 and affects approximately 1% of women. If you are under 45 with suspected menopause symptoms, early evaluation is important.",
  },
  {
    q: 'Do perimenopause symptoms require treatment?',
    a: "Not always — mild symptoms that don't significantly affect quality of life may not need treatment. But symptoms that disrupt sleep, work, relationships, or daily function are absolutely worth treating. The North American Menopause Society (NAMS) guidelines support hormonal and non-hormonal treatment for perimenopause symptoms in appropriate candidates, and growing evidence supports the benefits of early hormone therapy initiation. You do not have to 'just push through' perimenopause.",
  },
  {
    q: 'What kind of doctor treats perimenopause?',
    a: "OB/GYNs are the most common providers for perimenopause care. Certified Menopause Practitioners (CMPs) — certified by NAMS — have completed additional training specifically in menopause management. Internal medicine and family medicine physicians, nurse practitioners, and functional medicine providers may also offer perimenopause care. This directory filters for menopause-literate providers across all specialties — use it to find a practitioner who takes perimenopause seriously in your area.",
  },
]

export default async function PerimenopauseSymptomsPage() {
  const listings = await getPerimenoListings()

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
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
          <span className="text-gray-600">Perimenopause Symptoms</span>
        </nav>

        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-10">
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Perimenopause Symptoms: When to See a Doctor
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
            Perimenopause symptoms range from mild and occasional to severe and life-disrupting. The
            most common — irregular periods, hot flashes, night sweats, sleep disruption, mood changes,
            brain fog, joint pain, and vaginal dryness — can begin in the mid-to-late 40s, and sometimes
            earlier. Many women dismiss these symptoms for years without treatment because they don&apos;t
            realize perimenopause can begin well before periods stop. This directory connects you with
            menopause-literate providers trained in perimenopause management.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>{listings.length > 0 ? `${listings.length}+` : '500+'} providers listed</span>
            <span>·</span>
            <span>OB/GYNs and NAMS CMPs</span>
            <span>·</span>
            <span>Hormonal and non-hormonal options</span>
            <span>·</span>
            <span>Telehealth available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
                Common perimenopause symptoms
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { symptom: 'Irregular periods', note: 'Often the first sign — cycles become shorter, longer, or unpredictable' },
                  { symptom: 'Hot flashes', note: 'Sudden heat with flushing; affect 75-80% of women in perimenopause' },
                  { symptom: 'Night sweats', note: 'Hot flashes during sleep; can severely fragment sleep quality' },
                  { symptom: 'Mood changes', note: 'Anxiety, irritability, and low mood — driven by hormonal fluctuations' },
                  { symptom: 'Brain fog', note: 'Word-finding difficulty, concentration issues, memory lapses' },
                  { symptom: 'Joint pain', note: 'Aching joints and stiffness — often linked to declining estrogen' },
                  { symptom: 'Sleep disruption', note: 'Independent of night sweats; insomnia is common in perimenopause' },
                  { symptom: 'Vaginal dryness', note: 'Genitourinary syndrome of menopause — affects comfort and intimacy' },
                ].map(({ symptom, note }) => (
                  <div key={symptom} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="font-semibold text-gray-800 text-sm">{symptom}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
                Why perimenopause goes undiagnosed
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Many women attribute perimenopause symptoms to stress, aging, or other causes for years
                before connecting them to hormonal changes. Irregular periods in the mid-40s may be
                attributed to a busy schedule. Brain fog and anxiety may be treated as standalone mental
                health concerns. Joint pain may go to a rheumatologist. Sleep problems to a sleep specialist.
              </p>
              <p className="text-gray-600 leading-relaxed">
                A menopause-literate provider sees the full picture — connecting symptoms that seem
                unrelated to their underlying hormonal cause. If you are in your 40s and experiencing
                several of these symptoms together, a dedicated menopause consultation is worth pursuing.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
                Premature Ovarian Insufficiency (POI)
              </h2>
              <p className="text-gray-600 leading-relaxed">
                POI — sometimes called premature menopause — occurs when the ovaries lose normal
                function before age 40. It affects approximately 1% of women and causes menopausal
                symptoms including irregular or absent periods, hot flashes, and vaginal dryness at
                an unexpectedly early age. POI is a distinct medical condition with implications for
                bone health, cardiovascular health, and fertility — and it requires evaluation beyond
                standard menopause management. If you are under 40 with suspected menopausal symptoms,
                early evaluation is important.
              </p>
            </section>
          </div>

          <div className="space-y-5">
            <div className="bg-pink-50 rounded-xl border border-pink-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-3">Treatment options for perimenopause</h3>
              <ul className="space-y-2">
                {[
                  { option: 'Hormone therapy (HRT)', note: 'Most effective for vasomotor symptoms and overall quality of life' },
                  { option: 'Low-dose hormonal contraceptives', note: 'Commonly used in perimenopause to manage irregular cycles' },
                  { option: 'Non-hormonal prescriptions', note: 'Fezolinetant (Veozah), SSNRIs, gabapentin for hot flashes' },
                  { option: 'Vaginal estrogen', note: 'Local treatment for dryness and discomfort; minimal systemic absorption' },
                  { option: 'CBT and lifestyle', note: 'Cognitive behavioral therapy and exercise have evidence for mood and sleep' },
                ].map(({ option, note }) => (
                  <li key={option} className="text-sm">
                    <span className="font-medium text-gray-800">{option}</span>
                    <span className="text-gray-500"> — {note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/listings"
              className="inline-flex w-full items-center justify-center gap-2 bg-pink-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-pink-700"
            >
              Browse All Providers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-gray-800">
                Find a Perimenopause Specialist
              </h2>
              <Link href="/listings" className="flex items-center gap-1 text-sm font-semibold text-pink-500 hover:text-pink-600">
                See all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800">Common Questions</h2>
          {faqData.map((faq) => (
            <div key={faq.q} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Related</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
            <Link href="/guides/menopause-brain-fog" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Menopause Brain Fog →</Link>
            <Link href="/guides/menopause-weight-gain" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Menopause and Weight Gain →</Link>
            <Link href="/categories/telehealth-menopause" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Telehealth Menopause Care →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
