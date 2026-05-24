import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BadgeCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What Is an MSCP? The Gold Standard in Menopause Care, Explained | MenopauseDirectory.co',
  description:
    'MSCP stands for Menopause Society Certified Practitioner — the most rigorous credential in menopause care. Learn what it means, who holds it, and why it matters when you\'re looking for a provider.',
  openGraph: {
    title: 'What Is an MSCP? The Menopause Society Certified Practitioner Credential',
    description:
      'The MSCP credential from The Menopause Society represents the most comprehensive menopause training available to healthcare providers. Here\'s what it means for your care.',
  },
}

const faqData = [
  {
    q: 'What does MSCP stand for?',
    a: 'MSCP stands for Menopause Society Certified Practitioner. It is awarded by The Menopause Society (formerly known as the North American Menopause Society, or NAMS) — the leading professional organization for menopause healthcare in North America. To earn the credential, providers must pass a comprehensive exam covering all aspects of menopause management.',
  },
  {
    q: 'What does the MSCP exam cover?',
    a: 'The MSCP exam covers: hormone physiology and the biology of menopause; management of vasomotor symptoms (hot flashes, night sweats); genitourinary syndrome of menopause (GSM); cardiovascular and bone health; HRT — types, benefits, risks, and individualization; non-hormonal treatment options; cognitive changes and mental health; premature ovarian insufficiency; surgical menopause; and shared decision-making. It\'s a demanding exam that tests both breadth and depth.',
  },
  {
    q: 'What types of providers can become MSCP-certified?',
    a: 'Any licensed healthcare provider can sit for the MSCP exam: MDs, DOs, Nurse Practitioners (NPs), Physician Assistants (PAs), and Certified Nurse Midwives (CNMs). The credential doesn\'t discriminate by license type — what matters is demonstrated knowledge. This means a menopause-focused NP with MSCP certification may have more specialized expertise than a general OB-GYN without it.',
  },
  {
    q: 'How many MSCP-certified practitioners are there in the US?',
    a: 'As of 2024, approximately 2,000–3,500 providers in the US hold MSCP certification. Given that there are roughly 1.3 million physicians in the US alone, this is a small and specialized group. Finding one near you may require some searching — which is exactly why this directory exists.',
  },
  {
    q: 'Does an MSCP certification guarantee HRT will be prescribed?',
    a: 'Not automatically — the MSCP credential certifies knowledge, not prescribing behavior. But MSCP-certified providers have demonstrated understanding of HRT evidence, including its benefits for appropriate candidates. They are significantly less likely to dismiss HRT based on outdated fear and more likely to engage in a nuanced, evidence-based conversation about your options.',
  },
  {
    q: 'How is the MSCP different from other menopause certifications?',
    a: 'The MSCP is the only certification from The Menopause Society — the authoritative body in North American menopause medicine. Other certifications (CLMs, various coaching programs) vary widely in rigor. If you\'re looking for a medical provider with the strongest credentials, MSCP is the standard to filter for.',
  },
]

export default function WhatIsMscpPage() {
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
          <span className="text-gray-600">What Is an MSCP?</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight sm:text-5xl text-balance">
            What Is an MSCP?
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            The Menopause Society Certified Practitioner credential is the most rigorous menopause
            qualification available to healthcare providers. Here's what it means — and why it matters
            when you're looking for care.
          </p>
        </header>

        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              The Problem It Solves
            </h2>
            <p>
              There is no medical specialty called "menopause medicine." OB-GYNs see menopause as a side of a
              reproductive health practice. Internists see it as part of primary care. Endocrinologists may
              see the hormone piece. But there's no guarantee that any of them have received adequate training
              in modern menopause management — and the evidence is that most haven't.
            </p>
            <p className="mt-3">
              The MSCP credential exists to create a searchable signal of genuine expertise. When a provider
              holds MSCP certification, you know they have passed a rigorous exam covering the full scope
              of menopause care. That's not a guarantee of perfect practice — but it's a meaningful filter.
            </p>
          </section>

          {/* Key stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { stat: '~2,500', label: 'MSCP-certified providers in the US', desc: 'A small, specialized group' },
              { stat: '31%', label: 'OB-GYNs who feel prepared for menopause', desc: 'Per The Menopause Society survey' },
              { stat: 'Any license', label: 'Eligible for MSCP certification', desc: 'MD, DO, NP, PA, CNM all qualify' },
            ].map(({ stat, label, desc }) => (
              <div key={stat} className="bg-brand-plum/5 rounded-2xl p-5 text-center">
                <p className="font-serif text-3xl font-bold text-brand-plum mb-1">{stat}</p>
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
              </div>
            ))}
          </div>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              What MSCP-Certified Means for Your Appointment
            </h2>
            <p>
              In practice, an MSCP appointment typically feels different from a standard OB-GYN visit. You're
              less likely to be dismissed. You're more likely to have an evidence-based conversation about HRT
              options, including a clear explanation of the actual risks and benefits for your specific profile.
              You're more likely to leave with a plan.
            </p>
            <p className="mt-3">
              This doesn't mean every MSCP is the right fit, or that excellent providers without MSCP don't
              exist — some brilliant, up-to-date menopause practitioners haven't sat for the exam. But as a
              filter when you don't know where to start, MSCP certification is the strongest signal available.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              How to Find MSCP-Certified Providers Near You
            </h2>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-start gap-4">
                <BadgeCheck className="h-8 w-8 text-brand-plum flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Filter for MSCP Certified in this directory</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Browse MenopauseDirectory.co and filter by "MSCP Certified" to find certified practitioners
                    in your area or offering telehealth nationwide.
                  </p>
                  <Link
                    href="/categories/certified-menopause-practitioner"
                    className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-brand-plum/90 transition-colors"
                  >
                    Find MSCP-Certified Providers <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 bg-brand-plum/10 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-plum mb-3">
            Don't settle for a provider who dismisses you
          </h2>
          <p className="text-gray-600 mb-6">
            MSCP-certified practitioners have done the work to understand menopause deeply. Find one near you.
          </p>
          <Link
            href="/listings?mscp_certified=true"
            className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-8 py-3 font-semibold hover:bg-brand-plum/90 transition-colors"
          >
            Find MSCP-Certified Providers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-6">
            MSCP Certification: FAQ
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
            <Link href="/guides/how-to-find-hrt-friendly-doctor" className="text-sm text-brand-plum hover:underline font-medium">
              How to Find an HRT-Friendly Doctor →
            </Link>
            <Link href="/categories/certified-menopause-practitioner" className="text-sm text-brand-plum hover:underline font-medium">
              Browse MSCP Practitioners →
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
