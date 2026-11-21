import Link from "next/link"
import { ChevronDown, Plus, Search } from "lucide-react"

import {
  primaryButtonClassName,
  toolbarInputClassName,
  toolbarSelectClassName,
} from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import {
  jobStatusFilterOptions,
  type JobStatusFilter,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "cn"

type ManageJobsToolbarProps = {
  query: string
  onQueryChange: (query: string) => void
  status: JobStatusFilter
  onStatusChange: (status: JobStatusFilter) => void
}

/** Search, status filter and the primary "Add New Job" action. */
export function ManageJobsToolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
}: ManageJobsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full flex-col gap-3 sm:flex-row md:max-w-[620px] md:flex-1">
        <div className="relative w-full sm:flex-1">
          <label htmlFor="job-search" className="sr-only">
            Search job posts
          </label>

          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#6b6b76]"
          />

          <Input
            id="job-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search job posts..."
            autoComplete="off"
            className={toolbarInputClassName}
          />
        </div>

        <div className="relative w-full sm:w-[150px] sm:shrink-0">
          <label htmlFor="job-status" className="sr-only">
            Filter by status
          </label>

          <select
            id="job-status"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as JobStatusFilter)
            }
            className={toolbarSelectClassName}
          >
            {jobStatusFilterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#a0a0ab]"
          />
        </div>
      </div>

      <Button
        render={<Link href="/employer/jobs/new" />}
        nativeButton={false}
        className={cn(primaryButtonClassName, "w-full md:w-auto")}
      >
        <Plus aria-hidden="true" className="size-4" />
        Add New Job
      </Button>
    </div>
  )
}
