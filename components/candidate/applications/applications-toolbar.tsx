import { ChevronDown, Search } from "lucide-react"

import {
  applicationSortOptions,
  type ApplicationSort,
} from "@/components/candidate/applications/ts/candidate-application"
import {
  toolbarInputClassName,
  toolbarSelectClassName,
} from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { Input } from "@/components/ui/input"

type ApplicationsToolbarProps = {
  searchTerm: string
  onSearchTermChange: (searchTerm: string) => void
  company: string
  onCompanyChange: (company: string) => void
  sort: ApplicationSort
  onSortChange: (sort: ApplicationSort) => void
  companyOptions: string[]
  visibleCount: number
  totalCount: number
  hasActiveFilters: boolean
  onClearFilters: () => void
}

/** Search, company filter, sort select and the result count. */
export function ApplicationsToolbar({
  searchTerm,
  onSearchTermChange,
  company,
  onCompanyChange,
  sort,
  onSortChange,
  companyOptions,
  visibleCount,
  totalCount,
  hasActiveFilters,
  onClearFilters,
}: ApplicationsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-[760px] lg:flex-1">
        <div className="relative w-full sm:flex-1">
          <label htmlFor="application-search" className="sr-only">
            Search applications
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted/70"
          />
          <Input
            id="application-search"
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="Search job title or company..."
            autoComplete="off"
            className={toolbarInputClassName}
          />
        </div>

        <div className="relative w-full sm:w-[180px] sm:shrink-0">
          <label htmlFor="application-company" className="sr-only">
            Filter by company
          </label>
          <select
            id="application-company"
            value={company}
            onChange={(event) => onCompanyChange(event.target.value)}
            className={toolbarSelectClassName}
          >
            <option value="all">All companies</option>
            {companyOptions.map((companyName) => (
              <option key={companyName} value={companyName}>
                {companyName}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-muted"
          />
        </div>

        <div className="relative w-full sm:w-[170px] sm:shrink-0">
          <label htmlFor="application-sort" className="sr-only">
            Sort applications
          </label>
          <select
            id="application-sort"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as ApplicationSort)
            }
            className={toolbarSelectClassName}
          >
            {applicationSortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-muted"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 lg:shrink-0">
        <p className="text-xs text-ink-muted">
          Showing <span className="font-medium text-ink">{visibleCount}</span>{" "}
          of {totalCount} applications
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="cursor-pointer rounded-sm text-xs font-medium text-brand-strong hover:underline focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
