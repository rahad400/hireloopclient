"use client"

import { useEffect, useState } from "react"

import {
  formatAppliedAgo,
  formatAppliedDate,
} from "@/components/candidate/applications/ts/application-utils"
import type { CandidateApplication } from "@/components/candidate/applications/ts/candidate-application"

type AppliedAgoProps = {
  application: CandidateApplication
  className?: string
  /** Mobile cards also show the exact date next to the relative label. */
  showExactDate?: boolean
}

/**
 * Hydration-safe Applied label.
 *
 * The first render uses a fixed date, so the server and client produce exactly
 * the same text. Date.now() only runs after the component has mounted.
 */
export function AppliedAgo({
  application,
  className,
  showExactDate = false,
}: AppliedAgoProps) {
  const [now, setNow] = useState<number | null>(null)
  const exactDate = formatAppliedDate(application)

  useEffect(() => {
    const updateNow = () => setNow(Date.now())
    updateNow()

    const timer = window.setInterval(updateNow, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const relativeDate =
    now === null ? exactDate : formatAppliedAgo(application, now)

  return (
    <span className={className} title={exactDate}>
      {showExactDate && now !== null
        ? `${relativeDate} · ${exactDate}`
        : relativeDate}
    </span>
  )
}
