"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Copy, Loader2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { deleteJobs, duplicateJob } from "@/app/lip/actions/jobs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
    toast.info("Editing is not available yet", {
      description: `An edit form for ${job.title} is coming soon.`,
    })
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
          className={cn(primaryButtonClassName, "w-full justify-center")}
        >
          <Pencil aria-hidden="true" className="size-4" />
          Edit Job
        </button>

        <button
          type="button"
          onClick={handleDuplicate}
          disabled={isBusy}
          className={cn(
            secondaryButtonClassName,
            "w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {pendingAction === "duplicate" ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Copy aria-hidden="true" className="size-4" />
          )}
          {pendingAction === "duplicate" ? "Duplicating…" : "Duplicate Job"}
        </button>

        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogTrigger
            render={
              <button
                type="button"
                disabled={isBusy}
                className={destructiveButtonClassName}
              >
                <Trash2 aria-hidden="true" className="size-4" />
                Delete Job
              </button>
            }
          />

          <AlertDialogContent className="border border-white/[0.08] bg-[#17171a] text-[#ededef]">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-[#f97066]/10 text-[#f97066]">
                <Trash2 />
              </AlertDialogMedia>
              <AlertDialogTitle className="text-[#ededef]">
                Delete this job post?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[#8b8b95]">
                “{job.title}” will be permanently removed from your listings.
                Applications and job details cannot be recovered.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel
                variant="outline"
                className="border-white/[0.08] bg-[#17171b] text-[#d6d6dc] hover:bg-white/[0.06] hover:text-[#ededef]"
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                variant="destructive"
                onClick={handleDelete}
                className="bg-[#f97066]/15 text-[#f97066] hover:bg-[#f97066]/25"
              >
                Delete Job
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  )
}
