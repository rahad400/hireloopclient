import type { LucideIcon } from "lucide-react"
import {
  Briefcase,
  Code2,
  Headphones,
  Megaphone,
  Palette,
  Scale,
  Settings2,
} from "lucide-react"

import { cn } from "cn"

const categoryIcons: Record<string, { icon: LucideIcon; gradient: string }> = {
  "Engineering & Tech": {
    icon: Code2,
    gradient: "from-[#3b82f6] to-[#1d4ed8]",
  },
  "Design & Creative": {
    icon: Palette,
    gradient: "from-[#fb923c] to-[#c2410c]",
  },
  "Marketing & Sales": {
    icon: Megaphone,
    gradient: "from-[#2dd4bf] to-[#0f766e]",
  },
  "Customer Support": {
    icon: Headphones,
    gradient: "from-[#a78bfa] to-[#6d28d9]",
  },
  "Finance & Legal": {
    icon: Scale,
    gradient: "from-[#4ade80] to-[#15803d]",
  },
  Operations: {
    icon: Settings2,
    gradient: "from-[#94a3b8] to-[#475569]",
  },
  Other: {
    icon: Briefcase,
    gradient: "from-[#71717a] to-[#3f3f46]",
  },
}

/** Colored square icon shown left of every job title. */
export function JobCategoryIcon({
  category,
  className,
}: {
  category: string
  className?: string
}) {
  const { icon: Icon, gradient } =
    categoryIcons[category] ?? categoryIcons.Other

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
        gradient,
        className
      )}
    >
      <Icon className="size-4" />
    </span>
  )
}
