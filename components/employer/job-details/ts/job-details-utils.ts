const DAY_MS = 86_400_000

/** Matches `- item`, `* item`, `• item`, `1. item` and `1) item`. */
const BULLET_PREFIX = /^(?:[-*•]+|\d+[.)])\s*/

/**
 * Splits the stored description fields into individual bullet strings.
 *
 * The add-job form stores free text, so this accepts new lines, bullet
 * characters and plain paragraphs without changing the saved data.
 */
export function parseBulletList(value: string): string[] {
  if (!value) return []

  return value
    .split(/\r?\n|•/)
    .map((line) => line.replace(BULLET_PREFIX, "").trim())
    .filter(Boolean)
}

/** `per month` → `Per month`; empty values fall back to a readable label. */
export function formatSalaryFrequency(frequency: string): string {
  const value = frequency.trim()
  if (!value) return "Not specified"

  return value.charAt(0).toUpperCase() + value.slice(1)
}

/** `Remote` or `On-site` for the work-mode labels and badges. */
export function getWorkMode(isRemote: boolean): string {
  return isRemote ? "Remote" : "On-site"
}

/**
 * Friendly deadline hint used under the formatted date.
 *
 * Dates are compared by calendar day so "Closes today" matches the badge.
 */
export function getDeadlineNote(deadline: string): string {
  if (!deadline) return "No deadline set"

  const date = new Date(
    deadline.length === 10 ? `${deadline}T00:00:00` : deadline
  )
  if (Number.isNaN(date.getTime())) return "No deadline set"

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)

  const days = Math.round((date.getTime() - today.getTime()) / DAY_MS)

  if (days < 0) return "Applications closed"
  if (days === 0) return "Closes today"
  if (days === 1) return "Closes tomorrow"

  return `Closes in ${days} days`
}
