import { ArrowUpRight, BriefcaseBusiness, CalendarDays } from "lucide-react"
import Link from "next/link"

import { AppliedAgo } from "@/components/candidate/applications/applied-ago"
import { ApplicationStatusBadge } from "@/components/candidate/applications/application-status-badge"
import { getJobSummary } from "@/components/candidate/applications/ts/application-utils"
import type { CandidateApplication } from "@/components/candidate/applications/ts/candidate-application"
import { JobCategoryIcon } from "@/components/employer/manage-jobs/job-category-icon"

/** One application as a stacked card on small screens. */
export function ApplicationCard({
  application,
}: {
  application: CandidateApplication
}) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-night-soft p-3 transition-colors hover:border-brand/30">
      <div className="flex min-w-0 items-start gap-3">
        <JobCategoryIcon
          category={application.category ?? "Other"}
          className="size-10 shrink-0 rounded-lg"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="truncate text-sm font-semibold text-ink">
              {application.jobTitle}
            </h3>
            <ApplicationStatusBadge status={application.status} />
          </div>

          <p className="mt-1 truncate text-xs text-ink-muted">
            {application.company}
            <span aria-hidden="true" className="px-1.5">
              •
            </span>
            {application.category ?? "Other"}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
              <AppliedAgo application={application} showExactDate />
            </span>
            <span className="flex items-center gap-1.5">
              <BriefcaseBusiness
                className="size-3.5 shrink-0"
                aria-hidden="true"
              />
              {getJobSummary(application)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end sm:pl-4">
        <Link
          href={`/browse-jobs/${encodeURIComponent(application.jobId)}`}
          className="inline-flex items-center gap-1 text-[12px] font-medium text-[#ededef] transition-colors hover:text-brand-strong focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
        >
          Details
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </article>
  )
}

/** Mobile replacement for the table; uses the same data and actions. */
export function ApplicationsCards({
  applications,
}: {
  applications: CandidateApplication[]
}) {
  return (
    <div className="grid gap-3 md:hidden">
      {applications.map((application) => (
        <ApplicationCard key={application._id} application={application} />
      ))}
    </div>
  )
}
