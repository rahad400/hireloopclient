export type NavigationLink = {
  label: string
  href: string
  /** Match child routes, e.g. /jobs/123 highlights "Browse jobs". */
  match?: string
}

export const navigationLinks: NavigationLink[] = [
  { label: "Browse jobs", href: "/browse-jobs", match: "/browse-jobs" },
  { label: "Companies", href: "/companies", match: "/companies" },
  { label: "Pricing", href: "/pricing", match: "/pricing" },
]

export const accountLinks = {
  signIn: { label: "Sign in", href: "/sign-in" },
  getStarted: { label: "Get started", href: "/sign-up" },
} as const
