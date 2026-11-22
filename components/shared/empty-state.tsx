import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "cn"

import { dashboardPanelClassName } from "@/lib/styles/dashboard"

type EmptyStateProps = {
  icon: LucideIcon
  iconClassName: string
  iconSizeClassName?: string
  title: string
  titleAs?: "p" | "h1"
  titleClassName?: string
  description: ReactNode
  descriptionClassName?: string
  /** Kept explicit so each screen keeps its original spacing. */
  containerClassName: string
  action?: ReactNode
}

/** Panel used for empty, error, no-results and not-found states. */
export function EmptyState({
  icon: Icon,
  iconClassName,
  iconSizeClassName = "size-5",
  title,
  titleAs = "p",
  titleClassName = "text-base font-medium text-[#ededef]",
  description,
  descriptionClassName = "max-w-sm text-[13px] leading-5 text-[#8b8b95]",
  containerClassName,
  action,
}: EmptyStateProps) {
  const Title = titleAs

  return (
    <div className={cn(dashboardPanelClassName, containerClassName)}>
      <span
        aria-hidden="true"
        className={cn(
          "flex size-12 items-center justify-center rounded-xl",
          iconClassName
        )}
      >
        <Icon aria-hidden="true" className={iconSizeClassName} />
      </span>

      <div className="flex flex-col gap-1">
        <Title className={titleClassName}>{title}</Title>
        <p className={descriptionClassName}>{description}</p>
      </div>

      {action}
    </div>
  )
}
