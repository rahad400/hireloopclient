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
import { RoleSelector, type UserRole } from "@/components/auth/role-selector"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getDashboardHome } from "@/lib/dashboard-navigation"

/** Sign-up screen backed by better-auth email/password + a role field. */
export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("candidate")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(null)

    if (!acceptedTerms) {
      setErrorMessage("Please accept the Terms of Service and Privacy Policy.")
      return
    }

    setIsSubmitting(true)

    const { data, error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
      role,
    })

    if (error) {
      setErrorMessage(
        error.message ?? "Unable to create your account. Please try again."
      )
      setIsSubmitting(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <AuthCard
      className="max-w-lg"
      title="Create your account"
      description="Join HireLoop and get matched with roles that actually fit your skills."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-brand-strong hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <GoogleContinueButton />

        <AuthDivider>or sign up with email</AuthDivider>

        <form
          aria-label="Create an account"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <FieldGroup className="gap-4">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="sign-up-name">Full name</FieldLabel>
              <Input
                id="sign-up-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                disabled={isSubmitting}
                className={authInputClassName}
              />
            </Field>

            <Field className="gap-1.5">
              <FieldLabel htmlFor="sign-up-email">Email address</FieldLabel>
              <Input
                id="sign-up-email"
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
              id="sign-up-password"
              label="Password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={setPassword}
              required
              disabled={isSubmitting}
              description="Use 8 or more characters with a mix of letters and numbers."
            />
          </FieldGroup>

          <RoleSelector value={role} onValueChange={setRole} />

          <label className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-muted select-none">
            <Checkbox
              name="terms"
              checked={acceptedTerms}
              onCheckedChange={setAcceptedTerms}
              disabled={isSubmitting}
              className="mt-0.5 border-white/20 data-checked:border-brand data-checked:bg-brand"
            />
            <span>
              I agree to HireLoop&apos;s{" "}
              <Link
                href="/terms"
                className="underline underline-offset-2 hover:text-ink"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-ink"
              >
                Privacy Policy
              </Link>
              .
            </span>
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
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </div>
    </AuthCard>
  )
}
