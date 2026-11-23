"use client"

import { Search } from "lucide-react"

import type { BrowseJobsSearchProps } from "@/components/browse-jobs/ts/browse-jobs-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

/** Search input and button used in the sticky browse header. */
export function BrowseJobsSearch({ onSearchSubmit }: BrowseJobsSearchProps) {
  return (
    <form
      role="search"
      aria-label="Search jobs"
      onSubmit={onSearchSubmit}
      className="min-w-0 w-full "
    >
      <div className="flex w-full flex-col gap-2 rounded-xl border border-white/10 bg-night-soft p-2 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-2 px-2.5">
          <label htmlFor="browse-job-search" className="sr-only">
            Search by job title, keywords...
          </label>
          <Input
            id="browse-job-search"
            name="searchField"
            type="search"
            autoComplete="off"
            placeholder="Search by job title, keywords..."
            className="h-10 min-w-0 border-0 bg-transparent px-0 text-sm shadow-none placeholder:text-ink-muted focus-visible:ring-2 focus-visible:ring-brand/50 dark:bg-transparent"
          />
        </div>

        <Button
          type="submit"
          className="h-10 w-full gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand/60 sm:w-auto"
        >
          <Search className="size-4" aria-hidden="true" />
          Search Jobs
        </Button>
      </div>
    </form>
  )
}
