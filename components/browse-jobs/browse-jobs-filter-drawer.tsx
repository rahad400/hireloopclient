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

/** Compact mobile filter button and the shared filter drawer. */
export function BrowseJobsFilterDrawer({
  resetKey,
  ...props
}: BrowseJobsFilterDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger className="inline-flex h-10 w-auto shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#17171D] px-3 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.07] lg:hidden lg:bg-white/[0.03] lg:text-sm lg:text-ink">
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
