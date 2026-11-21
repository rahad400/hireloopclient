import type { EmployerJob, JobFormValues } from "@/components/employer/manage-jobs/ts/employer-job"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export default async function getJobs(): Promise<EmployerJob[]> {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "GET",
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(
      `Could not load job posts (${response.status} ${response.statusText}).`
    )
  }

  return response.json()
}