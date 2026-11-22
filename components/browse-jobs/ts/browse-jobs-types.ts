import type { EmployerJob } from "@/components/employer/manage-jobs/ts/employer-job"

/** One label/value pair used by a browse filter select. */
export type FilterOption = {
  value: string
  label: string
}

/** Placeholder handlers. Add your own logic inside them when you are ready. */
export type SearchSubmitHandler = () => void
export type FilterChangeHandler = () => void

export type BrowseJobsContentProps = {
  jobs: EmployerJob[]
}

export type BrowseJobsSearchProps = {
  onSearchSubmit: SearchSubmitHandler
}

export type BrowseJobsFiltersProps = {
  jobs: EmployerJob[]
  onFilterChange: FilterChangeHandler
  onClearFilters: FilterChangeHandler
  onSaveFilters: FilterChangeHandler
}

export type BrowseJobsHeaderProps = BrowseJobsSearchProps &
  BrowseJobsFiltersProps & {
    jobsCount: number
    onSortChange: FilterChangeHandler
  }

export type BrowseJobsListProps = {
  jobs: EmployerJob[]
}
