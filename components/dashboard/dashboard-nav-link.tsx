"use client"

import Link from "next/link"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import type { DashboardNavItem } from "@/lib/dashboard-navigation"

/**
 * One sidebar link. The active state matches the Figma symbol: a `#232327`
 * fill plus a 2x16 brand-coloured indicator on the left edge.
 */
export function DashboardNavLink({
  item,
  active,
}: {
  item: DashboardNavItem
  active: boolean
}) {
  const Icon = item.icon

  return (
    <SidebarMenuItem className="relative">
      {active && (
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-0 z-10 h-4 w-0.5 -translate-y-1/2 rounded-full bg-brand"
        />
      )}

      <SidebarMenuButton
        render={<Link href={item.href} />}
        isActive={active}
        className="h-[34px] gap-2.5 rounded-md pl-2.5 text-[13px] font-medium text-[#a1a4aa] hover:bg-white/[0.04] hover:text-ink data-active:bg-[#232327] data-active:text-[#f4f4f5] [&>svg]:size-[18px]!"
      >
        <Icon aria-hidden="true" />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
