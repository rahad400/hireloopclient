import { SearchX } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"

/** Message shown when the job board has no jobs to display. */
export function BrowseJobsEmptyState() {
  return (
    <EmptyState
      icon={SearchX}
      iconClassName="bg-brand/10 text-brand-strong"
      title="No jobs found"
      description="Try another search or filter to see more listings."
      containerClassName="flex flex-col items-center gap-4 px-6 py-14 text-center"
    />
  )
}
