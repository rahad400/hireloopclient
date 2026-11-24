import type { CandidateApplication } from "@/components/candidate/applications/ts/candidate-application"
import { cn } from "cn"

type ApplicationsStatsProps = {
  applications: CandidateApplication[]
}

/** One Figma bento stat card: label above a large value. */
function ApplicationStatCard({
  label,
  value,
  valueClassName,
}: {
  label: string
  value: string | number
  valueClassName?: string
}) {
  return (
    <article className="rounded-xl border border-white/[0.06] bg-[#141418] px-6 py-3.5">
      <p className="text-[12px] leading-5 text-[#a0a0ab]">{label}</p>
      <p
        className={cn(
          "mt-1 text-[24px] leading-8 font-semibold text-[#ededef]",
          valueClassName
        )}
      >
        {value}
      </p>
    </article>
  )
}

/** The four cards from the Figma "Stats Overview - Bento Layout". */
export function ApplicationsStats({ applications }: ApplicationsStatsProps) {
  const countStatus = (statuses: string[]) =>
    applications.filter((application) =>
      statuses.includes(application.status ?? "")
    ).length

  const total = applications.length
  const shortlisted = countStatus(["Shortlisted"])
  const interviews = countStatus(["Interview", "Interviews"])
  const offered = countStatus(["Offered"])
  const successRate = total ? Math.round((offered / total) * 100) : 0

  return (
    <section
      aria-label="Application summary"
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      <ApplicationStatCard label="Total Applied" value={total} />
      <ApplicationStatCard label="Shortlisted" value={shortlisted} />
      <ApplicationStatCard
        label="Interviews"
        value={interviews}
        valueClassName="text-[#f59e0b]"
      />
      <ApplicationStatCard
        label="Success Rate"
        value={`${successRate}%`}
        valueClassName="text-[#22c55e]"
      />
    </section>
  )
}
