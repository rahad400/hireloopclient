"use client"

import { ArrowUpRight, Bookmark, BookmarkCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { saveJobs } from "@/app/lip/actions/save"
import { useSession } from "@/app/lip/auth-client"
import type { EmployerJob } from "@/components/employer/manage-jobs/ts/employer-job"
import { Button } from "@/components/ui/button"

type BrowseJobCardActionsProps = {
  job: EmployerJob
}

/** Mobile bookmark button and the original desktop View Details action. */
export function BrowseJobCardActions({ job }: BrowseJobCardActionsProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  function handleViewDetails() {
    router.push(`/browse-jobs/${job._id}`)
  }

  async function handleSave() {
    const user = session?.user

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

  return (
    <>
      <button
        type="button"
        onClick={handleSave}
        disabled={isSaving}
        aria-pressed={isSaved}
        aria-busy={isSaving}
        aria-label={isSaved ? `Saved ${job.title}` : `Save ${job.title}`}
        className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-[#1F1F26] text-[#A0A0AB] transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#6545F5]/60 disabled:opacity-70 lg:hidden"
      >
        {isSaved ? (
          <BookmarkCheck className="size-4" aria-hidden="true" />
        ) : (
          <Bookmark className="size-4" aria-hidden="true" />
        )}
      </button>

      <Button
        type="button"
        aria-label={`View details for ${job.title}`}
        onClick={handleViewDetails}
        variant="outline"
        className="hidden h-8 gap-1.5 rounded-lg border-white/10 bg-white/[0.03] px-2.5 text-xs font-medium text-ink hover:bg-white/[0.07] hover:text-white lg:inline-flex"
      >
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
        View Details
      </Button>
    </>
  )
}
