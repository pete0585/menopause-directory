import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Perimenopause Symptoms Checklist: What Counts as a Symptom? | MenopauseDirectory.co',
  description:
    'The full list of perimenopause symptoms — including the ones most women are never told about. Irregular periods, hot flashes, brain fog, joint pain, palpitations, and more.',
  openGraph: {
    title: 'Perimenopause Symptoms Checklist: What Counts as a Symptom?',
    description:
      'Most women only know about hot flashes. This is the complete perimenopause symptom list — including the surprising ones.',
  },
}

const faqData = [
  {
    q: "What is the first sign of perimenopause?",
    a: "For most women, the first noticeable signs are changes in menstrual cycle regularity — cycles that become shorter (less than 25 days), longer (more than 35 days), or start varying significantly from month to month. Sleep disruption — particularly waking in the early hours — is another early sign that often precedes obvious hot flashes. Some women notice mood changes, increased anxiety, or brain fog years before their cycle becomes irregular. There is no single universal first symptom.",
  },
  {
    q: "Can perimenopause start at 35?",
    a: "Perimenopause typically begins between ages 40 and 44, but it can start earlier. Early perimenopause (before 40) is less common but not rare. Premature ovarian insufficiency (POI) — in which ovarian function diminishes before age 40 — affects about 1 in 100 women. Factors that can influence earlier onset include smoking, family history of early menopause, certain autoimmune conditions, and prior chemotherapy or radiation. If you are under 40 and experiencing symptoms, it is worth discussing with a doctor rather than assuming it is too early.",
  },
  {
    q: "How long does perimenopause last?",
    a: "Perimenopause typically lasts 4 to 8 years, with the average around 4 to 5 years. The final 1 to 2 years before the last menstrual period tend to have the most pronounced symptoms as estrogen levels drop most rapidly. Menopause itself is defined as 12 consecutive months without a period. After that, you are in postmenopause — but many symptoms, including vaginal changes and cardiovascular risk shifts, continue to evolve. The perimenopause-to-postmenopause transition is not a single moment but a multi-year process.",
  },
]

const COMMON_SYMPTOMS = [
  {
    name: 'Irregular periods',
    description: 'Cycles become shorter, longer, or unpredictable. You may skip months or have two periods in one month. This is often the first sign most women recognize.',
  },
  {
    name: 'Hot flashes',
    description: 'Sudden waves of heat, usually in the face, neck, and chest, lasting seconds to minutes. Affect about 75% of perimenopausal women. Can occur any time of day.',
  },
  {
    name: 'Night sweats',
    description: 'Hot flashes during sleep — often drenching and disruptive. A leading cause of perimenopausal sleep disruption. Many women mistake these for illness.',
  },
  {
    name: 'Mood changes',
    description: 'Increased irritability, sadness, or emotional volatility that feels out of proportion or unusual for you. Not the same as clinical depression, but can develop into it.',
  },
  {
    name: 'Brain fog',
    description: 'Difficulty concentrating, word-finding problems, feeling mentally slow or scattered. One of the most distressing symptoms for high-functioning women. Often resolves after the transition.',
  },
  {
    name: 'Sleep disruption',
    description: 'Difficulty falling asleep, waking frequently, or early morning waking that is new or worse than before. Can be driven by night sweats or by direct hormonal effects on sleep architecture.',
  },
  {
    name: 'Vaginal dryness',
    description: 'Declining estrogen thins and dries vaginal tissue — causing discomfort, irritation, and painful intercourse. Unlike most symptoms, this does not improve on its own and often worsens over time without treatment.',
  },
  {
    name: 'Joint pain',
    description: 'Aching, stiffness, or swelling in joints — particularly knees, hips, shoulders, and hands. Estrogen has anti-inflammatory properties, and its decline can trigger or worsen musculoskeletal symptoms.',
  },
  {
    name: 'Weight changes',
    description: 'Weight gain — particularly in the abdomen — that occurs even without dietary changes. Hormonal shifts alter fat distribution from hips and thighs toward the midsection.',
  },
  {
    name: 'Hair changes',
    description: 'Thinning scalp hair, hair loss, or changes in texture. Some women also notice increased facial or body hair from the relative androgen dominance as estrogen falls.',
  },
  {
    name: 'Heart palpitations',
    description: 'Sensations of a fluttering, pounding, or racing heart that may accompany hot flashes or occur independently. Usually benign in the context of menopause — but always worth ruling out a cardiac cause with your doctor.',
  },
  {
    name: 'Changes in libido',
    description: 'Decreased sexual desire, which may be related to vaginal discomfort, mood changes, fatigue, or direct effects of estrogen and testosterone changes on drive.',
  },
]

const SURPRISING_SYMPTOMS = [
  {
    name: 'Tinnitus (ringing in ears)',
    detail: 'Estrogen receptors exist in ear tissue. Some women develop new-onset tinnitus or experience worsening during perimenopause.',
  },
  {
    name: 'Dry eyes and dry mouth',
    detail: 'Mucous membranes throughout the body — not just the vagina — can be affected by declining estrogen. Dry eyes, dry mouth, and dry skin are all reported.',
  },
  {
    name: 'Electric shock sensations',
    detail: 'Brief, unusual sensations described as electric jolts — often just before a hot flash or upon waking. Alarming when first experienced, but a recognized perimenopausal symptom.',
  },
  {
    name: 'Burning mouth syndrome',
    detail: 'A burning or tingling sensation in the mouth with no obvious dental cause. More common in peri- and postmenopausal women and thought to be hormonally driven.',
  },
  {
    name: 'Urinary changes',
    detail: 'Increased urgency, frequency, or new-onset leakage. Estrogen supports bladder and urethral tissue; its decline can cause genitourinary syndrome of menopause (GSM), which includes bladder symptoms.',
  },
  {
    name: 'Anxiety (new-onset)',
    detail: 'Women who have never had anxiety disorders can develop significant anxiety in perimenopause. Estrogen modulates GABA and serotonin — dropping levels can create an anxious baseline that feels foreign.',
  },
]

export default function PerimenopauseSymptomsChecklistPage() {
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
          <span className="text-gray-600">Perimenopause Symptoms Checklist</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight sm:text-5xl text-balance">
            Perimenopause Symptoms Checklist: What Counts as a Symptom?
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Most women know about hot flashes. What they are rarely told is that perimenopause can involve
            34 or more recognized symptoms — many of which feel completely unrelated to hormones. This
            is the complete list, with honest explanations.
          </p>
        </header>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              The 12 Most Common Perimenopause Symptoms
            </h2>
            <p className="mb-5">
              These are the symptoms reported by the majority of women going through the perimenopause
              transition. Not every woman experiences all of them — presentation varies significantly
              based on genetics, lifestyle, and timing.
            </p>
            <div className="space-y-3">
              {COMMON_SYMPTOMS.map((symptom, i) => (
                <div key={symptom.name} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4">
                  <span className="text-2xl font-bold text-brand-plum/20 font-serif leading-none mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">{symptom.name}</p>
                    <p className="text-sm text-gray-600">{symptom.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Symptoms That Surprise Most Women
            </h2>
            <p className="mb-5">
              These symptoms are well-documented but rarely discussed in standard medical encounters or
              popular coverage of menopause. Many women are told they have a separate condition — or
              that their symptoms are anxiety, depression, or stress — when the hormonal root is primary.
            </p>
            <div className="space-y-3">
              {SURPRISING_SYMPTOMS.map(({ name, detail }) => (
                <div key={name} className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="font-semibold text-gray-800 mb-1">{name}</p>
                  <p className="text-sm text-gray-600">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              When Symptoms Start: Perimenopause Timeline
            </h2>
            <p>
              Perimenopause does not arrive all at once. It typically unfolds in stages over 4 to 8 years:
            </p>
            <div className="mt-4 space-y-3">
              {[
                {
                  phase: 'Early perimenopause (often 40–44)',
                  signs: 'Cycles become slightly irregular — shorter or longer. Sleep changes. Mood shifts. Some women notice brain fog or unusual fatigue. Hot flashes may not have started yet.',
                },
                {
                  phase: 'Mid perimenopause',
                  signs: 'Cycle irregularity becomes more pronounced — months may be skipped. Hot flashes and night sweats often intensify. Vaginal changes may begin. Mood and sleep disruption can be significant.',
                },
                {
                  phase: 'Late perimenopause (the final 1–2 years before menopause)',
                  signs: 'Periods become very infrequent. Vasomotor symptoms often peak. Estrogen levels are at their lowest of the transition. This is when most women have the most severe symptom burden.',
                },
                {
                  phase: 'Menopause (12 months with no period)',
                  signs: 'The point of formal menopause. Average age in the US is 51. Vasomotor symptoms may continue — for some women, for years into postmenopause.',
                },
              ].map(({ phase, signs }) => (
                <div key={phase} className="bg-white rounded-xl border-l-4 border-brand-plum/30 border border-gray-100 p-4">
                  <p className="font-semibold text-gray-800 mb-1">{phase}</p>
                  <p className="text-sm text-gray-600">{signs}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              When to See a Doctor
            </h2>
            <p>
              You do not need to wait until your symptoms are severe to see a menopause specialist. Consider
              seeing a menopause-knowledgeable provider if:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                'Your symptoms are affecting your sleep, work, relationships, or quality of life',
                'You have been experiencing symptoms for 6+ months with no clear explanation',
                'Your cycle has become very irregular or you have had spotting between periods',
                'You have had a full period after 12 months of no bleeding (this requires evaluation)',
                'Mood changes feel beyond normal sadness — especially if accompanied by hopelessness',
                'You want to discuss HRT or other treatment options proactively',
                'You are under 45 and experiencing symptoms (earlier menopause warrants evaluation)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-brand-plum mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              A menopause specialist — rather than a general practitioner with limited menopause training —
              can give you a comprehensive assessment, review your options including HRT, and create a
              plan tailored to your specific symptom picture and health history.
            </p>
          </section>
        </div>

        <div className="mt-12 bg-brand-plum/10 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-plum mb-3">
            Find a menopause specialist near you
          </h2>
          <p className="text-gray-600 mb-6">
            You deserve a provider who knows the full picture of perimenopause — not just the hot flash
            checklist. Find a menopause specialist who will take your symptoms seriously.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-8 py-3 font-semibold hover:bg-brand-plum/90 transition-colors"
            >
              Find a Specialist <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides/perimenopause-vs-menopause"
              className="inline-flex items-center gap-2 border border-brand-plum text-brand-plum rounded-full px-8 py-3 font-semibold hover:bg-brand-plum/5 transition-colors"
            >
              Perimenopause vs. Menopause →
            </Link>
          </div>
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
            <Link href="/guides/perimenopause-vs-menopause" className="text-sm text-brand-plum hover:underline font-medium">
              Perimenopause vs. Menopause →
            </Link>
            <Link href="/guides/menopause-and-sleep" className="text-sm text-brand-plum hover:underline font-medium">
              Menopause and Sleep →
            </Link>
            <Link href="/guides/is-hrt-safe" className="text-sm text-brand-plum hover:underline font-medium">
              Is HRT Safe? →
            </Link>
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-brand-plum hover:underline font-medium">
              How to Find an HRT-Friendly Doctor →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
