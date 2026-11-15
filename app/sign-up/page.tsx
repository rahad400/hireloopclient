"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signUp, signIn } from "@/app/lip/auth-client"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

const ROLES = [
  { value: "candidate", label: "Job Seeker" },
  { value: "employer", label: "Employer" },
  { value: "admin", label: "Admin" },
]

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [role, setRole] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = { name, email, password, confirmPassword, role }
    console.log(formData)
    if (!role) {
      setError("Please select a role.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    setLoading(true)
    setError(null)
    const { error } = await signUp.email({
      ...formData,
    })
    if (error) {
      setError(error.message ?? "Sign up failed")
      setLoading(false)
      return
    }
    router.push("/sign-in")
  }

  const handleGoogle = async () => {
    setLoading(true)
    const { error } = await signIn.social({ provider: "google" })
    if (error) setError(error.message ?? "Google sign-in failed")
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen" style={{ background: "#0f0f0f" }}>
      {/* ── Left panel: purple swirl + branding ── */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-10 lg:flex">
        {/* Swirl background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/auth-bg.png')", opacity: 0.85 }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(10,5,20,0.45)" }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <Image
            src="/hireloop-logo.png"
            alt="HireLoop"
            width={150}
            height={45}
            className=" h-auto w-{150px} object-contain"
          />
        </div>

        {/* Tagline */}
        <div className="relative z-10">
          <h1 className="mb-3 text-4xl leading-tight font-bold text-white">
            Find your next
            <br />
            <span style={{ color: "#c084fc" }}>opportunity</span>
          </h1>
          <p className="text-sm leading-relaxed text-gray-400">
            Connect with top employers and land
            <br />
            the job you deserve.
          </p>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div
        className="flex flex-1 items-center justify-center px-6 py-12"
        style={{ background: "#141414" }}
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex justify-center lg:hidden">
            <Image
              src="/hireloop-logo.png"
              alt="HireLoop"
              width={130}
              height={40}
              className="object-contain"
            />
          </div>

          <h2 className="mb-1 text-2xl font-bold text-white">
            Create an account
          </h2>
          <p className="mb-8 text-sm" style={{ color: "#6b7280" }}>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium"
              style={{ color: "#a855f7" }}
            >
              Sign in
            </Link>
          </p>

          {/* Google OAuth button */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="mb-6 flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50"
            style={{ border: "1px solid #2d2d2d", background: "#1c1c1c" }}
          >
            {/* Google "G" SVG */}
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
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
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: "#2d2d2d" }} />
            <span className="text-xs" style={{ color: "#6b7280" }}>
              or sign up with email
            </span>
            <div className="h-px flex-1" style={{ background: "#2d2d2d" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="mb-1.5 block text-sm"
                style={{ color: "#d1d5db" }}
                htmlFor="name"
              >
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-[#2d2d2d] bg-[#1c1c1c] text-white placeholder:text-[#4b5563] focus-visible:border-purple-500 focus-visible:ring-purple-500"
              />
            </div>

            <div>
              <label
                className="mb-1.5 block text-sm"
                style={{ color: "#d1d5db" }}
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
                className="border-[#2d2d2d] bg-[#1c1c1c] text-white placeholder:text-[#4b5563] focus-visible:border-purple-500 focus-visible:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="mb-1.5 block text-sm"
                style={{ color: "#d1d5db" }}
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#2d2d2d] bg-[#1c1c1c] pr-10 text-white placeholder:text-[#4b5563] focus-visible:border-purple-500 focus-visible:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#6b7280] transition-colors hover:text-gray-300 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="mb-1.5 block text-sm"
                style={{ color: "#d1d5db" }}
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`border-[#2d2d2d] bg-[#1c1c1c] pr-10 text-white placeholder:text-[#4b5563] focus-visible:border-purple-500 focus-visible:ring-purple-500 ${
                    confirmPassword && confirmPassword !== password
                      ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500"
                      : confirmPassword && confirmPassword === password
                        ? "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500"
                        : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#6b7280] transition-colors hover:text-gray-300 focus:outline-none"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="mt-1 text-xs text-red-400">
                  Passwords do not match.
                </p>
              )}
              {confirmPassword && confirmPassword === password && (
                <p className="mt-1 text-xs text-green-400">Passwords match ✓</p>
              )}
            </div>

            {/* Role selector — pill buttons */}
            <div>
              <label
                className="mb-2 block text-sm"
                style={{ color: "#d1d5db" }}
              >
                I am a&hellip;
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className="cursor-pointer rounded-lg px-3 py-2 text-center text-xs font-medium transition-all"
                    style={{
                      border: `1px solid ${role === r.value ? "#a855f7" : "#2d2d2d"}`,
                      background:
                        role === r.value ? "rgba(168,85,247,0.15)" : "#1c1c1c",
                      color: role === r.value ? "#c084fc" : "#9ca3af",
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p
                className="rounded-lg px-3 py-2 text-sm text-red-400"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                }}
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-lg py-2.5 font-semibold text-white transition-all disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                border: "none",
              }}
            >
              {loading ? "Creating account…" : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs" style={{ color: "#4b5563" }}>
            By signing up, you agree to our{" "}
            <span
              className="cursor-pointer underline"
              style={{ color: "#a855f7" }}
            >
              Terms
            </span>{" "}
            and{" "}
            <span
              className="cursor-pointer underline"
              style={{ color: "#a855f7" }}
            >
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
