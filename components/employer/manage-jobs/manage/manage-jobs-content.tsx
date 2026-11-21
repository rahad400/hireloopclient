"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { deleteJobs, duplicateJob } from "@/app/lip/actions/jobs"
import getJobs from "@/app/lip/api/jobs"
import { ManageJobCard } from "@/components/employer/manage-jobs/manage-job-card"
import { ManageJobsEmpty } from "@/components/employer/manage-jobs/manage-jobs-empty"
import { ManageJobsError } from "@/components/employer/manage-jobs/manage-jobs-error"
import { ManageJobsNoResults } from "@/components/employer/manage-jobs/manage-jobs-no-results"
import { ManageJobsHeader } from "@/components/employer/manage-jobs/manage/manage-jobs-header"
import { ManageJobsStats } from "@/components/employer/manage-jobs/manage/manage-jobs-stats"
import { ManageJobsTable } from "@/components/employer/manage-jobs/manage-jobs-table"
import { ManageJobsToolbar } from "@/components/employer/manage-jobs/manage/manage-jobs-toolbar"
import {
  panelClassName,
  stickyHeaderClassName,
} from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import {
  getJobStatus,
  type EmployerJob,
  type JobStatusFilter,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { cn } from "cn"

function errorMessage(cause: unknown) {
  return cause instanceof Error ? cause.message : "Could not load job posts."
}

/** Case-insensitive match over the fields shown in the table and cards. */
function matchesQuery(job: EmployerJob, needle: string) {
  if (!needle) return true

  return [job.title, job.company, job.category, job.location].some((value) =>
    (value ?? "").toLowerCase().includes(needle)
  )
}

/**
 * Loads the job posts once, then filters them in memory.
 *
 * Search and the status filter only read the existing `jobs` state, so typing
 * never triggers another API request. Stats are derived from the same list and
 * update after duplicate or delete.
 */
export function ManageJobsContent() {
  const [jobs, setJobs] = useState<EmployerJob[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<JobStatusFilter>("all")
  const [stickyHeight, setStickyHeight] = useState(0)
  const stickyRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    let cancelled = false

    getJobs()
      .then((result) => {
        if (cancelled) return

        setJobs(result)
        setError(null)
      })
      .catch((cause: unknown) => {
        if (cancelled) return

        setError(errorMessage(cause))
      })

    return () => {
      cancelled = true
    }
  }, [])

  const syncJobs = useCallback(async () => {
    const result = await getJobs()
    setJobs(result)
    setError(null)
    return result
  }, [])

  // Keep the table header pinned just below the stats/toolbar block.
  useEffect(() => {
    const element = stickyRef.current
    if (!element) return

    const observer = new ResizeObserver(() => {
      setStickyHeight(element.getBoundingClientRect().height)
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [error])

  const visibleJobs = useMemo(() => {
    if (!jobs) return []

    const needle = query.trim().toLowerCase()

    return jobs.filter(
      (job) =>
        (status === "all" || getJobStatus(job) === status) &&
        matchesQuery(job, needle)
    )
  }, [jobs, query, status])

  function clearFilters() {
    setQuery("")
    setStatus("all")
  }

  function handleEdit(job: EmployerJob) {
    toast.info("Editing is not available yet", {
      description: `An edit form for ${job.title} is coming soon.`,
    })
  }

  async function handleDuplicate(job: EmployerJob) {
    try {
      await duplicateJob(job)
      await syncJobs()
      toast.success("Job post duplicated", {
        description: `${job.title} Copy was added to the list.`,
      })
    } catch (cause) {
      toast.error("Could not duplicate job post", {
        description: errorMessage(cause),
      })
    }
  }

  async function handleDelete(job: EmployerJob) {
    try {
      await deleteJobs(job._id)
      await syncJobs()
      toast.success("Job post deleted", {
        description: `${job.title} was removed from your listings.`,
      })

      router.refresh()
    } catch (cause) {
      toast.error("Could not delete job post", {
        description: errorMessage(cause),
      })
    }
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4">
        <ManageJobsHeader />

        <ManageJobsError
          message={error}
          onRetry={() => {
            setError(null)
            void syncJobs().catch((cause: unknown) =>
              setError(errorMessage(cause))
            )
          }}
        />
      </div>
    )
  }

  let list: ReactNode

  if (jobs === null) {
    list = (
      <div aria-hidden="true" className="flex flex-col gap-4">
        <div className={cn(panelClassName, "h-[420px] animate-pulse")} />

        <div className="grid gap-3 md:grid-cols-2 xl:hidden">
          {[0, 1].map((index) => (
            <div
              key={index}
              className={cn(panelClassName, "h-[180px] animate-pulse")}
            />
          ))}
        </div>
      </div>
    )
  } else if (jobs.length === 0) {
    list = <ManageJobsEmpty />
  } else if (visibleJobs.length === 0) {
    list = (
      <ManageJobsNoResults
        query={query}
        status={status}
        onClear={clearFilters}
      />
    )
  } else {
    list = (
      <>
        <ManageJobsTable
          jobs={visibleJobs}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />

        <div className="grid gap-3 md:grid-cols-2 xl:hidden">
          {visibleJobs.map((job) => (
            <ManageJobCard
              key={job._id}
              job={job}
              onEdit={handleEdit}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </>
    )
  }

  return (
    <div
      className="flex flex-col"
      style={
        {
          "--manage-jobs-sticky-height": `${stickyHeight}px`,
        } as CSSProperties
      }
    >
      <div ref={stickyRef} className={stickyHeaderClassName}>
        <ManageJobsHeader />

        <ManageJobsStats jobs={jobs} />

        <ManageJobsToolbar
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
        />
      </div>

      {list}
    </div>
  )
}
