"use client"

import { Copy, Eye, MoreVertical, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

import {
  
  kebabButtonClassName,
  updateButtonClassName,
} from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { EmployerJob } from "@/components/employer/manage-jobs/ts/employer-job"
import { DeleteDailog } from "./delete-dailog"

type ManageJobActionsProps = {
  job: EmployerJob
  onEdit: (job: EmployerJob) => void
  onDuplicate: (job: EmployerJob) => void
  onDelete: (job: EmployerJob) => void
}

const menuItemClassName = "focus:bg-[#2a2a31] focus:text-white"

/** Update button, duplicate shortcut and the row's more-actions menu. */
export function ManageJobActions({
  job,
  onEdit,
  onDuplicate,
  onDelete,
}: ManageJobActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={() => onEdit(job)}
        className={updateButtonClassName}
      >
        <Pencil aria-hidden="true" className="size-3" />
        Update
      </button>

        <DeleteDailog job={job} onDelete={onDelete} />
      
      <DropdownMenu>
        <DropdownMenuTrigger
          className={kebabButtonClassName}
          aria-label={`More actions for ${job.title}`}
        >
          <MoreVertical aria-hidden="true" className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="border border-white/[0.08] bg-[#1e1e21] text-[#ededef] shadow-2xl"
        >
          <DropdownMenuItem
            render={
              <Link href={`/employer/jobs/new/${encodeURIComponent(job._id)}`} />
            }
            className={menuItemClassName}
          >
            <Eye aria-hidden="true" />
            Details
          </DropdownMenuItem>

            <DropdownMenuItem
            onClick={() => onDuplicate(job)}
            className={menuItemClassName}
          >
            <Copy aria-hidden="true" />
            Duplicate
          </DropdownMenuItem>

          <DropdownMenuItem></DropdownMenuItem>

        
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
