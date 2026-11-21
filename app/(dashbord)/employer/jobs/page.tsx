import type { Metadata } from "next"

import { ManageJobsContent } from "@/components/employer/manage-jobs/manage/manage-jobs-content"

export const metadata: Metadata = {
  title: "Manage Job Posts | HireLoop",
}

export default function ManageJobsPage() {
  return <ManageJobsContent />
}
