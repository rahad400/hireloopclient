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
  _id: string
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

const DAY_MS = 86_400_000

const departmentByCategory: Record<string, string> = {
  "Engineering & Tech": "Engineering",
  "Design & Creative": "Design",
  "Marketing & Sales": "Marketing",
  "Customer Support": "Support",
  "Finance & Legal": "Finance",
  Operations: "Operations",
  Other: "General",
}

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
  const digits = job._id.replace(/\D/g, "").slice(-5).padStart(5, "0")
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

/** Strip server-only fields before writing a job back to the API. */
export function toJobValues(job: JobFormValues): JobFormValues {
  return {
    title: job.title,
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
  }
}
