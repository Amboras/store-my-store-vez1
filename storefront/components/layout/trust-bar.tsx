import { ShieldCheck, Truck, Users, Star } from 'lucide-react'

/**
 * Trust signal strip — 4 reassurances shown directly below the header.
 * Loud-and-clear social proof before the customer even hits the hero.
 */
const items = [
  { Icon: ShieldCheck, label: '90-Day Happiness Guarantee' },
  { Icon: Truck, label: 'Fast & Discreet Shipping' },
  { Icon: Users, label: '40,000+ Happy Customers' },
  { Icon: Star, label: '300+ 5-Star Reviews' },
]

export default function TrustBar() {
  return (
    <div className="bg-coral-soft border-y border-border/40">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border/50">
          {items.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2 py-3 px-2 text-center"
            >
              <Icon className="h-4 w-4 flex-shrink-0 text-teal-deep" strokeWidth={2} />
              <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-teal-deep">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
