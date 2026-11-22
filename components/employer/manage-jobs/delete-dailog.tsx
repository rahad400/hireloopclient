"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"

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
import type { EmployerJob } from "./ts/employer-job"

type DeleteDailogProps = {
  job: EmployerJob
  onDelete: (job: EmployerJob) => void
}

/** Destructive confirmation used by the Manage Jobs row actions. */
export function DeleteDailog({ job, onDelete }: DeleteDailogProps) {
  const [open, setOpen] = useState(false)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <button
            type="button"
            aria-label={`Delete ${job.title}`}
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-[#17171b] text-[#f97066] transition-colors outline-none hover:border-[#f97066]/30 hover:bg-[#f97066]/10 focus-visible:ring-2 focus-visible:ring-[#f97066]/30"
          >
            <Trash2 aria-hidden="true" className="size-3.5" />
          </button>
        }
      />

      <AlertDialogContent
        size="sm"
        className="rounded-2xl border border-white/[0.08] bg-[#17171a] text-[#ededef] shadow-[0_24px_70px_-24px_rgba(0,0,0,0.85)] sm:max-w-sm"
      >
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-[#f97066]/10 text-[#f97066] ring-1 ring-[#f97066]/20">
            <Trash2 />
          </AlertDialogMedia>

          <AlertDialogTitle className="font-semibold tracking-tight text-[#ededef]">
            Delete job post?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-[13px] leading-5 text-[#8b8b95]">
            “{job.title}” will be permanently removed from your listings. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="-mx-4 -mb-4 border-t border-white/[0.06] bg-white/[0.02] p-4">
          <AlertDialogCancel className="h-9 border-white/[0.08] bg-[#17171b] text-[13px] font-medium text-[#d6d6dc] hover:bg-white/[0.06] hover:text-[#ededef]">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              setOpen(false)
              onDelete(job)
            }}
            className="h-9 border border-[#f97066]/20 bg-[#f97066]/15 text-[13px] font-medium text-[#f97066] hover:bg-[#f97066]/25 hover:text-[#ff9b93]"
          >
            Delete Job
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
