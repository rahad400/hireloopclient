/** One application record returned by the `/application` API. */

export type CandidateApplication = {
  _id: string
  jobId: string
  userId: string
  email: string
  name: string
  jobTitle: string
  company: string
  /** Optional fields, used as soon as the API stores them. */
  status?: string
  appliedAt?: string
  /** Enriched from the job listing so rows can show the Figma subtitle. */
  jobType?: string
  isRemote?: boolean
  location?: string
  /** Used by the reusable JobCategoryIcon, just like the Browse Jobs card. */
  category?: string
}

/** Options shown in the sort select on the Applications page. */
export type ApplicationSort = "newest" | "oldest" | "title" | "company"

/** The two tabs from the Figma header. */
export type ApplicationTab = "active" | "archived"

export const applicationSortOptions: {
  value: ApplicationSort
  label: string
}[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Job title A–Z" },
  { value: "company", label: "Company A–Z" },
]
