import { Separator } from "@/components/ui/separator"

/**
 * "or continue with email" divider used between Google and the email form.
 *
 * A plain Separator with a text label is enough here; the auth card already
 * provides the dark background, so the label needs no extra surface.
 */
export function AuthDivider({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3">
      <Separator className="flex-1 bg-white/10" />
      <span className="shrink-0 text-xs tracking-wide text-ink-muted">
        {children}
      </span>
      <Separator className="flex-1 bg-white/10" />
    </div>
  )
}
