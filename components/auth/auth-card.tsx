import type { ReactNode } from "react"

import { HireloopLogo } from "@/components/navigation/hireloop-logo"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type AuthCardProps = {
  /** Main heading shown above the form. */
  title: string
  /** One short sentence that explains the page. */
  description: string
  /** The form and its supporting controls. */
  children: ReactNode
  /** Swap sign-in / sign-up link shown in the card footer. */
  footer: ReactNode
  /** Allows the sign-up card to be a little wider than sign-in. */
  className?: string
}

/**
 * Shared card shell for both auth pages.
 *
 * The card is intentionally the only elevated surface on the page. Everything
 * inside uses the shadcn primitives so spacing, focus rings, and disabled
 * states stay consistent with the rest of HireLoop.
 */
export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
}: AuthCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-md gap-0 rounded-2xl border border-white/10 bg-night-raised/90 p-0 text-ink shadow-[0_40px_120px_-48px_rgba(0,0,0,0.95)] ring-1 ring-white/10 backdrop-blur-xl",
        className
      )}
    >
      <CardHeader className="items-center gap-2 px-6 pt-8 pb-0 text-center sm:px-8">
        <HireloopLogo className="mb-3" />
        
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
            {title}
          </h1>

          <CardDescription className="mx-auto flex items-center justify-center max-w-xs text-sm leading-relaxed text-ink-muted">
            {description}
          </CardDescription>
        
      </CardHeader>

      <CardContent className="px-6 pt-6 pb-7 sm:px-8">{children}</CardContent>

      <CardFooter className="justify-center border-white/10 bg-white/[0.02] px-6 py-4 text-center text-sm text-ink-muted sm:px-8">
        {/* A single inline wrapper keeps the whitespace around "?" and the
            link; separate flex children collapsed it. */}
        <span>{footer}</span>
      </CardFooter>
    </Card>
  )
}
