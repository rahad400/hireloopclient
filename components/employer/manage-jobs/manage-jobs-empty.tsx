import Link from "next/link"
import { Briefcase, Plus } from "lucide-react"

import {
  panelClassName,
  primaryButtonClassName,
} from "@/components/employer/manage-jobs/manage-jobs-styles"
import { Button } from "@/components/ui/button"
import { cn } from "cn"

/** Shown when the store has no job posts at all. */
export function ManageJobsEmpty() {
  return (
    <div
      className={cn(
        panelClassName,
        "flex flex-col items-center gap-4 px-6 py-20 text-center"
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-[#1a1a1f] text-[#c3c0ff]">
        <Briefcase aria-hidden="true" className="size-5" />
      </span>

      <div className="flex flex-col gap-1">
        <p className="text-base font-medium text-[#ededef]">No job posts yet</p>
        <p className="max-w-sm text-[13px] leading-5 text-[#8b8b95]">
          Create your first role to start collecting candidates.
        </p>
      </div>

      <Button
        render={<Link href="/employer/jobs/new" />}
        nativeButton={false}
        className={primaryButtonClassName}
      >
        <Plus aria-hidden="true" className="size-4" />
        New Job Post
      </Button>
    </div>
  )
}
