import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import NewsletterFooterBar from '@/components/NewsletterFooterBar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://menopausedirectory.co'),
  title: {
    default: 'MenopauseDirectory.co — Find a Doctor Who Actually Gets It',
    template: '%s | MenopauseDirectory.co',
  },
  description:
    'Find menopause specialists, HRT-prescribing doctors, certified menopause practitioners (MSCPs), pelvic floor therapists, and menopause coaches near you.',
  keywords: [
    'menopause doctor near me',
    'menopause specialist',
    'HRT doctor near me',
    'certified menopause practitioner',
    'MSCP',
    'pelvic floor therapist menopause',
    'menopause coach',
    'perimenopause doctor',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://menopausedirectory.co',
    siteName: 'MenopauseDirectory.co',
    title: 'MenopauseDirectory.co — Find a Doctor Who Actually Gets It',
    description:
      'The modern directory for women navigating menopause. Find HRT-prescribing doctors, MSCP-certified practitioners, pelvic floor therapists, and menopause coaches.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MenopauseDirectory.co',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MenopauseDirectory.co — Find a Doctor Who Actually Gets It',
    description:
      'Find menopause specialists, HRT-prescribing doctors, and certified menopause practitioners near you.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'WsFVgJc44tUU9sIef0VxTHrziIqc3XPsEDWHCieb9UQ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-brand-cream">
        <Nav />
        <main>{children}</main>
        <NewsletterFooterBar />
        <footer className="bg-white border-t border-gray-100 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <div className="font-serif font-bold text-xl text-brand-plum mb-3">
                  Menopause<span className="text-brand-rose">Directory</span>
                  <span className="text-gray-400 font-sans font-normal text-sm">.co</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  The modern directory for women navigating menopause. Find specialists who actually listen.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Find Care</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="/listings" className="hover:text-brand-plum transition-colors">All Specialists</a></li>
                  <li><a href="/categories/certified-menopause-practitioner" className="hover:text-brand-plum transition-colors">MSCP Certified</a></li>
                  <li><a href="/categories/pelvic-floor-therapist" className="hover:text-brand-plum transition-colors">Pelvic Floor PT</a></li>
                  <li><a href="/categories/menopause-coach" className="hover:text-brand-plum transition-colors">Menopause Coaches</a></li>
                  <li><a href="/listings?accepts_telehealth=true" className="hover:text-brand-plum transition-colors">Telehealth Only</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Practitioners</h4>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li><a href="/submit" className="hover:text-brand-plum transition-colors">List Your Practice</a></li>
                  <li><a href="/listings" className="hover:text-brand-plum transition-colors">Find Your Listing</a></li>
                  <li><a href="/admin" className="hover:text-brand-plum transition-colors">Admin</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-100 mt-8 pt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} MenopauseDirectory.co · Not a medical provider. This directory is for informational purposes only.
            </div>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
