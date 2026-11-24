"use client"

import { useMemo, useState } from "react"

import { ApplicationsCards } from "@/components/candidate/applications/applications-cards"
import { ApplicationsEmpty } from "@/components/candidate/applications/applications-empty"
import { ApplicationsHeader } from "@/components/candidate/applications/applications-header"
import { ApplicationsPagination } from "@/components/candidate/applications/applications-pagination"
import { ApplicationsStats } from "@/components/candidate/applications/applications-stats"
import { ApplicationsTable } from "@/components/candidate/applications/applications-table"
import { ApplicationsToolbar } from "@/components/candidate/applications/applications-toolbar"
import {
  applicationsPageSize,
  filterApplications,
  filterByTab,
  getCompanyOptions,
  paginateApplications,
  sortApplications,
} from "@/components/candidate/applications/ts/application-utils"
import type {
  ApplicationSort,
  ApplicationTab,
  CandidateApplication,
} from "@/components/candidate/applications/ts/candidate-application"

/** Search/filter/sort/pagination state for the candidate Applications screen. */
export function ApplicationsContent({
  applications,
}: {
  applications: CandidateApplication[]
}) {
  const [tab, setTab] = useState<ApplicationTab>("active")
  const [searchTerm, setSearchTerm] = useState("")
  const [company, setCompany] = useState("all")
  const [sort, setSort] = useState<ApplicationSort>("newest")
  const [page, setPage] = useState(1)

  const tabApplications = useMemo(
    () => filterByTab(applications, tab),
    [applications, tab]
  )

  const companyOptions = useMemo(
    () => getCompanyOptions(tabApplications),
    [tabApplications]
  )

  const filteredApplications = useMemo(
    () =>
      sortApplications(
        filterApplications(tabApplications, searchTerm, company),
        sort
      ),
    [tabApplications, searchTerm, company, sort]
  )

  const pageCount = Math.max(
    1,
    Math.ceil(filteredApplications.length / applicationsPageSize)
  )
  const currentPage = Math.min(page, pageCount)
  const pageApplications = useMemo(
    () => paginateApplications(filteredApplications, currentPage),
    [filteredApplications, currentPage]
  )

  const hasActiveFilters =
    searchTerm.trim() !== "" || company !== "all" || sort !== "newest"

  function changeTab(nextTab: ApplicationTab) {
    setTab(nextTab)
    setPage(1)
  }

  function changeSearchTerm(nextTerm: string) {
    setSearchTerm(nextTerm)
    setPage(1)
  }

  function changeCompany(nextCompany: string) {
    setCompany(nextCompany)
    setPage(1)
  }

  function changeSort(nextSort: ApplicationSort) {
    setSort(nextSort)
    setPage(1)
  }

  function clearFilters() {
    setSearchTerm("")
    setCompany("all")
    setSort("newest")
    setPage(1)
  }

  return (
    <main className="mx-auto w-full max-w-[1400px]">
      <div className="flex flex-col gap-5">
        <ApplicationsHeader tab={tab} onTabChange={changeTab} />
        <ApplicationsStats applications={applications} />
        <ApplicationsToolbar
          searchTerm={searchTerm}
          onSearchTermChange={changeSearchTerm}
          company={company}
          onCompanyChange={changeCompany}
          sort={sort}
          onSortChange={changeSort}
          companyOptions={companyOptions}
          visibleCount={filteredApplications.length}
          totalCount={tabApplications.length}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />

        {tabApplications.length === 0 ? (
          <ApplicationsEmpty variant="no-applications" />
        ) : filteredApplications.length === 0 ? (
          <ApplicationsEmpty variant="no-results" />
        ) : (
          <>
            <ApplicationsTable applications={pageApplications} />
            <ApplicationsCards applications={pageApplications} />
            <ApplicationsPagination
              page={currentPage}
              pageCount={pageCount}
              totalItems={filteredApplications.length}
              pageSize={applicationsPageSize}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </main>
  )
}
