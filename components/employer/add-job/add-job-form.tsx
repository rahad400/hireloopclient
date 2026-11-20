"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { AddJobHeader } from "@/components/employer/add-job/add-job-header"
import { BasicInformationFields } from "@/components/employer/add-job/basic-information-fields"
import { DescriptionFields } from "@/components/employer/add-job/description-fields"
import { FormSection } from "@/components/employer/add-job/form-section"
import { LocationCompensationFields } from "@/components/employer/add-job/location-compensation-fields"
import { emptyJobForm, saveJob, type JobFormValues } from "@/lib/employer-job"
import { jobPrimaryButtonClassName } from "@/lib/job-form-styles"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { createJobs } from "@/app/lip/actions/jobs"

/** Returns the labels of the fields the user still has to fill in. */
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

/**
 * Add Job form.
 *
 * One controlled `values` object holds every field, so submitting sends the
 * exact data the user typed. Jobs are stored in localStorage and the browser
 * then returns to the Manage Jobs page.
 */
export function AddJobForm() {
  const router = useRouter()
  const [values, setValues] = useState<JobFormValues>(emptyJobForm)
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

    const job = saveJob(values)
    toast.success("Job published", {
      description: `${job.title} is now live.`,
    })
    router.push("/employer/jobs")
    
    const result = createJobs(job)
    console.log(result)
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-label="Post a new job"
      className="mx-auto flex w-full max-w-[984px] flex-col gap-6"
    >
      <AddJobHeader isSaving={isSaving} />

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
          {isSaving ? "Publishing..." : "Publish Job"}
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </form>
  )
}
