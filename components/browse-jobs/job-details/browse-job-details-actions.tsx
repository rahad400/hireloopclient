"use client"

import { useState } from "react"
import { Bookmark, BookmarkCheck, Check, Send } from "lucide-react"
import { toast } from "sonner"

import {
  getJobStatus,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { cn } from "cn"

/** The two actions every seeker needs: Apply Now and Save. */
export function BrowseJobDetailsActions({ job }: { job: EmployerJob }) {
  const [isSaved, setIsSaved] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  function handleSave() {
    setIsSaved((saved) => !saved)

    toast.success(isSaved ? "Removed from saved jobs" : "Job saved", {
      description: job.title,
    })
  }

  function handleApply() {
    if (getJobStatus(job) === "Expired") {
      toast.error("Applications are closed for this job")
      return
    }

    setHasApplied(true)
    toast.success("Application sent", {
      description: `Your application for ${job.title} was recorded.`,
    })
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
      <button
        type="button"
        onClick={handleApply}
        disabled={hasApplied}
        className={cn(
          primaryButtonClassName,
          "inline-flex w-full items-center justify-center sm:w-auto",
          hasApplied && "cursor-default opacity-70"
        )}
      >
        {hasApplied ? (
          <Check aria-hidden="true" className="size-4" />
        ) : (
          <Send aria-hidden="true" className="size-4" />
        )}
        {hasApplied ? "Applied" : "Apply Now"}
      </button>

      <button
        type="button"
        onClick={handleSave}
        aria-pressed={isSaved}
        className={cn(
          secondaryButtonClassName,
          "inline-flex w-full items-center justify-center sm:w-auto"
        )}
      >
        {isSaved ? (
          <BookmarkCheck aria-hidden="true" className="size-4" />
        ) : (
          <Bookmark aria-hidden="true" className="size-4" />
        )}
        {isSaved ? "Saved" : "Save"}
      </button>
    </div>
  )
}
