import type { Metadata } from "next"

import { detailsJob } from "@/app/lip/api/jobs"
import { JobDescription } from "@/components/employer/job-details/job-description"
import { JobDetailsHeader } from "@/components/employer/job-details/job-details-header"
import { JobDetailsNotFound } from "@/components/employer/job-details/job-details-not-found"
import { JobDetailsSidebar } from "@/components/employer/job-details/job-details-sidebar"
import { JobInformation } from "@/components/employer/job-details/job-information"
import { JobOverviewCards } from "@/components/employer/job-details/job-overview-cards"
import type { EmployerJob } from "@/components/employer/manage-jobs/ts/employer-job"

export const metadata: Metadata = {
  title: "Job Details | HireLoop",
}

type DetailsPageProps = {
  params: Promise<{ id: string }>
}

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { id } = await params

  let job: EmployerJob | null = null

  try {
    job = await detailsJob(id)
  } catch {
    job = null
  }

  if (!job) {
    return <JobDetailsNotFound />
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-6">
      <JobDetailsHeader job={job} />

      <JobOverviewCards job={job} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-4">
          <JobInformation job={job} />
          <JobDescription job={job} />
        </div>

        <JobDetailsSidebar job={job} />
      </div>
    </div>
  )
}
