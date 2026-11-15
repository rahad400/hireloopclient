"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "@/app/lip/auth-client"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const loadingToast = toast.loading("Signing in…")
    const { error } = await signIn.email({ email, password })
    toast.dismiss(loadingToast)
    setLoading(false)
    if (error) {
      toast.error(
        error.message ?? "Sign in failed. Please check your credentials."
      )
      return
    }
    toast.success("Welcome back! Redirecting…")
    router.push("/")
  }

  const handleGoogle = async () => {
    setLoading(true)
    const { error } = await signIn.social({ provider: "google" })
    setLoading(false)
    if (error) toast.error(error.message ?? "Google sign-in failed.")
  }

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16"
      style={{ background: "#0a0a0d" }}
    >
      {/* ── Subtle purple glow blobs ── */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(ellipse, #a855f7 0%, transparent 70%)",
        }}
      />

      {/* ── Card ── */}
      <div
        className="lg:mx-w-xl relative z-10 w-full max-w-sm rounded-2xl p-8 shadow-2xl sm:max-w-md md:max-w-lg"
        style={{
          background: "#141414",
          border: "1px solid rgba(168,85,247,0.15)",
          boxShadow: "0 0 40px rgba(124,58,237,0.08)",
        }}
      >
        {/* Logo */}
        <div className="mb-7 flex justify-center">
          <Image
            src="/hireloop-logo.png"
            alt="HireLoop"
            width={120}
            height={36}
            className="object-contain"
          />
        </div>

        <h2 className="mb-1 text-center text-xl font-bold text-white">
          Sign in
        </h2>
        <p className="mb-7 text-center text-sm" style={{ color: "#6b7280" }}>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium hover:underline"
            style={{ color: "#a855f7" }}
          >
            Create one
          </Link>
        </p>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="mb-5 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#242424] disabled:opacity-50"
          style={{ border: "1px solid #2d2d2d", background: "#1c1c1c" }}
        >
          <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#FFC107"
              d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.6 6.6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.6 15.1 19 12 24 12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.6 6.6 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.4C9.7 36.1 16.3 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.4 4.2-4.3 5.6l6.2 5.2C36.9 39.8 44 34.7 44 24c0-1.3-.1-2.6-.4-3.9z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: "#2d2d2d" }} />
          <span className="text-xs" style={{ color: "#4b5563" }}>
            or
          </span>
          <div className="h-px flex-1" style={{ background: "#2d2d2d" }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="mb-1.5 block text-xs font-medium"
              style={{ color: "#9ca3af" }}
              htmlFor="email"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border-[#2d2d2d] bg-[#1a1a1a] text-sm text-white placeholder:text-[#4b5563] focus-visible:border-purple-500 focus-visible:ring-purple-500"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                className="block text-xs font-medium"
                style={{ color: "#9ca3af" }}
                htmlFor="password"
              >
                Password
              </label>
              <span
                className="cursor-pointer text-xs hover:underline"
                style={{ color: "#a855f7" }}
              >
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border-[#2d2d2d] bg-[#1a1a1a] pr-10 text-sm text-white placeholder:text-[#4b5563] focus-visible:border-purple-500 focus-visible:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#6b7280] transition-colors hover:text-gray-300 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-1 w-full cursor-pointer rounded-xl py-2.5 font-semibold text-white transition-all disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              border: "none",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  )
}
