"use client"
import { toast } from "sonner"
import { ManageJobCard } from "@/components/employer/manage-jobs/manage-job-card"
import { ManageJobsEmpty } from "@/components/employer/manage-jobs/manage-jobs-empty"
import { ManageJobsTable } from "@/components/employer/manage-jobs/manage-jobs-table"
import { panelClassName } from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { cn } from "cn"
import { deleteJobs, duplicateJob } from "@/app/lip/actions/jobs"
import getJobs from "@/app/lip/api/jobs"
import { EmployerJob } from "../ts/employer-job"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"


/**
 * Reads the stored job posts and wires the row actions.
 *
 * All rows come straight from `lib/employer-job.ts`; there is no search or
 * network request, so the component stays a thin list.
 */
export function ManageJobsContent() {
  const [jobs, setJobs] = useState<EmployerJob[] | null>(null)
  const router = useRouter()

  const loadJobs = useCallback(async () => {
    try {
      const result = await getJobs()
      setJobs(result)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    void loadJobs()
  }, [loadJobs])

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
      // description: `${copy.title} was added to the list.`,
    })
  }

  async function handleDelete(job: EmployerJob) {
   await deleteJobs(job._id)
    await loadJobs()
    toast.success("Job post deleted", {
      description: `${job.title} was removed from your listings.`,
    })

    router.refresh()
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
            key={job._id}
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
