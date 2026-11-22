import type { JobFormValues } from "@/components/employer/manage-jobs/ts/employer-job"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

const updateJob = async (id: string, data: JobFormValues): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/jobs/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    throw new Error(
      `Could not update job post (${response.status} ${response.statusText}).`
    )
  }
}

export default updateJob