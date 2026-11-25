import { Banknote, MapPin } from "lucide-react"
import Link from "next/link"

import { BrowseJobCardActions } from "@/components/browse-jobs/browse-job-card-actions"
import { JobCategoryIcon } from "@/components/employer/manage-jobs/job-category-icon"
import {
  formatJobLocation,
  getJobCompensation,
  getJobStatus,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { Badge } from "@/components/ui/badge"
import { cn } from "cn"

/** Job card with the mobile Figma layout and the original desktop layout. */
export function BrowseJobCard({ job }: { job: EmployerJob }) {
  const compensation = getJobCompensation(job)
  const salary = compensation.unit
    ? `${compensation.amount}/${compensation.unit}`
    : compensation.amount
  const status = getJobStatus(job)

  return (
    <article className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#17171D] p-4 transition-colors hover:border-[#6545F5]/30 lg:border-white/[0.07] lg:bg-night-soft lg:hover:border-brand/30">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <JobCategoryIcon
          category={job.category}
          className="size-11 shrink-0 rounded-lg lg:size-10"
        />

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3 lg:flex-wrap lg:items-center lg:justify-start lg:gap-x-2 lg:gap-y-1">
            <div className="min-w-0 lg:contents">
              <Link
                href={`/browse-jobs/${job._id}`}
                className="block truncate text-[15px] font-semibold text-white lg:text-sm lg:text-ink"
              >
                {job.title}
              </Link>

              <p className="mt-1 truncate text-[12px] text-[#A0A0AB] lg:hidden">
                {job.company}
                <span aria-hidden="true" className="px-1.5">
                  •
                </span>
                {job.category}
              </p>
            </div>

            <Badge
              variant="outline"
              className="hidden border-white/10 bg-white/[0.03] text-[11px] text-ink lg:inline-flex"
            >
              {job.type}
            </Badge>
            <Badge
              variant="outline"
              className="hidden border-white/10 bg-white/[0.03] text-[11px] text-ink lg:inline-flex"
            >
              {job.isRemote ? "Remote" : "On-site"}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "hidden text-[11px] lg:inline-flex",
                status === "Active"
                  ? "border-brand/25 bg-brand/10 text-brand-strong"
                  : "border-white/10 bg-white/[0.03] text-ink-muted"
              )}
            >
              {status}
            </Badge>
          </div>

          <p className="mt-1.5 hidden truncate text-xs text-ink-muted lg:block">
            {job.company}
            <span aria-hidden="true" className="px-1.5">
              •
            </span>
            {job.category}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[#A0A0AB] lg:mt-1 lg:gap-x-3 lg:gap-y-1 lg:text-xs lg:text-ink-muted">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{formatJobLocation(job)}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Banknote className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="font-medium text-white lg:text-ink">{salary}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-3 lg:pl-4">
        <Badge
          variant="outline"
          className="border-[#6545F5]/30 bg-[#6545F5]/10 text-[10px] text-[#B9A7FF] lg:hidden"
        >
          {status}
        </Badge>

        <BrowseJobCardActions job={job} />
      </div>
    </article>
  )
}
