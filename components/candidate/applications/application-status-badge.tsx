import { cn } from "cn"

/**
 * Status pill colors from the Figma table: Applied (neutral), Review (amber),
 * Shortlisted (blue), Rejected (red) and Offered (green).
 */
const statusStyles: Record<string, { background: string; text: string; dot: string }> = {
  Applied: {
    background: "bg-[#a1a4aa]/[0.14]",
    text: "text-[#a0a0ab]",
    dot: "bg-[#a0a0ab]",
  },
  Review: {
    background: "bg-[#f59e0b]/[0.14]",
    text: "text-[#f59e0b]",
    dot: "bg-[#f59e0b]",
  },
  Shortlisted: {
    background: "bg-[#60a5fa]/[0.14]",
    text: "text-[#60a5fa]",
    dot: "bg-[#60a5fa]",
  },
  Rejected: {
    background: "bg-[#ef4444]/[0.14]",
    text: "text-[#ef4444]",
    dot: "bg-[#ef4444]",
  },
  Offered: {
    background: "bg-[#22c55e]/[0.14]",
    text: "text-[#22c55e]",
    dot: "bg-[#22c55e]",
  },
  Archived: {
    background: "bg-white/[0.06]",
    text: "text-[#8b8b95]",
    dot: "bg-[#8b8b95]",
  },
}

/** Small status pill used in both the table and the mobile cards. */
export function ApplicationStatusBadge({
  status = "Applied",
}: {
  status?: string
}) {
  const tone = statusStyles[status] ?? statusStyles.Applied

  return (
    <span
      className={cn(
        "inline-flex h-[22px] w-fit items-center gap-1.5 rounded-md px-2.5 text-[11px] leading-4 font-medium whitespace-nowrap",
        tone.background,
        tone.text
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", tone.dot)} />
      {status}
    </span>
  )
}
