"use client"

import { cn } from "cn"

import type { JobType } from "@/components/employer/manage-jobs/ts/employer-job"
import { jobTypeOptions } from "@/app/lip/constants/job-options"

/** Four-option segmented control from the Figma "Job Type" field. */
export function JobTypeSelector({
  value,
  onChange,
}: {
  value: JobType
  onChange: (value: JobType) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {jobTypeOptions.map((option) => {
        const isActive = option === value

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={isActive}
            className={cn(
              "h-11 rounded-xl border text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
              isActive
                ? "border-brand/50 bg-[#232327] font-medium text-white"
                : "border-transparent bg-[#1e1e21] font-normal text-[#a0a0ab] hover:text-white"
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
