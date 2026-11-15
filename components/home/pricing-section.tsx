"use client"

import { useState } from "react"
import { ArrowRight, Crown, BarChart2, Zap, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* ─── Types ─────────────────────────────────────────────────── */
type BillingCycle = "monthly" | "yearly"

/* ─── Plans ─────────────────────────────────────────────────── */
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    icon: Crown,
    iconColor: "#a855f7",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    featured: false,
    cta: "Choose This Plan",
  },
  {
    id: "growth",
    name: "Growth",
    icon: BarChart2,
    iconColor: "#a855f7",
    monthlyPrice: 17,
    yearlyPrice: 12,
    description: "Start building your insights hub:",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    featured: true,
    cta: "Choose This Plan",
  },
  {
    id: "premium",
    name: "Premium",
    icon: Zap,
    iconColor: "#a855f7",
    monthlyPrice: 99,
    yearlyPrice: 74,
    description: "Start building your insights hub:",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    featured: false,
    cta: "Choose This Plan",
  },
]

/* ─── Single pricing card ───────────────────────────────────── */
function PricingCard({
  plan,
  billing,
}: {
  plan: (typeof PLANS)[0]
  billing: BillingCycle
}) {
  const Icon = plan.icon
  const price =
    billing === "yearly" ? plan.yearlyPrice : plan.monthlyPrice

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl p-6 transition-all duration-300",
        plan.featured ? "scale-[1.02]" : ""
      )}
      style={{
        background: plan.featured ? "#1a1a22" : "#111118",
        border: plan.featured
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: plan.featured
          ? "0 0 0 1px rgba(255,255,255,0.05), 0 32px 64px -16px rgba(0,0,0,0.6)"
          : "none",
      }}
    >
      {/* ── Plan name + price row ── */}
      <div className="flex items-start justify-between gap-4">
        {/* Icon + name */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: "rgba(168,85,247,0.15)" }}
          >
            <Icon size={16} style={{ color: plan.iconColor }} aria-hidden="true" />
          </div>
          <span className="text-base font-semibold text-white">{plan.name}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-0.5 text-right">
          <span className="text-3xl font-bold text-white">
            ${price}
          </span>
          <span className="text-sm text-gray-500">/month</span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        className="my-5 h-px w-full"
        style={{ background: "rgba(255,255,255,0.07)" }}
      />

      {/* ── Features ── */}
      <p className="mb-3 text-sm font-medium" style={{ color: "#c4c4c4" }}>
        {plan.description}
      </p>
      <ul className="mb-8 flex flex-col gap-2.5">
        {plan.features.map(f => (
          <li key={f} className="flex items-start gap-2.5">
            <Plus
              size={14}
              className="mt-0.5 shrink-0"
              style={{ color: "#6b7280" }}
              aria-hidden="true"
            />
            <span className="text-sm" style={{ color: "#9ca3af" }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* ── CTA button ── */}
      <div className="mt-auto">
        <Button
          className={cn(
            "group w-full justify-between rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200",
          )}
          style={
            plan.featured
              ? {
                  background: "#ffffff",
                  color: "#000000",
                  border: "none",
                }
              : {
                  background: "rgba(255,255,255,0.06)",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.1)",
                }
          }
        >
          {plan.cta}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  )
}

/* ─── Section ───────────────────────────────────────────────── */
export function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>("monthly")

  return (
    <section
      aria-labelledby="pricing-title"
      className="relative isolate overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(92,83,254,0.08), transparent)",
        }}
      />

      <div className="mx-auto max-w-5xl">
        {/* ── Header ── */}
        <div className="mb-12 flex flex-col items-center text-center">
          {/* Label with dots */}
          <div className="mb-5 flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#5c53fe" }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#7c74ff" }}
            >
              Pricing
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#5c53fe" }}
            />
          </div>

          <h2
            id="pricing-title"
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Pay for the leverage,
            <br />
            not the listings
          </h2>

          {/* ── Billing toggle ── */}
          <div
            className="mt-8 flex items-center gap-1 rounded-full p-1"
            style={{
              background: "#1a1a1f",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <button
              onClick={() => setBilling("monthly")}
              className="relative rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
              style={
                billing === "monthly"
                  ? {
                      background: "#ffffff",
                      color: "#000000",
                    }
                  : {
                      background: "transparent",
                      color: "#9ca3af",
                    }
              }
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className="relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
              style={
                billing === "yearly"
                  ? {
                      background: "#ffffff",
                      color: "#000000",
                    }
                  : {
                      background: "transparent",
                      color: "#9ca3af",
                    }
              }
            >
              Yearly
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                style={{
                  background:
                    billing === "yearly" ? "#a855f7" : "rgba(168,85,247,0.25)",
                  color: billing === "yearly" ? "#ffffff" : "#c084fc",
                }}
              >
                25%
              </span>
            </button>
          </div>
        </div>

        {/* ── Plans grid ── */}
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-3">
          {PLANS.map(plan => (
            <PricingCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>

        {/* ── Footer note ── */}
        <p className="mt-8 text-center text-xs" style={{ color: "#4b5563" }}>
          No credit card required · Cancel anytime · All plans include a 14-day free trial
        </p>
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
