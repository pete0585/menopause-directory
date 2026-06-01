import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What to Expect From Your First Menopause Appointment | MenopauseDirectory.co',
  description:
    "Most women leave their first menopause appointment without a plan. Here's how to prepare, what will happen, and what to ask so you actually leave with answers.",
  openGraph: {
    title: 'What to Expect From Your First Menopause Appointment',
    description:
      "A first menopause appointment can feel vague and rushed — unless you come prepared. Here's exactly what to expect and how to make the most of it.",
  },
}

const faqData = [
  {
    q: 'What is the difference between a menopause specialist and a regular OB-GYN?',
    a: "A general OB-GYN is trained across the full spectrum of women's reproductive health — pregnancy, gynecologic surgery, contraception, well-woman care, and menopause. Menopause is one item on a long list. A menopause specialist — often an OB-GYN or internist who has done additional training and may hold the MSCP credential — has made menopause their primary focus. They are more likely to be current on the evidence around HRT safety, know the range of non-hormonal options, and have experience troubleshooting complex symptom patterns. For uncomplicated perimenopause, a general OB-GYN may be sufficient. For complex symptoms, failed treatments, or a desire for the most current evidence-based care, a specialist is worth seeking out.",
  },
  {
    q: 'Will I get a prescription at my first appointment?',
    a: "Not always — and that is not a red flag. A thorough first appointment often involves taking a complete history and possibly ordering labs before prescribing. Some providers will prescribe at the first visit if your history is clear and there are no contraindications. What you should not leave with is vague reassurance and no follow-up plan. If the provider does not prescribe at the first visit, ask: what information do you need before we can start, and when should I expect a treatment plan?",
  },
  {
    q: 'What labs might my menopause specialist order?',
    a: "Labs at a first menopause appointment commonly include: FSH (follicle-stimulating hormone) — elevated levels confirm menopause, though FSH is not always necessary for diagnosis in women over 45 with classic symptoms; estradiol; TSH (thyroid-stimulating hormone) — thyroid dysfunction mimics many menopause symptoms; sometimes fasting lipids and glucose (cardiovascular risk baseline); occasionally testosterone if low libido is a primary concern. Not every appointment requires all of these — a skilled provider will order what is relevant to your presentation.",
  },
  {
    q: 'What if my doctor dismisses my symptoms?',
    a: "This still happens. If you describe classic perimenopause symptoms — irregular periods, hot flashes, sleep disruption, mood changes, brain fog, vaginal dryness — and the provider tells you to wait it out or that HRT is too risky without individualizing the conversation, that is worth taking seriously. You have the right to a second opinion. Seeking out a provider with MSCP certification or documented menopause focus increases the likelihood of an evidence-based conversation. Finding someone who takes menopause seriously is worth an extra appointment.",
  },
]

export default function WhatToExpectFirstMenopauseAppointmentPage() {
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
          <span className="text-gray-600">First Menopause Appointment</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight sm:text-5xl text-balance">
            What to Expect From Your First Menopause Appointment
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Most women walk into their first menopause appointment underprepared and leave with
            general advice and no real plan. Coming in with a clear picture of your symptoms, the
            right questions, and realistic expectations changes the outcome of that visit significantly.
          </p>
        </header>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Before You Go: What to Prepare
            </h2>
            <ul className="mt-4 space-y-3">
              {[
                {
                  point: 'Track your symptoms for 2-4 weeks before the appointment',
                  detail: "Log hot flash frequency, night sweats, sleep disruption, mood changes, and any menstrual irregularity. Specifics — \"I have 6-8 hot flashes per day\" — are more useful than \"I have a lot.\" Some providers have symptom questionnaires (like the Menopause Rating Scale) you can complete in advance.",
                },
                {
                  point: 'Write down your complete medical and family history',
                  detail: "Especially: personal or family history of breast cancer, cardiovascular disease, blood clots (DVT, PE), or osteoporosis. These directly affect your provider's treatment approach. Bring a written summary if the history is complex.",
                },
                {
                  point: 'List all current medications and supplements',
                  detail: "Including hormonal contraception — many women entering perimenopause are still on the pill, which masks cycle irregularity and can interfere with menopause symptom assessment.",
                },
                {
                  point: 'Come with your top 2-3 symptoms prioritized',
                  detail: "If you walk in with a list of fifteen symptoms, the appointment loses focus. Identify what is most affecting your quality of life and lead with that. You can cover more in follow-ups.",
                },
              ].map(({ point, detail }) => (
                <li key={point} className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="font-semibold text-gray-800 mb-1">{point}</p>
                  <p className="text-sm text-gray-600">{detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              What Will Actually Happen
            </h2>
            <p>A thorough first menopause appointment typically includes:</p>
            <ul className="mt-4 space-y-2">
              {[
                "A detailed symptom history — what, how long, how often, and how much it is affecting your daily life",
                "A review of your personal and family medical history (breast cancer, cardiovascular risk, clotting history)",
                "A physical exam — usually including blood pressure and a pelvic exam to check for vaginal atrophy",
                "Lab orders — at minimum FSH and estradiol; often TSH, lipids, and sometimes bone density referral depending on age and history",
                "A discussion of treatment options — which should include HRT, non-hormonal options, and lifestyle interventions",
                "A follow-up plan — when to come back, what to watch for, and what happens if symptoms are not improving",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-brand-plum mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              If the appointment does not include a discussion of treatment options and a follow-up
              plan, ask directly: "Based on what I've told you, what treatment options do you recommend,
              and what is the plan from here?"
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Questions to Ask at Your First Appointment
            </h2>
            <ul className="mt-4 space-y-3">
              {[
                { q: '"Based on my symptoms and history, am I a good candidate for HRT?"', detail: "A knowledgeable provider should be able to answer this specifically — not with blanket caution or blanket enthusiasm. The answer depends on your history." },
                { q: '"What type of HRT would you recommend for me, and why?"', detail: "Transdermal vs. oral, bioidentical vs. synthetic, estrogen-only vs. combined — these are real distinctions with different risk and benefit profiles. You should understand the rationale for what is being recommended." },
                { q: '"If I do not want to start HRT right now, what are my non-hormonal options?"', detail: "There are multiple FDA-approved non-hormonal options for hot flashes and sleep disruption. A complete provider should have an answer that goes beyond 'lifestyle changes.'" },
                { q: '"How will we know if the treatment is working, and what is the timeline?"', detail: "Most women start to notice HRT benefits within 2-6 weeks, with full effect at 3 months. Know what you are looking for and when to follow up if symptoms are not improving." },
                { q: '"What should I do if I have side effects between now and my next appointment?"', detail: "Know the contact protocol in advance. Breast tenderness, spotting, and headaches are common in the first month of HRT — you should know which symptoms are expected and which warrant a call." },
              ].map(({ q, detail }) => (
                <div key={q} className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="font-semibold text-gray-800 mb-1">{q}</p>
                  <p className="text-sm text-gray-600">{detail}</p>
                </div>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 bg-brand-plum/10 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-plum mb-3">
            Find a menopause specialist who takes this seriously
          </h2>
          <p className="text-gray-600 mb-6">
            A great first appointment starts with the right provider. Search the directory for
            MSCP-certified and HRT-prescribing specialists near you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-8 py-3 font-semibold hover:bg-brand-plum/90 transition-colors"
            >
              Find a Specialist <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides/how-to-find-hrt-friendly-doctor"
              className="inline-flex items-center gap-2 border border-brand-plum text-brand-plum rounded-full px-8 py-3 font-semibold hover:bg-brand-plum/5 transition-colors"
            >
              How to Find an HRT-Friendly Doctor →
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
            First Appointment FAQs
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
            <Link href="/guides/is-hrt-safe" className="text-sm text-brand-plum hover:underline font-medium">
              Is HRT Safe? →
            </Link>
            <Link href="/guides/hrt-what-to-expect-first-3-months" className="text-sm text-brand-plum hover:underline font-medium">
              Your First 3 Months on HRT →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
