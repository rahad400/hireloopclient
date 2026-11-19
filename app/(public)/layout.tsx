import { Suspense, type ReactNode } from "react"

import { Footer } from "@/components/footer/footer"
import { Navbar } from "@/components/navigation/navbar"

/**
 * Chrome for the public marketing site. The auth and dashboard route groups
 * live outside this layout so they never inherit the public navbar/footer.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
