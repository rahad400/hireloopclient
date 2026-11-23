import type { ReactNode } from "react"

import { Navbar } from "@/components/navigation/navbar"

/** Adds the shared navigation bar to the public job board. */
export default function BrowseJobsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
