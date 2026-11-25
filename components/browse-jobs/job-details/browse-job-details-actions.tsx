"use client"

import { useEffect, useRef, useState } from "react"
import { Bookmark, BookmarkCheck, Check, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  ALREADY_APPLIED_MESSAGE,
  applyToJob,
  hasUserAppliedToJob,
} from "@/app/lip/actions/aplication"
import { useSession } from "@/app/lip/auth-client"
import {
  getJobStatus,
  type EmployerJob,
} from "@/components/employer/manage-jobs/ts/employer-job"
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { cn } from "cn"
import { saveJobs } from "@/app/lip/actions/save"

/** The two actions every seeker needs: Apply Now and Save. */
export function BrowseJobDetailsActions({ job }: { job: EmployerJob }) {
  const [isSaved, setIsSaved] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  const [isCheckingApplication, setIsCheckingApplication] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const hasShownAppliedToast = useRef(false)

  const router = useRouter()
  const { data: session, isPending } = useSession()
  const user = session?.user
  const userId = user?.id
  const userRole = user?.role

  // Restore the Applied state after a refresh or a return visit.
  useEffect(() => {
    if (!userId || userRole !== "candidate") return

    const currentUserId = userId
    let ignore = false

    async function checkApplication() {
      setIsCheckingApplication(true)
      try {
        const applied = await hasUserAppliedToJob(currentUserId, job._id)
        if (ignore) return

        setHasApplied(applied)
        if (applied && !hasShownAppliedToast.current) {
          hasShownAppliedToast.current = true
          toast.error(ALREADY_APPLIED_MESSAGE)
        }
      } catch {
        // The API still blocks duplicates; a failed lookup must not stop applying.
      } finally {
        if (!ignore) setIsCheckingApplication(false)
      }
    }

    checkApplication()
    return () => {
      ignore = true
    }
  }, [job._id, userId, userRole])

  const isBusy = isPending || isCheckingApplication || isSubmitting

  // save jobs
  async function handleSave() {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
    }

    if (isSaved || isSaving) return

    setIsSaving(true)
    try {
      await saveJobs({
        jobId: job._id,
        userId: user.id,
        email: user.email,
        name: user.name,
        jobTitle: job.title,
        company: job.company,
      })
      setIsSaved(true)
      toast.success("Job saved")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save job")
    } finally {
      setIsSaving(false)
    }
  }

  // apply
  async function handleApply() {
    if (isPending) return

    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
    }

    if (hasApplied) {
      toast.error(ALREADY_APPLIED_MESSAGE)
      return
    }

    if (isBusy) return

    if (getJobStatus(job) === "Expired") {
      toast.error("Applications are closed for this job")
      return
    }

    if (userRole !== "candidate") {
      toast.error("Only candidates can apply for jobs.")
      return
    }

    setIsSubmitting(true)

    try {
      await applyToJob({
        jobId: job._id,
        userId: user.id,
        email: user.email,
        name: user.name,
        jobTitle: job.title,
        company: job.company,
      })

      setHasApplied(true)
      toast.success("Application sent")
      router.push("/browse-jobs")
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit application"

      if (message === ALREADY_APPLIED_MESSAGE) {
        setHasApplied(true)
      }

      toast.error(
        message === ALREADY_APPLIED_MESSAGE
          ? message
          : "Failed to submit application"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
      <button
        type="button"
        onClick={handleApply}
        disabled={isBusy || hasApplied}
        aria-busy={isBusy}
        className={cn(
          primaryButtonClassName,
          "inline-flex w-full items-center justify-center sm:w-auto",
          (isBusy || hasApplied) && "cursor-default opacity-70"
        )}
      >
        {hasApplied ? (
          <Check aria-hidden="true" className="size-4" />
        ) : (
          <Send aria-hidden="true" className="size-4" />
        )}
        {hasApplied ? "Applied" : isBusy ? "Please wait..." : "Apply Now"}
      </button>

      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
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
