import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { AppliedAgo } from "@/components/candidate/applications/applied-ago"
import { ApplicationStatusBadge } from "@/components/candidate/applications/application-status-badge"
import { getJobSummary } from "@/components/candidate/applications/ts/application-utils"
import type { CandidateApplication } from "@/components/candidate/applications/ts/candidate-application"
import { JobCategoryIcon } from "@/components/employer/manage-jobs/job-category-icon"
import {
  tableCellClassName,
  tableHeadClassName,
} from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "cn"

/** Desktop table matching the Figma "Main Table Section". */
export function ApplicationsTable({
  applications,
}: {
  applications: CandidateApplication[]
}) {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-white/[0.06] bg-[#141418] md:block">
      <Table className="text-[13px]">
        <TableHeader className="bg-[#1a1a1f]">
          <TableRow className="h-11 border-white/[0.06] hover:bg-[#1a1a1f]">
            <TableHead className={cn(tableHeadClassName, "w-[30%] pl-7")}>
              Job Title
            </TableHead>
            <TableHead className={cn(tableHeadClassName, "w-[20%]")}>
              Company
            </TableHead>
            <TableHead className={cn(tableHeadClassName, "w-[15%]")}>
              Applied
            </TableHead>
            <TableHead className={cn(tableHeadClassName, "w-[18%]")}>
              Status
            </TableHead>
            <TableHead
              className={cn(tableHeadClassName, "w-[17%] pr-7 text-right")}
            >
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((application) => (
            <TableRow
              key={application._id}
              className="h-16 border-white/[0.06] hover:bg-white/[0.02]"
            >
              <TableCell className={cn(tableCellClassName, "pl-7")}>
                <div className="flex min-w-0 items-center gap-3">
                  <JobCategoryIcon
                    category={application.category ?? "Other"}
                    className="size-10 shrink-0 rounded-lg"
                  />
                  <div className="flex min-w-0 flex-col">
                    <span
                      title={application.jobTitle}
                      className="truncate text-[13px] leading-5 font-medium text-[#ededef]"
                    >
                      {application.jobTitle}
                    </span>
                    <span className="truncate text-[11px] leading-4 text-[#a0a0ab]">
                      {getJobSummary(application)}
                    </span>
                  </div>
                </div>
              </TableCell>

              <TableCell className={tableCellClassName}>
                <div className="flex min-w-0 flex-col">
                  <span
                    title={application.company}
                    className="block truncate text-[13px] text-[#ededef]"
                  >
                    {application.company}
                  </span>
                  <span className="truncate text-[11px] text-[#a0a0ab]">
                    {application.category ?? "Other"}
                  </span>
                </div>
              </TableCell>

              <TableCell
                className={cn(
                  tableCellClassName,
                  "text-[12px] whitespace-nowrap text-[#a0a0ab]"
                )}
              >
                <AppliedAgo application={application} />
              </TableCell>

              <TableCell className={tableCellClassName}>
                <ApplicationStatusBadge status={application.status} />
              </TableCell>

              <TableCell className={cn(tableCellClassName, "pr-7 text-right")}>
                <Link
                  href={`/browse-jobs/${encodeURIComponent(application.jobId)}`}
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-[#ededef] transition-colors hover:text-brand-strong focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
                >
                  Details
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
