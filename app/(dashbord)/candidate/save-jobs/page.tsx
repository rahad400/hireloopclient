"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bookmark, ChevronDown, Clock3, MapPin, Search, Wallet } from "lucide-react"

import { getSaveJobs } from "@/app/lip/actions/save"
import getJobs from "@/app/lip/api/jobs"
import { JobCategoryIcon } from "@/components/employer/manage-jobs/job-category-icon"
import { EmployerJob } from "@/lib/types/job"
import { Input } from "@/components/ui/input"
import { cn } from "cn"

type SavedRecord = {
  _id?: string
  jobId: string
  jobTitle: string
  company: string
}

type SavedItem = SavedRecord & {
  job?: EmployerJob
}

function titleOf(item: SavedItem) {
  return item.job?.title || item.jobTitle || "Untitled job"
}

function salaryOf(item: SavedItem) {
  const job = item.job
  if (!job?.minSalary || !job.maxSalary) return "Salary not listed"

  const min = Number(job.minSalary).toLocaleString()
  const max = Number(job.maxSalary).toLocaleString()
  return `$${min} – $${max} ${job.frequency || ""}`.trim()
}

function daysLeft(deadline = "") {
  if (!deadline) return 999
  const end = new Date(`${deadline}T23:59:59`).getTime()
  return Math.ceil((end - Date.now()) / 86_400_000)
}

function savedOn(id = "") {
  // MongoDB ids store the creation time in the first 8 characters.
  if (!/^[0-9a-f]{24}$/i.test(id)) return "recently"
  const seconds = Number.parseInt(id.slice(0, 8), 16)
  return new Date(seconds * 1000).toLocaleDateString()
}

function categoryGroup(category = "") {
  const value = category.toLowerCase()

  if (value.includes("design") || value.includes("creative")) return "Design"
  if (value.includes("engineering") || value.includes("tech")) return "Engineering"
  if (
    value.includes("product") ||
    value.includes("writing") ||
    value.includes("market") ||
    value.includes("content")
  ) {
    return "Product"
  }

  return "Other"
}

/** Simple Saved Jobs page based on the Figma screen. */
const SaveJobsPage = () => {
  const [items, setItems] = useState<SavedItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [group, setGroup] = useState("All")
  const [sort, setSort] = useState("recent")
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const saved = (await getSaveJobs()) as SavedRecord[]
        const jobs = await getJobs()

        // Match each saved record with its full job details.
        const combined = saved
          .map((item) => ({
            ...item,
            job: jobs.find((job) => job._id === item.jobId),
          }))
          .reverse()

        setItems(combined)
      } catch {
        setItems([])
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  // Search and category filter.
  let list = items.filter((item) => {
    const text =
      `${titleOf(item)} ${item.company} ${item.job?.category || ""}`.toLowerCase()
    const matchesSearch = text.includes(search.toLowerCase())
    const matchesGroup =
      group === "All" || categoryGroup(item.job?.category) === group

    return matchesSearch && matchesGroup
  })

  // Sort.
  if (sort === "title") {
    list = [...list].sort((a, b) => titleOf(a).localeCompare(titleOf(b)))
  }

  if (sort === "closing") {
    list = [...list].sort(
      (a, b) => daysLeft(a.job?.deadline) - daysLeft(b.job?.deadline)
    )
  }

  const visibleJobs = showAll ? list : list.slice(0, 5)
  const closingSoon = items.filter((item) => {
    const days = daysLeft(item.job?.deadline)
    return days >= 0 && days <= 7
  }).length

  function removeJob(id = "") {
    setItems(items.filter((item) => item._id !== id))
  }

  const groups = ["All", "Design", "Engineering", "Product", "Other"].filter(
    (name) =>
      name === "All" ||
      items.some((item) => categoryGroup(item.job?.category) === name)
  )

  return (
    <main className="mx-auto w-full max-w-[1400px]">
      <div className="flex flex-col gap-5">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[28px] leading-9 font-semibold text-[#ededef]">
              Saved Jobs
            </h1>
            <p className="mt-1.5 text-[13px] text-[#a0a0ab]">
              Manage and track your bookmarked opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:w-[420px]">
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#141418] px-4 py-3.5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-[#222228] text-[#ededef]">
                <Bookmark aria-hidden="true" className="size-[18px]" />
              </span>
              <span>
                <span className="block text-[12px] text-[#a0a0ab]">
                  Total Saved
                </span>
                <span className="block text-[24px] font-semibold text-[#ededef]">
                  {items.length}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#141418] px-4 py-3.5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-[#222228] text-[#f59e0b]">
                <Clock3 aria-hidden="true" className="size-[18px]" />
              </span>
              <span>
                <span className="block text-[12px] text-[#a0a0ab]">
                  Closing Soon
                </span>
                <span className="block text-[24px] font-semibold text-[#ededef]">
                  {closingSoon}
                </span>
              </span>
            </div>
          </div>
        </header>

        <section className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-[#141418] p-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-[320px]">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#6b6b76]"
            />
            <Input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs, companies, or skills..."
              aria-label="Search saved jobs"
              className="h-10 rounded-xl border border-white/[0.07] bg-[#0c0c0f] pl-9 text-[13px] text-[#ededef] shadow-none outline-none placeholder:text-[#6b6b76]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {groups.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setGroup(name)}
                className={cn(
                  "h-9 cursor-pointer rounded-lg px-3.5 text-[13px]",
                  group === name
                    ? "bg-[#1a1a1f] text-[#ededef]"
                    : "text-[#a0a0ab] hover:text-[#ededef]"
                )}
              >
                {name === "All" ? "All Saved" : name}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-[180px]">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort saved jobs"
              className="h-10 w-full cursor-pointer appearance-none rounded-xl border border-white/[0.07] bg-[#0c0c0f] px-3 pr-9 text-[13px] text-[#ededef] outline-none"
            >
              <option value="recent">Recently Saved</option>
              <option value="title">Job Title A–Z</option>
              <option value="closing">Closing Soon</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#6b6b76]"
            />
          </div>
        </section>

        {isLoading ? (
          <div className="rounded-xl border border-white/[0.06] bg-[#141418] px-5 py-10 text-center text-[13px] text-[#a0a0ab]">
            Loading saved jobs...
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-white/[0.06] bg-[#141418] px-5 py-14 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-[#222228] text-[#ededef]">
              <Bookmark aria-hidden="true" className="size-5" />
            </span>
            <h2 className="text-[16px] font-semibold text-[#ededef]">
              No saved jobs yet
            </h2>
            <p className="text-[13px] text-[#a0a0ab]">
              Save a job from the job board and it will appear here.
            </p>
            <Link
              href="/browse-jobs"
              className="inline-flex h-10 items-center rounded-xl bg-[#fafafa] px-4 text-[13px] font-medium text-[#0b0b0c]"
            >
              Browse Jobs
            </Link>
          </div>
        ) : visibleJobs.length === 0 ? (
          <div className="rounded-xl border border-white/[0.06] bg-[#141418] px-5 py-10 text-center text-[13px] text-[#a0a0ab]">
            No saved jobs match your search or filter.
          </div>
        ) : (
          <section className="flex flex-col gap-3">
            {visibleJobs.map((item) => {
              const job = item.job
              const days = daysLeft(job?.deadline)
              const closed = job?.status === "Expired" || days < 0

              return (
                <article
                  key={item._id || item.jobId}
                  className={cn(
                    "relative flex flex-col gap-5 rounded-xl border border-white/[0.06] bg-[#141418] p-5 sm:flex-row sm:items-center sm:justify-between",
                    closed && "pt-9"
                  )}
                >
                  {closed && (
                    <div className="absolute inset-x-0 top-0 flex justify-center pt-2">
                      <span className="rounded-lg border border-white/10 bg-[#1a1a1f] px-3 py-1.5 text-[11px] text-[#ededef]">
                        Job closed by employer
                      </span>
                    </div>
                  )}

                  <div className="flex min-w-0 gap-4">
                    <JobCategoryIcon
                      category={job?.category || "Other"}
                      className="size-12 shrink-0 rounded-xl"
                    />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-[16px] font-semibold text-[#ededef]">
                          {titleOf(item)}
                        </h2>
                        <span className="rounded bg-[#222228] px-2 py-0.5 text-[10px] tracking-wide text-[#6e6e78] uppercase">
                          {item.company}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#1a1a1f] px-3 text-[12px] text-[#ededef]">
                          <MapPin aria-hidden="true" className="size-3.5" />
                          {job?.isRemote ? "Remote" : job?.location || "Location"}
                        </span>
                        <span className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#1a1a1f] px-3 text-[12px] text-[#ededef]">
                          <Wallet aria-hidden="true" className="size-3.5" />
                          {salaryOf(item)}
                        </span>
                        <span className="inline-flex h-8 items-center rounded-lg bg-[#1a1a1f] px-3 text-[12px] text-[#a0a0ab]">
                          {job?.type || "Job"}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-x-4 text-[12px]">
                        <span className="text-[#a0a0ab]">
                          Saved {savedOn(item._id)}
                        </span>
                        {days >= 0 && days <= 7 && (
                          <span className="text-[#f59e0b]">
                            Closes in {days} day{days === 1 ? "" : "s"}
                          </span>
                        )}
                        {closed && (
                          <span className="text-[#ef4444]">Closed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2 sm:flex-col sm:items-end">
                    <button
                      type="button"
                      onClick={() => removeJob(item._id)}
                      aria-label={`Remove ${titleOf(item)}`}
                      className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/[0.08] bg-[#17171b] text-[#c4c7c8]"
                    >
                      <Bookmark aria-hidden="true" className="size-4" />
                    </button>

                    {closed ? (
                      <button
                        type="button"
                        onClick={() => removeJob(item._id)}
                        className="h-10 cursor-pointer rounded-xl bg-[#1a1a1f] px-4 text-[13px] text-[#ef4444]"
                      >
                        Remove from List
                      </button>
                    ) : (
                      <Link
                        href={`/browse-jobs/${encodeURIComponent(item.jobId)}`}
                        className="inline-flex h-10 items-center rounded-xl bg-[#fafafa] px-4 text-[13px] font-medium text-[#0b0b0c]"
                      >
                        Apply Now
                      </Link>
                    )}
                  </div>
                </article>
              )
            })}

            {!showAll && list.length > 5 && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="mx-auto inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-white/[0.08] bg-[#1a1a1f] px-5 text-[13px] text-[#a0a0ab]"
              >
                Load More
                <ChevronDown aria-hidden="true" className="size-4" />
              </button>
            )}
          </section>
        )}
      </div>
    </main>
  )
}

export default SaveJobsPage
