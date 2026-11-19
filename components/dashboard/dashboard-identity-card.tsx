import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { DashboardProfile } from "@/lib/dashboard-navigation"

/**
 * Compact identity card under the brand: avatar, name, role and plan badge.
 */
export function DashboardIdentityCard({
  name,
  roleLabel,
  badge,
  avatar,
}: DashboardProfile) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#141416] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <Avatar className="size-8 border border-white/10">
        <AvatarImage src={avatar} alt="" />
      </Avatar>

      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-sm font-semibold text-[#f4f4f5]">
          {name}
        </span>
        <span className="truncate text-xs text-[#a1a4aa]">{roleLabel}</span>
        <Badge className="mt-0.5 h-[22px] w-fit rounded-full border border-brand/30 bg-brand/15 px-2.5 text-[11px] font-semibold text-[#8f88ff]">
          {badge}
        </Badge>
      </div>
    </div>
  )
}
