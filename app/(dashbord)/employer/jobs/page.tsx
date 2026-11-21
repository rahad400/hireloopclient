import type { Metadata } from "next"

import { ManageJobsContent } from "@/components/employer/manage-jobs/manage/manage-jobs-content"
import { ManageJobsHeader } from "@/components/employer/manage-jobs/manage/manage-jobs-header"

export const metadata: Metadata = {
  title: "Manage Job Posts | HireLoop",
}

export default function ManageJobsPage() {
  return (
    <div className="mx-auto flex w-full flex-col gap-6">
      <ManageJobsHeader />
      <ManageJobsContent />
    </div>
  )
}
