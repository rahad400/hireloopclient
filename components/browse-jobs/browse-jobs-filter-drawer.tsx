"use client"

import { SlidersHorizontal } from "lucide-react"

import { BrowseJobsFilters } from "@/components/browse-jobs/browse-jobs-filters"
import type { BrowseJobsFilterDrawerProps } from "@/components/browse-jobs/ts/browse-jobs-types"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

/** Tablet and mobile filter drawer. The desktop sidebar stays unchanged. */
export function BrowseJobsFilterDrawer({
  resetKey,
  ...props
}: BrowseJobsFilterDrawerProps) {
  return (
    <Sheet >
      <SheetTrigger className="  flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm font-medium text-ink transition-colors hover:bg-white/[0.07] sm:w-auto lg:hidden">
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        Filters
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[min(88vw,22rem)] max-w-none overflow-y-auto border-white/10 bg-night-soft text-ink"
      >
        <SheetHeader className="pr-10">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="px-4 pb-4">
          <BrowseJobsFilters key={resetKey} {...props} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
