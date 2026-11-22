"use client"

import { BrowseJobsFilters } from "@/components/browse-jobs/browse-jobs-filters"
import { BrowseJobsHeader } from "@/components/browse-jobs/browse-jobs-header"
import { BrowseJobsList } from "@/components/browse-jobs/browse-jobs-list"
import type { BrowseJobsContentProps } from "@/components/browse-jobs/ts/browse-jobs-types"

/** Composes the sticky top section, filter sidebar and job list. */
export function BrowseJobsContent({ jobs }: BrowseJobsContentProps) {
  function handleSearchSubmit() {
    // TODO: Add your search logic here.
  }

  function handleFilterChange() {
    // TODO: Add your filter logic here.
  }

  function handleClearFilters() {
    // TODO: Add your clear filters logic here.
  }

  function handleSaveFilters() {
    // TODO: Add your save filters logic here.
  }

  function handleSortChange() {
    // TODO: Add your sort logic here.
  }

  const filterProps = {
    jobs,
    onFilterChange: handleFilterChange,
    onClearFilters: handleClearFilters,
    onSaveFilters: handleSaveFilters,
  }

  return (
    <div className="min-h-svh bg-night text-ink">
      <BrowseJobsHeader
        {...filterProps}
        jobsCount={jobs.length}
        onSearchSubmit={handleSearchSubmit}
        onSortChange={handleSortChange}
      />

      <div className="mx-auto w-full max-w-[1320px] px-4 py-6 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden h-fit rounded-xl border border-white/[0.07] bg-night-soft p-4 lg:sticky lg:top-36 lg:block">
            <BrowseJobsFilters {...filterProps} />
          </aside>

          <section aria-label="Job listings" className="min-w-0">
            <BrowseJobsList jobs={jobs} />
          </section>
        </div>
      </div>
    </div>
  )
}
