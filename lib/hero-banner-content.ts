/**
 * Copy and lightweight data for the homepage banner.
 *
 * Keeping strings outside the JSX makes the section easier to scan, edit and
 * reuse (for example in metadata, tests or a CMS later).
 */

export type TrendingSearch = {
  /** Text shown inside the chip. */
  label: string
  /** Search term forwarded to the jobs page. */
  query: string
}

export const heroBannerContent = {
  announcement: {
    label: "50,000+ new jobs this month",
    href: "/jobs",
  },
  title: "Find Your Dream Job Today",
  description:
    "HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.",
  searchPlaceholder: "Job title, skill or company",
  locationPlaceholder: "Location or Remote",
  searchButtonLabel: "Search jobs",
  trendingLabel: "Trending",
} as const

export const trendingSearches: TrendingSearch[] = [
  { label: "Product Designer", query: "Product Designer" },
  { label: "AI Engineering", query: "AI Engineering" },
  { label: "DevOps Engineer", query: "DevOps Engineer" },
]
