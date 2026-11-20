import { cn } from "cn"

import type { JobStatus } from "@/lib/employer-job"

/** Active (green) or Expired (muted) pill from the job post table. */
export function JobStatusBadge({
  status,
  className,
}: {
  status: JobStatus
  className?: string
}) {
  const isActive = status === "Active"

  return (
    <span
      className={cn(
        "inline-flex h-6 w-fit items-center gap-1.5 rounded-md px-2.5 text-[11px] leading-4 font-medium",
        isActive
          ? "bg-[#22c55e]/12 text-[#22c55e]"
          : "bg-white/[0.06] text-[#9a9aa5]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          isActive ? "bg-[#22c55e]" : "bg-[#9a9aa5]"
        )}
      />
      {status}
    </span>
  )
}
