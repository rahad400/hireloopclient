import { CalendarClock, CalendarPlus, Users, Wallet } from "lucide-react"

import { StatCard } from "@/components/shared/stat-card"
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
      {cards.map(({ label, value, hint, icon, iconClassName }) => (
        <StatCard
          key={label}
          label={label}
          value={value}
          hint={hint}
          icon={icon}
          iconClassName={iconClassName}
          variant="detail"
        />
      ))}
    </div>
  )
}
