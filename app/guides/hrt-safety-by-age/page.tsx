import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HRT Safety by Age: What the 2024 Guidelines Say | MenopauseDirectory.co',
  description:
    "Is HRT safe in your 40s? Your 50s? After 60? The 2023 and 2024 menopause guidelines have updated what we know about hormone therapy safety at different life stages.",
  alternates: { canonical: 'https://menopausedirectory.co/guides/hrt-safety-by-age' },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Is it safe to start HRT in my 40s?',
    a: "Yes, for most healthy women in perimenopause (typically 45-55 years old), starting HRT during your 40s is supported by the current guidelines and is generally considered low-risk. The 2023 Menopause Society (formerly NAMS) position statement affirms that for women under 60 or within 10 years of menopause onset, the benefits of hormone therapy outweigh the risks for most. Starting HRT early — during the perimenopause transition — is associated with better long-term outcomes for heart health and bone density.",
  },
  {
    q: 'Is it safe to start HRT in my 50s?',
    a: "For most women in their 50s who are within 10 years of menopause onset, HRT remains appropriate and supported by evidence. The critical question is not age but timing: the 'timing hypothesis' or 'window of opportunity' suggests that starting HRT closer to menopause (within 10 years) is associated with cardiovascular benefit and better safety, while starting more than 10 years after menopause (or after age 60) in women who have not previously used HRT carries higher cardiovascular risk.",
  },
  {
    q: 'Is it safe to start HRT after 60?',
    a: "Starting HRT for the first time after age 60, or more than 10-13 years after menopause, requires more individualized risk assessment. Current guidelines do not recommend routinely initiating HRT at this stage due to higher baseline cardiovascular and VTE (blood clot) risk. However, women already on HRT who are doing well may continue with regular re-evaluation. Some specialists do initiate HRT after 60 for specific indications (severe symptoms, bone density) with careful risk-benefit discussion.",
  },
  {
    q: 'Does HRT increase breast cancer risk?',
    a: "The breast cancer risk associated with HRT depends on the type, dose, and duration. Estrogen-only HRT (used only by women without a uterus) is associated with a slight decrease in breast cancer risk in some studies. Combination HRT (estrogen + progestogen) carries a small increased risk after 5+ years of use — but this increase is smaller than the risk associated with drinking one glass of wine per day or being significantly overweight. The 2023 Menopause Society guidelines affirm that for most healthy women in their 50s, this risk is acceptable given the substantial quality-of-life and long-term health benefits.",
  },
  {
    q: 'What type of progesterone is safest in HRT?',
    a: "Body-identical (micronized) progesterone (Prometrium or compounded) appears to carry lower risk than synthetic progestins (like medroxyprogesterone acetate used in original WHI studies). French observational studies and more recent data suggest micronized progesterone does not increase breast cancer risk to the same degree as synthetic progestins, and may carry a more favorable cardiovascular profile. Ask your provider whether micronized progesterone is an option for your regimen.",
  },
]

export default function HRTSafetyByAgePage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-gray-600">Find a Specialist</Link>
          <span>/</span>
          <span className="text-gray-600">HRT Safety by Age</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl leading-tight">
            HRT Safety by Age: What the 2024 Guidelines Say
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            The Women&apos;s Health Initiative (WHI) study in 2002 created decades of fear around
            hormone therapy — fear that the current evidence largely does not support. The 2023
            Menopause Society position statement and the 2024 British Menopause Society guidelines
            represent a significant update to how we understand HRT safety at different life stages.
            Here is what the evidence actually says, organized by age.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
              The WHI Problem: Why the Old Data Scared Everyone
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The 2002 WHI study alarmed doctors and patients by reporting increased breast cancer,
              heart disease, and stroke risk in women on HRT. What was lost in the panic: the average
              age of women in that study was 63 — well past the window of opportunity for hormone
              therapy. These were women who had been without hormones for over a decade, often with
              pre-existing cardiovascular disease. Applying those findings to healthy women in their
              early 50s was always scientifically inappropriate.
            </p>
            <div className="bg-pink-50 rounded-2xl p-5">
              <p className="text-sm font-semibold text-pink-700 mb-1">The current consensus:</p>
              <p className="text-sm text-gray-700">
                For healthy women under 60 or within 10 years of menopause, the benefits of HRT
                outweigh the risks for most. This is the position of the Menopause Society, the
                British Menopause Society, the International Menopause Society, and the American
                College of Obstetricians and Gynecologists.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
              HRT Safety by Age Decade
            </h2>
            <div className="space-y-4">
              {[
                {
                  decade: 'In Your 40s (Perimenopause)',
                  verdict: 'Generally appropriate for eligible women',
                  detail: "Starting HRT during perimenopause — the years before your last period — is supported by current guidelines. Perimenopause typically begins in the mid-40s (sometimes earlier). Early HRT use is associated with cardiovascular protection, bone density preservation, and prevention of early cognitive decline. Risk of breast cancer at this age is very low in absolute terms.",
                  color: 'green',
                },
                {
                  decade: 'In Your 50s (Early Postmenopause)',
                  verdict: 'Supported within 10 years of menopause onset',
                  detail: "For women in their 50s who are within 10 years of their last period, current guidelines endorse HRT for symptom management, bone protection, and cardiovascular benefit. This is the primary target population for hormone therapy. Benefits typically outweigh risks for healthy women in this window.",
                  color: 'green',
                },
                {
                  decade: 'Early 60s (Within 10 years of menopause)',
                  verdict: 'Continue if already on HRT; initiation requires discussion',
                  detail: "Women already on HRT who are doing well may continue with regular re-evaluation. Starting HRT for the first time in the early 60s, if within 10 years of menopause and otherwise healthy, may still be appropriate with individual risk assessment. The cardiovascular risk profile increases modestly with longer time since menopause.",
                  color: 'yellow',
                },
                {
                  decade: 'After 65 (13+ years post-menopause)',
                  verdict: 'Initiation generally not recommended; continuation with caution',
                  detail: "Initiating HRT more than 13 years after menopause carries higher cardiovascular (stroke, VTE) and breast cancer risk in absolute terms. Current guidelines do not recommend routine initiation at this stage. Women who have been on HRT since perimenopause and are doing well may continue with annual review.",
                  color: 'red',
                },
              ].map((item) => (
                <div key={item.decade} className={`rounded-2xl p-6 border ${item.color === 'green' ? 'bg-green-50 border-green-100' : item.color === 'yellow' ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100'}`}>
                  <div className="flex items-start gap-3">
                    <span className={`mt-1 text-lg ${item.color === 'green' ? 'text-green-600' : item.color === 'yellow' ? 'text-amber-500' : 'text-red-500'}`}>
                      {item.color === 'green' ? '✓' : item.color === 'yellow' ? '~' : '!'}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-800">{item.decade}</p>
                      <p className={`text-sm font-medium mt-0.5 ${item.color === 'green' ? 'text-green-700' : item.color === 'yellow' ? 'text-amber-700' : 'text-red-700'}`}>
                        {item.verdict}
                      </p>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQ.map((faq) => (
                <div key={faq.q} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-serif text-base font-semibold text-gray-800 mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
            <h2 className="font-serif text-lg font-semibold text-gray-800 mb-2">
              Find a provider who understands the 2024 evidence
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Many OB-GYNs are still practicing with WHI-era caution. A menopause specialist or
              MSCP-certified practitioner will have current knowledge of HRT safety and dosing.
            </p>
            <Link href="/listings" className="inline-flex items-center gap-2 bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-pink-700">
              Find a Menopause Specialist <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <div className="pt-8 border-t border-gray-100">
            <h3 className="font-serif text-lg font-semibold text-gray-800 mb-4">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/is-hrt-safe" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Is HRT Safe? →</Link>
              <Link href="/guides/bioidentical-vs-conventional-hrt" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Bioidentical vs. Conventional HRT →</Link>
              <Link href="/guides/hrt-what-to-expect-first-3-months" className="text-sm text-pink-600 hover:text-pink-700 font-medium">What to Expect in the First 3 Months →</Link>
              <Link href="/guides/what-to-expect-first-menopause-appointment" className="text-sm text-pink-600 hover:text-pink-700 font-medium">Your First Menopause Appointment →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
