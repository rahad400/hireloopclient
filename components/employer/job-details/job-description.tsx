import { Check, ClipboardList } from "lucide-react"

import {
  detailPanelClassName,
  detailSectionTitleClassName,
} from "@/components/employer/job-details/ts/job-details-styles"
import { parseBulletList } from "@/components/employer/job-details/ts/job-details-utils"
import type { EmployerJob } from "@/components/employer/manage-jobs/ts/employer-job"
import { cn } from "cn"

/** Responsibilities and requirements rendered as readable bullet lists. */
export function JobDescription({ job }: { job: EmployerJob }) {
  const responsibilities = parseBulletList(job.responsibilities)
  const requirements = parseBulletList(job.requirements)

  return (
    <section className={cn(detailPanelClassName, "p-5 sm:p-6")}>
      <div className="flex items-start gap-2.5">
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-[#a5a0ff]"
        >
          <ClipboardList className="size-4" />
        </span>

        <div className="flex flex-col gap-1">
          <h2 className={detailSectionTitleClassName}>Job Description</h2>
          <p className="text-xs text-[#8b8b95]">
            What this person will own and the experience we are looking for.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-6">
        <div>
          <h3 className="flex items-center gap-2 text-[13px] font-medium text-[#ededef]">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-brand"
            />
            Responsibilities
          </h3>

          {responsibilities.length > 0 ? (
            <ul className="mt-3 flex flex-col gap-2.5">
              {responsibilities.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-2.5 text-[13px] leading-6 text-[#b4b4bd]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand/70"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-[13px] leading-6 text-[#6b6b76]">
              No responsibilities have been added to this post yet.
            </p>
          )}
        </div>

        <div aria-hidden="true" className="h-px bg-white/[0.06]" />

        <div>
          <h3 className="flex items-center gap-2 text-[13px] font-medium text-[#ededef]">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-[#22c55e]"
            />
            Requirements
          </h3>

          {requirements.length > 0 ? (
            <ul className="mt-3 flex flex-col gap-2.5">
              {requirements.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-2.5 text-[13px] leading-6 text-[#b4b4bd]"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-[#22c55e]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-[13px] leading-6 text-[#6b6b76]">
              No requirements have been added to this post yet.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
