import { Suspense } from 'react'
import Link from 'next/link'
import { BadgeCheck, Wifi, Heart, Leaf, Brain, Activity, ShieldCheck, Search, Star, CheckCircle, ArrowRight } from 'lucide-react'
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

const TOP_CITIES = [
  { name: 'New York', state: 'NY' },
  { name: 'Los Angeles', state: 'CA' },
  { name: 'Chicago', state: 'IL' },
  { name: 'Houston', state: 'TX' },
  { name: 'Phoenix', state: 'AZ' },
  { name: 'Philadelphia', state: 'PA' },
  { name: 'Austin', state: 'TX' },
  { name: 'Denver', state: 'CO' },
  { name: 'Seattle', state: 'WA' },
  { name: 'Miami', state: 'FL' },
  { name: 'Atlanta', state: 'GA' },
  { name: 'Boston', state: 'MA' },
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

async function getListingCount(): Promise<number> {
  const supabase = createClient()
  const { count } = await supabase
    .from('menopause_listings')
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', true)
    .eq('is_active', true)
  return count ?? 0
}

export default async function HomePage() {
  const [featured, listingCount] = await Promise.all([
    getFeaturedListings(),
    getListingCount(),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero-gradient py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-plum/10 border border-brand-plum/20 px-4 py-2 text-sm text-brand-plum mb-6">
            <BadgeCheck className="h-4 w-4" />
            <span>{listingCount.toLocaleString()} specialists in our directory — updated daily</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance mb-6">
            Find a doctor who{' '}
            <span className="text-brand-plum italic">actually gets it.</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 text-balance">
            You've been told it's just aging. Find the menopause specialist who will actually listen — certified practitioners, HRT-prescribing doctors, pelvic floor PTs, and coaches, all in one place.
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

      {/* What makes this different */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-plum/10 mx-auto mb-4">
                <ShieldCheck className="h-7 w-7 text-brand-plum" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">Credential-Verified</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                MSCP certification, HRT-prescribing status, and telehealth availability — verified, not self-reported. Find practitioners who actually specialize in menopause, not general OB-GYNs who see it occasionally.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-rose/10 mx-auto mb-4">
                <Heart className="h-7 w-7 text-brand-rose" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">Built for Women</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Not a general doctor directory with a menopause filter bolted on. Every specialist here is focused on perimenopause, menopause, and the full spectrum of hormonal health — that's it.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-sage/10 mx-auto mb-4">
                <Search className="h-7 w-7 text-brand-sage-dark" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2">Free to Search</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                No membership required. No association gate. Search, filter by HRT prescribing, MSCP certification, telehealth, and insurance — then go find your specialist. Always free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by specialty */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-cream">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-gray-900">What type of specialist do you need?</h2>
            <p className="mt-2 text-gray-500">Not every menopause specialist is the same. Find the right type of care for where you are.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const href = cat.slug === 'telehealth'
                ? '/listings?accepts_telehealth=true'
                : `/categories/${cat.slug}`
              return (
                <Link
                  key={cat.slug}
                  href={href}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all hover:shadow-md ${cat.color}`}
                >
                  <div className="p-2 rounded-xl bg-white/60">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-semibold leading-tight">{cat.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      {featured.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900">Featured Specialists</h2>
                <p className="text-gray-500 mt-1">Verified providers with full profiles and direct booking</p>
              </div>
              <Link href="/listings" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-brand-plum hover:text-brand-plum-dark">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} featured />
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link href="/listings" className="inline-flex items-center gap-2 border border-brand-plum text-brand-plum px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-plum/5 transition-colors">
                View all specialists <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Browse by city */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-cream">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-gray-900">Search by City</h2>
            <p className="text-gray-500 mt-2">Menopause specialists serving women across the country.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TOP_CITIES.map((city) => (
              <Link
                key={`${city.name}-${city.state}`}
                href={`/listings?city=${encodeURIComponent(city.name)}&state=${city.state}`}
                className="rounded-xl bg-white px-3 py-3 text-center shadow-sm hover:shadow-md transition-shadow group"
              >
                <p className="text-sm font-semibold text-gray-700 group-hover:text-brand-plum transition-colors">{city.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{city.state}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/listings" className="inline-flex items-center gap-2 border border-brand-plum text-brand-plum px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-plum/5 transition-colors">
              Browse all cities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* For practitioners CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-plum">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Are you a menopause specialist?
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Thousands of women are actively searching for practitioners like you. A free listing takes 5 minutes. Verified listings with priority placement start at $49/year.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-brand-plum hover:bg-brand-cream transition-colors"
            >
              Add Your Practice Free
            </Link>
            <Link
              href="/listings"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 px-8 py-4 text-base font-semibold text-white hover:border-white transition-colors"
            >
              Find Your Listing
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom trust bar */}
      <section className="py-10 px-4 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-brand-sage" />
              Free to search, always
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-plum" />
              Credential-verified listings
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 text-brand-rose" />
              Menopause specialists only
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
