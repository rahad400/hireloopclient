"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Copy, Loader2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { deleteJobs, duplicateJob } from "@/app/lip/actions/jobs"
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog"
import {
  destructiveButtonClassName,
  detailPanelClassName,
  detailSectionTitleClassName,
} from "@/components/employer/job-details/ts/job-details-styles"
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import type { EmployerJob } from "@/components/employer/manage-jobs/ts/employer-job"
import { cn } from "cn"

type PendingAction = "duplicate" | "delete" | null

function errorMessage(cause: unknown) {
  return cause instanceof Error ? cause.message : "Something went wrong."
}

/** Edit, duplicate and delete controls for the job details sidebar. */
export function JobDetailsActions({ job }: { job: EmployerJob }) {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const router = useRouter()

  const isBusy = pendingAction !== null

  function handleEdit() {
    router.push(`/employer/jobs/new/${encodeURIComponent(job._id)}/update`)
  }

  async function handleDuplicate() {
    setPendingAction("duplicate")

    try {
      await duplicateJob(job)
      toast.success("Job post duplicated", {
        description: `A copy of ${job.title} was added to your listings.`,
      })
      router.push("/employer/jobs")
    } catch (cause) {
      toast.error("Could not duplicate job post", {
        description: errorMessage(cause),
      })
    } finally {
      setPendingAction(null)
    }
  }

  async function handleDelete() {
    setConfirmOpen(false)
    setPendingAction("delete")

    try {
      await deleteJobs(job._id)
      toast.success("Job post deleted", {
        description: `${job.title} was removed from your listings.`,
      })
      router.push("/employer/jobs")
    } catch (cause) {
      toast.error("Could not delete job post", {
        description: errorMessage(cause),
      })
    } finally {
      setPendingAction(null)
    }
  }

  return (
    <section className={cn(detailPanelClassName, "flex flex-col gap-3 p-5")}>
      <div className="flex flex-col gap-1">
        <h2 className={detailSectionTitleClassName}>Manage Job</h2>
        <p className="text-xs leading-5 text-[#8b8b95]">
          Update the listing, reuse it for another role, or remove it.
        </p>
      </div>

      <div className="mt-1 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleEdit}
          disabled={isBusy}
          className={cn(
            primaryButtonClassName,
            "inline-flex w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          <Pencil aria-hidden="true" className="size-4" />
          Edit Job
        </button>

        <button
          type="button"
          onClick={handleDuplicate}
          disabled={isBusy}
          aria-busy={pendingAction === "duplicate"}
          className={cn(
            secondaryButtonClassName,
            "inline-flex w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {pendingAction === "duplicate" ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Copy aria-hidden="true" className="size-4" />
          )}
          {pendingAction === "duplicate" ? "Duplicating…" : "Duplicate Job"}
        </button>

        <ConfirmDeleteDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          trigger={
            <button
              type="button"
              disabled={isBusy}
              className={destructiveButtonClassName}
            >
              <Trash2 aria-hidden="true" className="size-4" />
              Delete Job
            </button>
          }
          description={
            <>
              “{job.title}” will be permanently removed from your listings. This
              action cannot be undone.
            </>
          }
          onConfirm={handleDelete}
        />
      </div>
    </section>
  )
}
