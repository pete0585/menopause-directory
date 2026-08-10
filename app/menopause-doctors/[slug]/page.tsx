import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

interface CityPageData {
  city: string
  state: string
  state_abbr: string
  h1_title: string | null
  meta_description: string | null
  intro_content: string | null
}

async function getCityPage(slug: string): Promise<CityPageData | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_city_pages')
    .select('city, state, state_abbr, h1_title, meta_description, intro_content')
    .eq('slug', slug)
    .single()
  return data ?? null
}

async function getCityListings(city: string, state: string): Promise<Listing[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('city', city)
    .eq('state', state)
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(24)
  return (data as Listing[]) ?? []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getCityPage(slug)
  if (!page) return { title: 'Menopause Specialists | MenopauseDirectory.co' }

  const title = page.h1_title
    ? `${page.h1_title} | MenopauseDirectory.co`
    : `Menopause Doctors in ${page.city}, ${page.state_abbr} — Find HRT Specialists | MenopauseDirectory.co`

  const description = page.meta_description
    ?? `Find menopause specialists, MSCP-certified practitioners, and HRT-prescribing doctors in ${page.city}, ${page.state}. Telehealth options available.`

  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getCityPage(slug)
  if (!page) notFound()

  const listings = await getCityListings(page.city, page.state_abbr)
  const h1 = page.h1_title ?? `Menopause Doctors in ${page.city}, ${page.state_abbr}`
  const stateAbbr = page.state_abbr

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Home</Link>
        {' › '}
        <Link href="/listings" className="hover:text-gray-600">Find a Specialist</Link>
        {' › '}
        <Link href={`/states`} className="hover:text-gray-600">{page.state}</Link>
        {' › '}
        <span className="text-gray-600">{page.city}</span>
      </nav>

      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 text-brand-rose mb-3">
          <MapPin className="h-5 w-5" />
          <span className="text-sm font-medium">{page.city}, {stateAbbr}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {h1}
        </h1>
        {page.intro_content ? (
          <p className="text-gray-600 leading-relaxed">{page.intro_content}</p>
        ) : (
          <p className="text-gray-600 leading-relaxed">
            Find menopause specialists, HRT-prescribing doctors, and MSCP-certified practitioners
            in {page.city}, {page.state}. Browse providers accepting new patients and offering telehealth options.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
          <span>{listings.length > 0 ? `${listings.length}+` : 'Multiple'} providers listed</span>
          <span>·</span>
          <span>HRT-prescribers available</span>
          <span>·</span>
          <span>Telehealth options</span>
        </div>
      </div>

      {listings.length > 0 ? (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900">
              Menopause Specialists in {page.city}
            </h2>
            <Link
              href={`/listings?city=${encodeURIComponent(page.city)}&state=${stateAbbr}`}
              className="flex items-center gap-1 text-sm font-semibold text-brand-plum hover:text-brand-plum/80"
            >
              All results <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-12 rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-500 mb-4">
            Search menopause specialists in {page.city} below.
          </p>
          <Link
            href={`/listings?city=${encodeURIComponent(page.city)}&state=${stateAbbr}`}
            className="inline-flex items-center gap-2 bg-brand-plum text-white rounded-full px-6 py-3 font-medium hover:bg-brand-plum/90"
          >
            Search {page.city} Providers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      <div className="pt-8 border-t border-gray-100">
        <div className="flex flex-wrap gap-3">
          <Link href="/listings" className="text-sm text-brand-plum hover:underline font-medium">
            All Providers →
          </Link>
          <Link href="/states" className="text-sm text-brand-plum hover:underline font-medium">
            Browse by State →
          </Link>
          <Link href="/cities" className="text-sm text-brand-plum hover:underline font-medium">
            Browse by City →
          </Link>
        </div>
      </div>
    </div>
  )
}
