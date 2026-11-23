import Link from "next/link"
import { ArrowLeft, FileQuestion } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { primaryButtonClassName } from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { cn } from "cn"

/** Shown when a browse-jobs detail link is invalid or the job was removed. */
export default function BrowseJobDetailsNotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-night px-4 py-16 text-ink">
      <EmptyState
        icon={FileQuestion}
        iconClassName="bg-white/[0.04] text-ink-muted"
        title="Job not found"
        titleAs="h1"
        titleClassName="text-xl font-semibold text-ink"
        description="This job may have been removed or the link is no longer valid."
        containerClassName="flex w-full max-w-xl flex-col items-center gap-3 px-6 py-14 text-center"
        action={
          <Link
            href="/browse-jobs"
            className={cn(primaryButtonClassName, "mt-2 w-fit")}
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to Browse Jobs
          </Link>
        }
      />
    </main>
  )
}
