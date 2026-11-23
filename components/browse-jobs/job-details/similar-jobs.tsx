import Link from "next/link"
import { ArrowUpRight, MapPin } from "lucide-react"

import { JobCategoryIcon } from "@/components/employer/manage-jobs/job-category-icon"
import {
  formatJobLocation,
  getJobCompensation,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { dashboardPanelClassName } from "@/lib/styles/dashboard"
import { cn } from "cn"

type SimilarJobsProps = {
  jobs: EmployerJob[]
  currentJobId: string
}

/** Compact related listings shown at the bottom of the details page. */
export function SimilarJobs({ jobs, currentJobId }: SimilarJobsProps) {
  const visibleJobs = jobs.filter((job) => job._id !== currentJobId).slice(0, 3)

  if (visibleJobs.length === 0) return null

  return (
    <section className="mt-10">
      <h2 className="text-base font-semibold text-ink">Similar jobs</h2>
      <p className="mt-1 text-xs text-ink-muted">
        More roles you might be interested in.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {visibleJobs.map((job) => {
          const compensation = getJobCompensation(job)
          const salary = compensation.unit
            ? `${compensation.amount}/${compensation.unit}`
            : compensation.amount

          return (
            <Link
              key={job._id}
              href={`/browse-jobs/${job._id}`}
              className={cn(
                dashboardPanelClassName,
                "group flex items-start gap-3 p-4 transition-colors hover:border-brand/40 focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
              )}
            >
              <JobCategoryIcon
                category={job.category}
                className="size-10 rounded-lg"
              />

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[13px] font-medium text-ink">
                  {job.title}
                </h3>
                <p className="truncate text-[11px] text-ink-muted">
                  {job.company}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-muted">
                  <span className="font-medium text-ink">{salary}</span>
                  <span className="flex items-center gap-1">
                    <MapPin aria-hidden="true" className="size-3" />
                    <span className="truncate">{formatJobLocation(job)}</span>
                  </span>
                </div>
              </div>

              <ArrowUpRight
                aria-hidden="true"
                className="size-4 shrink-0 text-ink-muted transition-colors group-hover:text-brand"
              />
            </Link>
          )
        })}
      </div>
    </section>
  )
}
