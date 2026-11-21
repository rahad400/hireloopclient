"use client"

import { JobField } from "@/components/employer/add-job/job-field"
import { jobTextareaClassName } from "@/components/employer/add-job/ts/job-form-styles"
import type { JobFormValues } from "@/components/employer/manage-jobs/ts/employer-job"

type DescriptionFieldsProps = {
  values: JobFormValues
  onChange: <K extends keyof JobFormValues>(
    key: K,
    value: JobFormValues[K]
  ) => void
}

/** Section 3: responsibilities and requirements textareas. */
export function DescriptionFields({
  values,
  onChange,
}: DescriptionFieldsProps) {
  return (
    <>
      <JobField
        label="Key Responsibilities"
        htmlFor="job-responsibilities"
        required
      >
        <textarea
          id="job-responsibilities"
          name="responsibilities"
          required
          value={values.responsibilities}
          onChange={(event) => onChange("responsibilities", event.target.value)}
          placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
          className={jobTextareaClassName}
        />
      </JobField>

      <JobField
        label="Qualifications & Requirements"
        htmlFor="job-requirements"
        required
      >
        <textarea
          id="job-requirements"
          name="requirements"
          required
          value={values.requirements}
          onChange={(event) => onChange("requirements", event.target.value)}
          placeholder={
            "• 3+ years of experience with React and TypeScript\n• Solid understanding of DOM performance\n• Experience partnering closely with product and design teams"
          }
          className={jobTextareaClassName}
        />
      </JobField>
    </>
  )
}
