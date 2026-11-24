import Link from "next/link"
import { FileText, SearchX } from "lucide-react"

import { primaryButtonClassName } from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { EmptyState } from "@/components/shared/empty-state"
import { cn } from "cn"

/** Either the account has no applications yet, or the filters found none. */
export function ApplicationsEmpty({
  variant,
}: {
  variant: "no-applications" | "no-results"
}) {
  const noApplications = variant === "no-applications"

  return (
    <EmptyState
      icon={noApplications ? FileText : SearchX}
      iconClassName="bg-white/[0.04] text-ink-muted"
      title={noApplications ? "No applications yet" : "No matching applications"}
      description={
        noApplications
          ? "Browse the job board and apply to a role to see it here."
          : "Try a different search term or clear the filters to see all applications."
      }
      containerClassName="flex w-full flex-col items-center gap-3 px-6 py-16 text-center"
      action={
        <Link
          href="/browse-jobs"
          className={cn(primaryButtonClassName, "mt-2 w-fit flex items-center justify-center ")}
        >
          Browse Jobs
        </Link>
      }
    />
  )
}
