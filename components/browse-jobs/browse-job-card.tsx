import { Banknote, MapPin } from "lucide-react"

import { BrowseJobCardActions } from "@/components/browse-jobs/browse-job-card-actions"
import { JobCategoryIcon } from "@/components/employer/manage-jobs/job-category-icon"
import {
  formatJobLocation,
  getJobCompensation,
  getJobStatus,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { Badge } from "@/components/ui/badge"

/** Compact one-row job card with the key details from the Figma design. */
export function BrowseJobCard({ job }: { job: EmployerJob }) {
  const compensation = getJobCompensation(job)
  const salary = compensation.unit
    ? `${compensation.amount}/${compensation.unit}`
    : compensation.amount
  const status = getJobStatus(job)

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-night-soft p-3 transition-colors hover:border-brand/30 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <JobCategoryIcon
          category={job.category}
          className="size-10 shrink-0 rounded-lg"
        />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="truncate text-sm font-semibold text-ink">
              {job.title}
            </h3>
            <Badge
              variant="outline"
              className="border-white/10 bg-white/[0.03] text-[11px] text-ink"
            >
              {job.type}
            </Badge>
            <Badge
              variant="outline"
              className="border-white/10 bg-white/[0.03] text-[11px] text-ink"
            >
              {job.isRemote ? "Remote" : "On-site"}
            </Badge>
            <Badge
              variant="outline"
              className={
                status === "Active"
                  ? "border-brand/25 bg-brand/10 text-[11px] text-brand-strong"
                  : "border-white/10 bg-white/[0.03] text-[11px] text-ink-muted"
              }
            >
              {status}
            </Badge>
          </div>

          <p className="mt-1 truncate text-xs text-ink-muted">
            {job.company}
            <span aria-hidden="true" className="px-1.5">
              •
            </span>
            {job.category}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{formatJobLocation(job)}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Banknote className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="font-medium text-ink">{salary}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="shrink-0 sm:pl-4">
        <BrowseJobCardActions job={job} />
      </div>
    </article>
  )
}
