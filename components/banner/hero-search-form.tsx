import { MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { heroBannerContent } from "@/lib/hero-banner-content"

/**
 * Job search entry point inside the banner.
 *
 * Why a native form?
 * - It works before JavaScript loads and gives browsers the expected
 *   "submit with Enter" behaviour for free.
 * - A GET submit produces a shareable URL such as
 *   `/jobs?query=designer&location=berlin`.
 *
 * Layout:
 * - Phones: fields stack vertically, with a horizontal divider.
 * - `sm` and up: one horizontal bar, with vertical dividers.
 */
export function HeroSearchForm() {
  return (
    <form
      role="search"
      action="/jobs"
      method="get"
      aria-label="Search open jobs"
      className="mt-8 w-full sm:mt-10"
    >
      {/*
        The shell owns the border, radius and focus treatment. That way the
        two inputs and the button read as one control instead of three boxes.
      */}
      <div className="flex w-full flex-col rounded-2xl border border-white/15 bg-night-soft/90 p-2 shadow-[0_24px_70px_-32px_rgba(0,0,0,0.95)] backdrop-blur-sm transition-colors focus-within:border-white/25 sm:flex-row sm:items-center sm:gap-1">
        {/* Job title / skill field */}
        <div className="flex min-w-0 flex-1 items-center gap-2 px-2.5 sm:px-3">
          <Search
            className="size-4 shrink-0 text-ink-muted"
            aria-hidden="true"
          />
          <label htmlFor="hero-job-query" className="sr-only">
            {heroBannerContent.searchPlaceholder}
          </label>
          <Input
            id="hero-job-query"
            name="query"
            type="search"
            autoComplete="off"
            placeholder={heroBannerContent.searchPlaceholder}
            className="h-11 min-w-0 border-0 bg-transparent px-0 text-base text-ink shadow-none placeholder:text-ink-muted focus-visible:ring-2 focus-visible:ring-brand/50 md:text-base dark:bg-transparent"
          />
        </div>

        {/*
          The divider follows the layout: horizontal while the fields are
          stacked, vertical once they sit side by side.
        */}
        <Separator className="bg-white/10 sm:hidden" />
        <Separator
          orientation="vertical"
          className="hidden h-8 self-center bg-white/10 sm:block"
        />

        {/* Location field */}
        <div className="flex min-w-0 flex-1 items-center gap-2 px-2.5 sm:px-3">
          <MapPin
            className="size-4 shrink-0 text-ink-muted"
            aria-hidden="true"
          />
          <label htmlFor="hero-job-location" className="sr-only">
            {heroBannerContent.locationPlaceholder}
          </label>
          <Input
            id="hero-job-location"
            name="location"
            type="text"
            autoComplete="address-level2"
            placeholder={heroBannerContent.locationPlaceholder}
            className="h-11 min-w-0 border-0 bg-transparent px-0 text-base text-ink shadow-none placeholder:text-ink-muted focus-visible:ring-2 focus-visible:ring-brand/50 md:text-base dark:bg-transparent"
          />
        </div>

        {/*
          Full-width on phones for an easy thumb target, auto width on larger
          screens. The visible label is clearer than an icon-only button.
        */}
        <Button
          type="submit"
          className="mt-2 h-11 w-full gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-brand-foreground shadow-[0_14px_34px_-16px_rgba(92,83,254,0.95)] hover:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-night-soft sm:mt-0 sm:w-auto"
        >
          <Search className="size-4" aria-hidden="true" />
          {heroBannerContent.searchButtonLabel}
        </Button>
      </div>
    </form>
  )
}
