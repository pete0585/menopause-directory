'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-brand-cream-dark sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-brand-plum font-serif font-bold text-xl">
              Menopause<span className="text-brand-rose">Directory</span>
            </span>
            <span className="hidden sm:inline text-xs text-gray-400 font-sans">.co</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/listings" className="text-gray-600 hover:text-brand-plum transition-colors">
              Find a Specialist
            </Link>
            <Link href="/categories/certified-menopause-practitioner" className="text-gray-600 hover:text-brand-plum transition-colors">
              MSCP Certified
            </Link>
            <Link href="/submit" className="bg-brand-plum text-white px-4 py-2 rounded-full hover:bg-brand-plum-dark transition-colors font-medium">
              List Your Practice
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t border-brand-cream-dark flex flex-col gap-4 text-sm">
            <Link href="/listings" className="text-gray-600" onClick={() => setOpen(false)}>
              Find a Specialist
            </Link>
            <Link href="/categories/certified-menopause-practitioner" className="text-gray-600" onClick={() => setOpen(false)}>
              MSCP Certified
            </Link>
            <Link href="/submit" className="bg-brand-plum text-white px-4 py-2 rounded-full text-center font-medium" onClick={() => setOpen(false)}>
              List Your Practice
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
