import { notFound } from "next/navigation"

import { getJobDetails } from "@/app/lip/actions/jobs"
import getJobs from "@/app/lip/api/jobs"
import { BrowseJobDetails } from "@/components/browse-jobs/job-details/browse-job-details"

const objectIdPattern = /^[a-f\d]{24}$/i

export default async function BrowseJobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!objectIdPattern.test(id)) notFound()

  const job = await getJobDetails(id)
  if (!job) notFound()

  // Suggest jobs from the same category first, then fill with any others.
  const allJobs = await getJobs()
  const sameCategory = allJobs.filter(
    (item) => item._id !== job._id && item.category === job.category
  )
  const otherJobs = allJobs.filter(
    (item) => item._id !== job._id && item.category !== job.category
  )
  const similarJobs = [...sameCategory, ...otherJobs].slice(0, 3)

  return <BrowseJobDetails job={job} similarJobs={similarJobs} />
}
