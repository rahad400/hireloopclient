import type { EmployerJob } from "@/components/employer/manage-jobs/ts/employer-job"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export default async function getJobs(query = ''): Promise<EmployerJob[]> {
  const response = await fetch(`${BASE_URL}/jobs?${query}`, {
    method: "GET",
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(
      `Could not load job posts (${response.status} ${response.statusText}).`
    )
  }

  return response.json()
};

export async function detailsJob(id: string): Promise<EmployerJob> {
  const jobs = await getJobs()
  const job = jobs.find((item) => item._id === id)

  if (!job) {
    throw new Error(`Job post with id "${id}" was not found.`)
  }

  return job
}