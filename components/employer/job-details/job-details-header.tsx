import Link from "next/link"
import { ArrowLeft, Briefcase, Building2, Globe, Layers } from "lucide-react"

import { JobCategoryIcon } from "@/components/employer/manage-jobs/job-category-icon"
import { JobStatusBadge } from "@/components/employer/manage-jobs/job-status-badge"
import {
  detailBadgeClassName,
  detailPanelClassName,
} from "@/components/employer/job-details/ts/job-details-styles"
import { getWorkMode } from "@/components/employer/job-details/ts/job-details-utils"
import {
  formatPostedAgo,
  getJobRef,
  getJobStatus,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { cn } from "cn"

/** Back navigation plus the job's identity and badges. */
export function JobDetailsHeader({ job }: { job: EmployerJob }) {
  const status = getJobStatus(job)
  const workMode = getWorkMode(job.isRemote)

  return (
    <header className="flex flex-col gap-4">
      <Link
        href="/employer/jobs"
        className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-[#a0a0ab] transition-colors hover:text-[#ededef] focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" />
        Back to Manage Jobs
      </Link>

      <div className={cn(detailPanelClassName, "p-5 sm:p-6")}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <JobCategoryIcon
              category={job.category}
              className="size-12 rounded-xl [&_svg]:size-5"
            />

            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-[24px] leading-tight font-semibold tracking-[-0.01em] text-[#ededef] sm:text-[30px]">
                  {job.title}
                </h1>

                <JobStatusBadge status={status} className="h-7 px-3" />
              </div>

              <p className="flex items-center gap-1.5 text-sm text-[#a0a0ab]">
                <Building2
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#6b6b76]"
                />
                <span className="truncate">{job.company}</span>
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className={detailBadgeClassName}>
                  <Layers
                    aria-hidden="true"
                    className="size-3.5 text-[#8b8b95]"
                  />
                  {job.category}
                </span>

                <span className={detailBadgeClassName}>
                  <Briefcase
                    aria-hidden="true"
                    className="size-3.5 text-[#8b8b95]"
                  />
                  {job.type}
                </span>

                <span className={detailBadgeClassName}>
                  <Globe
                    aria-hidden="true"
                    className="size-3.5 text-[#8b8b95]"
                  />
                  {workMode}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-0.5 text-left lg:items-end lg:text-right">
            <span className="text-[10px] font-medium tracking-[0.08em] text-[#6b6b76] uppercase">
              Job reference
            </span>
            <span className="text-[13px] font-medium text-[#d6d6dc]">
              {getJobRef(job)}
            </span>
            <span className="text-[11px] text-[#8b8b95]">
              {formatPostedAgo(job.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
