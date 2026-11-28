import type {
  EmployerJob,
  JobFormValues,
} from "@/components/employer/manage-jobs/ts/employer-job"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export async function createJobs(data: JobFormValues): Promise<void> {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(
      `Could not publish job (${response.status} ${response.statusText}).`
    )
  }

  return await response.json()
}

export async function deleteJobs(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/jobs/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })

  // Deleting an already-removed job is still a successful UI operation.
  if (!response.ok && response.status !== 404) {
    throw new Error(
      `Could not delete job post (${response.status} ${response.statusText}).`
    )
  }
}

export async function duplicateJob(job: EmployerJob): Promise<void> {
  const { _id, createdAt, applicants, ...jobData } = job
  await createJobs(jobData)
}

export async function getJobDetails(id: string): Promise<EmployerJob | null> {
  const response = await fetch(`${BASE_URL}/job/${encodeURIComponent(id)}`, {
    method: "GET",
    cache: "no-store",
  })

  if (response.status === 404) return null

  if (!response.ok) {
    throw new Error(
      `Could not load job details (${response.status} ${response.statusText}).`
    )
  }

  // An empty body means the job was not found.
  return (await response.json().catch(() => null)) as EmployerJob | null
}
