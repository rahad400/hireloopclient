import Link from "next/link"
import { TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { heroBannerContent, trendingSearches } from "@/lib/hero-banner-content"

/**
 * Quick links to the searches people use most.
 *
 * Each chip is a real link, not a decorative badge, so it can be opened in a
 * new tab and is announced correctly by screen readers. `Badge` provides the
 * pill styling and `render` swaps its default `span` for `next/link`.
 */
export function TrendingSearchLinks() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-7">
      <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
        <TrendingUp className="size-4 text-brand-strong" aria-hidden="true" />
        {heroBannerContent.trendingLabel}
      </span>

      {trendingSearches.map((search) => (
        <Badge
          key={search.query}
          variant="outline"
          render={
            <Link href={`/jobs?query=${encodeURIComponent(search.query)}`} />
          }
          className="h-8 rounded-full border-white/10 bg-night-raised px-3.5 text-xs font-normal text-ink transition-colors hover:border-brand/50 hover:bg-brand/15! hover:text-white! focus-visible:ring-2 focus-visible:ring-brand/60"
        >
          {search.label}
        </Badge>
      ))}
    </div>
  )
}
