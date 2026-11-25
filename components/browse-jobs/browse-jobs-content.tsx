"use client"

import { BrowseJobsFilters } from "@/components/browse-jobs/browse-jobs-filters"
import { BrowseJobsHeader } from "@/components/browse-jobs/browse-jobs-header"
import { BrowseJobsList } from "@/components/browse-jobs/browse-jobs-list"
import { allFilterValue, defaultSortValue } from "@/components/browse-jobs/ts/browse-jobs-constants"
import type { BrowseJobsContentProps } from "@/components/browse-jobs/ts/browse-jobs-types"
import { useRouter } from "next/navigation"
import { useState } from "react"

/** Query keys the "Clear Filters" button removes. */
const filterParamNames = [
  "category",
  "type",
  "location",
  "isRemote",
  "company",
  "frequency",
  "status",
] as const

/** Composes the sticky top section, filter sidebar and job list. */
export function BrowseJobsContent({ jobs, sort }: BrowseJobsContentProps) {
  // Bumping this value remounts the filter selects so they reset to "All".
  const [filterResetKey, setFilterResetKey] = useState(0)
  const router = useRouter()
  function handleSearchSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    const searchData = new FormData(e.currentTarget)
    const data = Object.fromEntries(searchData.entries())
    const search = data.searchField
    const params = new URLSearchParams()
    params.set("search", search as string)
    router.push(`/browse-jobs?${params.toString()}`)
    // console.log(search)
  }

  function handleFilterChange(name: string, value: string) {
    // Start from the current URL so other filters (and search) are kept.
    const params = new URLSearchParams(window.location.search)

    if (value === allFilterValue) {
      // "All ..." means no filter, so remove the key entirely.
      params.delete(name)
    } else {
      params.set(name, value)
    }

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs")
  }

  function handleClearFilters() {
    // Keep non-filter params such as `search`, remove only the filters.
    const params = new URLSearchParams(window.location.search)
    for (const name of filterParamNames) {
      params.delete(name)
    }

    setFilterResetKey((key) => key + 1)

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs")
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    // Keep every filter/search param and only change the sort.
    const params = new URLSearchParams(window.location.search)
    const value = event.currentTarget.value

    if (value === defaultSortValue) {
      // "Most Recent" is the default, so keep the URL clean.
      params.delete("sort")
    } else {
      params.set("sort", value)
    }

    const query = params.toString()
    router.push(query ? `/browse-jobs?${query}` : "/browse-jobs")
  }

  const filterProps = {
    jobs,
    onFilterChange: handleFilterChange,
    onClearFilters: handleClearFilters,
  }

  return (
    <div className="min-h-svh bg-[#09090D] text-white lg:bg-night lg:text-ink">
      <BrowseJobsHeader
        {...filterProps}
        jobsCount={jobs.length}
        filterResetKey={filterResetKey}
        sortValue={sort}
        onSearchSubmit={handleSearchSubmit}
        onSortChange={handleSortChange}
      />

      <div className="mx-auto w-full max-w-[1600px] px-4 py-5 pb-10 sm:px-6 lg:px-8 lg:py-6 lg:pb-10">
        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden h-fit rounded-xl border border-white/[0.07] bg-night-soft p-4 lg:sticky lg:top-60 lg:block lg:max-h-[calc(100vh-16rem)] lg:self-start lg:overflow-y-auto">
            <BrowseJobsFilters key={filterResetKey} {...filterProps} />
          </aside>
          <section aria-label="Job listings" className="min-w-0">
            <BrowseJobsList jobs={jobs} />
          </section>
        </div>
      </div>
    </div>
  )
}
