import type { Metadata } from "next"

import { AddJobForm } from "@/components/employer/add-job/add-job-form"

export const metadata: Metadata = {
  title: "Post a New Job | HireLoop",
}

export default function AddJobPage() {
  return <AddJobForm />
}
