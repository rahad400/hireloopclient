"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"
import { Briefcase, MapPin } from "lucide-react"

import { jobPrimaryButtonClassName } from "@/lib/job-form-styles"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  getJobsServerSnapshot,
  getJobsSnapshot,
  subscribeToJobs,
  type EmployerJob,
} from "@/lib/employer-job"

function formatDate(value: string) {
  if (!value) return null

  const date = new Date(value.length === 10 ? `${value}T00:00:00` : value)
  if (Number.isNaN(date.getTime())) return null

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatSalary(job: EmployerJob) {
  if (!job.minSalary && !job.maxSalary) return null

  const range = [job.minSalary, job.maxSalary].filter(Boolean).join(" – ")
  return `$${range} ${job.frequency}`
}

/** Jobs published from this browser, read from localStorage. */
export function ManageJobsList() {
  const jobs = useSyncExternalStore(
    subscribeToJobs,
    getJobsSnapshot,
    getJobsServerSnapshot
  )

  if (jobs === null) {
    return <div className="h-44 animate-pulse rounded-[16px] bg-[#151516]" />
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[16px] bg-[#151516] px-6 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-[#232327] text-[#c3c0ff]">
          <Briefcase aria-hidden="true" className="size-5" />
        </span>

        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-white">
            No jobs published yet
          </p>
          <p className="text-sm text-[#a0a0ab]">
            Post your first role to start receiving applications.
          </p>
        </div>

        <Button
          render={<Link href="/employer/jobs/new" />}
          nativeButton={false}
          className={jobPrimaryButtonClassName}
        >
          Post a job
        </Button>
      </div>
    )
  }

  return (
    <ul className="grid gap-4 lg:grid-cols-2">
      {jobs.map((job) => {
        const salary = formatSalary(job)
        const deadline = formatDate(job.deadline)

        return (
          <li
            key={job.id}
            className="flex flex-col gap-4 rounded-[16px] bg-[#151516] p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-base font-medium text-white">
                  {job.title}
                </h2>
                <p className="truncate text-sm text-[#a0a0ab]">{job.company}</p>
              </div>

              <Badge className="shrink-0 border-0 bg-[#232327] text-[#c3c0ff]">
                {job.type}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#a0a0ab]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="size-3.5" />
                {job.location}
              </span>

              {job.isRemote && <span className="text-[#c3c0ff]">Remote</span>}
              {salary && <span>{salary}</span>}
              {deadline && <span>Apply by {deadline}</span>}
            </div>

            <p className="line-clamp-2 text-sm leading-6 text-[#a0a0ab]">
              {job.responsibilities}
            </p>

            <p className="mt-auto text-xs text-[#5a5a60]">
              Posted {formatDate(job.createdAt)}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
