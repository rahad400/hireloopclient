"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { authClient } from "@/app/lip/auth-client"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthDivider } from "@/components/auth/auth-divider"
import {
  authInputClassName,
  authPrimaryButtonClassName,
} from "@/components/auth/auth-form-styles"
import { GoogleContinueButton } from "@/components/auth/google-continue-button"
import { PasswordField } from "@/components/auth/password-field"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getDashboardHome } from "@/lib/dashboard-navigation"

/** Sign-in screen backed by better-auth email/password. */
export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)
    const requestedRedirect = new URLSearchParams(window.location.search).get(
      "redirectTo"
    )
    const redirectTo =
      requestedRedirect?.startsWith("/") &&
      !requestedRedirect.startsWith("//") &&
      !requestedRedirect.startsWith("/\\")
        ? requestedRedirect
        : "/"

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    })

    if (error) {
      setErrorMessage(
        error.message ?? "Unable to sign in. Check your details and try again."
      )
      setIsSubmitting(false)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to pick up where you left off and see the roles waiting for you."
      footer={
        <>
          New to HireLoop?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-brand-strong hover:underline"
          >
            Create an account
          </Link>
          <span aria-hidden="true" className="mx-2 text-white/20">
            ·
          </span>
          <Link
            href="/browse-jobs"
            className="font-medium text-brand-strong hover:underline"
          >
            Browse jobs
          </Link>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <GoogleContinueButton />

        <AuthDivider>or continue with email</AuthDivider>

        <form
          aria-label="Sign in with email"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <FieldGroup className="gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="sign-in-email">Email address</FieldLabel>
              <Input
                id="sign-in-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                disabled={isSubmitting}
                className={authInputClassName}
              />
            </Field>

            <PasswordField
              id="sign-in-password"
              label="Password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              required
              disabled={isSubmitting}
              labelAction={
                <button
                  type="button"
                  className="text-xs font-medium text-brand-strong hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none"
                >
                  Forgot password?
                </button>
              }
            />
          </FieldGroup>

          <label className="flex w-fit items-center gap-2.5 text-xs text-ink-muted select-none">
            <Checkbox
              name="rememberMe"
              checked={rememberMe}
              onCheckedChange={setRememberMe}
              disabled={isSubmitting}
              className="border-white/20 data-checked:border-brand data-checked:bg-brand"
            />
            Remember me for 30 days
          </label>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs leading-relaxed text-destructive"
            >
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={authPrimaryButtonClassName}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-[11px] leading-relaxed text-ink-muted/80">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-2 hover:text-ink"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-ink"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </AuthCard>
  )
}
