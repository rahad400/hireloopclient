import {
  Briefcase,
  Building2,
  Globe,
  Layers,
  MapPin,
  Repeat,
} from "lucide-react"

import {
  detailLabelClassName,
  detailPanelClassName,
  detailSectionTitleClassName,
} from "@/components/employer/job-details/ts/job-details-styles"
import {
  formatSalaryFrequency,
  getWorkMode,
} from "@/components/employer/job-details/ts/job-details-utils"
import {
  formatJobLocation,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { cn } from "cn"

/** Company, location and contract details in a labelled grid. */
export function JobInformation({ job }: { job: EmployerJob }) {
  const details = [
    {
      label: "Company",
      value: job.company || "Not specified",
      icon: Building2,
    },
    {
      label: "Job location",
      value: formatJobLocation(job),
      icon: MapPin,
    },
    {
      label: "Employment type",
      value: job.type,
      icon: Briefcase,
    },
    {
      label: "Job category",
      value: job.category || "Not specified",
      icon: Layers,
    },
    {
      label: "Work mode",
      value: getWorkMode(job.isRemote),
      icon: Globe,
    },
    {
      label: "Salary frequency",
      value: formatSalaryFrequency(job.frequency),
      icon: Repeat,
    },
  ]

  return (
    <section className={cn(detailPanelClassName, "p-5 sm:p-6")}>
      <div className="flex flex-col gap-1">
        <h2 className={detailSectionTitleClassName}>Job Information</h2>
        <p className="text-xs text-[#8b8b95]">
          Key details about this role and where it is based.
        </p>
      </div>

      <dl className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
        {details.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex min-w-0 items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-[#a0a0ab]"
            >
              <Icon className="size-4" />
            </span>

            <div className="flex min-w-0 flex-col gap-0.5">
              <dt className={detailLabelClassName}>{label}</dt>
              <dd className="truncate text-[13px] leading-5 text-[#d6d6dc]">
                {value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}
