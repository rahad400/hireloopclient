import { Briefcase, CalendarX2, Layers } from "lucide-react"

import { StatCard } from "@/components/shared/stat-card"
import {
  getJobStatus,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"

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
      {stats.map(({ label, value, icon, iconClassName }) => (
        <StatCard
          key={label}
          label={label}
          value={value}
          icon={icon}
          iconClassName={iconClassName}
          labelClassName="text-[10px] font-medium tracking-[0.08em] text-[#8b8b95] uppercase"
          loading={isLoading}
        />
      ))}
    </div>
  )
}
