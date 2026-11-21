"use client"

import { Building2 } from "lucide-react"

import { JobField } from "@/components/employer/add-job/job-field"
import { jobInputClassName } from "@/components/employer/add-job/ts/job-form-styles"
import { JobSelect } from "@/components/employer/add-job/job-select"
import { JobTypeSelector } from "@/components/employer/add-job/job-type-selector"
import { Input } from "@/components/ui/input"
import {
  jobCategoryOptions,
  type JobFormValues,
} from "@/components/employer/manage-jobs/ts/employer-job"

type BasicInformationFieldsProps = {
  values: JobFormValues
  onChange: <K extends keyof JobFormValues>(
    key: K,
    value: JobFormValues[K]
  ) => void
}

/** Section 1: title, company, category and job type. */
export function BasicInformationFields({
  values,
  onChange,
}: BasicInformationFieldsProps) {
  return (
    <>
      <JobField label="Job Title" htmlFor="job-title" required>
        <Input
          id="job-title"
          name="title"
          required
          value={values.title}
          onChange={(event) => onChange("title", event.target.value)}
          placeholder="Frontend Developer"
          className={jobInputClassName}
        />
      </JobField>

      <div className="grid gap-4 sm:grid-cols-2">
        <JobField label="Company Name" htmlFor="job-company" required>
          <div className="relative">
            <Building2
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#a0a0ab]"
            />
            <Input
              id="job-company"
              name="company"
              required
              value={values.company}
              onChange={(event) => onChange("company", event.target.value)}
              placeholder="HirePulse Network"
              className={`${jobInputClassName} pl-10`}
            />
          </div>
        </JobField>

        <JobField label="Job Category" htmlFor="job-category" required>
          <JobSelect
            id="job-category"
            name="category"
            required
            value={values.category}
            onChange={(event) => onChange("category", event.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {jobCategoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </JobSelect>
        </JobField>
      </div>

      <JobField label="Job Type" required>
        <JobTypeSelector
          value={values.type}
          onChange={(type) => onChange("type", type)}
        />
      </JobField>
    </>
  )
}
