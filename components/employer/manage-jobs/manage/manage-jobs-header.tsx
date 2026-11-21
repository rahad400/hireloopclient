import Link from "next/link"
import { ChevronRight, Plus } from "lucide-react"

import { primaryButtonClassName } from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { Button } from "@/components/ui/button"

/** Breadcrumb, page title and the purple "New Job Post" action. */
export function ManageJobsHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-2">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-[#6b6b76]"
        >
          <Link href="/employer/jobs" className="hover:text-[#a0a0ab]">
            Manage Jobs
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <span className="text-[#a0a0ab]">Job Listings &amp; Postings</span>
        </nav>

        <h1 className="text-[28px] leading-tight font-semibold text-[#ededef] sm:text-[32px]">
          Manage Job Posts
        </h1>

        <p className="text-sm leading-5 text-[#8b8b95]">
          Review live listings, monitor applicants, and update job details
          across your organization.
        </p>
      </div>

      <Button
        render={<Link href="/employer/jobs/new" />}
        nativeButton={false}
        className={`${primaryButtonClassName} self-start`}
      >
        <Plus aria-hidden="true" className="size-4" />
        New Job Post
      </Button>
    </header>
  )
}
