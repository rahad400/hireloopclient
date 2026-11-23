import type { ReactNode } from "react"
import { Briefcase, Building2, Clock3, Globe, Layers, MapPin } from "lucide-react"

import {
  detailBadgeClassName,
  detailPanelClassName,
} from "@/components/employer/job-details/ts/job-details-styles"
import {
  formatSalaryFrequency,
  getWorkMode,
} from "@/components/employer/job-details/ts/job-details-utils"
import { JobCategoryIcon } from "@/components/employer/manage-jobs/job-category-icon"
import { JobStatusBadge } from "@/components/employer/manage-jobs/job-status-badge"
import {
  formatJobLocation,
  formatPostedAgo,
  getJobCompensation,
  getJobStatus,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { cn } from "cn"

type BrowseJobDetailsHeroProps = {
  job: EmployerJob
  /** Apply / Save buttons, kept in their own client component. */
  children: ReactNode
}

/** Job identity, quick badges, salary and the seeker action buttons. */
export function BrowseJobDetailsHero({
  job,
  children,
}: BrowseJobDetailsHeroProps) {
  const compensation = getJobCompensation(job)
  const salary = compensation.unit
    ? `${compensation.amount}/${compensation.unit}`
    : compensation.amount

  return (
    <section
      className={cn(
        detailPanelClassName,
        "relative p-5 sm:p-7",
        "bg-[radial-gradient(circle_at_top_right,rgba(92,83,254,0.12),transparent_45%)]"
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex min-w-0 items-start gap-3 sm:gap-4">
            <JobCategoryIcon
              category={job.category}
              className="size-12 rounded-xl sm:size-14 [&_svg]:size-6"
            />

            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-[22px] leading-tight font-semibold tracking-[-0.01em] text-ink sm:text-[30px]">
                  {job.title}
                </h1>
                <JobStatusBadge status={getJobStatus(job)} className="h-7 px-3" />
              </div>

              <p className="flex items-center gap-1.5 text-sm text-ink-muted">
                <Building2 aria-hidden="true" className="size-4 shrink-0" />
                <span className="truncate">{job.company}</span>
              </p>

              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin aria-hidden="true" className="size-3.5" />
                  {formatJobLocation(job)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 aria-hidden="true" className="size-3.5" />
                  {formatPostedAgo(job.createdAt)}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className={detailBadgeClassName}>
              <Layers aria-hidden="true" className="size-3.5 text-ink-muted" />
              {job.category || "General"}
            </span>
            <span className={detailBadgeClassName}>
              <Briefcase
                aria-hidden="true"
                className="size-3.5 text-ink-muted"
              />
              {job.type}
            </span>
            <span className={detailBadgeClassName}>
              <Globe aria-hidden="true" className="size-3.5 text-ink-muted" />
              {getWorkMode(job.isRemote)}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:items-end lg:min-w-[210px]">
          <div className="flex flex-col gap-0.5 sm:items-end">
            <span className="text-[10px] font-medium tracking-[0.08em] text-ink-muted/60 uppercase">
              Salary · {formatSalaryFrequency(job.frequency)}
            </span>
            <span className="text-xl font-semibold text-ink">{salary}</span>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
