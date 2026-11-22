"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"

import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog"
import type { EmployerJob } from "./ts/employer-job"

type DeleteDailogProps = {
  job: EmployerJob
  onDelete: (job: EmployerJob) => void
}

/** Destructive confirmation used by the Manage Jobs row actions. */
export function DeleteDailog({ job, onDelete }: DeleteDailogProps) {
  const [open, setOpen] = useState(false)

  return (
    <ConfirmDeleteDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <button
          type="button"
          aria-label={`Delete ${job.title}`}
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-[#17171b] text-[#f97066] transition-colors outline-none hover:border-[#f97066]/30 hover:bg-[#f97066]/10 focus-visible:ring-2 focus-visible:ring-[#f97066]/30"
        >
          <Trash2 aria-hidden="true" className="size-3.5" />
        </button>
      }
      description={
        <>
          “{job.title}” will be permanently removed from your listings. This
          action cannot be undone.
        </>
      }
      onConfirm={() => {
        setOpen(false)
        onDelete(job)
      }}
    />
  )
}
