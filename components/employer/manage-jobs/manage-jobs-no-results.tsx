import { SearchX } from "lucide-react"

import {
  panelClassName,
  secondaryButtonClassName,
} from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import type { JobStatusFilter } from "@/components/employer/manage-jobs/ts/employer-job"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

type ManageJobsNoResultsProps = {
  query: string
  status: JobStatusFilter
  onClear: () => void
}

/** Shown when the search and status filter hide every job post. */
export function ManageJobsNoResults({
  query,
  status,
  onClear,
}: ManageJobsNoResultsProps) {
  const trimmedQuery = query.trim()

  const message =
    trimmedQuery && status !== "all"
      ? `Nothing matches “${trimmedQuery}” with the ${status} filter.`
      : trimmedQuery
        ? `Nothing matches “${trimmedQuery}”. Try a title, company, category, or location.`
        : `There are no ${status.toLowerCase()} job posts right now.`

  return (
    <div
      className={cn(
        panelClassName,
        "flex flex-col items-center gap-4 px-6 py-16 text-center"
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-[#1a1a1f] text-[#a0a0ab]">
        <SearchX aria-hidden="true" className="size-5" />
      </span>

      <div className="flex flex-col gap-1">
        <p className="text-base font-medium text-[#ededef]">
          No matching job posts
        </p>
        <p className="max-w-sm text-[13px] leading-5 text-[#8b8b95]">
          {message}
        </p>
      </div>

      <Button
        type="button"
        onClick={onClear}
        className={secondaryButtonClassName}
      >
        Clear filters
      </Button>
    </div>
  )
}
