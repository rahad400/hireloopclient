import getJobs from "@/app/lip/api/jobs"
import { BrowseJobsContent } from "@/components/browse-jobs/browse-jobs-content"

/** Public job board at `/browse-jobs`. */
export default async function BrowseJobsPage() {
  const jobs = await getJobs()

  return <BrowseJobsContent jobs={jobs} />
}
