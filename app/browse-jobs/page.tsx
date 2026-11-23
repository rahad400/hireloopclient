import getJobs from "@/app/lip/api/jobs"
import { BrowseJobsContent } from "@/components/browse-jobs/browse-jobs-content"
import { defaultSortValue } from "@/components/browse-jobs/ts/browse-jobs-constants"

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

  // Keep the dropdown in sync with the URL (including back/forward).
  const sort =
    typeof search.sort === "string" ? search.sort : defaultSortValue

  return <BrowseJobsContent jobs={jobs} sort={sort} />
}
