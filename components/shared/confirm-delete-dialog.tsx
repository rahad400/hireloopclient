"use client"

import type { ReactElement, ReactNode } from "react"
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
import {
  dialogCancelClassName,
  dialogConfirmClassName,
  dialogContentClassName,
  dialogDescriptionClassName,
  dialogFooterClassName,
  dialogMediaClassName,
  dialogTitleClassName,
} from "@/lib/styles/dashboard"

type ConfirmDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The button that opens the dialog, supplied by the calling screen. */
  trigger: ReactElement
  title?: string
  description: ReactNode
  onConfirm: () => void
  confirmLabel?: string
}

/** One delete confirmation for the Manage Jobs rows and Job Details page. */
export function ConfirmDeleteDialog({
  open,
  onOpenChange,
  trigger,
  title = "Delete job post?",
  description,
  onConfirm,
  confirmLabel = "Delete Job",
}: ConfirmDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger render={trigger} />

      <AlertDialogContent size="sm" className={dialogContentClassName}>
        <AlertDialogHeader>
          <AlertDialogMedia className={dialogMediaClassName}>
            <Trash2 />
          </AlertDialogMedia>

          <AlertDialogTitle className={dialogTitleClassName}>
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className={dialogDescriptionClassName}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className={dialogFooterClassName}>
          <AlertDialogCancel className={dialogCancelClassName}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            onClick={onConfirm}
            className={dialogConfirmClassName}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
