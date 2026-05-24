import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Find an HRT-Friendly Doctor Near You | MenopauseDirectory.co',
  description:
    'Finding a doctor willing to prescribe HRT shouldn\'t be this hard — but it is. Here\'s exactly how to find an HRT-friendly doctor, what to say, and what questions to ask.',
  openGraph: {
    title: 'How to Find an HRT-Friendly Doctor Near You',
    description:
      'Your current doctor won\'t prescribe HRT. Here\'s how to find one who will — what to look for, what to ask, and what to do when you get dismissed.',
  },
}

const faqData = [
  {
    q: 'Why won\'t my doctor prescribe HRT?',
    a: 'The 2002 Women\'s Health Initiative study generated widespread HRT fear that persisted in the medical community for decades. Many physicians who trained before 2015 carry the outdated belief that HRT is broadly dangerous. The current evidence — from the British Menopause Society, The Menopause Society (formerly NAMS), and multiple major studies — is significantly more nuanced: for most healthy women under 60 within 10 years of menopause onset, the benefits of HRT outweigh the risks. Providers who know this will prescribe. Those who don\'t, won\'t.',
  },
  {
    q: 'What is the fastest way to find a doctor who will prescribe HRT?',
    a: 'Filter this directory for "Prescribes HRT" and look for MSCP-certified providers — they have the most comprehensive menopause training. Also consider telehealth: menopause telehealth platforms (Midi Health, Gennev, Alloy) specifically employ HRT-prescribing providers. For in-person care, search this directory by your city and look for any of these credentials in profiles: MSCP, FACOG with menopause notation, or explicit mention of HRT management.',
  },
  {
    q: 'What should I say at my first HRT consultation?',
    a: 'Be specific about your symptoms, their severity, and how they\'re affecting your life. "I haven\'t slept well in two years. I have hot flashes 8-10 times a day. I\'ve had to change my career path because brain fog has made me less effective at work." Concrete impacts are harder to dismiss than vague complaints. Also useful: bring a list of your questions, your family history, and any recent labs. Tell them directly: "I\'m interested in discussing HRT and I\'d like to understand if it\'s appropriate for me."',
  },
  {
    q: 'What if I get dismissed again?',
    a: 'Find another provider. You are not obligated to accept dismissal. In many markets, menopause telehealth is available same-week and staffed by providers specifically trained in menopause care. Your symptoms are real, they are treatable, and a knowledgeable provider will acknowledge that.',
  },
  {
    q: 'Is telehealth a good option for getting HRT prescribed?',
    a: 'Often yes. Menopause telehealth platforms were built specifically to address the access gap — they hire providers who specialize in menopause and are comfortable with HRT. Costs vary: some are subscription-based, some are insurance-covered. The quality is generally high for initial prescriptions and follow-up management. Telehealth may not be appropriate for complex cases requiring physical examination, but for the majority of women who simply need a provider willing to engage with HRT, it works.',
  },
]

export default function HowToFindHrtDoctorPage() {
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
          <span className="text-gray-600">How to Find an HRT-Friendly Doctor</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight sm:text-5xl text-balance">
            How to Find an HRT-Friendly Doctor Near You
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Your doctor told you HRT was dangerous, or changed the subject, or suggested you just "manage."
            Here's what to do next.
          </p>
        </header>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Why Finding One Is Harder Than It Should Be
            </h2>
            <p>
              Approximately 6,000 American women enter menopause every day. The Women\'s Health Initiative study
              in 2002 caused a wholesale retreat from HRT prescribing that lasted two decades — even as the
              study's conclusions were refined, corrected, and contextualized. Many physicians trained in that
              era still haven't updated their practice. Only 31% of OB-GYNs report feeling adequately prepared
              to manage menopause, according to The Menopause Society.
            </p>
            <p className="mt-3">
              The providers who will prescribe are out there — they just require more searching to find.
              This directory exists to make that search faster.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              The Three Fastest Ways to Find an HRT Prescriber
            </h2>
            <div className="space-y-4">
              {[
                {
                  method: '1. Filter this directory by "Prescribes HRT"',
                  detail: 'Every provider who has indicated they actively prescribe HRT is filterable. This is the most direct path to providers who won\'t dismiss you.',
                },
                {
                  method: '2. Search for MSCP-certified providers',
                  detail: 'The Menopause Society Certified Practitioner credential requires comprehensive menopause training including HRT. MSCPs are significantly more likely to both prescribe HRT and manage it knowledgeably.',
                },
                {
                  method: '3. Consider telehealth menopause platforms',
                  detail: 'Midi Health, Gennev, Alloy, and Winona specifically hire HRT-prescribing providers. If local options are limited, these are often same-week appointments and can prescribe in most states.',
                },
              ].map(({ method, detail }) => (
                <div key={method} className="bg-white rounded-xl border border-gray-100 p-5">
                  <p className="font-semibold text-gray-800 mb-2">{method}</p>
                  <p className="text-sm text-gray-600">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Questions to Ask Before You Book
            </h2>
            <ul className="space-y-3 mt-3">
              {[
                '"Do you actively prescribe HRT for menopause management?"',
                '"What type of HRT do you typically start with and why?"',
                '"How do you approach HRT for women with a family history of [breast cancer/blood clots/cardiovascular disease]?"',
                '"Are you MSCP-certified or have you completed any specialized menopause training?"',
                '"How often would we monitor and adjust my HRT regimen?"',
              ].map((q) => (
                <li key={q} className="flex items-start gap-2 text-sm">
                  <span className="text-brand-plum mt-0.5">•</span>
                  {q}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              A provider who can answer these questions specifically and confidently is worth booking.
              Vague answers, references to "risks," or pivoting to alternatives without explaining why — move on.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Red Flags: When to Walk Away
            </h2>
            <ul className="space-y-2 mt-3">
              {[
                'Tells you HRT "causes cancer" without nuance or context',
                'Says "your levels look normal" without engaging with your symptoms',
                'Offers antidepressants as the first and only response to hot flashes',
                'Dismisses your symptoms as "just aging" or "just stress"',
                'Can\'t tell you what types of HRT they would consider or why',
                'Suggests you\'re "too young" or "too old" without explaining their reasoning',
              ].map((flag) => (
                <li key={flag} className="flex items-start gap-2 text-sm">
                  <span className="text-brand-rose mt-0.5">⚑</span>
                  {flag}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 bg-brand-plum/10 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-plum mb-3">
            Find an HRT-prescribing provider near you
          </h2>
          <p className="text-gray-600 mb-6">
            Search by city, filter by "Prescribes HRT" or "MSCP Certified" — and get seen by someone
            who actually knows what they're doing.
          </p>
          <Link
            href="/categories/hrt-doctors"
            className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-8 py-3 font-semibold hover:bg-brand-plum/90 transition-colors"
          >
            Browse HRT Prescribers <ArrowRight className="h-4 w-4" />
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
            <Link href="/guides/perimenopause-vs-menopause" className="text-sm text-brand-plum hover:underline font-medium">
              Perimenopause vs. Menopause →
            </Link>
            <Link href="/guides/what-is-mscp" className="text-sm text-brand-plum hover:underline font-medium">
              What is an MSCP? →
            </Link>
            <Link href="/categories/telehealth" className="text-sm text-brand-plum hover:underline font-medium">
              Telehealth Menopause Specialists →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
