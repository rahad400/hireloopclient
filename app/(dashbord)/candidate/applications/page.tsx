import { headers } from "next/headers"

import { getApplyToJob } from "@/app/lip/actions/aplication"
import getJobs from "@/app/lip/api/jobs"
import { ApplicationsContent } from "@/components/candidate/applications/applications-content"
import type { CandidateApplication } from "@/components/candidate/applications/ts/candidate-application"

/** Candidate Applications page: reads the existing APIs and renders the UI. */
const ApplicationJobsPage = async () => {
  // Forward the signed-in cookie so the API returns only this user's records.
  const cookieHeader = (await headers()).get("cookie") ?? ""
  const applications = await getApplyToJob(cookieHeader).catch(() => [])
  const jobs = await getJobs().catch(() => [])
  const jobsById = new Map(jobs.map((job) => [job._id, job]))

  // Add the job details used by the Browse Jobs style cards.
  const enrichedApplications = applications.map((application) => {
    const job = jobsById.get(application.jobId)
    if (!job) return application

    return {
      ...application,
      jobType: job.type,
      isRemote: job.isRemote,
      location: job.location,
      category: job.category,
    }
  })

  return <ApplicationsContent applications={enrichedApplications} />
}

export default ApplicationJobsPage
