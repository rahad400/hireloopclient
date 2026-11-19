import type { ReactNode } from "react"

import { Label } from "@/components/ui/label"
import { cn } from "cn"

/**
 * Label + field wrapper used by every Add Job section.
 *
 * `required` only adds a visual asterisk; the form itself is `noValidate` so
 * the page can show its own message instead of the browser popup.
 */
export function JobField({
  label,
  htmlFor,
  required,
  hint,
  className,
  children,
}: {
  label: string
  htmlFor?: string
  required?: boolean
  hint?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between gap-3">
        <Label
          htmlFor={htmlFor}
          className="gap-0 text-sm font-medium text-[#f4f4f5]"
        >
          {label}
          {required && <span aria-hidden="true">{"\u00A0*"}</span>}
        </Label>

        {hint && (
          <span className="text-xs font-medium text-[#5a5a60]">{hint}</span>
        )}
      </div>

      {children}
    </div>
  )
}
