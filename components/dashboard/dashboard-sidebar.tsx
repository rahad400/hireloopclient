"use client"

import { usePathname } from "next/navigation"

import { useSession } from "@/app/lip/auth-client"
import { DashboardBrand } from "@/components/dashboard/dashboard-brand"
import { DashboardIdentityCard } from "@/components/dashboard/dashboard-identity-card"
import { DashboardNavLink } from "@/components/dashboard/dashboard-nav-link"
import { DashboardSidebarFooter } from "@/components/dashboard/dashboard-sidebar-footer"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar"
import {
  dashboardRoles,
  getDashboardRole,
  isDashboardNavItemActive,
  isDashboardRole,
  type DashboardProfile,
} from "@/lib/dashboard-navigation"

/**
 * Dashboard navigation. The signed-in user decides the role, name and avatar;
 * the URL is only a fallback while the session is loading.
 *
 * `--sidebar` is overridden so shadcn's `bg-sidebar` renders the Figma surface
 * (`#0b0b0c`) on desktop regardless of the site theme.
 */
export function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const routeRole = getDashboardRole(pathname)
  const role = isDashboardRole(session?.user?.role)
    ? session.user.role
    : routeRole
  const config = dashboardRoles[role]

  const profile: DashboardProfile = {
    ...config.profile,
    name: session?.user?.name || config.profile.name,
    avatar: session?.user?.image || config.profile.avatar,
  }

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-white/[0.06] [--sidebar:#0b0b0c]"
    >  
      <SidebarHeader className="gap-5 px-3 pt-5 pb-0">
        <DashboardBrand subtitle={config.subtitle} />
        <DashboardIdentityCard {...profile} />
      </SidebarHeader>

      <SidebarContent className="px-3 pt-5">
        <SidebarGroup className="p-0">
          <nav aria-label="Dashboard">
            <SidebarMenu className="gap-0.5">
              {config.items.map((item) => (
                <DashboardNavLink
                  key={item.href}
                  item={item}
                  active={isDashboardNavItemActive(pathname, item.href)}
                />
              ))}
            </SidebarMenu>
          </nav>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-0 px-3 pt-0 pb-4">
        <DashboardSidebarFooter ctaLabel={config.ctaLabel} profile={profile} />
      </SidebarFooter>
    </Sidebar>
  )
}
