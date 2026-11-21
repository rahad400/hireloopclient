import { Briefcase, CalendarX2, Layers } from "lucide-react"

import { panelClassName } from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import {
  getJobStatus,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { cn } from "cn"

type ManageJobsStatsProps = {
  jobs: EmployerJob[] | null
}

/**
 * The three dashboard counters.
 *
 * Counts are derived from the same `jobs` array the table renders, so they stay
 * in sync with search, duplicate and delete without another request.
 */
export function ManageJobsStats({ jobs }: ManageJobsStatsProps) {
  const isLoading = jobs === null

  const activeJobs =
    jobs?.filter((job) => getJobStatus(job) === "Active").length ?? 0
  const expiredJobs =
    jobs?.filter((job) => getJobStatus(job) === "Expired").length ?? 0

  const stats = [
    {
      label: "Active Jobs",
      value: activeJobs,
      icon: Briefcase,
      iconClassName: "bg-[#22c55e]/10 text-[#22c55e]",
    },
    {
      label: "Expired Jobs",
      value: expiredJobs,
      icon: CalendarX2,
      iconClassName: "bg-[#f97066]/10 text-[#f97066]",
    },
    {
      label: "Total Posted Jobs",
      value: jobs?.length ?? 0,
      icon: Layers,
      iconClassName: "bg-brand/10 text-[#a5a0ff]",
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon, iconClassName }) => (
        <article
          key={label}
          className={cn(panelClassName, "flex items-center gap-3 px-4 py-3.5")}
        >
          <span
            aria-hidden="true"
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg",
              iconClassName
            )}
          >
            <Icon className="size-4" />
          </span>

          <div className="flex min-w-0 flex-col">
            <p className="text-[10px] font-medium tracking-[0.08em] text-[#8b8b95] uppercase">
              {label}
            </p>

            {isLoading ? (
              <span className="mt-1 block h-6 w-9 animate-pulse rounded bg-white/[0.08]" />
            ) : (
              <p className="text-lg leading-7 font-semibold text-[#ededef]">
                {value}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
