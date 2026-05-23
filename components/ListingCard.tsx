import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Globe, Wifi, BadgeCheck, Star } from 'lucide-react'
import { cn, PRACTITIONER_TYPE_LABELS, PRACTITIONER_TYPE_COLORS } from '@/lib/utils'
import type { Listing } from '@/lib/types'

interface ListingCardProps {
  listing: Listing
  featured?: boolean
}

export default function ListingCard({ listing, featured = false }: ListingCardProps) {
  const typeLabel = PRACTITIONER_TYPE_LABELS[listing.practitioner_type] ?? 'Specialist'
  const typeColor = PRACTITIONER_TYPE_COLORS[listing.practitioner_type] ?? 'bg-gray-100 text-gray-600'
  const isVerified = listing.listing_tier === 'premium' || listing.listing_tier === 'featured'
  const isFeatured = listing.listing_tier === 'featured'

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className={cn(
        'group block bg-white rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-0.5',
        featured || isFeatured
          ? 'border-brand-rose shadow-md ring-1 ring-brand-rose/20'
          : 'border-gray-100 shadow-sm'
      )}
    >
      {isFeatured && (
        <div className="bg-brand-rose text-white text-xs font-semibold px-3 py-1 rounded-t-2xl text-center tracking-wide uppercase">
          Featured Provider
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {listing.headshot_url ? (
              <Image
                src={listing.headshot_url}
                alt={listing.full_name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-cream-dark"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-brand-cream-dark flex items-center justify-center text-brand-plum font-serif font-bold text-xl">
                {listing.full_name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-plum transition-colors leading-tight">
                  {listing.full_name}
                  {listing.credentials && (
                    <span className="text-gray-500 font-normal">, {listing.credentials}</span>
                  )}
                </h3>
                {listing.practice_name && (
                  <p className="text-sm text-gray-500 mt-0.5">{listing.practice_name}</p>
                )}
              </div>
              {isVerified && (
                <BadgeCheck className="flex-shrink-0 w-5 h-5 text-brand-plum" title="Verified Provider" />
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full', typeColor)}>
                {typeLabel}
              </span>
              {listing.mscp_certified && (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-plum/10 text-brand-plum border border-brand-plum/20">
                  MSCP Certified
                </span>
              )}
              {listing.hrt_prescriber && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-brand-sage/10 text-brand-sage-dark">
                  HRT Prescriber
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1.5 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="flex-shrink-0 text-gray-400" />
            <span>
              {listing.city}, {listing.state}
            </span>
          </div>
          {listing.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} className="flex-shrink-0 text-gray-400" />
              <span>{listing.phone}</span>
            </div>
          )}
          {listing.website && (
            <div className="flex items-center gap-2">
              <Globe size={14} className="flex-shrink-0 text-gray-400" />
              <span className="text-brand-plum truncate">{listing.website.replace(/^https?:\/\//, '')}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {listing.accepts_telehealth && (
              <span className="flex items-center gap-1 text-xs text-brand-sage-dark font-medium">
                <Wifi size={12} />
                Telehealth
              </span>
            )}
            {listing.accepting_new_patients && (
              <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <Star size={12} />
                Accepting Patients
              </span>
            )}
          </div>

          {listing.listing_tier === 'unclaimed' ? (
            <span className="text-xs text-gray-400 italic">Unclaimed listing</span>
          ) : (
            <span className="text-xs text-brand-plum font-medium group-hover:underline">
              View profile →
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
