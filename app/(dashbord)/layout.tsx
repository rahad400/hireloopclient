import type { CSSProperties, ReactNode } from "react"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

/** Figma sidebar width is 248px. */
const sidebarStyle = { "--sidebar-width": "15.5rem" } as CSSProperties

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider style={sidebarStyle}>
      <DashboardSidebar />

      <SidebarInset className="min-h-svh bg-[#0e0e11]">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/[0.07] px-4">
          <SidebarTrigger className="text-ink-muted hover:bg-white/[0.06] hover:text-ink" />
        </header>

        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
