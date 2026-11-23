import getJobs from "@/app/lip/api/jobs"
import { BrowseJobsContent } from "@/components/browse-jobs/browse-jobs-content"

/** Public job board at `/browse-jobs`. */
export default async function BrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const search = await searchParams

  // Rebuild the query string from the URL so the API can filter by it.
  const params = new URLSearchParams()

  Object.entries(search).forEach(([key, value]) => {
    if (typeof value === "string") {
      params.set(key, value)
    }
  })

  const jobs = await getJobs(params.toString())

  return <BrowseJobsContent jobs={jobs} />
}
