"use client"

import { BrowseJobsFilterDrawer } from "@/components/browse-jobs/browse-jobs-filter-drawer"
import { BrowseJobsSearch } from "@/components/browse-jobs/browse-jobs-search"
import { sortOptions } from "@/components/browse-jobs/ts/browse-jobs-constants"
import type { BrowseJobsHeaderProps } from "@/components/browse-jobs/ts/browse-jobs-types"
import { JobSelect } from "@/components/employer/add-job/job-select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

/** Sticky top section with the title, search bar, filters button and results count. */
export function BrowseJobsHeader({
  jobs,
  jobsCount,
  onSearchSubmit,
  onFilterChange,
  onClearFilters,
  filterResetKey,
  sortValue,
  onSortChange,
}: BrowseJobsHeaderProps) {
  return (
    <header className="sticky top-[78px] z-31 w-full border-b border-white/[0.06] bg-night sm:top-[84px]">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center gap-3 pt-0 pb-3 md:gap-4">
          <Link
            href={"/browse-jobs"}
            className="shrink-0 text-sm font-semibold tracking-tight whitespace-nowrap text-[#554de5]  sm:text-lg md:text-xl"
          >
            Browse Jobs
          </Link>

          <Separator
            orientation="vertical"
            className="hidden bg-white/10 sm:block"
          />

          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <BrowseJobsSearch onSearchSubmit={onSearchSubmit} />

            <BrowseJobsFilterDrawer
              jobs={jobs}
              onFilterChange={onFilterChange}
              onClearFilters={onClearFilters}
              resetKey={filterResetKey}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/[0.06] py-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-ink">
            Found {jobsCount} Professional Jobs
          </h2>

          <div className="flex items-center gap-2">
            <label htmlFor="browse-job-sort" className="text-xs text-ink-muted">
              Sort by:
            </label>
            <JobSelect
              id="browse-job-sort"
              name="sort"
              value={sortValue}
              onChange={onSortChange}
              className="h-9 w-36 text-[13px]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </JobSelect>
          </div>
        </div>
      </div>
    </header>
  )
}
