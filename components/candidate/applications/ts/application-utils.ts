import type {
  ApplicationSort,
  ApplicationTab,
  CandidateApplication,
} from "@/components/candidate/applications/ts/candidate-application"

const MINUTE_MS = 60_000
const HOUR_MS = 3_600_000
const DAY_MS = 86_400_000
const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i
const OBJECT_ID_TIME_LENGTH = 8
const PAGE_SIZE = 5

/**
 * The API does not store an applied date yet. MongoDB ObjectIds contain the
 * document creation time in their first 8 characters, so use that as the
 * applied date. A stored `appliedAt` value always wins when one is added.
 */
export function getAppliedDate(application: CandidateApplication): Date | null {
  if (application.appliedAt) {
    const storedDate = new Date(application.appliedAt)
    return Number.isNaN(storedDate.getTime()) ? null : storedDate
  }

  if (!OBJECT_ID_PATTERN.test(application._id)) return null

  const seconds = Number.parseInt(
    application._id.slice(0, OBJECT_ID_TIME_LENGTH),
    16
  )

  if (!Number.isFinite(seconds)) return null

  return new Date(seconds * 1000)
}

/** `Nov 20, 2026` — used as the sort key and card fallback. */
export function formatAppliedDate(application: CandidateApplication): string {
  const date = getAppliedDate(application)
  if (!date) return "—"

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

/**
 * `2 hours ago` — the relative label shown in the Figma Applied column.
 * The caller passes the clock so this stays deterministic during SSR.
 */
export function formatAppliedAgo(
  application: CandidateApplication,
  now: number
): string {
  const date = getAppliedDate(application)
  if (!date) return "Recently"

  const elapsed = Math.max(0, now - date.getTime())
  if (elapsed < MINUTE_MS) return "Just now"
  if (elapsed < HOUR_MS) return `${Math.floor(elapsed / MINUTE_MS)} min ago`
  if (elapsed < DAY_MS) return `${Math.floor(elapsed / HOUR_MS)} hours ago`

  const days = Math.floor(elapsed / DAY_MS)
  if (days === 1) return "1 day ago"
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`

  return `${Math.floor(days / 30)} months ago`
}

/** `Full-time • Remote` — the small line under the job title. */
export function getJobSummary(application: CandidateApplication): string {
  const type = application.jobType?.trim() || "Job"
  const mode =
    application.isRemote === undefined
      ? null
      : application.isRemote
        ? "Remote"
        : "On-site"

  return mode ? `${type} • ${mode}` : type
}

/** The Figma header tabs: only records marked `Archived` are archived. */
export function filterByTab(
  applications: CandidateApplication[],
  tab: ApplicationTab
): CandidateApplication[] {
  if (tab === "archived") {
    return applications.filter(
      (application) => application.status === "Archived"
    )
  }

  return applications.filter((application) => application.status !== "Archived")
}

/** Sorted company names for the filter select. */
export function getCompanyOptions(
  applications: CandidateApplication[]
): string[] {
  const companies = applications
    .map((application) => application.company)
    .filter((company): company is string => Boolean(company?.trim()))

  return [...new Set(companies)].sort((first, second) =>
    first.localeCompare(second, "en")
  )
}

/** Search matches the job title or the company name, ignoring case. */
export function filterApplications(
  applications: CandidateApplication[],
  searchTerm: string,
  company: string
): CandidateApplication[] {
  const query = searchTerm.trim().toLowerCase()

  return applications.filter((application) => {
    const matchesSearch =
      !query ||
      `${application.jobTitle} ${application.company}`
        .toLowerCase()
        .includes(query)
    const matchesCompany = company === "all" || application.company === company

    return matchesSearch && matchesCompany
  })
}

/** Returns a new sorted array; the original data is never mutated. */
export function sortApplications(
  applications: CandidateApplication[],
  sort: ApplicationSort
): CandidateApplication[] {
  const time = (application: CandidateApplication) =>
    getAppliedDate(application)?.getTime() ?? 0

  return [...applications].sort((first, second) => {
    switch (sort) {
      case "oldest":
        return time(first) - time(second)
      case "title":
        return first.jobTitle.localeCompare(second.jobTitle, "en")
      case "company":
        return first.company.localeCompare(second.company, "en")
      default:
        return time(second) - time(first)
    }
  })
}

/** Five rows per page, matching the Figma table. */
export const applicationsPageSize = PAGE_SIZE

export function paginateApplications<T>(applications: T[], page: number): T[] {
  const start = (page - 1) * PAGE_SIZE
  return applications.slice(start, start + PAGE_SIZE)
}
