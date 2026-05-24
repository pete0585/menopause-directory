import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What to Expect in Your First 3 Months on HRT | MenopauseDirectory.co',
  description:
    "Starting HRT isn't always smooth in week one. Learn what's normal in each month of adjustment, what to track, and when to call your doctor before your 3-month follow-up.",
  openGraph: {
    title: 'Your First 3 Months on HRT: What to Expect',
    description:
      "Most women don't feel dramatically better in week one of HRT. Here's the adjustment curve — month by month — and what to watch for.",
  },
}

const faqData = [
  {
    q: 'How long does it take for HRT to start working?',
    a: "Most women notice some improvement within 4–6 weeks, but the full effect of HRT often takes 3 months to assess. Sleep tends to improve first, followed by mood and energy. Hot flashes and night sweats typically reduce by weeks 6–8. Brain fog and vaginal dryness may take longer, especially with topical-only estrogen.",
  },
  {
    q: "Is it normal to feel worse before you feel better on HRT?",
    a: "Yes, for some women. The first 2–4 weeks can involve breast tenderness, spotting, or mood fluctuations as your body adjusts to new hormone levels. This is not a sign the HRT is wrong — it's the body recalibrating. Most initial side effects resolve by weeks 4–6.",
  },
  {
    q: 'When should I call my doctor about HRT side effects?',
    a: "Call before your scheduled 3-month check-in if you experience heavy or prolonged vaginal bleeding, severe breast pain, headaches that are worse than usual, chest pain, or leg swelling or pain. These require prompt evaluation — don't wait for your next appointment.",
  },
  {
    q: 'What happens at the 3-month HRT follow-up appointment?',
    a: "Your provider will review how you're responding, ask about symptom changes, and may order labs (estradiol, progesterone levels) to confirm therapeutic ranges. This is the most common time for dose adjustments — titrating up or down, or switching delivery methods (from pill to patch or gel, for example). It is also the right time to raise any concerns you've been monitoring.",
  },
]

export default function HrtFirstThreeMonthsPage() {
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
          <Link href="/listings" className="hover:text-gray-600">Find a Specialist</Link>
          {' › '}
          <span className="text-gray-600">HRT: First 3 Months</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight sm:text-5xl text-balance">
            Your First 3 Months on HRT: What's Normal, What to Watch For
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Starting hormone replacement therapy is rarely a smooth, linear experience. Most women
            don't feel dramatically better in week one. Understanding the adjustment curve — and knowing
            what's normal vs. what needs a call to your doctor — makes the difference between staying
            the course and giving up too soon.
          </p>
        </header>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Month 1: The Adjustment Phase
            </h2>
            <p>
              The first four weeks of HRT are primarily about your body recalibrating to new hormone levels.
              Expect a mixed picture. Some symptoms improve quickly — sleep is often the first to get noticeably
              better, even within the first 2 weeks. Others take longer, and some may temporarily feel slightly
              worse before they stabilize.
            </p>
            <div className="mt-4 space-y-3">
              <div className="bg-brand-plum/5 rounded-xl p-4">
                <p className="font-semibold text-gray-800 mb-1">Common in Month 1 (expected)</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2"><span className="text-brand-plum mt-0.5">•</span>Breast tenderness — often resolves by week 4–6</li>
                  <li className="flex items-start gap-2"><span className="text-brand-plum mt-0.5">•</span>Spotting or light irregular bleeding (if on estrogen + progesterone)</li>
                  <li className="flex items-start gap-2"><span className="text-brand-plum mt-0.5">•</span>Mood fluctuations as levels stabilize</li>
                  <li className="flex items-start gap-2"><span className="text-brand-plum mt-0.5">•</span>Hot flashes may not fully resolve yet — give it 6–8 weeks minimum</li>
                  <li className="flex items-start gap-2"><span className="text-brand-plum mt-0.5">•</span>Sleep often improves first, even before other symptoms</li>
                </ul>
              </div>
              <div className="bg-brand-rose/10 rounded-xl p-4">
                <p className="font-semibold text-gray-800 mb-1">Not normal — call your doctor</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-start gap-2"><span className="text-brand-rose mt-0.5">⚑</span>Heavy bleeding (soaking more than a pad per hour)</li>
                  <li className="flex items-start gap-2"><span className="text-brand-rose mt-0.5">⚑</span>Severe headaches, especially with vision changes</li>
                  <li className="flex items-start gap-2"><span className="text-brand-rose mt-0.5">⚑</span>Leg pain or swelling, particularly if one-sided</li>
                  <li className="flex items-start gap-2"><span className="text-brand-rose mt-0.5">⚑</span>Chest pain or shortness of breath</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Month 2: Starting to Feel the Effect
            </h2>
            <p>
              By weeks 6–8, most women on HRT begin to notice real change. This is when the adjustment
              side effects from Month 1 typically fade and the therapeutic benefits become more consistent.
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Brain fog often lifts noticeably — thinking more clearly, words coming more easily",
                "Hot flashes and night sweats reduce in frequency and intensity",
                "Mood tends to stabilize; many women report feeling more like themselves",
                "Energy improves, particularly if sleep has been better for several weeks",
                "Vaginal dryness starts improving, though topical estrogen may take a bit longer",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-brand-plum mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              If you're at week 6–8 with no meaningful improvement in any symptom, that's worth noting
              and discussing with your provider before month 3 — it may indicate a dose or delivery
              method adjustment is needed rather than simply more time.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Month 3: Your First Follow-Up
            </h2>
            <p>
              Most providers schedule a check-in at or around the 3-month mark. This is not just a
              box-checking appointment — it's an active clinical assessment of how well your current
              regimen is working and whether adjustments are needed.
            </p>
            <div className="mt-4 bg-white rounded-xl border border-gray-100 p-5 space-y-3">
              <p className="font-semibold text-gray-800">What typically happens at 3 months:</p>
              <ul className="space-y-2 text-sm">
                {[
                  "Labs may be ordered — estradiol and progesterone levels to confirm you're in therapeutic range",
                  "Symptom review: which improved, which haven't",
                  "Dose titration if needed — up or down depending on response and labs",
                  "Delivery method discussion — patch vs. pill vs. gel have different absorption profiles",
                  "Discussion of ongoing monitoring schedule (typically every 6–12 months after this)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-brand-plum mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4">
              Don't suffer silently and assume it's just how HRT works for you. HRT is highly adjustable —
              there are many delivery methods, dose levels, and combinations. If something isn't working
              at 3 months, the right response is adjustment, not discontinuation.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              What to Track While You're Adjusting
            </h2>
            <p>
              Keeping a simple symptom diary makes your 3-month appointment far more productive. You don't
              need an app or a spreadsheet — notes in your phone are fine. Track:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Hot flashes: how many per day, what time of day, how severe (1–10)",
                "Sleep: hours, how many wake-ups, quality",
                "Mood and energy: a simple daily rating",
                "Any bleeding: date, duration, color (spotting vs. flow)",
                "Breast tenderness: present or absent, severity",
                "Brain clarity: good days vs. foggy days",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-brand-plum mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Even a week of data before your appointment gives your provider something concrete to work with
              versus relying on memory of a 3-month span.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              When to Call Your Doctor Before Month 3
            </h2>
            <p>
              Most adjustment symptoms can wait for your scheduled follow-up. Some cannot. Call your provider
              before 3 months if you experience:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Unusual, heavy, or prolonged vaginal bleeding",
                "Severe breast pain (not just tenderness)",
                "Headaches significantly worse than your usual",
                "Chest pain or palpitations",
                "Leg swelling or pain — especially if one-sided (can indicate blood clot)",
                "Any symptom that feels acutely wrong or alarming to you",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-brand-rose mt-0.5">⚑</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Blood clots are rare with transdermal estrogen (patches, gels, sprays) and significantly
              less common than with oral estrogen — but leg pain or swelling warrants prompt attention
              regardless of your delivery method.
            </p>
          </section>
        </div>

        <div className="mt-12 bg-brand-plum/10 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-plum mb-3">
            Find a menopause specialist who can guide your HRT journey
          </h2>
          <p className="text-gray-600 mb-6">
            A knowledgeable provider makes all the difference in getting your dose right the first time —
            and adjusting it confidently when needed.
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
            <Link href="/guides/is-hrt-safe" className="text-sm text-brand-plum hover:underline font-medium">
              Is HRT Safe? The Updated Evidence →
            </Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-brand-plum hover:underline font-medium">
              How to Find an HRT-Friendly Doctor →
            </Link>
            <Link href="/guides/what-is-mscp" className="text-sm text-brand-plum hover:underline font-medium">
              What is an MSCP? →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
