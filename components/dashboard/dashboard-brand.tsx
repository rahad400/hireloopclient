import { HireloopLogo } from "@/components/navigation/hireloop-logo"

/**
 * Sidebar brand block: the HireLoop wordmark with the workspace label below.
 */
export function DashboardBrand({ subtitle }: { subtitle: string }) {
  return (
    <div className="flex flex-col gap-1 px-1.5 py-1">
      <HireloopLogo className="[&_img]:h-8" />
      <span className="text-xs font-medium text-[#7c7f87]">{subtitle}</span>
    </div>
  )
}
