import { demoJobs } from "@/lib/demo-jobs"

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

export type JobFormValues = {
  title: string
  company: string
  category: string
  type: JobType
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  requirements: string
}

export type EmployerJob = JobFormValues & {
  id: string
  createdAt: string
  applicants: number
}

export type JobStatus = "Active" | "Expired"

export const jobTypeOptions: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
]

export const jobCategoryOptions = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing & Sales",
  "Customer Support",
  "Finance & Legal",
  "Operations",
  "Other",
]

export const salaryFrequencyOptions = [
  "per hour",
  "per day",
  "per month",
  "per year",
]

/** Empty form used by the Add Job page. */
export const emptyJobForm: JobFormValues = {
  title: "",
  company: "",
  category: "",
  type: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  requirements: "",
}

const STORAGE_KEY = "hireloop:job-posts"
const JOBS_CHANGED_EVENT = "hireloop:job-posts-changed"
const EMPTY_JOBS: EmployerJob[] = []
const DAY_MS = 86_400_000

/** Demo metadata that is not part of the Add Job form. */
const applicantsBySeed = [34, 10, 12, 27, 8, 6]
const postedDaysAgoBySeed = [2, 9, 5, 5, 5, 4]

const departmentByCategory: Record<string, string> = {
  "Engineering & Tech": "Engineering",
  "Design & Creative": "Design",
  "Marketing & Sales": "Marketing",
  "Customer Support": "Support",
  "Finance & Legal": "Finance",
  Operations: "Operations",
  Other: "General",
}

let cachedJobs: EmployerJob[] | null = null

/** Short department label shown under the job title. */
export function getJobDepartment(job: JobFormValues) {
  return departmentByCategory[job.category] ?? job.category ?? "General"
}

/** A job is expired once its application deadline has passed. */
export function getJobStatus(job: EmployerJob): JobStatus {
  if (!job.deadline) return "Active"

  const deadline = new Date(`${job.deadline}T23:59:59`).getTime()
  return deadline < Date.now() ? "Expired" : "Active"
}

/** Short public reference like `HL-90210`, derived from the stored id. */
export function getJobRef(job: EmployerJob) {
  const digits = job.id.replace(/\D/g, "").slice(-5).padStart(5, "0")
  return `HL-${digits}`
}

/** `Oct 24, 2026` — the Deadline column format. */
export function formatJobDate(value: string) {
  if (!value) return "—"

  const date = new Date(value.length === 10 ? `${value}T00:00:00` : value)
  if (Number.isNaN(date.getTime())) return "—"

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

/** `Posted 2d ago` under the deadline. */
export function formatPostedAgo(value: string) {
  if (!value) return "Posted recently"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Posted recently"

  const days = Math.floor((Date.now() - date.getTime()) / DAY_MS)
  if (days <= 0) return "Posted today"
  return `Posted ${days}d ago`
}

/** `Remote (New York, USA)` when remote, otherwise the stored location. */
export function formatJobLocation(job: JobFormValues) {
  const location = job.location.trim()

  if (!location) return job.isRemote ? "Remote" : "Location not set"
  if (job.isRemote && !location.toLowerCase().includes("remote")) {
    return `Remote (${location})`
  }

  return location
}

const frequencyByUnit: Record<string, string> = {
  "per hour": "hr",
  "per day": "day",
  "per month": "mo",
  "per year": "yr",
}

function formatMoney(value: string) {
  const amount = Number(value)
  if (!Number.isFinite(amount) || amount <= 0) return ""
  return amount >= 1000 ? `€${Math.round(amount / 1000)}k` : `€${amount}`
}

/** `€25 – €40` plus the `/ hr` unit shown next to it. */
export function getJobCompensation(job: JobFormValues) {
  const min = formatMoney(job.minSalary)
  const max = formatMoney(job.maxSalary)
  const range = [min, max].filter(Boolean).join(" – ")

  return {
    amount: range || "Not specified",
    unit: range ? (frequencyByUnit[job.frequency] ?? "") : "",
  }
}

function readJobs(): EmployerJob[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return EMPTY_JOBS

    const parsed = JSON.parse(stored) as unknown
    return Array.isArray(parsed) ? (parsed as EmployerJob[]) : EMPTY_JOBS
  } catch {
    return EMPTY_JOBS
  }
}

/** Write the demo jobs once, so the table is never empty on a first visit. */
function seedDemoJobs() {
  if (window.localStorage.getItem(STORAGE_KEY) !== null) return

  const now = Date.now()
  const seeded: EmployerJob[] = demoJobs.map((job, index) => ({
    ...job,
    id: `${now - index * DAY_MS}-${index + 1}`,
    createdAt: new Date(
      now - (postedDaysAgoBySeed[index] ?? 3) * DAY_MS
    ).toISOString(),
    applicants: applicantsBySeed[index] ?? 0,
  }))

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
}

/** Jobs published from this browser, newest first. */
export function getJobs(): EmployerJob[] {
  if (typeof window === "undefined") return EMPTY_JOBS

  if (cachedJobs === null) {
    cachedJobs = readJobs()
  }

  return cachedJobs
}

/** Snapshot for `useSyncExternalStore`; `null` means "not read yet". */
export function getJobsSnapshot(): EmployerJob[] | null {
  return getJobs()
}

/** Server and hydration snapshot, so the first paint does not mismatch. */
export function getJobsServerSnapshot(): EmployerJob[] | null {
  return null
}

/** Re-render subscribers when a job changes in this tab or another one. */
export function subscribeToJobs(onChange: () => void) {
  function handleChange() {
    cachedJobs = null
    onChange()
  }

  window.addEventListener("storage", handleChange)
  window.addEventListener(JOBS_CHANGED_EVENT, handleChange)

  return () => {
    window.removeEventListener("storage", handleChange)
    window.removeEventListener(JOBS_CHANGED_EVENT, handleChange)
  }
}

/** Save a form submission and return the stored job. */
export function saveJob(values: JobFormValues): EmployerJob {
  const job: EmployerJob = {
    ...values,
    id: `${Date.now()}-${Math.round(Math.random() * 1_000_000)}`,
    createdAt: new Date().toISOString(),
    applicants: 0,
  }

  cachedJobs = [job, ...readJobs()]
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedJobs))
  window.dispatchEvent(new Event(JOBS_CHANGED_EVENT))

  return job
}

/** Copy one post into a new draft with no applicants yet. */
export function duplicateJob(job: EmployerJob): EmployerJob {
  return saveJob({
    title: `${job.title} (Copy)`,
    company: job.company,
    category: job.category,
    type: job.type,
    isRemote: job.isRemote,
    location: job.location,
    deadline: job.deadline,
    minSalary: job.minSalary,
    maxSalary: job.maxSalary,
    frequency: job.frequency,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
  })
}

/** Remove a job and notify the Manage Jobs table. */
export function deleteJob(id: string) {
  cachedJobs = getJobs().filter((job) => job.id !== id)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedJobs))
  window.dispatchEvent(new Event(JOBS_CHANGED_EVENT))
}

if (typeof window !== "undefined") {
  try {
    seedDemoJobs()
  } catch {
    // Storage can be unavailable (private mode); the table handles empty data.
  }
}
