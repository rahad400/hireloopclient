import type { Metadata } from "next"

import { detailsJob } from "@/app/lip/api/jobs"
import { UpdateJobForm } from "@/components/employer/add-job/update-job-form"
import { JobDetailsNotFound } from "@/components/employer/job-details/job-details-not-found"
import type { EmployerJob } from "@/components/employer/manage-jobs/ts/employer-job"

export const metadata: Metadata = {
  title: "Update Job | HireLoop",
}

type UpdateDetailsPageProps = {
  params: Promise<{ id: string }>
}

export default async function UpdateDetailsPage({
  params,
}: UpdateDetailsPageProps) {
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

  return <UpdateJobForm job={job} />
}
