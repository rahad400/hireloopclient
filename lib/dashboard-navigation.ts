import {
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  HomeIcon,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export type DashboardRole = "candidate" | "employer" | "admin"

export type DashboardNavItem = {
  label: string
  href: string
  icon: LucideIcon
  /** `exact` stops child routes from keeping this item active. */
  match?: "prefix" | "exact"
}

export type DashboardProfile = {
  name: string
  roleLabel: string
  badge: string
  avatar: string
}

export type DashboardRoleConfig = {
  subtitle: string
  ctaLabel: string
  ctaHref: string
  profile: DashboardProfile
  items: DashboardNavItem[]
}

/**
 * One sidebar per role, mirroring the three `Sidebar` symbols in the Figma
 * file. The profile is a fallback while the session is loading; the real
 * name, avatar and role come from better-auth.
 */
export const dashboardRoles: Record<DashboardRole, DashboardRoleConfig> = {
  candidate: {
    subtitle: "Seeker Portal",
    ctaLabel: "Post Resume",
    ctaHref: "/browse-jobs",
    profile: {
      name: "candidate",
      roleLabel: "Job Seeker",
      badge: "Candidate",
      avatar: "/fig-avatars/profile.jpg",
    },
    items: [
      { label: "Dashboard", href: "/candidate", icon: LayoutDashboard },
      { label: "Jobs", href: "/candidate/jobs", icon: Briefcase },
      { label: "Saved Jobs", href: "/candidate/save-jobs", icon: Bookmark },
      {
        label: "Applications",
        href: "/candidate/applications",
        icon: FileText,
      },
      { label: "Billing", href: "/candidate/billing", icon: Wallet },
      { label: "Settings", href: "/candidate/settings", icon: Settings },
      { label: "Home", href: "/", icon: HomeIcon },
    ],
  },
  employer: {
    subtitle: "Employer Portal",
    ctaLabel: "Post a Job",
    ctaHref: "/employer/jobs/new",
    profile: {
      name: "employer",
      roleLabel: "Employer",
      badge: "Business account",
      avatar: "/fig-avatars/profile.jpg",
    },
    items: [
      { label: "Dashboard", href: "/employer", icon: LayoutDashboard },
      { label: "My Company", href: "/employer/company", icon: Building2 },
      { label: "Manage Jobs", href: "/employer/jobs", icon: Briefcase },
      {
        label: "Add Job",
        href: "/employer/jobs/new",
        icon: PlusCircle,
        match: "exact",
      },
      { label: "Applications", href: "/employer/applications", icon: FileText },
      { label: "Settings", href: "/employer/settings", icon: Settings },
      { label: "Home", href: "/", icon: HomeIcon },
    ],
  },
  admin: {
    subtitle: "Admin Console",
    ctaLabel: "Invite Admin",
    ctaHref: "/admin/users",
    profile: {
      name: "admin",
      roleLabel: "System Admin",
      badge: "Admin access",
      avatar: "/fig-avatars/profile.jpg",
    },
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Companies", href: "/admin/companies", icon: Building2 },
      { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
      { label: "Payments", href: "/admin/payments", icon: Wallet },
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Home", href: "/", icon: HomeIcon },
    ],
  },
}

/** Narrow an untrusted value (session/URL) to a dashboard role. */
export function isDashboardRole(value?: string | null): value is DashboardRole {
  return value === "candidate" || value === "employer" || value === "admin"
}

/** Read the role from the first URL segment, e.g. `/employer/jobs`. */
export function getDashboardRole(pathname: string): DashboardRole {
  const segment = pathname.split("/")[1]

  if (segment === "employer" || segment === "admin") {
    return segment
  }

  return "candidate"
}

/** Dashboard home for a signed-in user's role. */
export function getDashboardHome(role?: string | null) {
  return role === "employer" || role === "admin" ? `/${role}` : "/candidate"
}

/**
 * Only the role root is an exact match by default; every other item also
 * matches its own child routes so `/candidate/jobs/42` still highlights
 * "Jobs". Items marked `match: "exact"` (like Add Job) deliberately stop at
 * their own URL, so `/employer/jobs/new/42` falls back to "Manage Jobs".
 */
export function isDashboardNavItemActive(
  pathname: string,
  href: string,
  match: DashboardNavItem["match"] = "prefix"
) {
  if (match === "exact") {
    return pathname === href
  }

  const isRoleRoot = href.split("/").filter(Boolean).length === 1

  return isRoleRoot
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`)
}
