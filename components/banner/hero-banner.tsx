import Link from "next/link"
import { ArrowUpRight, Sparkles } from "lucide-react"

import { HeroSearchForm } from "@/components/banner/hero-search-form"
import { TrendingSearchLinks } from "@/components/banner/trending-search-links"
import { Badge } from "@/components/ui/badge"
import { heroBannerContent } from "@/lib/hero-banner-content"

/**
 * Homepage banner (hero).
 *
 * Composition:
 * - an announcement pill for the freshest number,
 * - the page headline and supporting copy,
 * - `HeroSearchForm` for the primary action,
 * - `TrendingSearchLinks` for people who need inspiration.
 *
 * Responsiveness:
 * - text sizes and vertical rhythm grow at `sm` and `lg`,
 * - the headline uses `text-balance` and the paragraph `text-pretty` so lines
 *   break evenly instead of leaving single words behind,
 * - the inner column is capped at `max-w-3xl` (768px) to keep line lengths
 *   comfortable on wide screens.
 *
 * Accessibility:
 * - the section is named by its `h1`,
 * - every icon is decorative (`aria-hidden`) because the adjacent text
 *   already carries the meaning,
 * - links and the submit button expose visible focus rings.
 */
export function HeroBanner() {
  return (
    <section
      aria-labelledby="hero-banner-title"
      className="relative isolate overflow-hidden px-4 pt-10 pb-20 sm:px-6 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28"
    >
      {/*
        Decorative background, hidden from assistive technology:
        1. a soft brand aurora behind the headline,
        2. a faint grid that fades out towards the bottom,
        3. a gradient that blends the section back into the page.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-64 left-1/2 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(92,83,254,0.45),rgba(92,83,254,0.14)_55%,transparent_78%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,#000_30%,transparent_100%)] bg-[size:64px_64px] opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-night" />
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {/* Announcement pill with a gradient hairline border. Flanking rules
            appear only when there is enough room for them. */}
        <div className="flex items-center gap-3">
          <span className="hidden h-px w-12 bg-linear-to-r from-transparent to-white/25 sm:block" />
          <div className="rounded-full bg-linear-to-r from-brand/70 via-white/25 to-brand/10 p-px shadow-[0_0_30px_-8px_rgba(92,83,254,0.65)]">
            <Badge
              variant="outline"
              render={<Link href={heroBannerContent.announcement.href} />}
              className="h-9 gap-2 rounded-full border-0 bg-night-raised px-4 text-xs font-medium text-ink transition-colors hover:bg-night-soft focus-visible:ring-2 focus-visible:ring-brand/60 sm:text-sm"
            >
              <Sparkles
                className="size-4 text-brand-strong"
                aria-hidden="true"
              />
              {heroBannerContent.announcement.label}
              <ArrowUpRight
                className="size-3.5 text-ink-muted"
                aria-hidden="true"
              />
            </Badge>
          </div>
          <span className="hidden h-px w-12 bg-linear-to-l from-transparent to-white/25 sm:block" />
        </div>

        <h1
          id="hero-banner-title"
          className="mt-7 text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-balance text-ink sm:mt-8 sm:text-5xl lg:text-[3.5rem]"
        >
          {heroBannerContent.title}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-ink-muted sm:mt-5 sm:text-lg lg:text-xl">
          {heroBannerContent.description}
        </p>

        <HeroSearchForm />
        <TrendingSearchLinks />
      </div>
    </section>
  )
}
