/**
 * Shared class names for the Add Job form.
 *
 * The values come from the `Add New Job` frame in `hireloop.fig`:
 * 44px tall fields, 12px radius, `#1e1e21` surface and `#f4f4f5` text.
 */

export const jobInputClassName =
  "h-11 w-full rounded-xl border border-white/[0.06] bg-[#1e1e21] px-3.5 text-sm text-[#f4f4f5] shadow-none transition-colors outline-none [color-scheme:dark] placeholder:text-[#6f7280] focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#1e1e21]"

export const jobSelectClassName =
  "h-11 w-full appearance-none rounded-xl border border-white/[0.06] bg-[#1e1e21] px-3.5 pr-10 text-sm text-[#f4f4f5] shadow-none transition-colors outline-none [color-scheme:dark] focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60"

export const jobTextareaClassName =
  "min-h-[110px] w-full resize-y rounded-xl border border-white/[0.06] bg-[#1e1e21] px-3.5 py-3 text-sm leading-6 text-[#f4f4f5] shadow-none transition-colors outline-none placeholder:text-[#6f7280] focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60"

export const jobCardClassName = "rounded-[16px] bg-[#151516] p-5 sm:p-6"

export const jobPrimaryButtonClassName =
  "cursor-pointer h-11 gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(92,83,254,0.85)] hover:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e11]"
