import { CalendarClock, Users } from "lucide-react"

import { JobDetailsActions } from "@/components/employer/job-details/job-details-actions"
import {
  detailLabelClassName,
  detailPanelClassName,
  detailSectionTitleClassName,
} from "@/components/employer/job-details/ts/job-details-styles"
import { getDeadlineNote } from "@/components/employer/job-details/ts/job-details-utils"
import { JobStatusBadge } from "@/components/employer/manage-jobs/job-status-badge"
import {
  formatJobDate,
  formatPostedAgo,
  getJobRef,
  getJobStatus,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { cn } from "cn"

/** Summary and management column pinned beside the job description. */
export function JobDetailsSidebar({ job }: { job: EmployerJob }) {
  return (
    <aside className="flex flex-col gap-4 xl:sticky xl:top-6 xl:self-start">
      <section className={cn(detailPanelClassName, "p-5")}>
        <div className="flex flex-col gap-1">
          <h2 className={detailSectionTitleClassName}>Job Summary</h2>
          <p className="text-xs text-[#8b8b95]">
            A quick snapshot of this listing.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-[#a5a0ff]"
          >
            <Users className="size-5" />
          </span>

          <div className="flex flex-col">
            <p className="text-xl leading-7 font-semibold text-[#ededef]">
              {job.applicants ?? 0}
            </p>
            <p className="text-[11px] text-[#8b8b95]">Total applicants</p>
          </div>
        </div>

        <dl className="mt-3 flex flex-col divide-y divide-white/[0.06]">
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className={detailLabelClassName}>Status</dt>
            <dd>
              <JobStatusBadge status={getJobStatus(job)} />
            </dd>
          </div>

          <div className="flex items-start justify-between gap-4 py-3">
            <dt
              className={cn(detailLabelClassName, "flex items-center gap-1.5")}
            >
              <CalendarClock
                aria-hidden="true"
                className="size-3.5 text-[#6b6b76]"
              />
              Deadline
            </dt>
            <dd className="flex flex-col items-end text-right">
              <span className="text-[12px] leading-5 text-[#d6d6dc]">
                {formatJobDate(job.deadline)}
              </span>
              <span className="text-[11px] leading-4 text-[#8b8b95]">
                {getDeadlineNote(job.deadline)}
              </span>
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 py-3">
            <dt className={detailLabelClassName}>Posted</dt>
            <dd className="flex flex-col items-end text-right">
              <span className="text-[12px] leading-5 text-[#d6d6dc]">
                {formatJobDate(job.createdAt)}
              </span>
              <span className="text-[11px] leading-4 text-[#8b8b95]">
                {formatPostedAgo(job.createdAt)}
              </span>
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 py-3">
            <dt className={detailLabelClassName}>Job reference</dt>
            <dd className="text-[12px] font-medium text-[#d6d6dc]">
              {getJobRef(job)}
            </dd>
          </div>
        </dl>
      </section>

      <JobDetailsActions job={job} />
    </aside>
  )
}
