import Link from "next/link"
import { Briefcase, Plus } from "lucide-react"

import { primaryButtonClassName } from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"

/** Shown when the store has no job posts at all. */
export function ManageJobsEmpty() {
  return (
    <EmptyState
      icon={Briefcase}
      iconClassName="bg-[#1a1a1f] text-[#c3c0ff]"
      title="No job posts yet"
      description="Create your first role to start collecting candidates."
      containerClassName="flex flex-col items-center gap-4 px-6 py-20 text-center"
      action={
        <Button
          render={<Link href="/employer/jobs/new" />}
          nativeButton={false}
          className={primaryButtonClassName}
        >
          <Plus aria-hidden="true" className="size-4" />
          New Job Post
        </Button>
      }
    />
  )
}
