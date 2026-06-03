import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Menopause and Sleep: What Actually Works | MenopauseDirectory.co',
  description:
    'Night sweats, insomnia, and early waking are among the most disruptive menopause symptoms. Here is what the evidence says about each treatment — and when to see a doctor.',
  openGraph: {
    title: 'Menopause and Sleep: What Actually Works',
    description:
      'Menopause disrupts sleep for most women. CBT-I, HRT, supplements — here is an honest look at the evidence for each option.',
  },
}

const faqData = [
  {
    q: 'Does HRT help with sleep during menopause?',
    a: "Yes — for many women, HRT is among the most effective treatments for menopause-related sleep disruption, particularly when night sweats are driving the waking. By reducing vasomotor symptoms (hot flashes and night sweats), HRT often eliminates the primary disruptor of sleep. Studies show that women on HRT report significantly better sleep quality and fewer nighttime awakenings compared to those not on HRT. HRT does not work as well for sleep problems that are primarily insomnia-type (difficulty falling asleep, racing mind) rather than sweat-driven waking.",
  },
  {
    q: "What is the best supplement for menopause sleep?",
    a: "The evidence is modest for most supplements. Magnesium glycinate or magnesium l-threonate has the strongest overall evidence for improving sleep quality and is generally safe. Melatonin can help with sleep onset but does not address the underlying hormonal disruption causing night sweats. Black cohosh has limited evidence for sleep specifically. Valerian has been studied but results are inconsistent. No supplement approaches the efficacy of CBT-I for insomnia or HRT for vasomotor-driven sleep disruption. Supplements work best as complements to, not replacements for, evidence-based treatments.",
  },
  {
    q: 'Does perimenopause cause insomnia?',
    a: "Yes. Sleep disruption is one of the most common and often underrecognized symptoms of perimenopause. It can begin years before the last menstrual period. The mechanisms are multiple: fluctuating estrogen and progesterone affect the brain regions that regulate sleep architecture; hot flashes and night sweats cause direct waking; mood changes (anxiety, depression) are themselves linked to poor sleep and become more common in perimenopause. Many women are told their insomnia is stress-related when the hormonal component is primary.",
  },
]

export default function MenopauseAndSleepPage() {
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
          <span className="text-gray-600">Menopause and Sleep</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight sm:text-5xl text-balance">
            Menopause and Sleep: What Actually Works
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Up to 60% of women in perimenopause and menopause report significant sleep disruption. Here is
            an honest look at why it happens, what the evidence says about each treatment, and when to
            see a doctor rather than managing it alone.
          </p>
        </header>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Why Menopause Disrupts Sleep (The Science)
            </h2>
            <p>
              The short answer: hormones regulate far more than your cycle. Estrogen and progesterone both
              play direct roles in sleep architecture — the structure and quality of sleep — in ways that
              go beyond just managing night sweats.
            </p>
            <ul className="mt-4 space-y-3">
              {[
                {
                  point: 'Estrogen and temperature regulation',
                  detail: 'Declining estrogen narrows the thermoregulatory zone — the body becomes hypersensitive to small temperature changes, triggering hot flashes and night sweats. These vasomotor events can wake you from any sleep stage, including deep sleep, fragmenting the night even if you fall back asleep quickly.'
                },
                {
                  point: 'Progesterone as a natural sedative',
                  detail: 'Progesterone has anxiolytic and sedative effects, partly through interaction with GABA receptors — the same pathway as benzodiazepines, but gentler. As progesterone drops in perimenopause, some of this natural sleep-promoting effect is lost. This is why some women notice anxiety and difficulty falling asleep before they have any obvious hot flashes.'
                },
                {
                  point: 'Sleep architecture changes',
                  detail: 'Women in menopause show measurable changes in sleep staging — less slow-wave (deep) sleep, more frequent waking, and altered REM patterns. These changes are independent of night sweats, meaning even women without severe vasomotor symptoms can experience poor sleep quality from hormonal changes alone.'
                },
                {
                  point: 'Mood and circadian rhythm effects',
                  detail: 'Estrogen influences serotonin and melatonin production — both involved in mood and circadian rhythm regulation. Declining estrogen contributes to the increased rates of depression and anxiety in perimenopause, which in turn worsen sleep. The causality runs in both directions: poor sleep worsens mood, worsened mood disrupts sleep.'
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
              Night Sweats vs. Insomnia: How to Tell the Difference
            </h2>
            <p>
              This distinction matters for treatment because the two have different first-line approaches.
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <p className="font-semibold text-gray-800 mb-2">Night Sweat-Driven Waking</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• You wake up hot, sweating, or flushed</li>
                  <li>• Waking is sudden, not gradual</li>
                  <li>• Once the sweat passes, you can return to sleep (or would, if not anxious)</li>
                  <li>• Worse in the first half of the night</li>
                  <li>• Partners notice the temperature disruption</li>
                </ul>
                <p className="mt-3 text-xs text-gray-500 font-medium">First-line: HRT addresses the root cause</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <p className="font-semibold text-gray-800 mb-2">Insomnia-Type Disruption</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Difficulty falling asleep despite being tired</li>
                  <li>• Racing thoughts at bedtime</li>
                  <li>• Waking at 3am and unable to return to sleep</li>
                  <li>• Early morning waking (before you want to)</li>
                  <li>• No clear hot flash at the point of waking</li>
                </ul>
                <p className="mt-3 text-xs text-gray-500 font-medium">First-line: CBT-I has strongest evidence</p>
              </div>
            </div>
            <p className="mt-4 text-sm">
              Most women experience some combination of both. That is why treatment often involves addressing
              vasomotor symptoms and sleep architecture — not just one or the other.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              What the Evidence Says About Each Solution
            </h2>

            <div className="space-y-4">
              {[
                {
                  treatment: 'CBT-I (Cognitive Behavioral Therapy for Insomnia)',
                  evidence: 'STRONG',
                  evidenceColor: 'text-green-700 bg-green-50',
                  detail: 'CBT-I is the first-line treatment for chronic insomnia endorsed by the American Academy of Sleep Medicine. It includes sleep restriction, stimulus control, cognitive restructuring, and relaxation training. Multiple randomized trials show CBT-I outperforms sleep medications for long-term outcomes. Digital CBT-I programs (Sleepio, Somryst) have good evidence when in-person access is unavailable. CBT-I does not address night sweats directly — if sweats are primary, HRT may be more efficient.',
                },
                {
                  treatment: 'HRT (Hormone Replacement Therapy)',
                  evidence: 'STRONG (for vasomotor-driven disruption)',
                  evidenceColor: 'text-green-700 bg-green-50',
                  detail: 'For women whose sleep disruption is primarily driven by night sweats, HRT is highly effective — it targets the root cause. Multiple studies show HRT significantly reduces nighttime waking and improves self-reported sleep quality. For women with primarily insomnia-type disruption without obvious vasomotor symptoms, HRT may still help (progesterone has sedative properties) but the effect is less predictable. HRT is not appropriate for every woman — see a menopause-knowledgeable provider for a personalized assessment.',
                },
                {
                  treatment: 'Sleep Hygiene',
                  evidence: 'MODEST (necessary but rarely sufficient)',
                  evidenceColor: 'text-yellow-700 bg-yellow-50',
                  detail: 'Standard sleep hygiene — consistent sleep/wake times, cool bedroom, limiting screens, avoiding caffeine after 2pm — is helpful foundation but rarely sufficient on its own for menopause-related sleep disruption. Do these things. They reduce the load on a system that is already dysregulated. But do not expect sleep hygiene alone to solve hormonal sleep disruption.',
                },
                {
                  treatment: 'Supplements (Magnesium, Melatonin, Others)',
                  evidence: 'WEAK to MODEST',
                  evidenceColor: 'text-orange-700 bg-orange-50',
                  detail: 'Magnesium glycinate has modest evidence for improving sleep quality and is generally safe. Melatonin can help with sleep onset timing but does not address vasomotor causes of waking. Black cohosh has some evidence for hot flash reduction, with indirect benefits for sleep. Most other supplements have insufficient or inconsistent evidence. Use supplements as complements to — not replacements for — evidence-based approaches.',
                },
                {
                  treatment: 'Prescription Sleep Medications',
                  evidence: 'SHORT-TERM USE ONLY',
                  evidenceColor: 'text-gray-700 bg-gray-100',
                  detail: 'Benzodiazepines and z-drugs (zolpidem, eszopiclone) can provide short-term relief but do not address underlying hormonal causes, carry dependence risk, and are not recommended for long-term use. They may be appropriate as a bridge while other treatments take effect. Non-habit-forming options like low-dose doxepin or suvorexant are sometimes used in menopause — discuss with your doctor.',
                },
              ].map(({ treatment, evidence, evidenceColor, detail }) => (
                <div key={treatment} className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-semibold text-gray-800">{treatment}</p>
                    <span className={`text-xs font-semibold rounded-full px-2 py-0.5 whitespace-nowrap ${evidenceColor}`}>
                      {evidence}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              When to Talk to a Doctor About Menopause and Sleep
            </h2>
            <p>
              Do not wait until you are exhausted to seek help. Talk to a menopause-knowledgeable provider if:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                'You have tried sleep hygiene changes for 4+ weeks with no meaningful improvement',
                'Sleep disruption is affecting your work, relationships, or mental health',
                'You are waking 3 or more times per night most nights',
                'Night sweats are the primary driver and you have not discussed HRT',
                'You are using alcohol to help you sleep (a sign of coping that needs addressing)',
                'You are experiencing significant mood changes alongside sleep disruption',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-brand-plum mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              A menopause specialist can assess whether hormonal treatment, a referral for CBT-I, or a
              combination approach is right for your specific sleep picture. Sleep is not a luxury — it
              is foundational to every other aspect of health, and menopause-related sleep disruption is
              both common and treatable.
            </p>
          </section>
        </div>

        <div className="mt-12 bg-brand-plum/10 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-plum mb-3">
            Find a menopause specialist who takes sleep seriously
          </h2>
          <p className="text-gray-600 mb-6">
            Sleep disruption is a medical symptom, not an inevitable part of aging. Find a provider
            who will assess and treat it as such.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-8 py-3 font-semibold hover:bg-brand-plum/90 transition-colors"
            >
              Find a Specialist <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/guides/is-hrt-safe"
              className="inline-flex items-center gap-2 border border-brand-plum text-brand-plum rounded-full px-8 py-3 font-semibold hover:bg-brand-plum/5 transition-colors"
            >
              Is HRT Safe? The Evidence →
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
            <Link href="/guides/hrt-what-to-expect-first-3-months" className="text-sm text-brand-plum hover:underline font-medium">
              Your First 3 Months on HRT →
            </Link>
            <Link href="/guides/perimenopause-symptoms-checklist" className="text-sm text-brand-plum hover:underline font-medium">
              Perimenopause Symptoms Checklist →
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
