'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Leaf } from 'lucide-react'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-brand-cream-dark bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-plum/10 group-hover:bg-brand-plum/20 transition-colors">
              <Leaf className="h-4 w-4 text-brand-plum" />
            </div>
            <span className="font-serif text-lg font-bold text-gray-800">
              Menopause<span className="text-brand-plum">Directory</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/listings" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
              Find a Specialist
            </Link>
            <Link href="/guides/perimenopause-vs-menopause" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
              What is Menopause?
            </Link>
            <Link href="/submit" className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
              List Your Practice
            </Link>
            <Link href="/submit" className="bg-brand-plum text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-brand-plum-dark transition-colors">
              Get Listed Free
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-brand-cream-dark"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-brand-cream-dark py-4 space-y-1">
            <Link
              href="/listings"
              className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-brand-cream-dark rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              Find a Specialist
            </Link>
            <Link
              href="/guides/perimenopause-vs-menopause"
              className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-brand-cream-dark rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              What is Menopause?
            </Link>
            <Link
              href="/submit"
              className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-brand-cream-dark rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              List Your Practice
            </Link>
            <div className="px-4 pt-2">
              <Link href="/submit" className="block text-center bg-brand-plum text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-brand-plum-dark transition-colors">
                Get Listed Free
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
