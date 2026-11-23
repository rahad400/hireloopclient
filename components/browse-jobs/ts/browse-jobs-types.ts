import type { ChangeEvent, FormEvent } from "react"

import type { EmployerJob } from "@/components/employer/manage-jobs/ts/employer-job"

/** One label/value pair used by a browse filter select. */
export type FilterOption = {
  value: string
  label: string
}

export type SearchSubmitHandler = (event: FormEvent<HTMLFormElement>) => void
export type FilterChangeHandler = (name: string, value: string) => void
export type FilterActionHandler = () => void
export type SortChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => void

export type BrowseJobsContentProps = {
  jobs: EmployerJob[]
  /** Current sort option, read from the URL by the server page. */
  sort: string
}

export type BrowseJobsSearchProps = {
  onSearchSubmit: SearchSubmitHandler
}

export type BrowseJobsFiltersProps = {
  jobs: EmployerJob[]
  onFilterChange: FilterChangeHandler
  onClearFilters: FilterActionHandler
}

export type BrowseJobsFilterDrawerProps = BrowseJobsFiltersProps & {
  /** Changes whenever the filters are cleared so the selects reset. */
  resetKey: number
}

export type BrowseJobsHeaderProps = BrowseJobsSearchProps &
  BrowseJobsFiltersProps & {
    jobsCount: number
    /** Passed to the mobile drawer so its selects reset with the sidebar. */
    filterResetKey: number
    /** Value currently selected in the sort dropdown. */
    sortValue: string
    onSortChange: SortChangeHandler
  }

export type BrowseJobsListProps = {
  jobs: EmployerJob[]
}
