"use client"

import { CalendarDays, MapPin } from "lucide-react"

import { JobField } from "@/components/employer/add-job/job-field"
import { jobInputClassName } from "@/components/employer/add-job/ts/job-form-styles"
import { JobSelect } from "@/components/employer/add-job/job-select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  salaryFrequencyOptions,
  type JobFormValues,
} from "@/components/employer/manage-jobs/ts/employer-job"

type LocationCompensationFieldsProps = {
  values: JobFormValues
  onChange: <K extends keyof JobFormValues>(
    key: K,
    value: JobFormValues[K]
  ) => void
}

const currencyPrefixClassName =
  "pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[15px] font-medium text-[#a0a0ab]"

/** Section 2: remote toggle, location, deadline and salary range. */
export function LocationCompensationFields({
  values,
  onChange,
}: LocationCompensationFieldsProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-4 rounded-xl border border-[#232327] bg-[#1e1e21] p-4">
        <div className="flex items-start gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#232327] text-[#c3c0ff]">
            <MapPin aria-hidden="true" className="size-4" />
          </span>

          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-white">
              Remote Work Allowed
            </span>
            <span className="text-[13px] leading-5 text-[#a0a0ab]">
              Enable worldwide or distributed candidate applications
            </span>
          </div>
        </div>

        <Switch
          checked={values.isRemote}
          onCheckedChange={(checked) => onChange("isRemote", checked)}
          aria-label="Remote work allowed"
          className="data-[size=default]:h-6! data-[size=default]:w-11! data-checked:bg-brand! data-unchecked:bg-[#232327] [&>span]:size-5 [&>span]:bg-white"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <JobField
          label="Job Location"
          htmlFor="job-location"
          hint="Required"
          required
        >
          <div className="relative">
            <MapPin
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#a0a0ab]"
            />
            <Input
              id="job-location"
              name="location"
              required
              value={values.location}
              onChange={(event) => onChange("location", event.target.value)}
              placeholder="New York, USA"
              className={`${jobInputClassName} pl-10`}
            />
          </div>
        </JobField>

        <JobField label="Application Deadline" htmlFor="job-deadline">
          <div className="relative">
            <CalendarDays
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#a0a0ab]"
            />
            <Input
              id="job-deadline"
              name="deadline"
              type="date"
              value={values.deadline}
              onChange={(event) => onChange("deadline", event.target.value)}
              className={`${jobInputClassName} pl-10`}
            />
          </div>
        </JobField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <JobField label="Min Salary / Rate" htmlFor="job-min-salary">
          <div className="relative">
            <span aria-hidden="true" className={currencyPrefixClassName}>
              €
            </span>
            <Input
              id="job-min-salary"
              name="minSalary"
              type="number"
              min={0}
              value={values.minSalary}
              onChange={(event) => onChange("minSalary", event.target.value)}
              placeholder="25"
              className={`${jobInputClassName} pl-10`}
            />
          </div>
        </JobField>

        <JobField label="Max Salary / Rate" htmlFor="job-max-salary">
          <div className="relative">
            <span aria-hidden="true" className={currencyPrefixClassName}>
              €
            </span>
            <Input
              id="job-max-salary"
              name="maxSalary"
              type="number"
              min={0}
              value={values.maxSalary}
              onChange={(event) => onChange("maxSalary", event.target.value)}
              placeholder="40"
              className={`${jobInputClassName} pl-10`}
            />
          </div>
        </JobField>

        <JobField label="Frequency" htmlFor="job-frequency">
          <JobSelect
            id="job-frequency"
            name="frequency"
            value={values.frequency}
            onChange={(event) => onChange("frequency", event.target.value)}
          >
            {salaryFrequencyOptions.map((frequency) => (
              <option key={frequency} value={frequency}>
                {frequency}
              </option>
            ))}
          </JobSelect>
        </JobField>
      </div>
    </>
  )
}
