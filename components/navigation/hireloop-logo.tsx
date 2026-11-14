import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function HireloopLogo({
  className,
  priority = false,
  onClick,
}: {
  className?: string
  priority?: boolean
  onClick?: () => void
}) {
  return (
    <Link
      href="/"
      aria-label="HireLoop — home"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-night-soft",
        className
      )}
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={154}
        height={44}
        priority={priority}
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  )
}
