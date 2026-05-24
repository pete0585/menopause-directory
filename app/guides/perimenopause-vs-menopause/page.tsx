import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Perimenopause vs. Menopause: Symptoms, Differences, and When to See a Doctor | MenopauseDirectory.co',
  description:
    'What\'s the difference between perimenopause and menopause? Learn how to tell which stage you\'re in, what symptoms to expect, and when to see a specialist.',
  openGraph: {
    title: 'Perimenopause vs. Menopause: What\'s the Difference?',
    description:
      'Perimenopause can start 8–10 years before your last period. Menopause is one day. Here\'s what distinguishes them and what to do about each.',
  },
}

const faqData = [
  {
    q: 'What is perimenopause?',
    a: 'Perimenopause is the transitional phase leading up to menopause — when estrogen levels begin to fluctuate and decline. It can start as early as your mid-30s and typically lasts 4–10 years. During perimenopause, you still have periods but they may become irregular. Symptoms include hot flashes, sleep disruption, mood changes, brain fog, irregular bleeding, and vaginal dryness. You can still get pregnant during perimenopause.',
  },
  {
    q: 'What is menopause?',
    a: 'Menopause is technically a single day — the 12-month anniversary of your last menstrual period. After that day, you are considered postmenopausal. The average age of menopause in the US is 51, but the range is 45–55. Surgical menopause (after having ovaries removed) occurs immediately after surgery, at whatever age.',
  },
  {
    q: 'How do I know if I\'m in perimenopause?',
    a: 'Classic signs include: irregular periods (longer cycles, shorter cycles, missed periods), hot flashes, night sweats, sleep problems, mood swings, and increased anxiety. A blood test (FSH and estradiol) can suggest perimenopause but isn\'t definitive because hormone levels fluctuate so much. A doctor\'s assessment — looking at your age, symptoms, and cycle history — is more useful than labs alone.',
  },
  {
    q: 'Can I get HRT during perimenopause?',
    a: 'Yes. HRT is not only for postmenopause. Many women start HRT in perimenopause to manage symptoms that are already disruptive. Perimenopausal HRT also provides contraception in some forms. A menopause-knowledgeable provider can explain the options — hormonal birth control, low-dose HRT, and other approaches all have different risk-benefit profiles for perimenopausal women.',
  },
  {
    q: 'What is "surgical menopause" and why is it different?',
    a: 'Surgical menopause occurs when both ovaries are removed (bilateral oophorectomy) regardless of age. Unlike natural menopause — which is a gradual decline in estrogen over years — surgical menopause is immediate and abrupt. Estrogen drops to nearly zero within days. This sudden drop is associated with more severe symptoms and, in women under 45, with higher cardiovascular and bone health risks. Women with surgical menopause typically need more aggressive management.',
  },
]

export default function PerimenopauseVsMenopausePage() {
  const jsonLd = {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          {' › '}
          <Link href="/listings" className="hover:text-gray-600">Guides</Link>
          {' › '}
          <span className="text-gray-600">Perimenopause vs. Menopause</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight sm:text-5xl text-balance">
            Perimenopause vs. Menopause: What's the Difference?
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Perimenopause can last a decade. Menopause is one day. Understanding which stage you're in
            matters for how you treat it — and who you need to see.
          </p>
        </header>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          {/* Quick table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-brand-plum/10 text-brand-plum">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-left p-4 font-semibold">Perimenopause</th>
                  <th className="text-left p-4 font-semibold">Menopause</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Definition', 'Transition phase', '12 months after last period'],
                  ['Duration', '4–10 years', 'One specific day'],
                  ['Periods', 'Irregular but present', 'None for 12+ months'],
                  ['Fertility', 'Reduced but possible', 'Very unlikely'],
                  ['Average age', 'Mid-40s start', '51 (US average)'],
                  ['Hormone levels', 'Fluctuating estrogen', 'Consistently low estrogen'],
                  ['Key symptoms', 'Hot flashes, irregular cycles, mood changes', 'Hot flashes, vaginal dryness, sleep disruption'],
                ].map(([feature, peri, meno]) => (
                  <tr key={feature} className="bg-white">
                    <td className="p-4 font-medium text-gray-700">{feature}</td>
                    <td className="p-4 text-gray-600">{peri}</td>
                    <td className="p-4 text-gray-600">{meno}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              The Confusing Middle: Why Perimenopause Is Hard to Diagnose
            </h2>
            <p>
              Perimenopause is a moving target. Estrogen doesn't decline linearly — it fluctuates wildly,
              sometimes spiking higher than normal before dropping. This produces symptoms that seem random:
              a week of severe hot flashes, then two weeks of feeling normal, then crushing fatigue. Labs may
              show "normal" estrogen on the day of the test while symptoms are undeniable.
            </p>
            <p className="mt-3">
              This is why many women in perimenopause are dismissed. Their labs don't match their experience
              because standard labs aren't designed to capture a moving target. A provider who understands
              menopause knows to rely more on clinical presentation than a single hormone value.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Postmenopause: What Comes After
            </h2>
            <p>
              After the official menopause day (12 consecutive months without a period), you are postmenopausal
              for the rest of your life. Many women find that the most intense symptoms — hot flashes, sleep
              disruption — begin to improve in the years after menopause, though they can persist for a decade
              or more. Vaginal dryness and pelvic floor changes tend to be progressive without treatment.
            </p>
            <p className="mt-3">
              Postmenopause is also when the long-term health implications of estrogen loss become important:
              cardiovascular risk increases, bone density decline accelerates, and cognitive changes may occur.
              This is why the decision about HRT — ideally made early in the transition — matters beyond just
              symptom relief.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              When to See a Menopause Specialist
            </h2>
            <p>
              See a specialist (not just your GP) if:
            </p>
            <ul className="space-y-2 mt-3">
              {[
                'Your symptoms are affecting sleep, work, or relationships',
                'You\'ve been dismissed with "your labs are normal"',
                'You want to discuss HRT and your current doctor won\'t prescribe it',
                'You have unusual symptoms or a complex medical history (POI, surgical menopause, cancer history)',
                'You\'re having heavy or irregular bleeding that hasn\'t been explained',
                'You\'re under 45 and having menopausal symptoms',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-brand-rose mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 bg-brand-plum/10 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-plum mb-3">
            Find a doctor who takes this seriously
          </h2>
          <p className="text-gray-600 mb-6">
            Search for menopause specialists, MSCP-certified practitioners, and HRT prescribers near you.
          </p>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-8 py-3 font-semibold hover:bg-brand-plum/90 transition-colors"
          >
            Find a Menopause Specialist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq) => (
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

        <div className="mt-12 pt-8 border-t border-gray-100">
          <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">More Guides</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-brand-plum hover:underline font-medium">
              How to Find an HRT-Friendly Doctor →
            </Link>
            <Link href="/guides/what-is-mscp" className="text-sm text-brand-plum hover:underline font-medium">
              What is an MSCP? →
            </Link>
            <Link href="/categories/certified-menopause-practitioner" className="text-sm text-brand-plum hover:underline font-medium">
              Find MSCP-Certified Practitioners →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
