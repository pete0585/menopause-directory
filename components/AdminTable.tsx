'use client'

import { useState, useTransition } from 'react'
import { BadgeCheck, Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import { cn, PRACTITIONER_TYPE_LABELS, TIER_LABELS } from '@/lib/utils'
import type { Listing } from '@/lib/types'

interface AdminTableProps {
  listings: Listing[]
}

async function updateListing(id: string, updates: Partial<Listing>) {
  const res = await fetch(`/api/admin/listings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  return res.ok
}

export default function AdminTable({ listings: initial }: AdminTableProps) {
  const [listings, setListings] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  function handleApprove(id: string) {
    startTransition(async () => {
      const ok = await updateListing(id, { is_approved: true, is_active: true })
      if (ok) {
        setListings((prev) =>
          prev.map((l) => (l.id === id ? { ...l, is_approved: true, is_active: true } : l))
        )
      }
    })
  }

  function handleReject(id: string) {
    startTransition(async () => {
      const ok = await updateListing(id, { is_approved: false, is_active: false })
      if (ok) {
        setListings((prev) =>
          prev.map((l) => (l.id === id ? { ...l, is_approved: false, is_active: false } : l))
        )
      }
    })
  }

  const filtered = listings.filter((l) => {
    if (filter === 'pending') return !l.is_approved && l.is_active
    if (filter === 'approved') return l.is_approved
    if (filter === 'rejected') return !l.is_approved && !l.is_active
    return true
  })

  const counts = {
    all: listings.length,
    pending: listings.filter((l) => !l.is_approved && l.is_active).length,
    approved: listings.filter((l) => l.is_approved).length,
    rejected: listings.filter((l) => !l.is_approved && !l.is_active).length,
  }

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              filter === f
                ? 'bg-brand-plum text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}{' '}
            <span className="text-xs opacity-70">({counts[f]})</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No listings in this category.
          </div>
        )}
        {filtered.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 truncate">{listing.full_name}</span>
                {listing.credentials && (
                  <span className="text-sm text-gray-500">{listing.credentials}</span>
                )}
                {listing.mscp_certified && (
                  <BadgeCheck size={16} className="text-brand-plum flex-shrink-0" title="MSCP" />
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-xs text-gray-500">
                  {PRACTITIONER_TYPE_LABELS[listing.practitioner_type]} · {listing.city}, {listing.state}
                </span>
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  listing.listing_tier === 'premium' || listing.listing_tier === 'featured'
                    ? 'bg-brand-plum/10 text-brand-plum'
                    : 'bg-gray-100 text-gray-500'
                )}>
                  {TIER_LABELS[listing.listing_tier]}
                </span>
                <span className="text-xs text-gray-400">
                  Source: {listing.source ?? 'self-submitted'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`/listings/${listing.slug}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-gray-400 hover:text-brand-plum transition-colors"
                title="View listing"
              >
                <ExternalLink size={16} />
              </a>

              {!listing.is_approved && listing.is_active && (
                <>
                  <button
                    onClick={() => handleApprove(listing.id)}
                    disabled={isPending}
                    className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-60"
                  >
                    <CheckCircle size={15} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(listing.id)}
                    disabled={isPending}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
                  >
                    <XCircle size={15} />
                    Reject
                  </button>
                </>
              )}

              {listing.is_approved && (
                <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <CheckCircle size={14} />
                  Live
                </span>
              )}

              {!listing.is_approved && !listing.is_active && (
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <XCircle size={14} />
                  Rejected
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
