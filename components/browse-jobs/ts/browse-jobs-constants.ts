import {
  jobCategoryOptions,
  jobTypeOptions,
} from "@/components/employer/manage-jobs/ts/employer-job"

import type { FilterOption } from "@/components/browse-jobs/ts/browse-jobs-types"

/** Value used by every dropdown's "All" option. */
export const allFilterValue = "all"

/** Build options from job data and keep the list free of duplicates. */
export function createFilterOptions(
  values: string[],
  allLabel: string
): FilterOption[] {
  const uniqueValues = Array.from(new Set(values.filter(Boolean))).sort()

  return [
    { value: allFilterValue, label: allLabel },
    ...uniqueValues.map((value) => ({ value, label: value })),
  ]
}

export const categoryFilterOptions: FilterOption[] = createFilterOptions(
  [...jobCategoryOptions],
  "All Categories"
)

export const jobTypeFilterOptions: FilterOption[] = createFilterOptions(
  [...jobTypeOptions],
  "All Job Types"
)

export const workModeFilterOptions: FilterOption[] = [
  { value: allFilterValue, label: "All Work Modes" },
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
]

export const salaryFrequencyFilterOptions: FilterOption[] = [
  { value: allFilterValue, label: "All Frequencies" },
  { value: "per hour", label: "Per hour" },
  { value: "per month", label: "Per month" },
  { value: "per year", label: "Per year" },
]

export const statusFilterOptions: FilterOption[] = [
  { value: allFilterValue, label: "All Statuses" },
  { value: "Active", label: "Active" },
  { value: "Expired", label: "Expired" },
]

/** Options from the Figma "Sort jobs" dropdown. */
export const sortOptions: FilterOption[] = [
  { value: "most-recent", label: "Most Recent" },
  { value: "highest-salary", label: "Highest Salary" },
  { value: "most-relevant", label: "Most Relevant" },
  { value: "oldest", label: "Oldest" },
]
