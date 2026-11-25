"use client"

import { BrowseJobsFilterDrawer } from "@/components/browse-jobs/browse-jobs-filter-drawer"
import { BrowseJobsSearch } from "@/components/browse-jobs/browse-jobs-search"
import { sortOptions } from "@/components/browse-jobs/ts/browse-jobs-constants"
import type { BrowseJobsHeaderProps } from "@/components/browse-jobs/ts/browse-jobs-types"
import { JobSelect } from "@/components/employer/add-job/job-select"
import Link from "next/link"

/** Mobile hero plus the shared search, filters, count and sort controls. */
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
    <header className="static z-31 w-full border-b border-white/[0.08] bg-[#09090D] pt-5 pb-4 lg:sticky lg:top-[84px] lg:border-white/[0.06] lg:bg-night lg:pt-4 lg:pb-0">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-4">
          <div className="order-1 lg:hidden">
            <h1 className="text-[28px] leading-[34px] font-bold text-white">
              Find your <span className="text-[#6545F5]">next job</span>
            </h1>
            <p className="mt-2 text-[13px] leading-5 text-[#A0A0AB]">
              Explore opportunities that match your skills.
            </p>
          </div>

          <div className="order-2 lg:order-3 lg:min-w-0 lg:flex-1">
            <BrowseJobsSearch onSearchSubmit={onSearchSubmit} />
          </div>

          <div className="order-3 flex items-center gap-3 lg:hidden">
            <Link
              href={"/browse-jobs"}
              className="mr-auto shrink-0 text-[15px] font-semibold tracking-tight whitespace-nowrap text-[#6545F5]"
            >
              Browse Jobs
            </Link>

            <span aria-hidden className="h-5 w-px bg-white/10" />

            <BrowseJobsFilterDrawer
              jobs={jobs}
              onFilterChange={onFilterChange}
              onClearFilters={onClearFilters}
              resetKey={filterResetKey}
            />
          </div>

          <Link
            href={"/browse-jobs"}
            className="hidden shrink-0 text-xl font-semibold tracking-tight whitespace-nowrap text-[#554de5] lg:order-1 lg:block"
          >
            Browse Jobs
          </Link>

          <span
            aria-hidden
            className="hidden h-6 w-px bg-white/10 lg:order-2 lg:block"
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4 lg:mt-0 lg:border-white/[0.06] lg:py-3">
          <h2 className="text-[13px] font-semibold text-white lg:text-base lg:text-ink">
            <span className="lg:hidden">{jobsCount} Jobs Found</span>
            <span className="hidden lg:inline">
              Found {jobsCount} Professional Jobs
            </span>
          </h2>

          <div className="flex shrink-0 items-center gap-2">
            <label
              htmlFor="browse-job-sort"
              className="text-[12px] text-[#A0A0AB] lg:text-xs lg:text-ink-muted"
            >
              Sort by:
            </label>
            <JobSelect
              id="browse-job-sort"
              name="sort"
              value={sortValue}
              onChange={onSortChange}
              className="h-10 w-32 text-[12px] lg:h-9 lg:w-36 lg:text-[13px]"
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
