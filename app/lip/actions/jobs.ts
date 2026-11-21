import { EmployerJob, JobFormValues } from "@/components/employer/manage-jobs/ts/employer-job"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export async function createJobs(data: JobFormValues): Promise<void> {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
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

  console.log(response,data)
};


export async function deleteJobs(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/jobs/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(
      `Could not delete job post (${response.status} ${response.statusText}).`
    )
  }
};


export async function duplicateJob(job: EmployerJob): Promise<void> {
  const { _id, createdAt, applicants, ...jobData } = job
  await createJobs(jobData)
}