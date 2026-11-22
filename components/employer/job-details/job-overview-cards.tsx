import { CalendarClock, CalendarPlus, Users, Wallet } from "lucide-react"

import {
  detailLabelClassName,
  detailPanelClassName,
} from "@/components/employer/job-details/ts/job-details-styles"
import {
  formatSalaryFrequency,
  getDeadlineNote,
} from "@/components/employer/job-details/ts/job-details-utils"
import {
  formatJobDate,
  formatPostedAgo,
  getJobCompensation,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { cn } from "cn"

/** The four highlight counters at the top of the job profile. */
export function JobOverviewCards({ job }: { job: EmployerJob }) {
  const compensation = getJobCompensation(job)

  const cards = [
    {
      label: "Salary Range",
      value: compensation.amount,
      hint: compensation.amount
        ? formatSalaryFrequency(job.frequency)
        : "Compensation not set",
      icon: Wallet,
      iconClassName: "bg-brand/10 text-[#a5a0ff]",
    },
    {
      label: "Total Applicants",
      value: String(job.applicants ?? 0),
      hint: "Candidates in pipeline",
      icon: Users,
      iconClassName: "bg-[#3b82f6]/10 text-[#60a5fa]",
    },
    {
      label: "Application Deadline",
      value: formatJobDate(job.deadline),
      hint: getDeadlineNote(job.deadline),
      icon: CalendarClock,
      iconClassName: "bg-[#f59e0b]/10 text-[#fbbf24]",
    },
    {
      label: "Posted Date",
      value: formatJobDate(job.createdAt),
      hint: formatPostedAgo(job.createdAt),
      icon: CalendarPlus,
      iconClassName: "bg-[#2dd4bf]/10 text-[#2dd4bf]",
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, hint, icon: Icon, iconClassName }) => (
        <article
          key={label}
          className={cn(detailPanelClassName, "flex items-start gap-3 p-4")}
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

          <div className="flex min-w-0 flex-col gap-0.5">
            <p className={detailLabelClassName}>{label}</p>
            <p className="truncate text-[17px] leading-6 font-semibold text-[#ededef]">
              {value}
            </p>
            <p className="truncate text-[11px] leading-4 text-[#8b8b95]">
              {hint}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}
