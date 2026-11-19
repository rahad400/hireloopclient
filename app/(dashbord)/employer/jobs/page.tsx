import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { jobPrimaryButtonClassName } from "@/lib/job-form-styles"
import { ManageJobsList } from "@/components/employer/manage-jobs/manage-jobs-list"
import { Button } from "@/components/ui/button"

export default function ManageJobsPage() {
  return (
    <div className="mx-auto flex w-full max-w-[984px] flex-col gap-6">
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl leading-tight font-medium text-white sm:text-[32px] sm:leading-[42px]">
            Manage Jobs
          </h1>
          <p className="text-[13px] leading-5 text-[#a0a0ab]">
            Review every role you have published and keep your listings up to
            date.
          </p>
        </div>

        <Button
          render={<Link href="/employer/jobs/new" />}
          nativeButton={false}
          className={jobPrimaryButtonClassName}
        >
          <PlusCircle aria-hidden="true" />
          Add Job
        </Button>
      </div>

      <ManageJobsList />
    </div>
  )
}
