"use client"

import { ArrowUpRight, Bookmark, Send } from "lucide-react"

import type { EmployerJob } from "@/components/employer/manage-jobs/ts/employer-job"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type BrowseJobCardActionsProps = {
  job: EmployerJob
}

/** Browse job card actions. Add your own click behaviour inside these handlers. */
export function BrowseJobCardActions({ job }: BrowseJobCardActionsProps) {
  const router = useRouter()
  function handleSave() {
    // TODO: Add your save logic here.
  }

  function handleApply() {
    // TODO: Add your apply logic here.
  }

  function handleViewDetails() {
    router.push(`/browse-jobs/${job._id}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        aria-label={`Save ${job.title}`}
        onClick={handleSave}
        variant="outline"
        className="h-8 gap-1.5 rounded-lg border-white/10 bg-white/[0.03] px-2.5 text-xs font-medium text-ink hover:bg-white/[0.07] hover:text-white"
      >
        <Bookmark className="size-3.5" aria-hidden="true" />
        Save
      </Button>

      <Button
        type="button"
        aria-label={`Apply to ${job.title}`}
        onClick={handleApply}
        className="h-8 gap-1.5 rounded-lg bg-brand px-2.5 text-xs font-semibold text-white hover:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand/60"
      >
        <Send className="size-3.5" aria-hidden="true" />
        Apply
      </Button>

      <Button
        type="button"
        aria-label={`View details for ${job.title}`}
        onClick={handleViewDetails}
        variant="outline"
        className="h-8 gap-1.5 rounded-lg border-white/10 bg-white/[0.03] px-2.5 text-xs font-medium text-ink hover:bg-white/[0.07] hover:text-white"
      >
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
        View Details
      </Button>
    </div>
  )
}
