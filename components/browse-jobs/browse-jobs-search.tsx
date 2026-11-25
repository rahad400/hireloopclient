"use client"

import { Search } from "lucide-react"

import type { BrowseJobsSearchProps } from "@/components/browse-jobs/ts/browse-jobs-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

/** Search input and button. Mobile stacks them; desktop keeps the original row. */
export function BrowseJobsSearch({ onSearchSubmit }: BrowseJobsSearchProps) {
  return (
    <form
      role="search"
      aria-label="Search jobs"
      onSubmit={onSearchSubmit}
      className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:gap-2 lg:rounded-xl lg:border lg:border-white/10 lg:bg-night-soft lg:p-2"
    >
      <div className="flex h-12 items-center gap-2 rounded-lg border border-white/[0.08] bg-[#17171D] px-3 lg:h-10 lg:min-w-0 lg:flex-1 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-2.5">
        <label htmlFor="browse-job-search" className="sr-only">
          Search by job title, keywords...
        </label>
        <Search
          aria-hidden="true"
          className="size-[18px] shrink-0 text-[#A0A0AB] lg:hidden"
        />
        <Input
          id="browse-job-search"
          name="searchField"
          type="search"
          autoComplete="off"
          placeholder="Search jobs, companies, skills..."
          className="h-full min-w-0 border-0 bg-transparent px-0 text-[14px] text-white shadow-none placeholder:text-[#8A8A96] focus-visible:ring-2 focus-visible:ring-[#6545F5]/50 lg:text-sm lg:text-ink lg:placeholder:text-ink-muted lg:focus-visible:ring-brand/50 dark:bg-transparent"
        />
      </div>

      <Button
        type="submit"
        className="h-11 w-full rounded-lg bg-[#6545F5] text-[14px] font-semibold text-white hover:bg-[#7259ff] focus-visible:ring-2 focus-visible:ring-[#6545F5]/60 lg:h-10 lg:w-auto lg:gap-2 lg:bg-brand lg:px-5 lg:text-sm lg:hover:bg-brand-strong lg:focus-visible:ring-brand/60"
      >
        <Search className="hidden size-4 lg:block" aria-hidden="true" />
        Search Jobs
      </Button>
    </form>
  )
}
