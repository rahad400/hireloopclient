"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { toast } from "sonner"

import updateJob from "@/app/lip/actions/update"
import { AddJobHeader } from "@/components/employer/add-job/add-job-header"
import { BasicInformationFields } from "@/components/employer/add-job/basic-information-fields"
import { DescriptionFields } from "@/components/employer/add-job/description-fields"
import { FormSection } from "@/components/employer/add-job/form-section"
import { LocationCompensationFields } from "@/components/employer/add-job/location-compensation-fields"
import { jobPrimaryButtonClassName } from "@/components/employer/add-job/ts/job-form-styles"
import {
  toJobValues,
  type EmployerJob,
  type JobFormValues,
} from "@/components/employer/manage-jobs/ts/employer-job"
import { Button } from "@/components/ui/button"

function getMissingFields(values: JobFormValues) {
  const missing: string[] = []

  if (!values.title.trim()) missing.push("job title")
  if (!values.company.trim()) missing.push("company name")
  if (!values.category) missing.push("job category")
  if (!values.location.trim()) missing.push("job location")
  if (!values.responsibilities.trim()) missing.push("key responsibilities")
  if (!values.requirements.trim()) missing.push("qualifications")

  return missing
}

export function UpdateJobForm({ job }: { job: EmployerJob }) {
  const router = useRouter()
  const [values, setValues] = useState<JobFormValues>(() => toJobValues(job))
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  function update<K extends keyof JobFormValues>(
    key: K,
    value: JobFormValues[K]
  ) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrorMessage(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const missing = getMissingFields(values)
    if (missing.length > 0) {
      setErrorMessage(`Please add: ${missing.join(", ")}.`)
      return
    }

    setErrorMessage(null)
    setIsSaving(true)

    try {
      await updateJob(job._id, values)
      toast.success("Job updated", {
        description: `${values.title} was updated successfully.`,
      })
      router.push("/employer/jobs")
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "Could not update job."

      setIsSaving(false)
      setErrorMessage(message)
      toast.error("Could not update job", { description: message })
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-label="Update job"
      className="mx-auto flex w-full max-w-[984px] flex-col gap-6"
    >
      <AddJobHeader isSaving={isSaving} mode="update" />

      {errorMessage && (
        <p
          role="alert"
          aria-live="polite"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {errorMessage}
        </p>
      )}

      <div className="flex flex-col gap-5">
        <FormSection title="1. Basic Information">
          <BasicInformationFields values={values} onChange={update} />
        </FormSection>

        <FormSection title="2. Location, Compensation & Timeline">
          <LocationCompensationFields values={values} onChange={update} />
        </FormSection>

        <FormSection title="3. Responsibilities & Requirements">
          <DescriptionFields values={values} onChange={update} />
        </FormSection>
      </div>

      <div className="flex cursor-pointer items-center justify-end">
        <Button
          type="submit"
          disabled={isSaving}
          aria-busy={isSaving}
          className={jobPrimaryButtonClassName}
        >
          {isSaving ? "Updating..." : "Update Job"}
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </form>
  )
}
