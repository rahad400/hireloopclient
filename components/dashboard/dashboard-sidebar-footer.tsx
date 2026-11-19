"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { authClient } from "@/app/lip/auth-client"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { DashboardProfile } from "@/lib/dashboard-navigation"
import Link from "next/link"

/**
 * Bottom of the sidebar: the primary white CTA, the signed-in user card and
 * the logout row.
 */
export function DashboardSidebarFooter({
  ctaLabel,
  profile,
  ctaHref,
}: {
  ctaLabel: string
  ctaHref: string
  profile: DashboardProfile
}) {
  const router = useRouter()

  async function handleLogout() {
    await authClient.signOut()
    router.push("/sign-in")
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-3">
      <Link
        href={ctaHref}
        className="flex h-10 w-full items-center justify-center rounded-lg bg-[#fafafa] text-sm font-semibold text-[#0b0b0c] shadow-[0_1px_2px_rgba(0,0,0,0.4)] hover:bg-white hover:text-[#0b0b0c]"
      >
        {ctaLabel}
      </Link>

      <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#141416] p-3">
        <Avatar className="size-8 border border-white/10">
          <AvatarImage src={profile.avatar} alt="" />
        </Avatar>

        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-[#f4f4f5]">
            {profile.name}
          </p>
          <p className="truncate text-xs text-[#7c7f87]">{profile.roleLabel}</p>
        </div>
      </div>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={handleLogout}
            className="h-[34px] gap-2.5 rounded-md pl-2.5 text-[13px] font-medium text-[#a1a4aa] hover:bg-white/[0.04] hover:text-ink [&>svg]:size-[18px]!"
          >
            <LogOut aria-hidden="true" />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  )
}
