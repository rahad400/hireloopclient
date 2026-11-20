"use client"

import { useSyncExternalStore } from "react"
import { toast } from "sonner"

import { ManageJobCard } from "@/components/employer/manage-jobs/manage-job-card"
import { ManageJobsEmpty } from "@/components/employer/manage-jobs/manage-jobs-empty"
import { ManageJobsTable } from "@/components/employer/manage-jobs/manage-jobs-table"
import { panelClassName } from "@/components/employer/manage-jobs/manage-jobs-styles"
import {
  deleteJob,
  duplicateJob,
  getJobsServerSnapshot,
  getJobsSnapshot,
  subscribeToJobs,
  type EmployerJob,
} from "@/lib/employer-job"
import { cn } from "cn"

/**
 * Reads the stored job posts and wires the row actions.
 *
 * All rows come straight from `lib/employer-job.ts`; there is no search or
 * network request, so the component stays a thin list.
 */
export function ManageJobsContent() {
  const jobs = useSyncExternalStore(
    subscribeToJobs,
    getJobsSnapshot,
    getJobsServerSnapshot
  )

  if (jobs === null) {
    return (
      <div
        aria-hidden="true"
        className={cn(panelClassName, "h-[420px] animate-pulse")}
      />
    )
  }

  if (jobs.length === 0) {
    return <ManageJobsEmpty />
  }

  function handleEdit(job: EmployerJob) {
    toast.info("Editing is not available yet", {
      description: `An edit form for ${job.title} is coming soon.`,
    })
  }

  function handleDuplicate(job: EmployerJob) {
    const copy = duplicateJob(job)
    toast.success("Job post duplicated", {
      description: `${copy.title} was added to the list.`,
    })
  }

  function handleDelete(job: EmployerJob) {
    deleteJob(job.id)
    toast.success("Job post deleted", {
      description: `${job.title} was removed from your listings.`,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <ManageJobsTable
        jobs={jobs}
        onEdit={handleEdit}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
      />

      <div className="grid gap-3 md:grid-cols-2 xl:hidden">
        {jobs.map((job) => (
          <ManageJobCard
            key={job.id}
            job={job}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}
