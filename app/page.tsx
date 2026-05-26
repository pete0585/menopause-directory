import { Suspense } from 'react'
import Link from 'next/link'
import { BadgeCheck, Wifi, Heart, Leaf, Brain, Activity } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

const CATEGORIES = [
  {
    slug: 'certified-menopause-practitioner',
    label: 'MSCP Certified',
    description: 'Menopause Society Certified Practitioners — the gold standard credential',
    icon: BadgeCheck,
    color: 'bg-brand-plum/8 hover:bg-brand-plum/12 text-brand-plum border-brand-plum/15',
  },
  {
    slug: 'obgyn-menopause',
    label: 'OB-GYN Specialists',
    description: 'Gynecologists who specialize in perimenopause and menopause care',
    icon: Heart,
    color: 'bg-brand-rose/8 hover:bg-brand-rose/12 text-brand-rose-dark border-brand-rose/15',
  },
  {
    slug: 'pelvic-floor-therapist',
    label: 'Pelvic Floor PT',
    description: 'Physical therapists specializing in GSM and pelvic floor health',
    icon: Activity,
    color: 'bg-brand-sage/8 hover:bg-brand-sage/12 text-brand-sage-dark border-brand-sage/15',
  },
  {
    slug: 'functional-medicine',
    label: 'Functional Medicine',
    description: 'Integrative medicine practitioners with a root-cause approach',
    icon: Leaf,
    color: 'bg-brand-sage/8 hover:bg-brand-sage/12 text-brand-sage-dark border-brand-sage/15',
  },
  {
    slug: 'menopause-coach',
    label: 'Menopause Coach',
    description: 'Certified coaches for lifestyle, nutrition, and symptom management',
    icon: Brain,
    color: 'bg-brand-plum/8 hover:bg-brand-plum/12 text-brand-plum border-brand-plum/15',
  },
  {
    slug: 'telehealth',
    label: 'Telehealth Only',
    description: 'See a specialist from home — available nationwide',
    icon: Wifi,
    color: 'bg-brand-rose/8 hover:bg-brand-rose/12 text-brand-rose-dark border-brand-rose/15',
  },
]

async function getFeaturedListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('listing_tier', ['featured', 'premium'])
    .order('listing_tier', { ascending: false })
    .limit(6)

  return (data as Listing[]) ?? []
}

async function getRecentListings(): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return (data as Listing[]) ?? []
}

export default async function HomePage() {
  const [featured, recent] = await Promise.all([getFeaturedListings(), getRecentListings()])

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero-gradient py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-rose font-medium text-sm uppercase tracking-widest mb-4">
            The Modern Menopause Directory
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance mb-6">
            Find a doctor who{' '}
            <span className="text-brand-plum italic">actually gets it.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 text-balance">
            You've been told it's just aging. We'll help you find the menopause specialist who will actually listen — certified practitioners, HRT-prescribing doctors, pelvic floor PTs, and coaches, all in one place.
          </p>
          <div className="max-w-3xl mx-auto">
            <Suspense fallback={null}>
              <SearchBar variant="hero" />
            </Suspense>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Search by city, state, or zip · Filter by specialty · Telehealth available
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-y border-gray-100 py-5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BadgeCheck size={16} className="text-brand-plum" />
              <span>MSCP Credential Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi size={16} className="text-brand-sage" />
              <span>Telehealth Options</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-brand-rose" />
              <span>HRT-Prescribing Doctors</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-brand-sage" />
              <span>Pelvic Floor Specialists</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl font-bold text-gray-900">Browse by Specialty</h2>
          <p className="mt-2 text-gray-500">
            Not every specialist is the same. Find the right type of care for where you are.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const href =
              cat.slug === 'telehealth'
                ? '/listings?accepts_telehealth=true'
                : `/categories/${cat.slug}`
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`block rounded-2xl border p-5 transition-all hover:shadow-md ${cat.color}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-white/60">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{cat.label}</h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{cat.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured listings */}
      {featured.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900">Featured Specialists</h2>
                <p className="text-gray-500 mt-1">Verified providers with full profiles and direct booking</p>
              </div>
              <Link href="/listings" className="text-brand-plum text-sm font-medium hover:underline hidden sm:block">
                View all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent listings */}
      {recent.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold text-gray-900">Recently Added</h2>
            <Link href="/listings" className="text-brand-plum text-sm font-medium hover:underline">
              Browse all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recent.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {/* CTA for practitioners */}
      <section className="bg-brand-plum text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Are you a menopause specialist?</h2>
          <p className="text-white/80 text-lg mb-8">
            Thousands of women are actively searching for practitioners like you. A free listing takes 5 minutes. Verified listings with priority placement start at $149/year — and pay for themselves with a single new patient.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="bg-white text-brand-plum font-semibold px-8 py-4 rounded-full hover:bg-brand-cream transition-colors"
            >
              Add Your Practice Free
            </Link>
            <Link
              href="/listings"
              className="border border-white/40 text-white font-medium px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              Find Your Listing
            </Link>
          </div>
        </div>
      </section>

      {/* Why this directory */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
              The alternative is a broken .aspx website from 2009.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The existing directories for menopause specialists are members-only, outdated, or bury specialists in a sea of general OB-GYNs with no way to filter for what actually matters: MSCP certification, HRT prescribing, telehealth availability.
            </p>
            <p className="text-gray-600 leading-relaxed">
              MenopauseDirectory.co was built specifically for this gap — modern, mobile-first, openly searchable, and designed around what women actually need when they're done being told "it's just aging."
            </p>
          </div>
          <div className="space-y-4">
            {[
              { title: 'MSCP Credential Filter', desc: 'Find only practitioners who hold the Menopause Society\'s gold-standard certification.' },
              { title: 'HRT-Prescribing Toggle', desc: 'Instantly narrow to doctors who will actually prescribe hormone therapy.' },
              { title: 'Telehealth Nationwide', desc: 'Find a specialist anywhere in the US if there\'s no one in your city.' },
              { title: 'All Specialties in One Place', desc: 'OB-GYNs, NPs, pelvic floor PTs, functional medicine, and menopause coaches.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-sage/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-brand-sage" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
