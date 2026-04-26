'use client'

import { Mail, Truck } from 'lucide-react'

/**
 * Top utility strip — dark teal greeting bar with support email and order tracking.
 * Inspired by the small-brand pattern of opening with a warm greeting before the header.
 */
export default function AnnouncementBar() {
  return (
    <div className="bg-teal-deep text-primary-foreground text-xs">
      <div className="container-custom flex items-center justify-between gap-4 py-2">
        <a
          href="mailto:support@store.com"
          className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity uppercase tracking-wider"
        >
          <Mail className="h-3.5 w-3.5" />
          support@store.com
        </a>
        <p className="flex-1 text-center uppercase tracking-[0.18em] font-medium">
          Welcome — Free shipping over $75
        </p>
        <a
          href="/account/orders"
          className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity uppercase tracking-wider"
        >
          <Truck className="h-3.5 w-3.5" />
          Track Order
        </a>
      </div>
    </div>
  )
}
