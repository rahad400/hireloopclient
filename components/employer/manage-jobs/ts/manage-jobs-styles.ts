/**
 * Styles for the "Manage Job Posts" screen.
 *
 * Dark panel, 10px uppercase column labels and compact purple actions.
 */

/** Re-exported so existing `panelClassName` imports keep working. */
export { dashboardPanelClassName as panelClassName } from "@/lib/styles/dashboard"

export const primaryButtonClassName =
  "h-10 gap-2 rounded-xl bg-brand px-4 text-[13px] font-medium text-white shadow-[0_10px_24px_-14px_rgba(92,83,254,0.9)] hover:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand/60"

export const secondaryButtonClassName =
  "h-10 gap-2 rounded-xl border border-white/[0.08] bg-[#17171b] px-4 text-[13px] font-medium text-[#d6d6dc] hover:bg-white/[0.06] hover:text-[#ededef] focus-visible:ring-2 focus-visible:ring-brand/40"

export const toolbarInputClassName =
  "h-10 rounded-xl border border-white/[0.07] bg-[#141417] pl-9 text-[13px] text-[#ededef] shadow-none transition-colors outline-none [color-scheme:dark] placeholder:text-[#6b6b76] focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-brand/25 md:text-[13px] dark:bg-[#141417] [&::-webkit-search-cancel-button]:appearance-none"

export const toolbarSelectClassName =
  "h-10 w-full cursor-pointer appearance-none rounded-xl border border-white/[0.07] bg-[#141417] px-3 pr-9 text-[13px] text-[#ededef] shadow-none transition-colors outline-none [color-scheme:dark] focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-brand/25"

/** Pins the page header, stats and toolbar above the scrolling job list. */
export const stickyHeaderClassName =
  "flex flex-col gap-4 pb-4 md:sticky md:top-0 md:z-30 md:-mx-6 md:-mt-6 md:bg-[#0e0e11] md:px-6 md:pt-6"

export const updateButtonClassName =
  "inline-flex h-7 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-brand px-2.5 text-[11px] font-medium whitespace-nowrap text-white transition-colors outline-none hover:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand/60"

export const iconButtonClassName =
  "inline-flex size-7 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-[#17171b] text-[#c4c7c8] transition-colors outline-none hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-brand/40"

export const kebabButtonClassName =
  "inline-flex size-7 cursor-pointer items-center justify-center rounded-lg text-[#a0a0ab] transition-colors outline-none hover:bg-white/[0.06] hover:text-[#ededef] focus-visible:ring-2 focus-visible:ring-brand/40"

export const tableHeadClassName =
  "h-11 px-2 text-[10px] font-medium tracking-[0.08em] uppercase whitespace-nowrap text-[#6b6b76] min-[1440px]:px-3"

export const tableCellClassName = "px-2 py-3 align-middle min-[1440px]:px-3"
