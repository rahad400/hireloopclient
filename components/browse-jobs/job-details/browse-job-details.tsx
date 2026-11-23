import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { JobDescription } from "@/components/employer/job-details/job-description"
import { JobInformation } from "@/components/employer/job-details/job-information"
import type { EmployerJob } from "@/components/employer/manage-jobs/ts/employer-job"

import { BrowseJobDetailsActions } from "./browse-job-details-actions"
import { BrowseJobDetailsHero } from "./browse-job-details-hero"
import { BrowseJobDetailsSidebar } from "./browse-job-details-sidebar"
import { SimilarJobs } from "./similar-jobs"

type BrowseJobDetailsProps = {
  job: EmployerJob
  similarJobs: EmployerJob[]
}

/** Full seeker-facing details screen for one browse job. */
export function BrowseJobDetails({ job, similarJobs }: BrowseJobDetailsProps) {
  return (
    <main className="min-h-svh bg-night text-ink">
      <div className="mx-auto w-full max-w-[1320px] px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <Link
          href="/browse-jobs"
          className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-ink focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" />
          Back to Browse Jobs
        </Link>

        <div className="mt-5">
          <BrowseJobDetailsHero job={job}>
            <BrowseJobDetailsActions job={job} />
          </BrowseJobDetailsHero>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_350px]">
          <div className="flex min-w-0 flex-col gap-5">
            <JobDescription job={job} />
            <JobInformation job={job} />
          </div>

          <BrowseJobDetailsSidebar job={job} />
        </div>

        <SimilarJobs jobs={similarJobs} currentJobId={job._id} />
      </div>
    </main>
  )
}
