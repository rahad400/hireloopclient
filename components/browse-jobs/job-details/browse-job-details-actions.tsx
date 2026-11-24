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
import { useSession } from "@/app/lip/auth-client"
import { useRouter } from "next/navigation"
import { applyToJob } from "@/app/lip/actions/aplication"
/** The two actions every seeker needs: Apply Now and Save. */
export function BrowseJobDetailsActions({ job }: { job: EmployerJob }) {
  const [isSaved, setIsSaved] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user
  function handleSave() {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
    }
  }

  async function handleApply() {
    const route = `/sign-in?redirectTo=/browse-jobs/${job._id}`
    if (!user) {
      router.push(route)
      return
    }

    if (getJobStatus(job) === "Expired") {
      toast.error("Applications are closed for this job")
      return
    }

    if (user.role !== "candidate") return

    const application = {
      jobId: job._id,
      userId: user.id,
      email: user.email,
      name: user.name,
      jobTitle: job.title,
      company: job.company,
    }

    try {
      const result = await applyToJob(application)

      if (result) {
        setHasApplied(true)
        toast.success("Application sent")
        router.push("/browse-jobs")
      }
    } catch (error) {
      toast.error("Failed to submit application")
    }
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
