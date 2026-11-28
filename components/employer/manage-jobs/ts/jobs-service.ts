import {
  type EmployerJob,
  type JobFormValues,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { jobTypeOptions } from "@/app/lip/constants/job-options"

/**
 * Server-only jobs service.
 *
 * Calls the HireLoop API (`hireloop-server`) and normalizes the Mongo
 * documents into `EmployerJob`. Used by the route handlers and server actions
 * so the browser never talks to the backend directly.
 */

const BASE_URL =
  process.env.BASE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:8000"

type JobRecord = Record<string, unknown>

export type JobsResult<T> = { ok: true; data: T } | { ok: false; error: string }

export function failure(
  cause: unknown,
  fallback: string
): { ok: false; error: string } {
  const message =
    cause instanceof Error && cause.message ? cause.message : fallback

  return { ok: false, error: message.replace(/\.$/, "") + "." }
}

function text(value: unknown) {
  if (typeof value === "string") return value
  return value == null ? "" : String(value)
}

function toJobType(value: unknown) {
  return jobTypeOptions.find((type) => type === value) ?? "Full-time"
}

function normalizeJob(record: JobRecord): EmployerJob {
  const applicants = Number(record.applicants)

  return {
    _id: text(record.id) || text(record._id),
    employerId:text(record.employerId),
    title: text(record.title),
    company: text(record.company),
    category: text(record.category),
    type: toJobType(record.type),
    isRemote: Boolean(record.isRemote),
    location: text(record.location),
    deadline: text(record.deadline),
    minSalary: text(record.minSalary),
    maxSalary: text(record.maxSalary),
    frequency: text(record.frequency),
    responsibilities: text(record.responsibilities),
    requirements: text(record.requirements),
    status:
      record.status === "Active" || record.status === "Expired"
        ? record.status
        : "Active",
    createdAt: text(record.createdAt),
    applicants: Number.isFinite(applicants) && applicants > 0 ? applicants : 0,
  }
}

/** Keep only the fields the API should store. */
export function pickJobValues(record: JobRecord): JobFormValues {
  return {
    title: text(record.title),
    employerId: text(record.employerId),
    company: text(record.company),
    category: text(record.category),
    type: toJobType(record.type),
    isRemote: Boolean(record.isRemote),
    location: text(record.location),
    deadline: text(record.deadline),
    minSalary: text(record.minSalary),
    maxSalary: text(record.maxSalary),
    frequency: text(record.frequency),
    responsibilities: text(record.responsibilities),
    requirements: text(record.requirements),
    status:
      record.status === "Active" || record.status === "Expired"
        ? record.status
        : "Active",
  }
}

function apiError(action: string, response: Response) {
  return new Error(`${action} (${response.status} ${response.statusText}).`)
}

/** Every stored job post, newest first. */
export async function listJobs(): Promise<EmployerJob[]> {
  const response = await fetch(`${BASE_URL}/jobs`, { cache: "no-store" })

  if (!response.ok) {
    throw apiError("Could not load job posts", response)
  }

  const data: unknown = await response.json()
  if (!Array.isArray(data)) {
    throw new Error("The jobs API returned an unexpected response.")
  }

  return data
    .filter(
      (item): item is JobRecord => Boolean(item) && typeof item === "object"
    )
    .map(normalizeJob)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

/** Insert a job post and return the stored record. */
export async function insertJob(values: JobFormValues): Promise<EmployerJob> {
  const payload = {
    ...values,
    createdAt: new Date().toISOString(),
    applicants: 0,
  }

  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw apiError("Could not publish job", response)
  }

  const data: unknown = await response.json()
  const insertedId =
    data && typeof data === "object" && "insertedId" in data
      ? text((data as { insertedId?: unknown }).insertedId)
      : ""

  return normalizeJob({ ...payload, _id: insertedId })
}

/** Delete one job post by its id. */
export async function removeJobById(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/jobs/${encodeURIComponent(id)}`, {
    method: "DELETE",
  })

  // Already gone is the desired end state.
  if (!response.ok && response.status !== 404) {
    throw apiError("Could not delete job post", response)
  }
}
