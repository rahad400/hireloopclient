import { MapPin, Users } from "lucide-react"

import { JobCategoryIcon } from "@/components/employer/manage-jobs/job-category-icon"
import { ManageJobActions } from "@/components/employer/manage-jobs/manage-job-actions"
import { JobStatusBadge } from "@/components/employer/manage-jobs/job-status-badge"
import {
  panelClassName,
  tableCellClassName,
  tableHeadClassName,
} from "@/components/employer/manage-jobs/manage-jobs-styles"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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

type ManageJobsTableProps = {
  jobs: EmployerJob[]
  onEdit: (job: EmployerJob) => void
  onDuplicate: (job: EmployerJob) => void
  onDelete: (job: EmployerJob) => void
}

/** Desktop table with the eight columns from the job posts design. */
export function ManageJobsTable({
  jobs,
  onEdit,
  onDuplicate,
  onDelete,
}: ManageJobsTableProps) {
  return (
    <div className={cn(panelClassName, "hidden xl:block")}>
      <Table className="text-[13px]">
        <TableHeader>
          <TableRow className="border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.02]">
            <TableHead className={cn(tableHeadClassName, "w-[22%]")}>
              Job Title &amp; Dept
            </TableHead>
            <TableHead className={cn(tableHeadClassName, "w-[16%]")}>
              Company &amp; Location
            </TableHead>
            <TableHead
              className={cn(
                tableHeadClassName,
                "hidden w-[7%] min-[1440px]:table-cell"
              )}
            >
              Type
            </TableHead>
            <TableHead className={cn(tableHeadClassName, "w-[13%]")}>
              Compensation
            </TableHead>
            <TableHead className={cn(tableHeadClassName, "w-[11%]")}>
              Applicants
            </TableHead>
            <TableHead className={cn(tableHeadClassName, "w-[8%]")}>
              Status
            </TableHead>
            <TableHead className={cn(tableHeadClassName, "w-[10%]")}>
              Deadline
            </TableHead>
            <TableHead className={cn(tableHeadClassName, "w-[13%] text-right")}>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((job) => {
            const compensation = getJobCompensation(job)

            return (
              <TableRow
                key={job.id}
                className="h-[68px] border-white/[0.06] hover:bg-white/[0.02]"
              >
                <TableCell className={tableCellClassName}>
                  <div className="flex min-w-0 items-center gap-3">
                    <JobCategoryIcon category={job.category} />

                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-[13px] leading-5 font-medium text-[#ededef]">
                        {job.title}
                      </span>
                      <span className="truncate text-[11px] leading-4 text-[#8f8fa3]">
                        {getJobDepartment(job)}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className={tableCellClassName}>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-[13px] leading-5 text-[#d6d6dc]">
                      {job.company}
                    </span>
                    <span className="flex min-w-0 items-center gap-1 text-[11px] leading-4 text-[#8b8b95]">
                      <MapPin aria-hidden="true" className="size-3 shrink-0" />
                      <span className="truncate">{formatJobLocation(job)}</span>
                    </span>
                  </div>
                </TableCell>

                <TableCell
                  className={cn(
                    tableCellClassName,
                    "hidden text-[12px] whitespace-nowrap text-[#b4b4bd] min-[1440px]:table-cell"
                  )}
                >
                  {job.type}
                </TableCell>

                <TableCell
                  className={cn(tableCellClassName, "whitespace-nowrap")}
                >
                  <span className="text-[13px] font-semibold text-[#ededef]">
                    {compensation.amount}
                  </span>
                  {compensation.unit && (
                    <span className="ml-1 text-[11px] text-[#8b8b95]">
                      / {compensation.unit}
                    </span>
                  )}
                </TableCell>

                <TableCell
                  className={cn(tableCellClassName, "whitespace-nowrap")}
                >
                  <div className="flex items-center gap-2">
                    <Users
                      aria-hidden="true"
                      className="size-3.5 text-[#a0a0ab]"
                    />
                    <span className="text-[13px] font-semibold text-[#ededef]">
                      {job.applicants ?? 0}
                    </span>
                    <span className="text-[11px] text-[#8b8b95]">
                      Candidates
                    </span>
                  </div>
                </TableCell>

                <TableCell className={tableCellClassName}>
                  <JobStatusBadge status={getJobStatus(job)} />
                </TableCell>

                <TableCell className={tableCellClassName}>
                  <div className="flex flex-col whitespace-nowrap">
                    <span className="text-[12px] leading-5 text-[#d6d6dc]">
                      {formatJobDate(job.deadline)}
                    </span>
                    <span className="text-[11px] leading-4 text-[#8b8b95]">
                      {formatPostedAgo(job.createdAt)}
                    </span>
                  </div>
                </TableCell>

                <TableCell className={tableCellClassName}>
                  <ManageJobActions
                    job={job}
                    onEdit={onEdit}
                    onDuplicate={onDuplicate}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
