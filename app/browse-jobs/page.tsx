import getJobs from "@/app/lip/api/jobs"
import { BrowseJobsContent } from "@/components/browse-jobs/browse-jobs-content"

/** Public job board at `/browse-jobs`. */
export default async function BrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const  search = await searchParams
    const queryString = new URLSearchParams (search as Record<string,string>).toString()
  const jobs = await getJobs(queryString)

  return <BrowseJobsContent jobs={jobs} />
}
