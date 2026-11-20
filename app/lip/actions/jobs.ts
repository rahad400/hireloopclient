import { JobFormValues } from "@/lib/employer-job"

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
}