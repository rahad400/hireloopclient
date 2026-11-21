import Link from "next/link"
import { ChevronRight } from "lucide-react"

/** Breadcrumb and page title. The actions live in the jobs toolbar. */
export function ManageJobsHeader() {
  return (
    <header className="flex flex-col gap-4">
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
    </header>
  )
}
