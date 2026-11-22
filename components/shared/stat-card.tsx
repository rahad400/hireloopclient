import type { LucideIcon } from "lucide-react"
import { cn } from "cn"

import {
  dashboardLabelClassName,
  dashboardPanelClassName,
} from "@/lib/styles/dashboard"

type StatCardProps = {
  label: string
  value: string | number
  hint?: string
  icon: LucideIcon
  iconClassName: string
  /** Overrides the caption color when a screen uses a lighter label. */
  labelClassName?: string
  loading?: boolean
  /** `compact` for Manage Jobs, `detail` for the Job Details overview. */
  variant?: "compact" | "detail"
}

/** The icon + label + value card used by both job screens. */
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  iconClassName,
  labelClassName = dashboardLabelClassName,
  loading = false,
  variant = "compact",
}: StatCardProps) {
  const isDetail = variant === "detail"

  return (
    <article
      className={cn(
        dashboardPanelClassName,
        isDetail
          ? "flex items-start gap-3 p-4"
          : "flex items-center gap-3 px-4 py-3.5"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          iconClassName
        )}
      >
        <Icon className="size-4" />
      </span>

      <div className={cn("flex min-w-0 flex-col", isDetail && "gap-0.5")}>
        <p className={labelClassName}>{label}</p>

        {loading ? (
          <span className="mt-1 block h-6 w-9 animate-pulse rounded bg-white/[0.08]" />
        ) : (
          <p
            className={
              isDetail
                ? "truncate text-[17px] leading-6 font-semibold text-[#ededef]"
                : "text-lg leading-7 font-semibold text-[#ededef]"
            }
          >
            {value}
          </p>
        )}

        {isDetail && hint && (
          <p className="truncate text-[11px] leading-4 text-[#8b8b95]">
            {hint}
          </p>
        )}
      </div>
    </article>
  )
}
