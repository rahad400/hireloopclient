"use client"

import { useState } from "react"
import {
  Search,
  BellRing,
  FileText,
  BarChart3,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ─── Data ──────────────────────────────────────────────────── */
const FEATURES = [
  {
    id: "smart-search",
    icon: Search,
    badge: "AI Powered",
    title: "Smart Job Matching",
    description:
      "Our AI engine reads your skills, experience and career goals then surfaces only the roles that truly fit — zero noise, pure signal.",
    highlights: ["Skill-based matching", "Salary range filter", "Remote-ready roles"],
    color: "#5c53fe",
    span: "lg:col-span-2", // wide card
  },
  {
    id: "fast-apply",
    icon: Zap,
    badge: "30 sec",
    title: "Fast Apply",
    description:
      "One click sends your profile, resume and cover letter. Done in under 30 seconds.",
    highlights: ["Pre-filled from profile", "Auto cover letter", "Screener answers saved"],
    color: "#ec4899",
    span: "lg:col-span-1",
  },
  {
    id: "alerts",
    icon: BellRing,
    badge: "Real-time",
    title: "Instant Alerts",
    description:
      "Be the first to know. Custom job alerts hit your inbox or phone the moment a matching role goes live.",
    highlights: ["Email & push", "Custom triggers", "Daily digest"],
    color: "#a855f7",
    span: "lg:col-span-1",
  },
  {
    id: "resume",
    icon: FileText,
    badge: "1-Click",
    title: "Resume Builder",
    description:
      "ATS-ready resumes built in minutes. Export to PDF or share your live HireLoop profile with a single link.",
    highlights: ["ATS templates", "PDF export", "Profile autofill"],
    color: "#06b6d4",
    span: "lg:col-span-1",
  },
  {
    id: "analytics",
    icon: BarChart3,
    badge: "Insights",
    title: "Application Analytics",
    description:
      "Track every application from submission to offer letter. Know your open rate, reply rate and interview conversion at a glance.",
    highlights: ["Full pipeline view", "Response tracking", "Interview tips"],
    color: "#10b981",
    span: "lg:col-span-2", // wide card
  },
  {
    id: "verified",
    icon: ShieldCheck,
    badge: "Verified",
    title: "Trusted Companies",
    description:
      "Every employer is vetted. See real culture scores, funding data and employee reviews before you apply.",
    highlights: ["Background-checked", "Culture ratings", "Glassdoor data"],
    color: "#f59e0b",
    span: "lg:col-span-1",
  },
]

/* ─── Feature Card ──────────────────────────────────────────── */
function FeatureCard({
  icon: Icon,
  badge,
  title,
  description,
  highlights,
  color,
  span,
}: (typeof FEATURES)[0]) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300",
        span
      )}
      style={{
        background: hovered
          ? `linear-gradient(135deg, #111118 0%, ${color}12 100%)`
          : "#0d0d12",
        border: hovered
          ? `1px solid ${color}50`
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered ? `0 0 40px -8px ${color}40` : "none",
      }}
    >
      {/* Top — icon + badge */}
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
          style={{
            background: hovered ? `${color}25` : `${color}14`,
            border: `1px solid ${color}${hovered ? "50" : "25"}`,
          }}
        >
          <Icon size={19} style={{ color }} aria-hidden="true" />
        </div>

        <span
          className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide"
          style={{
            background: `${color}14`,
            color,
            border: `1px solid ${color}30`,
          }}
        >
          {badge}
        </span>
      </div>

      {/* Middle — title + description */}
      <div className="mt-5">
        <h3
          className="text-base font-semibold leading-snug transition-colors duration-200"
          style={{ color: hovered ? "#ffffff" : "#ededef" }}
        >
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6b7280" }}>
          {description}
        </p>
      </div>

      {/* Bottom — highlights */}
      <ul className="mt-5 flex flex-col gap-2">
        {highlights.map(h => (
          <li key={h} className="flex items-center gap-2">
            <CheckCircle2 size={13} style={{ color, flexShrink: 0 }} aria-hidden="true" />
            <span className="text-xs" style={{ color: "#9ca3af" }}>{h}</span>
          </li>
        ))}
      </ul>

      {/* Arrow — appears on hover */}
      <ArrowUpRight
        size={16}
        className="absolute right-5 top-5 opacity-0 transition-all duration-200 group-hover:opacity-100"
        style={{ color }}
        aria-hidden="true"
      />

      {/* Corner glow blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full blur-2xl transition-opacity duration-300"
        style={{
          background: color,
          opacity: hovered ? 0.12 : 0,
        }}
      />
    </div>
  )
}

/* ─── Section ───────────────────────────────────────────────── */
export function CoreFeaturesSection() {
  return (
    <section
      aria-labelledby="features-title"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
    >
      {/* Ambient top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(92,83,254,0.1), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        {/* ── Header ── */}
        <div className="mb-14 flex flex-col items-center text-center">
          {/* pill label */}
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(92,83,254,0.12)",
              border: "1px solid rgba(92,83,254,0.3)",
              color: "#7c74ff",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ background: "#5c53fe" }}
            />
            Why HireLoop
          </div>

          <h2
            id="features-title"
            className="max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl"
          >
            Everything you need to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #5c53fe, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              land the job
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-base text-ink-muted">
            Powerful tools built for modern job seekers and recruiters — all in
            one seamless platform.
          </p>
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(f => (
            <FeatureCard key={f.id} {...f} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl px-8 py-6 sm:flex-row"
          style={{
            background:
              "linear-gradient(135deg, rgba(92,83,254,0.1) 0%, rgba(168,85,247,0.1) 100%)",
            border: "1px solid rgba(92,83,254,0.2)",
          }}
        >
          <div>
            <p className="text-sm font-semibold text-ink">
              Ready to find your next role?
            </p>
            <p className="mt-0.5 text-xs text-ink-muted">
              Join 2M+ professionals already on HireLoop — it&apos;s free.
            </p>
          </div>
          <a
            href="/sign-up"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #5c53fe, #a855f7)",
            }}
          >
            Get started free
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Bottom hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.06) 60%, transparent)",
        }}
      />
    </section>
  )
}
