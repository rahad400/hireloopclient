import type { CandidateApplication } from "@/components/candidate/applications/ts/candidate-application"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export const ALREADY_APPLIED_MESSAGE = "You have already applied for this job."

export type JobApplication = {
  jobId: string
  userId: string
  email: string
  name: string
  jobTitle: string
  company: string
}

type ErrorResponse = {
  error?: string
}

/** Keep the API's clear message instead of replacing it with a generic one. */
async function getErrorMessage(response: Response, fallback: string) {
  const body = (await response.json().catch(() => null)) as ErrorResponse | null
  return body?.error ?? fallback
}

export const applyToJob = async (data: JobApplication): Promise<boolean> => {
  const res = await fetch(`${BASE_URL}/application`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(
        res,
        `Could not apply for this job (${res.status} ${res.statusText}).`
      )
    )
  }
  return true
}

/**
 * `cookie` is only passed by the server component. In the browser, the signed
 * session cookie is sent automatically because credentials are included.
 */
export const getApplyToJob = async (
  cookie?: string
): Promise<CandidateApplication[]> => {
  const res = await fetch(`${BASE_URL}/application`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
    headers: cookie ? { cookie } : undefined,
  })

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(
        res,
        `Could not load applications (${res.status} ${res.statusText}).`
      )
    )
  }

  return (await res.json()) as CandidateApplication[]
}

/**
 * Early frontend check so the button can show "Applied" right away.
 * The backend still performs the real duplicate validation.
 */
export const hasUserAppliedToJob = async (userId: string, jobId: string) => {
  const applications = await getApplyToJob()
  return applications.some(
    (application) =>
      application.userId === userId && application.jobId === jobId
  )
}
