"use client"

import { RotateCcw } from "lucide-react"

import {
  allFilterValue,
  categoryFilterOptions,
  createFilterOptions,
  jobTypeFilterOptions,
  salaryFrequencyFilterOptions,
  statusFilterOptions,
  workModeFilterOptions,
} from "@/components/browse-jobs/ts/browse-jobs-constants"
import type {
  BrowseJobsFiltersProps,
  FilterChangeHandler,
  FilterOption,
} from "@/components/browse-jobs/ts/browse-jobs-types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { string } from "better-auth"

type FilterSelectProps = {
  name:string
  label: string
  options: FilterOption[]
  onOptionChange: FilterChangeHandler
}

/** One rounded select for a single filter. */
function FilterSelect({name, label, options, onOptionChange }: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-1.5 ">
      <span className="text-[11px] font-medium text-ink-muted">{label}</span>

      <Select
        defaultValue={allFilterValue}
        items={options}
        onValueChange={ (value)=> {if(typeof value === "string")
          onOptionChange(name,value)}}
        modal={false}
      >
        <SelectTrigger aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

/** Shared filter controls for the desktop sidebar and the mobile drawer. */
export function BrowseJobsFilters({
  jobs,
  onFilterChange,
  onClearFilters,
 
}: BrowseJobsFiltersProps) {
  const locationOptions = createFilterOptions(
    jobs.map((job) => job.location),
    "All Locations"
  )
  const companyOptions = createFilterOptions(
    jobs.map((job) => job.company),
    "All Companies"
  )

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-ink">Filters</h2>

        <Button
          type="button"
          variant="outline"
          size="xs"
          onClick={onClearFilters}
          className="gap-1.5 rounded-lg border-white/10 bg-white/[0.03] text-[11px] text-ink-muted hover:bg-white/[0.07] hover:text-ink"
        >
          <RotateCcw className="size-3" aria-hidden="true" />
          Clear Filters
        </Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <FilterSelect
        name="category"
          label="Category"
          options={categoryFilterOptions}
          onOptionChange={onFilterChange}
        />
        <FilterSelect
        name="type"
          label="Job Type"
          options={jobTypeFilterOptions}
          onOptionChange={onFilterChange}
        />
        <FilterSelect
        name="location"
          label="Location"
          options={locationOptions}
          onOptionChange={onFilterChange}
        />
        <FilterSelect
        name="isRemote"
          label="Work Mode"
          options={workModeFilterOptions}
          onOptionChange={onFilterChange}
        />
        <FilterSelect
        name="company"
          label="Company"
          options={companyOptions}
          onOptionChange={onFilterChange}
        />
        <FilterSelect
        name='frequency'
          label="Salary Frequency"
          options={salaryFrequencyFilterOptions}
          onOptionChange={onFilterChange}
        />
        <FilterSelect
        name='status'
          label="Status"
          options={statusFilterOptions}
          onOptionChange={onFilterChange}
        />
      </div>

      <Separator className="mt-4 bg-white/[0.06]" />

    </div>
  )
}
