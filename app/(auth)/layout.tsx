import Image from "next/image"
import type { ReactNode } from "react"

/**
 * Shared background for `/sign-in` and `/sign-up`.
 *
 * The abstract image is decorative, so it is hidden from assistive technology
 * and pushed behind a gradient that keeps the card readable on every screen.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden bg-night">
      <Image
        src="/auth-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-night/55 via-night/85 to-night"
      />

      <div className="mx-auto flex min-h-svh w-full max-w-3xl items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
        {children}
      </div>
    </div>
  )
}
