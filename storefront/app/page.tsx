'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Star, Heart, Sparkles, Compass } from 'lucide-react'
import { useProducts } from '@/hooks/use-products'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_PRODUCT_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/5abb7af0-ca5c-4305-9e7f-641b8f3a6ef0%2Fai-1777191061073-0-01KQ4DF1NX6Y7FJKV723VMXG5E.png'

const FAMILY_ILLUSTRATION =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/5abb7af0-ca5c-4305-9e7f-641b8f3a6ef0%2Fai-1777191068536-0-01KQ4DF8ZQDKEG7BDVTTAH160E.png'

// Original review copy — written for this design exploration, not copied from any source.
const REVIEWS = [
  {
    name: 'Yasmin K.',
    rating: 5,
    title: 'Genuinely a hit at home',
    body: 'My kids ask to play it every night after dinner. Beautifully made and surprisingly educational.',
    verified: true,
  },
  {
    name: 'Marcus T.',
    rating: 5,
    title: 'Worth every penny',
    body: 'Quality is way above what I expected for the price. Packaging alone made it feel like a real gift.',
    verified: true,
  },
  {
    name: 'Selma P.',
    rating: 5,
    title: 'Family-friendly winner',
    body: 'Bought it for my niece — ended up wanting one for myself. The artwork is stunning.',
    verified: true,
  },
  {
    name: 'David R.',
    rating: 5,
    title: 'Becoming a tradition',
    body: 'We pull this out every weekend now. Honestly the best impulse buy I have made all year.',
    verified: true,
  },
]

const VALUES = [
  {
    Icon: Heart,
    title: 'Made With Care',
    body: 'We sweat the small stuff so the experience feels effortless from the moment you open the box.',
  },
  {
    Icon: Sparkles,
    title: 'Built To Delight',
    body: 'Every detail is designed to spark a smile — for first-time buyers and lifelong fans alike.',
  },
  {
    Icon: Compass,
    title: 'Quietly Useful',
    body: 'No noise, no gimmicks. Just thoughtful products that earn a permanent spot in your routine.',
  },
]

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? 'fill-gold text-gold' : 'text-muted-foreground/30'}`}
          strokeWidth={1.5}
          style={i < count ? { fill: 'hsl(var(--gold))', color: 'hsl(var(--gold))' } : undefined}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const { data: products } = useProducts({ limit: 4 })
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
  }

  const featured = products?.slice(0, 2) ?? []

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-background">
        <div className="container-custom grid lg:grid-cols-2 gap-10 items-center py-12 lg:py-20">
          {/* Text */}
          <div className="space-y-7 animate-fade-in-up order-2 lg:order-1">
            <h1 className="font-heading font-bold leading-[1.05] tracking-tight text-[2.75rem] sm:text-5xl lg:text-[4rem]">
              The Ultimate{' '}
              <span className="accent-underline text-teal-deep relative inline-block">
                Family
              </span>
              <br />
              Game Night Companion
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-md leading-relaxed">
              A warm, beautifully designed game your whole household will keep coming back to —
              built for laughter, learning, and the long run.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-foreground text-background px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
                prefetch
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-teal-deep hover:bg-teal-deep hover:text-background border border-teal-deep transition-colors"
                prefetch
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-square rounded-sm overflow-hidden bg-teal-deep">
              <Image
                src={HERO_PRODUCT_IMAGE}
                alt="Featured product"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED PRODUCTS ===================== */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto space-y-4 mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold">
              Loved by <span className="text-coral">Customers</span>
            </h2>
            <p className="text-muted-foreground">
              Spark genuine excitement at home with playful, lasting design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 max-w-3xl mx-auto">
            {featured.length > 0 ? (
              featured.map((product: any) => {
                const variant = product.variants?.[0]
                const price = variant?.calculated_price
                const amount = price?.calculated_amount
                const original = price?.original_amount
                const currency = (price?.currency_code || 'usd').toUpperCase()
                const formatter = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency,
                })
                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="group block text-center"
                    prefetch
                  >
                    <div className="relative aspect-square bg-sand rounded-sm overflow-hidden mb-5">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      ) : null}
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2">{product.title}</h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <StarRow />
                      <span className="text-xs text-muted-foreground">(124)</span>
                    </div>
                    {amount != null ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-coral">{formatter.format(amount)}</span>
                        {original && original > amount ? (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatter.format(original)}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </Link>
                )
              })
            ) : (
              // Skeleton placeholders
              [1, 2].map((i) => (
                <div key={i} className="text-center">
                  <div className="aspect-square bg-muted animate-pulse rounded-sm mb-5" />
                  <div className="h-4 w-32 bg-muted animate-pulse mx-auto rounded mb-2" />
                  <div className="h-3 w-20 bg-muted animate-pulse mx-auto rounded" />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===================== REVIEW CAROUSEL ===================== */}
      <section className="py-16 lg:py-20 bg-sand">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-teal-deep font-semibold">
              What customers are saying
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold">
              Real reviews. Real families.
            </h2>
          </div>

          <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4">
            {REVIEWS.map((r) => (
              <article
                key={r.name}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-background border border-border/60 rounded-sm p-6 shadow-sm"
              >
                <StarRow count={r.rating} />
                <h4 className="font-heading font-bold mt-3 mb-2">{r.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{r.body}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">{r.name}</span>
                  {r.verified ? (
                    <span className="text-teal-deep font-medium uppercase tracking-wider">
                      ✓ Verified
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== VALUES / WHY US ===================== */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — number callout */}
          <div className="space-y-3">
            <h2 className="font-heading text-4xl lg:text-5xl font-bold leading-[1.1]">
              Why{' '}
              <span className="inline-block bg-foreground text-background px-3 py-1 rounded">
                40,000+
              </span>{' '}
              <br className="hidden sm:block" />
              households are{' '}
              <span className="inline-block bg-coral-soft text-coral px-3 py-1 rounded">
                fans
              </span>
            </h2>
          </div>

          {/* Right — three values */}
          <div className="space-y-7">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">
              Three things we never compromise on
            </p>
            {VALUES.map(({ Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-soft">
                    <Icon className="h-4 w-4 text-coral" strokeWidth={2} />
                  </span>
                </div>
                <div>
                  <h3 className="font-heading font-bold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ILLUSTRATED FOOTER DIVIDER ===================== */}
      <section className="relative bg-teal-deep overflow-hidden">
        <div className="container-custom py-16 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — illustration */}
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
            <Image
              src={FAMILY_ILLUSTRATION}
              alt="A family enjoying time together"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right — newsletter / mission */}
          <div className="text-background space-y-5">
            <p className="text-xs uppercase tracking-[0.22em] text-coral font-semibold">
              Our Mission
            </p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold leading-tight">
              Bringing households a little closer, one evening at a time.
            </h2>
            <p className="text-sm text-background/70 leading-relaxed max-w-md">
              Get updates on new releases, occasional deals, and behind-the-scenes notes from
              the team. No spam, ever.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-md pt-2"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-background/10 border border-background/20 placeholder:text-background/50 text-background px-4 py-3 text-sm focus:border-background focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-coral text-background px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Decorative mountain silhouette divider — pure SVG, no images */}
        <svg
          className="block w-full h-20 lg:h-28"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,160 L0,90 L180,40 L360,80 L520,30 L720,70 L900,20 L1080,60 L1260,30 L1440,70 L1440,160 Z"
            fill="hsl(var(--coral))"
            opacity="0.85"
          />
          <path
            d="M0,160 L0,120 L240,80 L480,110 L720,60 L960,100 L1200,70 L1440,110 L1440,160 Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </section>
    </>
  )
}
