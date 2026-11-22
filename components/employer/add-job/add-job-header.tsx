import Link from "next/link"
import {  ChevronRight } from "lucide-react"

/** Page header: breadcrumb and title for creating or updating a job. */
export function AddJobHeader({
  isSaving,
  mode = "create",
}: {
  isSaving: boolean
  mode?: "create" | "update"
}) {
  const isUpdate = mode === "update"

  return (
    <div className="flex flex-col gap-5 border-b border-white/[0.08] pb-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex flex-col gap-1.5">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-medium text-[#a0a0ab]"
        >
          <Link href="/employer/jobs" className="hover:text-white">
            Manage Jobs
          </Link>
          <ChevronRight aria-hidden="true" className="size-3" />
          <span className="text-[#c3c0ff]">
            {isUpdate ? "Update Listing" : "Create New Listing"}
          </span>
        </nav>

        <h1 className="text-2xl leading-tight font-medium text-white sm:text-[32px] sm:leading-[42px]">
          {isUpdate ? "Update Job" : "Post a New Job"}
        </h1>

        <p className="max-w-xl text-[13px] leading-5 text-[#a0a0ab]">
          {isUpdate
            ? "Review and update this position to keep your listing accurate."
            : "Fill in the position specifications to attract qualified talent across our network."}
        </p>
      </div>

     
    </div>
  )
}
