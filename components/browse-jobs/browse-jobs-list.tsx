import { BrowseJobCard } from "@/components/browse-jobs/browse-job-card"
import { BrowseJobsEmptyState } from "@/components/browse-jobs/browse-jobs-empty-state"
import type { BrowseJobsListProps } from "@/components/browse-jobs/ts/browse-jobs-types"

/** One-column job list with a shared empty state. */
export function BrowseJobsList({ jobs }: BrowseJobsListProps) {
  if (jobs.length === 0) {
    return <BrowseJobsEmptyState />
  }

  return (
    <div className="flex flex-col gap-3">
      {jobs.map((job) => (
        <BrowseJobCard key={job._id} job={job} />
      ))}
    </div>
  )
}
