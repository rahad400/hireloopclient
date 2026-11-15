import type { ReactNode } from "react"
import { Toaster } from "@/components/ui/sonner"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#0a0a0d" }}>
      {children}
      <Toaster position="top-right" richColors />
    </div>
  )
}
