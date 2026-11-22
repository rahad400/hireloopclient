import { TriangleAlert } from "lucide-react"

import { primaryButtonClassName } from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { EmptyState } from "@/components/shared/empty-state"

type ManageJobsErrorProps = {
  message: string
  onRetry: () => void
}

/** Shown when the jobs API cannot be reached. */
export function ManageJobsError({ message, onRetry }: ManageJobsErrorProps) {
  return (
    <EmptyState
      icon={TriangleAlert}
      iconClassName="bg-destructive/15 text-destructive"
      title="Could not load job posts"
      description={<>{message} Make sure the API is running, then try again.</>}
      containerClassName="flex flex-col items-center gap-4 px-6 py-20 text-center"
      action={
        <button
          type="button"
          onClick={onRetry}
          className={primaryButtonClassName}
        >
          Try again
        </button>
      }
    />
  )
}
