import EditorialLink from 'next/link'
import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import NewsletterFooterBar from '@/components/NewsletterFooterBar'
import Link from 'next/link'
import { Leaf } from 'lucide-react'
import NewsletterSignup from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://menopausedirectory.co'),
  title: {
    default: 'MenopauseDirectory.co — Find a Doctor Who Actually Gets It',
    template: '%s | MenopauseDirectory.co',
  },
  description: 'Find menopause specialists, HRT-prescribing doctors, certified menopause practitioners (MSCPs), pelvic floor therapists, and menopause coaches near you.',
  keywords: ['menopause doctor near me','menopause specialist','HRT doctor near me','certified menopause practitioner','MSCP','pelvic floor therapist menopause','menopause coach','perimenopause doctor'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://menopausedirectory.co',
    siteName: 'MenopauseDirectory.co',
    title: 'MenopauseDirectory.co — Find a Doctor Who Actually Gets It',
    description: 'The modern directory for women navigating menopause. Find HRT-prescribing doctors, MSCP-certified practitioners, pelvic floor therapists, and menopause coaches.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MenopauseDirectory.co' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MenopauseDirectory.co — Find a Doctor Who Actually Gets It',
    description: 'Find menopause specialists, HRT-prescribing doctors, and certified menopause practitioners near you.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear()
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-cream">
        <Nav />
        <main className="flex-1">{children}<nav aria-label="Editorial guides" className="mx-auto max-w-7xl px-6 py-6"><EditorialLink href="/blog" className="underline underline-offset-4">Guides and articles</EditorialLink></nav></main>
        <footer className="bg-gray-800 text-gray-100">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-plum/30">
                    <Leaf className="h-4 w-4 text-brand-plum" style={{ filter: 'brightness(2)' }} />
                  </div>
                  <span className="font-serif text-lg font-bold text-white">
                    Menopause<span className="text-brand-plum" style={{ filter: 'brightness(1.5)' }}>Directory</span>
                  </span>
                </Link>
                <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
                  The nationwide directory of menopause specialists. Built for women who are done being told it&apos;s just aging.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">For Patients</h3>
                <ul className="space-y-2.5">
                  <li><Link href="/listings" className="text-sm text-gray-300 hover:text-white transition-colors">Find a Specialist</Link></li>
                  <li><Link href="/guides/perimenopause-vs-menopause" className="text-sm text-gray-300 hover:text-white transition-colors">What is Menopause?</Link></li>
                  <li><Link href="/listings?accepts_telehealth=true" className="text-sm text-gray-300 hover:text-white transition-colors">Telehealth Specialists</Link></li>
                  <li><Link href="/categories/certified-menopause-practitioner" className="text-sm text-gray-300 hover:text-white transition-colors">MSCP Certified</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">For Practitioners</h3>
                <ul className="space-y-2.5">
                  <li><Link href="/submit" className="text-sm text-gray-300 hover:text-white transition-colors">List Your Practice</Link></li>
                  <li><Link href="/submit" className="text-sm text-gray-300 hover:text-white transition-colors">Get Listed Free</Link></li>
                  <li></li>
                  <li><Link href="/admin" className="text-sm text-gray-300 hover:text-white transition-colors">Admin Login</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-400">
                  © {currentYear} MenopauseDirectory.co. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">Related Directories:</span>
                  <a href="https://lactationconsultantdirectory.com" target="_blank" rel="noopener" className="text-xs text-gray-400 hover:text-white transition-colors">IBCLC Directory</a>
                </div>
                <p className="text-xs text-gray-400">
                  Not affiliated with The Menopause Society.
                </p>
              </div>
            </div>
          </div>
        
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500">
              <a href="https://studiozerohq.com" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors">Powered by AIdam</a>
              {' · '}
              <a href="https://studiozerohq.com" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors">Studio Zero — AI Marketing Operators for Healthcare</a>
            </p>
          </div>
        
      {/* Newsletter signup compact */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <NewsletterSignup compact />
      </div>
  </footer>
        <NewsletterFooterBar />
      </body>
    </html>
  )
}
