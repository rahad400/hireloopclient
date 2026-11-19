import type { ReactNode } from "react"

import { jobCardClassName } from "@/lib/job-form-styles"
import { cn } from "cn"

/** Numbered card that groups one part of the job form. */
export function FormSection({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <section className={cn(jobCardClassName, className)}>
      <div className="mb-5 flex items-center gap-2">
        <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
        <h2 className="text-base font-medium text-white">{title}</h2>
      </div>

      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}
