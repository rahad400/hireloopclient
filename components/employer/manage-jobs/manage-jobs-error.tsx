import { TriangleAlert } from "lucide-react"

import {
  panelClassName,
  primaryButtonClassName,
} from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { cn } from "cn"

type ManageJobsErrorProps = {
  message: string
  onRetry: () => void
}

/** Shown when the jobs API cannot be reached. */
export function ManageJobsError({ message, onRetry }: ManageJobsErrorProps) {
  return (
    <div
      className={cn(
        panelClassName,
        "flex flex-col items-center gap-4 px-6 py-20 text-center"
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
        <TriangleAlert aria-hidden="true" className="size-5" />
      </span>

      <div className="flex flex-col gap-1">
        <p className="text-base font-medium text-[#ededef]">
          Could not load job posts
        </p>
        <p className="max-w-sm text-[13px] leading-5 text-[#8b8b95]">
          {message} Make sure the API is running, then try again.
        </p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className={primaryButtonClassName}
      >
        Try again
      </button>
    </div>
  )
}
