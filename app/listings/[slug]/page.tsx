import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin, Phone, Globe, Calendar, BadgeCheck, Wifi,
  Users, ChevronRight, ArrowRight
} from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { PRACTITIONER_TYPE_LABELS, SPECIALTY_LABELS, formatPhone } from '@/lib/utils'
import { createCheckoutSession } from './actions'
import type { Listing } from '@/lib/types'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ upgraded?: string }>
}

async function getListing(slug: string): Promise<Listing | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from('menopause_listings')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return (data as Listing) ?? null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListing(slug)
  if (!listing) return { title: 'Provider Not Found' }

  const title = `${listing.full_name}${listing.credentials ? `, ${listing.credentials}` : ''} — Menopause Specialist in ${listing.city}, ${listing.state}`
  const description = listing.bio
    ? listing.bio.slice(0, 160)
    : `Find and book an appointment with ${listing.full_name}, a menopause specialist in ${listing.city}, ${listing.state}. ${listing.accepts_telehealth ? 'Telehealth available. ' : ''}${listing.mscp_certified ? 'MSCP Certified.' : ''}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: listing.headshot_url ? [{ url: listing.headshot_url }] : [],
    },
  }
}

export default async function ListingDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { upgraded } = await searchParams
  const listing = await getListing(slug)
  if (!listing) notFound()

  const isVerified = listing.listing_tier === 'premium' || listing.listing_tier === 'featured'
  const isFeatured = listing.listing_tier === 'featured'
  const isUnclaimed = listing.listing_tier === 'unclaimed'
  const typeLabel = PRACTITIONER_TYPE_LABELS[listing.practitioner_type] ?? 'Specialist'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: listing.full_name,
    description: listing.bio ?? undefined,
    telephone: listing.phone ?? undefined,
    url: listing.website ?? undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address_line1 ?? undefined,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip,
      addressCountry: 'US',
    },
    geo:
      listing.lat && listing.lng
        ? {
            '@type': 'GeoCoordinates',
            latitude: listing.lat,
            longitude: listing.lng,
          }
        : undefined,
    medicalSpecialty: 'Gynecology',
    availableService: listing.specialties.map((s) => ({
      '@type': 'MedicalProcedure',
      name: SPECIALTY_LABELS[s] ?? s,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <ChevronRight size={14} />
          <Link href="/listings" className="hover:text-gray-600">Specialists</Link>
          <ChevronRight size={14} />
          <Link href={`/listings?city=${listing.city}&state=${listing.state}`} className="hover:text-gray-600">
            {listing.city}, {listing.state}
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-600 truncate">{listing.full_name}</span>
        </nav>

        {upgraded && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm mb-6">
            🎉 Your listing has been upgraded to Verified! Your badge and priority placement are now active.
          </div>
        )}

        {isFeatured && (
          <div className="bg-brand-rose text-white text-sm font-semibold px-4 py-2 rounded-xl text-center mb-6 tracking-wide">
            ✦ Featured Provider
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <div className="flex items-start gap-5">
                {listing.headshot_url ? (
                  <Image
                    src={listing.headshot_url}
                    alt={listing.full_name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover border-2 border-brand-cream-dark flex-shrink-0"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-brand-cream-dark flex items-center justify-center text-brand-plum font-serif font-bold text-3xl flex-shrink-0">
                    {listing.full_name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                        {listing.full_name}
                        {listing.credentials && (
                          <span className="text-gray-400 font-sans font-normal text-xl">, {listing.credentials}</span>
                        )}
                      </h1>
                      {listing.practice_name && (
                        <p className="text-gray-500 mt-1">{listing.practice_name}</p>
                      )}
                    </div>
                    {isVerified && (
                      <BadgeCheck className="w-7 h-7 text-brand-plum flex-shrink-0" aria-label="Verified Provider" />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-brand-plum/10 text-brand-plum">
                      {typeLabel}
                    </span>
                    {listing.mscp_certified && (
                      <span className="text-sm font-semibold px-3 py-1 rounded-full bg-brand-plum/10 text-brand-plum border border-brand-plum/20">
                        MSCP Certified
                      </span>
                    )}
                    {listing.hrt_prescriber && (
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-brand-sage/10 text-brand-sage-dark">
                        HRT Prescriber
                      </span>
                    )}
                    {listing.accepts_telehealth && (
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700 flex items-center gap-1">
                        <Wifi size={12} />
                        Telehealth
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {listing.bio && (
                <div className="mt-6">
                  <h2 className="font-semibold text-gray-900 mb-3">About</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{listing.bio}</p>
                </div>
              )}

              {listing.specialties && listing.specialties.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-semibold text-gray-900 mb-3">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {listing.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-sm px-3 py-1.5 rounded-lg bg-brand-cream-dark text-gray-700"
                      >
                        {SPECIALTY_LABELS[s] ?? s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {listing.insurance_accepted && listing.insurance_accepted.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-semibold text-gray-900 mb-3">Insurance Accepted</h2>
                  <div className="flex flex-wrap gap-2">
                    {listing.insurance_accepted.map((ins) => (
                      <span key={ins} className="text-sm px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 border border-gray-100">
                        {ins}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {listing.languages_spoken && listing.languages_spoken.length > 1 && (
                <div className="mt-6">
                  <h2 className="font-semibold text-gray-900 mb-2">Languages Spoken</h2>
                  <p className="text-gray-600 text-sm">{listing.languages_spoken.join(', ')}</p>
                </div>
              )}
            </div>

            {isUnclaimed && (
              <div className="mt-6 bg-brand-cream rounded-2xl border border-brand-cream-dark p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Is this your practice?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  This listing was added from public NPI data. Claim it for free to add your bio, photo, website, and booking link.
                </p>
                <Link
                  href={`/claim/${listing.id}`}
                  className="inline-flex items-center gap-2 bg-brand-plum text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-brand-plum-dark transition-colors"
                >
                  Claim This Listing
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <div className="space-y-3 text-sm mb-6">
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin size={16} className="flex-shrink-0 text-brand-rose mt-0.5" />
                  <span>
                    {listing.address_line1 && <>{listing.address_line1}<br /></>}
                    {listing.city}, {listing.state} {listing.zip}
                  </span>
                </div>
                {listing.phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={16} className="flex-shrink-0 text-brand-rose" />
                    <a href={`tel:${listing.phone}`} className="hover:text-brand-plum transition-colors">
                      {formatPhone(listing.phone)}
                    </a>
                  </div>
                )}
                {listing.website && (
                  <div className="flex items-center gap-3">
                    <Globe size={16} className="flex-shrink-0 text-brand-rose" />
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-plum hover:underline truncate"
                    >
                      {listing.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-600">
                  <Users size={16} className="flex-shrink-0 text-brand-sage" />
                  <span className={listing.accepting_new_patients ? 'text-green-600 font-medium' : 'text-gray-400'}>
                    {listing.accepting_new_patients ? 'Accepting new patients' : 'Not accepting new patients'}
                  </span>
                </div>
              </div>

              {listing.booking_url && isVerified ? (
                <a
                  href={listing.booking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-brand-plum hover:bg-brand-plum-dark text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  Book a Consultation
                </a>
              ) : listing.phone ? (
                <a
                  href={`tel:${listing.phone}`}
                  className="block w-full text-center bg-brand-plum hover:bg-brand-plum-dark text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  Call to Schedule
                </a>
              ) : (
                <Link
                  href="/listings"
                  className="block w-full text-center border border-brand-plum text-brand-plum font-medium py-3 px-4 rounded-xl hover:bg-brand-plum hover:text-white transition-colors"
                >
                  Back to Search
                </Link>
              )}

              {!isVerified && !isUnclaimed && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center mb-3">
                    Are you {listing.full_name}? Upgrade to Verified for priority placement and a booking link.
                  </p>
                  <form action={createCheckoutSession.bind(null, listing.id, listing.slug)}>
                    <button
                      type="submit"
                      className="w-full text-center bg-brand-rose hover:bg-brand-rose-dark text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <BadgeCheck size={15} />
                      Get Verified — $149/year
                    </button>
                  </form>
                </div>
              )}

              {isUnclaimed && (
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <Link
                    href={`/claim/${listing.id}`}
                    className="text-sm text-brand-plum font-medium hover:underline"
                  >
                    Claim this listing →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
