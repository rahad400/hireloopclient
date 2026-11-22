import Link from "next/link"
import { ArrowLeft, FileQuestion } from "lucide-react"

import { detailPanelClassName } from "@/components/employer/job-details/ts/job-details-styles"
import { primaryButtonClassName } from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { cn } from "cn"

/** Shown when the requested job id no longer exists. */
export function JobDetailsNotFound() {
  return (
    <div
      className={cn(
        detailPanelClassName,
        "mx-auto flex w-full max-w-xl flex-col items-center gap-3 px-6 py-14 text-center"
      )}
    >
      <span
        aria-hidden="true"
        className="flex size-12 items-center justify-center rounded-xl bg-white/[0.04] text-[#8b8b95]"
      >
        <FileQuestion className="size-6" />
      </span>

      <h1 className="text-xl font-semibold text-[#ededef]">
        Job post not found
      </h1>

      <p className="max-w-sm text-[13px] leading-6 text-[#8b8b95]">
        This listing may have been deleted, or the link is no longer valid. Head
        back to Manage Jobs to see your current posts.
      </p>

      <Link
        href="/employer/jobs"
        className={cn(primaryButtonClassName, "mt-2 w-fit justify-center")}
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to Manage Jobs
      </Link>
    </div>
  )
}
