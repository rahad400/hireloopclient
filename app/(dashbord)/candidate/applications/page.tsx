"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Search,
  SearchX,
} from "lucide-react"

import { getApplyToJob } from "@/app/lip/actions/aplication"
import getJobs from "@/app/lip/api/jobs"
import { AppliedAgo } from "@/components/candidate/applications/applied-ago"
import { ApplicationStatusBadge } from "@/components/candidate/applications/application-status-badge"
import type {
  ApplicationSort,
  ApplicationTab,
  CandidateApplication,
} from "@/components/candidate/applications/ts/candidate-application"
import { JobCategoryIcon } from "@/components/employer/manage-jobs/job-category-icon"
import {
  tableCellClassName,
  tableHeadClassName,
  toolbarInputClassName,
  toolbarSelectClassName,
} from "@/components/employer/manage-jobs/ts/manage-jobs-styles"
import { Input } from "@/components/ui/input"
import { cn } from "cn"

const pageSize = 5

const tabs: { value: ApplicationTab; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
]

const sortOptions: { value: ApplicationSort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title", label: "Job title A–Z" },
  { value: "company", label: "Company A–Z" },
]

const columns = [
  { label: "Job Title", className: "w-[30%] pl-7" },
  { label: "Company", className: "w-[20%]" },
  { label: "Applied", className: "w-[15%]" },
  { label: "Status", className: "w-[18%]" },
  { label: "Action", className: "w-[17%] pr-7 text-right" },
]

function summaryOf(application: CandidateApplication) {
  const type = application.jobType || "Job"
  if (application.isRemote === true) return `${type} • Remote`
  if (application.isRemote === false) return `${type} • On-site`
  return type
}

function appliedTime(application: CandidateApplication) {
  if (application.appliedAt) {
    const time = new Date(application.appliedAt).getTime()
    return Number.isNaN(time) ? 0 : time
  }

  if (/^[a-f\d]{24}$/i.test(application._id)) {
    return Number.parseInt(application._id.slice(0, 8), 16) * 1000
  }

  return 0
}

/** Simple My Applications page using filter, sort and map. */
const ApplicationsPage = () => {
  const [applications, setApplications] = useState<CandidateApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [tab, setTab] = useState<ApplicationTab>("active")
  const [search, setSearch] = useState("")
  const [company, setCompany] = useState("all")
  const [sort, setSort] = useState<ApplicationSort>("newest")
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        const [records, jobs] = await Promise.all([getApplyToJob(), getJobs()])

        // Add the job details used by the table and the mobile cards.
        const combined = records.map((application) => {
          const job = jobs.find((job) => job._id === application.jobId)

          return {
            ...application,
            jobType: job?.type,
            isRemote: job?.isRemote,
            location: job?.location,
            category: job?.category,
          }
        })

        setApplications(combined)
      } catch {
        setApplications([])
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  const tabApplications = applications.filter((application) =>
    tab === "archived"
      ? application.status === "Archived"
      : application.status !== "Archived"
  )

  const companyOptions = Array.from(
    new Set(
      tabApplications
        .map((application) => application.company)
        .filter((name) => Boolean(name?.trim()))
    )
  ).sort((first, second) => first.localeCompare(second))

  let list = tabApplications.filter((application) => {
    const text = `${application.jobTitle} ${application.company}`.toLowerCase()
    const matchesSearch = text.includes(search.trim().toLowerCase())
    const matchesCompany = company === "all" || application.company === company

    return matchesSearch && matchesCompany
  })

  if (sort === "oldest") {
    list = [...list].sort((a, b) => appliedTime(a) - appliedTime(b))
  } else if (sort === "title") {
    list = [...list].sort((a, b) => a.jobTitle.localeCompare(b.jobTitle))
  } else if (sort === "company") {
    list = [...list].sort((a, b) => a.company.localeCompare(b.company))
  } else {
    list = [...list].sort((a, b) => appliedTime(b) - appliedTime(a))
  }

  const pageCount = Math.max(1, Math.ceil(list.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const start = (currentPage - 1) * pageSize
  const visibleApplications = list.slice(start, start + pageSize)
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  const total = applications.length
  const shortlisted = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length
  const interviews = applications.filter((application) =>
    ["Interview", "Interviews"].includes(application.status ?? "")
  ).length
  const offered = applications.filter(
    (application) => application.status === "Offered"
  ).length
  const successRate = total ? Math.round((offered / total) * 100) : 0

  const stats = [
    { label: "Total Applied", value: total },
    { label: "Shortlisted", value: shortlisted },
    {
      label: "Interviews",
      value: interviews,
      valueClassName: "text-[#f59e0b]",
    },
    {
      label: "Success Rate",
      value: `${successRate}%`,
      valueClassName: "text-[#22c55e]",
    },
  ]

  const hasActiveFilters =
    search.trim() !== "" || company !== "all" || sort !== "newest"

  function changeTab(next: ApplicationTab) {
    setTab(next)
    setPage(1)
  }

  function changeSearch(next: string) {
    setSearch(next)
    setPage(1)
  }

  function changeCompany(next: string) {
    setCompany(next)
    setPage(1)
  }

  function changeSort(next: ApplicationSort) {
    setSort(next)
    setPage(1)
  }

  function clearFilters() {
    setSearch("")
    setCompany("all")
    setSort("newest")
    setPage(1)
  }

  return (
    <main className="mx-auto w-full max-w-[1400px]">
      <div className="flex flex-col gap-5">
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
                  onClick={() => changeTab(item.value)}
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

        <section
          aria-label="Application summary"
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-xl border border-white/[0.06] bg-[#141418] px-6 py-3.5"
            >
              <p className="text-[12px] leading-5 text-[#a0a0ab]">{stat.label}</p>
              <p
                className={cn(
                  "mt-1 text-[24px] leading-8 font-semibold text-[#ededef]",
                  stat.valueClassName
                )}
              >
                {stat.value}
              </p>
            </article>
          ))}
        </section>

        <section className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-[#141418] p-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-[320px]">
            <label htmlFor="application-search" className="sr-only">
              Search applications
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted/70"
            />
            <Input
              id="application-search"
              type="search"
              value={search}
              onChange={(event) => changeSearch(event.target.value)}
              placeholder="Search job title or company..."
              autoComplete="off"
              className={toolbarInputClassName}
            />
          </div>

          <div className="relative w-full sm:w-[180px] sm:shrink-0">
            <label htmlFor="application-company" className="sr-only">
              Filter by company
            </label>
            <select
              id="application-company"
              value={company}
              onChange={(event) => changeCompany(event.target.value)}
              className={toolbarSelectClassName}
            >
              <option value="all">All companies</option>
              {companyOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-muted"
            />
          </div>

          <div className="relative w-full sm:w-[170px] sm:shrink-0">
            <label htmlFor="application-sort" className="sr-only">
              Sort applications
            </label>
            <select
              id="application-sort"
              value={sort}
              onChange={(event) =>
                changeSort(event.target.value as ApplicationSort)
              }
              className={toolbarSelectClassName}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-muted"
            />
          </div>

          <div className="flex items-center justify-between gap-4 lg:shrink-0">
            <p className="text-xs text-ink-muted">
              Showing <span className="font-medium text-ink">{list.length}</span>{" "}
              of {tabApplications.length} applications
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="cursor-pointer rounded-sm text-xs font-medium text-brand-strong hover:underline focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
              >
                Clear filters
              </button>
            )}
          </div>
        </section>

        {isLoading ? (
          <div className="rounded-xl border border-white/[0.06] bg-[#141418] px-5 py-10 text-center text-[13px] text-[#a0a0ab]">
            Loading applications...
          </div>
        ) : tabApplications.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-[#141418] px-6 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-white/[0.04] text-ink-muted">
              <FileText aria-hidden="true" className="size-5" />
            </span>
            <h2 className="text-[16px] font-semibold text-[#ededef]">
              No applications yet
            </h2>
            <p className="text-[13px] text-[#a0a0ab]">
              Browse the job board and apply to a role to see it here.
            </p>
            <Link
              href="/browse-jobs"
              className="inline-flex h-10 items-center rounded-xl bg-brand px-4 text-[13px] font-medium text-white"
            >
              Browse Jobs
            </Link>
          </div>
        ) : list.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-[#141418] px-6 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-white/[0.04] text-ink-muted">
              <SearchX aria-hidden="true" className="size-5" />
            </span>
            <h2 className="text-[16px] font-semibold text-[#ededef]">
              No matching applications
            </h2>
            <p className="text-[13px] text-[#a0a0ab]">
              Try a different search term or clear the filters to see all
              applications.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-hidden rounded-xl border border-white/[0.06] bg-[#141418] md:block">
              <table className="w-full text-[13px]">
                <thead className="bg-[#1a1a1f]">
                  <tr className="h-11 border-white/[0.06] hover:bg-[#1a1a1f]">
                    {columns.map((column) => (
                      <th
                        key={column.label}
                        className={cn(tableHeadClassName, column.className)}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {visibleApplications.map((application) => (
                    <tr
                      key={application._id}
                      className="h-16 border-white/[0.06] hover:bg-white/[0.02]"
                    >
                      <td className={cn(tableCellClassName, "pl-7")}>
                        <div className="flex min-w-0 items-center gap-3">
                          <JobCategoryIcon
                            category={application.category ?? "Other"}
                            className="size-10 shrink-0 rounded-lg"
                          />
                          <div className="flex min-w-0 flex-col">
                            <span
                              title={application.jobTitle}
                              className="truncate text-[13px] leading-5 font-medium text-[#ededef]"
                            >
                              {application.jobTitle}
                            </span>
                            <span className="truncate text-[11px] leading-4 text-[#a0a0ab]">
                              {summaryOf(application)}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className={tableCellClassName}>
                        <div className="flex min-w-0 flex-col">
                          <span
                            title={application.company}
                            className="block truncate text-[13px] text-[#ededef]"
                          >
                            {application.company}
                          </span>
                          <span className="truncate text-[11px] text-[#a0a0ab]">
                            {application.category ?? "Other"}
                          </span>
                        </div>
                      </td>

                      <td
                        className={cn(
                          tableCellClassName,
                          "text-[12px] whitespace-nowrap text-[#a0a0ab]"
                        )}
                      >
                        <AppliedAgo application={application} />
                      </td>

                      <td className={tableCellClassName}>
                        <ApplicationStatusBadge status={application.status} />
                      </td>

                      <td className={cn(tableCellClassName, "pr-7 text-right")}>
                        <Link
                          href={`/browse-jobs/${encodeURIComponent(application.jobId)}`}
                          className="inline-flex items-center gap-1 text-[12px] font-medium text-[#ededef] transition-colors hover:text-brand-strong focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
                        >
                          Details
                          <ArrowUpRight aria-hidden="true" className="size-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-3 md:hidden">
              {visibleApplications.map((application) => (
                <article
                  key={application._id}
                  className="flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-night-soft p-3 transition-colors hover:border-brand/30"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <JobCategoryIcon
                      category={application.category ?? "Other"}
                      className="size-10 shrink-0 rounded-lg"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="truncate text-sm font-semibold text-ink">
                          {application.jobTitle}
                        </h3>
                        <ApplicationStatusBadge status={application.status} />
                      </div>

                      <p className="mt-1 truncate text-xs text-ink-muted">
                        {application.company}
                        <span aria-hidden="true" className="px-1.5">
                          •
                        </span>
                        {application.category ?? "Other"}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          <AppliedAgo application={application} showExactDate />
                        </span>
                        <span>{summaryOf(application)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end sm:pl-4">
                    <Link
                      href={`/browse-jobs/${encodeURIComponent(application.jobId)}`}
                      className="inline-flex items-center gap-1 text-[12px] font-medium text-[#ededef] transition-colors hover:text-brand-strong focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
                    >
                      Details
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#1a1a1f] px-6 py-4">
              <p className="text-[12px] text-[#a0a0ab]">
                Showing {start + 1}-{Math.min(start + pageSize, list.length)} of{" "}
                {list.length} applications
              </p>

              <nav aria-label="Application pages" className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                  className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.06] text-[#a0a0ab] transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
                >
                  <ChevronLeft aria-hidden="true" className="size-4" />
                </button>

                {pages.map((number) => (
                  <button
                    key={number}
                    type="button"
                    aria-label={`Page ${number}`}
                    aria-current={number === currentPage ? "page" : undefined}
                    onClick={() => setPage(number)}
                    className={cn(
                      "inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-[12px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none",
                      number === currentPage
                        ? "bg-[#fafafa] text-[#0b0b0c]"
                        : "text-[#a0a0ab] hover:bg-white/[0.06]"
                    )}
                  >
                    {number}
                  </button>
                ))}

                <button
                  type="button"
                  aria-label="Next page"
                  disabled={currentPage === pageCount}
                  onClick={() => setPage(currentPage + 1)}
                  className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg border border-white/[0.06] text-[#a0a0ab] transition-colors hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
                >
                  <ChevronRight aria-hidden="true" className="size-4" />
                </button>
              </nav>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default ApplicationsPage
