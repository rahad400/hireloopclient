import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "cn"

type ApplicationsPaginationProps = {
  page: number
  pageCount: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

/** Figma pagination bar: result count plus previous / page / next controls. */
export function ApplicationsPagination({
  page,
  pageCount,
  totalItems,
  pageSize,
  onPageChange,
}: ApplicationsPaginationProps) {
  const first = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const last = Math.min(page * pageSize, totalItems)
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#1a1a1f] px-6 py-4">
      <p className="text-[12px] text-[#a0a0ab]">
        Showing {first}-{last} of {totalItems} applications
      </p>

      <nav aria-label="Application pages" className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.06] text-[#a0a0ab] transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>

        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            aria-label={`Page ${pageNumber}`}
            aria-current={pageNumber === page ? "page" : undefined}
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              "inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[12px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none",
              pageNumber === page
                ? "bg-[#fafafa] text-[#0b0b0c]"
                : "text-[#a0a0ab] hover:bg-white/[0.06]"
            )}
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          aria-label="Next page"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.06] text-[#a0a0ab] transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </nav>
    </div>
  )
}
