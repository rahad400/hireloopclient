import { MapPin, Users } from "lucide-react"

import { JobCategoryIcon } from "@/components/employer/manage-jobs/job-category-icon"
import { ManageJobActions } from "@/components/employer/manage-jobs/manage-job-actions"
import { JobStatusBadge } from "@/components/employer/manage-jobs/job-status-badge"
import { panelClassName } from "@/components/employer/manage-jobs/manage-jobs-styles"
import {
  formatJobDate,
  formatJobLocation,
  formatPostedAgo,
  getJobCompensation,
  getJobDepartment,
  getJobStatus,
  type EmployerJob,
} from "@/lib/employer-job"
import { cn } from "cn"

type ManageJobCardProps = {
  job: EmployerJob
  onEdit: (job: EmployerJob) => void
  onDuplicate: (job: EmployerJob) => void
  onDelete: (job: EmployerJob) => void
}

/** Stacked card used below the table's breakpoint. */
export function ManageJobCard({
  job,
  onEdit,
  onDuplicate,
  onDelete,
}: ManageJobCardProps) {
  const compensation = getJobCompensation(job)

  return (
    <article className={cn(panelClassName, "flex flex-col gap-4 p-4")}>
      <div className="flex items-start gap-3">
        <JobCategoryIcon category={job.category} />

        <div className="flex min-w-0 flex-1 flex-col">
          <h2 className="truncate text-[13px] leading-5 font-medium text-[#ededef]">
            {job.title}
          </h2>
          <p className="truncate text-[11px] leading-4 text-[#8f8fa3]">
            {getJobDepartment(job)}
          </p>
        </div>

        <JobStatusBadge status={getJobStatus(job)} className="shrink-0" />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/[0.06] pt-3">
        <div className="flex min-w-0 flex-col">
          <dt className="text-[10px] tracking-[0.08em] text-[#6b6b76] uppercase">
            Company
          </dt>
          <dd className="truncate text-[12px] text-[#d6d6dc]">{job.company}</dd>
        </div>

        <div className="flex min-w-0 flex-col">
          <dt className="text-[10px] tracking-[0.08em] text-[#6b6b76] uppercase">
            Location
          </dt>
          <dd className="flex min-w-0 items-center gap-1 text-[12px] text-[#d6d6dc]">
            <MapPin
              aria-hidden="true"
              className="size-3 shrink-0 text-[#8b8b95]"
            />
            <span className="truncate">{formatJobLocation(job)}</span>
          </dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-[10px] tracking-[0.08em] text-[#6b6b76] uppercase">
            Type
          </dt>
          <dd className="text-[12px] text-[#d6d6dc]">{job.type}</dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-[10px] tracking-[0.08em] text-[#6b6b76] uppercase">
            Compensation
          </dt>
          <dd className="text-[12px] whitespace-nowrap">
            <span className="font-semibold text-[#ededef]">
              {compensation.amount}
            </span>
            {compensation.unit && (
              <span className="ml-1 text-[11px] text-[#8b8b95]">
                / {compensation.unit}
              </span>
            )}
          </dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-[10px] tracking-[0.08em] text-[#6b6b76] uppercase">
            Applicants
          </dt>
          <dd className="flex items-center gap-1.5 text-[12px]">
            <Users aria-hidden="true" className="size-3.5 text-[#a0a0ab]" />
            <span className="font-semibold text-[#ededef]">
              {job.applicants ?? 0}
            </span>
            <span className="text-[11px] text-[#8b8b95]">Candidates</span>
          </dd>
        </div>

        <div className="flex flex-col">
          <dt className="text-[10px] tracking-[0.08em] text-[#6b6b76] uppercase">
            Deadline
          </dt>
          <dd className="flex flex-col text-[12px] whitespace-nowrap">
            <span className="text-[#d6d6dc]">
              {formatJobDate(job.deadline)}
            </span>
            <span className="text-[11px] text-[#8b8b95]">
              {formatPostedAgo(job.createdAt)}
            </span>
          </dd>
        </div>
      </dl>

      <ManageJobActions
        job={job}
        onEdit={onEdit}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
      />
    </article>
  )
}
