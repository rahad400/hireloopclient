/** Shared job domain types used by the API, actions and every job screen. */

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

/** The 12 fields a job form can write. Keep this shape in sync with the API. */
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
  status:JobStatus
 
}

/** A stored job: the form fields plus server-generated values. */
export type EmployerJob = JobFormValues & {
  _id: string
  createdAt: string
  applicants: number
}

export type JobStatus = "Active" | "Expired"

/** `all` shows every post; the other values match `JobStatus`. */
export type JobStatusFilter = "all" | JobStatus
