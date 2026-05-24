import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Is HRT Safe? The Updated Evidence, Explained | MenopauseDirectory.co',
  description:
    "The 2002 WHI study scared a generation of doctors away from HRT. That fear was based on a misreading of the data. Here's what the updated evidence actually shows.",
  openGraph: {
    title: 'Is HRT Safe? What the Updated Evidence Actually Says',
    description:
      'HRT was widely abandoned after a flawed 2002 study. The current evidence tells a very different story. Here is what we actually know now.',
  },
}

const faqData = [
  {
    q: 'Does HRT cause breast cancer?',
    a: "The relationship is nuanced and depends heavily on the type of HRT and duration of use. Estrogen-only HRT (for women without a uterus) may actually reduce breast cancer risk. Combined estrogen + synthetic progestin HRT was associated with a small increased risk in the original WHI study — less than 1 extra case per 1,000 women per year, comparable to the risk from drinking one glass of wine per night. Importantly, combined HRT using micronized progesterone (bioidentical) rather than synthetic progestins appears to carry a more favorable risk profile. The absolute risk increase for most women is small, and must be weighed against HRT's significant benefits.",
  },
  {
    q: 'Is transdermal HRT (patches, gels) safer than pills?',
    a: "Yes, according to the current evidence. Oral estrogen is processed through the liver on its first pass, which activates clotting factors and increases blood clot (thrombosis) risk. Transdermal estrogen — patches, gels, sprays — enters the bloodstream directly and does not trigger this liver effect. Multiple studies have confirmed that transdermal estrogen does not increase blood clot risk the way oral estrogen does. For women with any cardiovascular concerns or clotting history, transdermal is generally the preferred delivery method.",
  },
  {
    q: 'What is the timing hypothesis in HRT?',
    a: "The timing hypothesis refers to the observation that HRT started within 10 years of menopause onset — or before age 60 — has a significantly more favorable risk-benefit profile than HRT started later. The WHI study population had an average age of 63, meaning most participants started HRT 10+ years after menopause. Applying those results to women who start HRT at 50 or 52 is a scientific error that caused enormous harm. For women who start HRT near the time of menopause, the cardiovascular and bone benefits are well-established and the risks are low.",
  },
  {
    q: 'Who should NOT take HRT?',
    a: "HRT is not appropriate for everyone. The main contraindications include: personal history of hormone-sensitive breast cancer; active liver disease or severe liver impairment; unexplained vaginal bleeding; personal history of blood clots (particularly venous thromboembolism) — though transdermal estrogen may still be considered in some cases. Women with a history of cardiovascular disease, stroke, or TIA should discuss the risks carefully with a menopause-knowledgeable provider. Family history of breast cancer is a risk factor to discuss but is not in itself a contraindication for HRT in most cases.",
  },
  {
    q: 'What do major medical societies say about HRT safety?',
    a: "The Menopause Society (NAMS), the British Menopause Society, the International Menopause Society, and the Endocrine Society all now endorse HRT as safe and effective for healthy women under 60 who are within 10 years of menopause onset, who do not have specific contraindications. The British Menopause Society has been particularly explicit: for most women in this group, the benefits of HRT outweigh the risks. The narrative that HRT is broadly dangerous reflects the misapplication of 2002 WHI data and has been corrected in current guidelines.",
  },
]

export default function IsHrtSafePage() {
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
          <span className="text-gray-600">Is HRT Safe?</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-gray-900 leading-tight sm:text-5xl text-balance">
            Is HRT Safe? What the Updated Evidence Actually Says
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            The 2002 Women's Health Initiative study scared a generation of women — and their doctors —
            away from hormone replacement therapy. That fear, it turns out, was based on a misreading of
            the data. Here's what we actually know now.
          </p>
        </header>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              What the WHI Study Got Wrong
            </h2>
            <p>
              In 2002, the Women's Health Initiative published results suggesting that HRT increased risks
              of breast cancer, heart disease, stroke, and blood clots. The headlines were alarming.
              HRT prescriptions dropped by more than 50% in the following years. Physicians stopped
              prescribing it. Medical schools stopped teaching it. A whole generation of women suffered
              through menopause symptoms that could have been treated.
            </p>
            <p className="mt-3">
              What the headlines missed — and what took years for the medical establishment to fully
              reckon with — is that the WHI study had significant design problems that made its
              conclusions far less generalizable than initially claimed:
            </p>
            <ul className="mt-4 space-y-3">
              {[
                {
                  point: "Wrong type of HRT",
                  detail: "The WHI used oral conjugated equine estrogen (derived from horse urine) paired with synthetic medroxyprogesterone acetate. These are not the same compounds as bioidentical estradiol and micronized progesterone, which most providers now prefer.",
                },
                {
                  point: "Wrong age group",
                  detail: "The average participant age was 63 — more than 10 years past menopause. This is not representative of the typical HRT patient, who starts at 50-52. Starting hormones 10+ years post-menopause, when arteries may already be diseased, has different risk implications than starting near menopause.",
                },
                {
                  point: "The absolute risk was tiny",
                  detail: "The breast cancer risk increase was less than 1 extra case per 1,000 women per year. For context, the risk from drinking one glass of wine per night is comparable. That's not nothing — but it's very different from the 'HRT causes cancer' narrative that took hold.",
                },
                {
                  point: "Estrogen-only was misapplied",
                  detail: "Women who took estrogen only (those without a uterus) actually showed a trend toward reduced breast cancer risk. This finding was largely buried under the combined-HRT headlines.",
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
              What the Current Evidence Shows
            </h2>
            <p>
              Two decades of additional research — including re-analyses of the WHI data itself —
              has produced a clearer, more reassuring picture for most women:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Estrogen-only HRT (for women without a uterus) may actually reduce breast cancer risk",
                "Transdermal estrogen — patches, gels, sprays — does not increase blood clot risk the way oral estrogen does",
                "HRT started within 10 years of menopause (or before age 60) has a favorable risk profile for most healthy women",
                "HRT significantly reduces fracture risk by protecting bone density through the transition",
                "Early HRT may reduce cardiovascular disease risk — the opposite of what the WHI suggested for older starters",
                "Micronized progesterone (bioidentical) has a more favorable risk profile than synthetic progestins for breast cancer risk",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-brand-plum mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              The Menopause Society (NAMS), the British Menopause Society, and the International
              Menopause Society all now explicitly endorse HRT as safe and effective for most healthy
              women under 60 who are within 10 years of menopause — provided they don't have specific
              contraindications.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              Who HRT Is NOT Recommended For
            </h2>
            <p>
              HRT is not appropriate for every woman. The clearest contraindications:
            </p>
            <ul className="mt-4 space-y-2">
              {[
                "Personal history of hormone-sensitive breast cancer (ER+ or PR+)",
                "Active liver disease or severe liver dysfunction",
                "Unexplained vaginal bleeding (requires evaluation before starting HRT)",
                "Personal history of blood clots (venous thromboembolism) — though transdermal estrogen may still be considered in some cases with specialist input",
                "Recent cardiovascular event (heart attack, stroke, TIA) — timing and type of HRT matters significantly",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-brand-rose mt-0.5">⚑</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Family history of breast cancer is worth discussing with your provider, but is not in
              itself a contraindication for most women. A menopause-knowledgeable provider can help you
              think through your actual risk profile rather than applying blanket rules.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
              How to Have an Informed Conversation With Your Doctor
            </h2>
            <p>
              The gap between current evidence and what many doctors still believe about HRT is real.
              Coming prepared helps:
            </p>
            <ul className="mt-4 space-y-3">
              {[
                {
                  q: "Bring your family history",
                  detail: "Especially breast cancer, cardiovascular disease, blood clots, and osteoporosis. These inform your personal risk profile, not just generic population statistics.",
                },
                {
                  q: "Ask about transdermal delivery",
                  detail: 'If your provider only offers oral HRT, ask about patches, gels, or sprays. "I\'ve read that transdermal estrogen has a better clotting risk profile — is that an option for me?"',
                },
                {
                  q: "Ask about progesterone type",
                  detail: 'Micronized progesterone (Prometrium) has a more favorable profile than synthetic progestins (medroxyprogesterone acetate). Ask: "Do you use micronized progesterone or synthetic progestin, and what\'s your reasoning?"',
                },
                {
                  q: "Invoke the timing hypothesis",
                  detail: '"I\'m within 10 years of my last period. What does the evidence show about starting HRT in this window?" This frames the conversation around your actual situation, not the WHI population.',
                },
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
            Find an HRT-knowledgeable menopause specialist
          </h2>
          <p className="text-gray-600 mb-6">
            The right provider knows the current evidence and can apply it to your specific situation —
            not the 2002 headlines.
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
            <Link href="/guides/hrt-what-to-expect-first-3-months" className="text-sm text-brand-plum hover:underline font-medium">
              Your First 3 Months on HRT →
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
