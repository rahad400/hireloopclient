import Link from "next/link"
import { ArrowLeft, FileQuestion } from "lucide-react"
import { cn } from "cn"

import { primaryButtonClassName } from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { EmptyState } from "@/components/shared/empty-state"

/** Shown when the requested job id no longer exists. */
export function JobDetailsNotFound() {
  return (
    <EmptyState
      icon={FileQuestion}
      iconClassName="bg-white/[0.04] text-[#8b8b95]"
      iconSizeClassName="size-6"
      title="Job post not found"
      titleAs="h1"
      titleClassName="text-xl font-semibold text-[#ededef]"
      description="This listing may have been deleted, or the link is no longer valid. Head back to Manage Jobs to see your current posts."
      descriptionClassName="max-w-sm text-[13px] leading-6 text-[#8b8b95]"
      containerClassName="mx-auto flex w-full max-w-xl flex-col items-center gap-3 px-6 py-14 text-center"
      action={
        <Link
          href="/employer/jobs"
          className={cn(primaryButtonClassName, "mt-2 w-fit justify-center")}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Manage Jobs
        </Link>
      }
    />
  )
}
