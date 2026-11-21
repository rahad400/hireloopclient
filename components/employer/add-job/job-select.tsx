"use client"

import { ChevronDown } from "lucide-react"

import { jobSelectClassName } from "@/components/employer/add-job/ts/job-form-styles"
import { cn } from "cn"

/** Native select styled to match the Figma dropdowns. */
export function JobSelect({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(jobSelectClassName, className)} {...props}>
        {children}
      </select>

      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-[#a0a0ab]"
      />
    </div>
  )
}
