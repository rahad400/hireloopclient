"use client"

import { BriefcaseBusiness, Download } from "lucide-react"
import Link from "next/link"

import type { ApplicationTab } from "@/components/candidate/applications/ts/candidate-application"
import { cn } from "cn"

type ApplicationsHeaderProps = {
  tab: ApplicationTab
  onTabChange: (tab: ApplicationTab) => void
}

const tabs: { value: ApplicationTab; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
]

/** Figma header: title, tabs, Browse Jobs link and Export PDF. */
export function ApplicationsHeader({
  tab,
  onTabChange,
}: ApplicationsHeaderProps) {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[26px] leading-7 font-semibold tracking-tight text-[#ededef] sm:text-[28px]">
          My Applications
        </h1>
        <p className="text-[13px] leading-5 text-[#a0a0ab]">
          Track your job applications and interview progress in real-time.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div
          role="tablist"
          aria-label="Application status"
          className="flex h-[42px] items-center gap-0.5 rounded-lg bg-[#1a1a1f] p-1"
        >
          {tabs.map((item) => (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={tab === item.value}
              onClick={() => onTabChange(item.value)}
              className={cn(
                "h-8 cursor-pointer rounded-md px-3.5 text-[13px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none",
                tab === item.value
                  ? "bg-white/[0.08] text-[#ededef]"
                  : "text-[#a0a0ab] hover:text-[#ededef]"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <Link
          href="/browse-jobs"
          className="inline-flex h-[42px] items-center gap-2 rounded-lg border border-white/[0.08] bg-[#1a1a1f] px-4 text-[13px] font-medium text-[#d6d6dc] transition-colors hover:bg-white/[0.06] hover:text-[#ededef] focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
        >
          <BriefcaseBusiness aria-hidden="true" className="size-3.5" />
          Browse Jobs
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex h-[42px] cursor-pointer items-center gap-2 rounded-lg bg-[#fafafa] px-4 text-[13px] font-medium text-[#0b0b0c] transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
        >
          <Download aria-hidden="true" className="size-3.5" />
          Export PDF
        </button>
      </div>
    </header>
  )
}
