import { SearchX } from "lucide-react"

import { secondaryButtonClassName } from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import type { JobStatusFilter } from "@/components/employer/manage-jobs/ts/employer-job"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"

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
    <EmptyState
      icon={SearchX}
      iconClassName="bg-[#1a1a1f] text-[#a0a0ab]"
      title="No matching job posts"
      description={message}
      containerClassName="flex flex-col items-center gap-4 px-6 py-16 text-center"
      action={
        <Button
          type="button"
          onClick={onClear}
          className={secondaryButtonClassName}
        >
          Clear filters
        </Button>
      }
    />
  )
}
