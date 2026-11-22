"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import { toast } from "sonner"

// Your existing action already sends PATCH to /jobs/:id.
import updateJobs from "@/app/lip/actions/update"
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

export function UpdateJobForm({ job }: { job: EmployerJob }) {
  const router = useRouter()
  // toJobValues keeps only the 12 form fields, so _id is never sent.
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
    setIsSaving(true)
    setErrorMessage(null)

    try {
      await updateJobs(job._id, values)
      toast.success("Job post updated", {
        description: `${values.title} was updated.`,
      })
      router.push(`/employer/jobs/new/${encodeURIComponent(job._id)}`)
    } catch (cause) {
      const message =
        cause instanceof Error ? cause.message : "Could not update job post."
      setErrorMessage(message)
      toast.error("Could not update job post", { description: message })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Update job post"
      className="mx-auto flex w-full max-w-[984px] flex-col gap-6"
    >
      <header className="flex flex-col gap-4 border-b border-white/[0.08] pb-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-medium text-[#a0a0ab]"
        >
          <Link href="/employer/jobs" className="hover:text-white">
            Manage Jobs
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <Link
            href={`/employer/jobs/new/${encodeURIComponent(job._id)}`}
            className="hover:text-white"
          >
            Job Details
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <span className="text-[#c3c0ff]">Edit Job</span>
        </nav>

        <div>
          <h1 className="text-2xl leading-tight font-medium text-white sm:text-[32px] sm:leading-[42px]">
            Edit Job Post
          </h1>
          <p className="mt-1 max-w-xl text-[13px] leading-5 text-[#a0a0ab]">
            Update the details for {job.title}.
          </p>
        </div>
      </header>

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

      <div className="flex items-center justify-between">
        <Button
          render={
            <Link href={`/employer/jobs/new/${encodeURIComponent(job._id)}`} />
          }
          nativeButton={false}
        >
          <ArrowLeft aria-hidden="true" />
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSaving}
          aria-busy={isSaving}
          className={jobPrimaryButtonClassName}
        >
          {isSaving ? "Saving..." : "Save Changes"}
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </form>
  )
}
