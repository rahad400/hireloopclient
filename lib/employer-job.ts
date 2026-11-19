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
}

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

const STORAGE_KEY = "hireloop:employer-jobs"
const JOBS_CHANGED_EVENT = "hireloop:employer-jobs-changed"
const EMPTY_JOBS: EmployerJob[] = []

let cachedJobs: EmployerJob[] | null = null

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

/** Re-render subscribers when a job is saved in this tab or another one. */
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
  }

  cachedJobs = [job, ...readJobs()]
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedJobs))
  window.dispatchEvent(new Event(JOBS_CHANGED_EVENT))

  return job
}
