import Link from "next/link"
import { ArrowUpRight, Building2, CalendarClock, Hash } from "lucide-react"

import {
  detailLabelClassName,
  detailPanelClassName,
  detailSectionTitleClassName,
} from "@/components/employer/job-details/ts/job-details-styles"
import { getDeadlineNote } from "@/components/employer/job-details/ts/job-details-utils"
import { JobCategoryIcon } from "@/components/employer/manage-jobs/job-category-icon"
import {
  formatJobDate,
  formatJobLocation,
  getJobRef,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { cn } from "cn"

/** Small summary and company cards beside the main job content. */
export function BrowseJobDetailsSidebar({ job }: { job: EmployerJob }) {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start">
      <section className={cn(detailPanelClassName, "p-5")}>
        <h2 className={detailSectionTitleClassName}>At a glance</h2>

        <dl className="mt-4 flex flex-col divide-y divide-white/[0.06]">
          <div className="flex items-start justify-between gap-4 py-3">
            <dt className={cn(detailLabelClassName, "flex items-center gap-1.5")}>
              <CalendarClock
                aria-hidden="true"
                className="size-3.5 text-ink-muted"
              />
              Deadline
            </dt>
            <dd className="flex flex-col items-end text-right">
              <span className="text-[12px] leading-5 text-ink">
                {formatJobDate(job.deadline)}
              </span>
              <span className="text-[11px] text-ink-muted">
                {getDeadlineNote(job.deadline)}
              </span>
            </dd>
          </div>

          <div className="flex items-center justify-between gap-4 py-3">
            <dt className={cn(detailLabelClassName, "flex items-center gap-1.5")}>
              <Hash aria-hidden="true" className="size-3.5 text-ink-muted" />
              Reference
            </dt>
            <dd className="text-[12px] font-medium text-ink">
              {getJobRef(job)}
            </dd>
          </div>
        </dl>
      </section>

      <section className={cn(detailPanelClassName, "p-5")}>
        <h2 className={detailSectionTitleClassName}>About the company</h2>

        <div className="mt-4 flex items-center gap-3">
          <JobCategoryIcon
            category={job.category}
            className="size-11 rounded-lg"
          />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-ink">
              {job.company}
            </p>
            <p className="truncate text-[11px] text-ink-muted">
              {job.category || "General"}
            </p>
          </div>
        </div>

        <p className="mt-3 flex items-start gap-1.5 text-[12px] leading-5 text-ink-muted">
          <Building2 aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          {formatJobLocation(job)}
        </p>

        <Link
          href={`/browse-jobs?company=${encodeURIComponent(job.company)}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-brand transition-colors hover:text-brand-strong focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
        >
          View all jobs at this company
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </Link>
      </section>
    </aside>
  )
}
