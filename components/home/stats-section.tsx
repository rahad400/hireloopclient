import type { CSSProperties } from "react"
import Image from "next/image"
import { TrendingUp, Building2, Users, Briefcase } from "lucide-react"

/* ─── Data ─────────────────────────────────────────────────── */
const STATS = [
  {
    icon: Briefcase,
    value: "50K+",
    label: "Jobs Posted",
    sublabel: "Every month",
    color: "#5c53fe",
    glow: "rgba(92,83,254,0.25)",
  },
  {
    icon: Building2,
    value: "8,500+",
    label: "Companies",
    sublabel: "Hiring right now",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.25)",
  },
  {
    icon: Users,
    value: "2M+",
    label: "Job Seekers",
    sublabel: "Active on HireLoop",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.25)",
  },
  {
    icon: TrendingUp,
    value: "94%",
    label: "Success Rate",
    sublabel: "Placements in 60 days",
    color: "#10b981",
    glow: "rgba(16,185,129,0.25)",
  },
]

/* Avatar stack — user photos extracted from the Figma file */
const AVATARS = [
  { src: "/fig-avatars/avatar1.jpg", alt: "User" },
  { src: "/fig-avatars/avatar2.jpg", alt: "User" },
  { src: "/fig-avatars/avatar3.jpg", alt: "User" },
  { src: "/fig-avatars/avatar4.jpg", alt: "User" },
  { src: "/fig-avatars/avatar5.jpg", alt: "User" },
]

/* ─── Component ─────────────────────────────────────────────── */
export function StatsSection() {
  return (
    <section
      aria-label="Platform statistics"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
    >
      {/* Top separator line with glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(92,83,254,0.4) 40%, rgba(168,85,247,0.4) 60%, transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        {/* ── Section header ── */}
        <div className="mb-14 text-center">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#5c53fe" }}
          >
            Platform Impact
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Trusted by millions worldwide
          </h2>
          <p className="mt-3 text-base text-ink-muted max-w-xl mx-auto">
            HireLoop is where top talent meets opportunity — at scale.
          </p>
        </div>

        {/* ── Stat cards grid ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label, sublabel, color, glow, }) => (
            <div
              key={label}
              className="group relative flex flex-col gap-4 rounded-2xl border border-white/[0.07] p-6 transition-all duration-300 hover:border-[var(--card-hover-border)] hover:shadow-[var(--card-hover-shadow)]"
              style={{
                "--card-hover-border": `${color}40`,
                "--card-hover-shadow": `0 0 32px ${glow}`,
                background: "#0f0f13",
              } as CSSProperties}
            >
              {/* Icon badge */}
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${color}18`, border: `1px solid ${color}30` }}
              >
                <Icon size={20} style={{ color }} aria-hidden="true" />
              </div>

              {/* Value */}
              <div>
                <p
                  className="text-4xl font-bold tracking-tight leading-none"
                  style={{ color }}
                >
                  {value}
                </p>
                <p className="mt-1.5 text-base font-medium text-ink">{label}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{sublabel}</p>
              </div>

              {/* Subtle corner glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: color, transform: "translate(50%, -50%)" }}
              />
            </div>
          ))}
        </div>

        {/* ── Social proof: avatar stack + trust line ── */}
        <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Avatar stack */}
          <div className="flex items-center">
            {AVATARS.map((av, i) => (
              <div
                key={i}
                className="relative h-9 w-9 overflow-hidden rounded-full"
                style={{
                  marginLeft: i === 0 ? 0 : "-10px",
                  border: "2px solid #08080a",
                  zIndex: AVATARS.length - i,
                }}
              >
                <Image
                  src={av.src}
                  alt={av.alt}
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
            ))}
            {/* +count bubble */}
            <div
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold"
              style={{
                marginLeft: "-10px",
                border: "2px solid #08080a",
                background: "#1a1a1f",
                color: "#a4a9b6",
                zIndex: 0,
              }}
            >
              2M+
            </div>
          </div>

          {/* Trust text */}
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-ink">
              Join over{" "}
              <span style={{ color: "#5c53fe" }} className="font-semibold">
                2 million professionals
              </span>{" "}
              who found their dream job on HireLoop.
            </p>
            <div className="mt-1 flex items-center justify-center gap-1 sm:justify-start">
              {[1, 2, 3, 4, 5].map(s => (
                <svg
                  key={s}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="#f59e0b"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-ink-muted">4.9 / 5 from 18,000+ reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
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
