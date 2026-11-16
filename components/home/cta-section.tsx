"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

/* ─── Globe SVG grid lines ──────────────────────────────────── */
function GlobeGrid() {
  // Draws a hemisphere wireframe: horizontal rings + vertical meridians
  const W = 900
  const H = 500
  const cx = W / 2
  const cy = H        // center is at the bottom so only top half shows
  const R = 420       // radius of the sphere

  const lines: string[] = []

  // Latitude lines (horizontal arcs) — from top to equator
  const latCount = 8
  for (let i = 1; i <= latCount; i++) {
    // angle from top (0°) to equator (90°)
    const angle = (i / latCount) * (Math.PI / 2)
    const r = R * Math.sin(angle)
    const y = cy - R * Math.cos(angle)
    // Draw as an arc path so it looks 3D (ellipse width compressed)
    const rx = r
    const ry = r * 0.28  // perspective flatten
    lines.push(
      `<ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>`
    )
  }

  // Longitude lines (vertical meridians) — 12 slices
  const lonCount = 12
  for (let i = 0; i < lonCount; i++) {
    const theta = (i / lonCount) * Math.PI // 0 → π (left to right)
    // Each meridian is a half-ellipse in perspective
    const rx = R * Math.abs(Math.sin(theta))
    const ry = R
    // Rotation: each meridian tilts by theta
    // We draw as a vertical ellipse rotated by theta
    const x = cx + R * Math.cos(theta)
    // Use a path approximation: draw as squished ellipse
    // Actually draw as a series of points along the meridian arc
    const pts: string[] = []
    for (let j = 0; j <= 40; j++) {
      const phi = (j / 40) * (Math.PI / 2) // 0 → 90° (top to equator)
      const px = cx + R * Math.sin(phi) * Math.cos(theta)
      const py = cy - R * Math.cos(phi)
      // Apply perspective: x offset flattened by sin of angle
      const pxFlat = cx + (px - cx) * 1
      const pyFlat = py
      pts.push(`${j === 0 ? "M" : "L"} ${pxFlat.toFixed(1)} ${pyFlat.toFixed(1)}`)
    }
    lines.push(
      `<path d="${pts.join(" ")}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>`
    )
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 w-full"
      style={{ height: "100%", pointerEvents: "none" }}
      dangerouslySetInnerHTML={{ __html: lines.join("\n") }}
    />
  )
}

/* ─── Section ───────────────────────────────────────────────── */
export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden px-4 py-24 sm:px-6 sm:py-32"
      style={{ background: "#08080a" }}
    >
      {/* ── Hemisphere glow (the big blue dome) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto"
        style={{
          width: "min(900px, 100%)",
          height: "520px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {/* Outer radial glow — the blue hemisphere fill */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 70% at 50% 100%, rgba(67,56,202,0.75) 0%, rgba(79,70,229,0.5) 25%, rgba(55,48,163,0.3) 50%, transparent 75%)",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          }}
        />
        {/* Inner bright core */}
        <div
          className="absolute inset-x-0 bottom-0 mx-auto"
          style={{
            width: "60%",
            height: "60%",
            left: "20%",
            background:
              "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(99,102,241,0.6) 0%, transparent 70%)",
          }}
        />
        {/* Grid wireframe SVG */}
        <GlobeGrid />
        {/* Fade edges to black */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 100%, transparent 55%, #08080a 85%)",
          }}
        />
        {/* Fade top to black */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: "35%",
            background: "linear-gradient(to bottom, #08080a 0%, transparent 100%)",
          }}
        />
        {/* Fade left + right */}
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: "15%",
            background: "linear-gradient(to right, #08080a 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "15%",
            background: "linear-gradient(to left, #08080a 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2
          id="cta-title"
          className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Your next role is
          <br />
          already looking for you
        </h2>

        <p
          className="mt-5 max-w-md text-base leading-relaxed"
          style={{ color: "#9ca3af" }}
        >
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        {/* ── Buttons ── */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-black transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            style={{ background: "#ffffff" }}
          >
            Create a free account
          </Link>

          <Link
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            View pricing
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* Trust badges */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs"
          style={{ color: "#6b7280" }}
        >
          {[
            "No credit card required",
            "Free forever plan",
            "Cancel anytime",
          ].map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {i > 0 && (
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ background: "#374151" }}
                />
              )}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
