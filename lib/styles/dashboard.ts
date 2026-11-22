/**
 * Shared class names for the dark dashboard screens.
 *
 * These strings are reused by Manage Jobs, Job Details and the shared
 * components. Keep the values stable: screens import them through their
 * existing `ts/*-styles.ts` paths as well.
 */

/** Dark surface used by panels, cards and empty states. */
export const dashboardPanelClassName =
  "overflow-hidden rounded-xl border border-white/[0.07] bg-[#0c0c0f]"

/** Small uppercase caption above a card value. */
export const dashboardLabelClassName =
  "text-[10px] font-medium tracking-[0.08em] text-[#6b6b76] uppercase"

/** Delete confirmation dialog surface and its repeated parts. */
export const dialogContentClassName =
  "rounded-2xl border border-white/[0.08] bg-[#17171a] text-[#ededef] shadow-[0_24px_70px_-24px_rgba(0,0,0,0.85)] sm:max-w-sm"

export const dialogMediaClassName =
  "bg-[#f97066]/10 text-[#f97066] ring-1 ring-[#f97066]/20"

export const dialogTitleClassName =
  "font-semibold tracking-tight text-[#ededef]"

export const dialogDescriptionClassName = "text-[13px] leading-5 text-[#8b8b95]"

export const dialogFooterClassName =
  "-mx-4 -mb-4 border-t border-white/[0.06] bg-white/[0.02] p-4"

export const dialogCancelClassName =
  "h-9 border-white/[0.08] bg-[#17171b] text-[13px] font-medium text-[#d6d6dc] hover:bg-white/[0.06] hover:text-[#ededef]"

export const dialogConfirmClassName =
  "h-9 border border-[#f97066]/20 bg-[#f97066]/15 text-[13px] font-medium text-[#f97066] hover:bg-[#f97066]/25 hover:text-[#ff9b93]"
