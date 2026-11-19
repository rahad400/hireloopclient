"use client"

import { useState } from "react"
import { toast } from "sonner"

import { authClient } from "@/app/lip/auth-client"
import { Button } from "@/components/ui/button"

/** Official four-colour Google mark, sized to match the button label. */
function GoogleGlyph() {
  return (
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
  )
}

/**
 * Starts the Google OAuth flow. New Google accounts get the default
 * `candidate` role and land on the candidate dashboard.
 */
export function GoogleContinueButton() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleGoogleSignIn() {
    setIsLoading(true)

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/candidate",
    })

    if (error) {
      toast.error(error.message ?? "Could not continue with Google.")
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      aria-busy={isLoading}
      className="h-11 w-full gap-2.5 rounded-xl border-white/15 bg-white/[0.04] text-sm font-medium text-ink hover:bg-white/[0.08] hover:text-ink focus-visible:border-brand/50 focus-visible:ring-2 focus-visible:ring-brand/35 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
    >
      <GoogleGlyph />
      {isLoading ? "Connecting..." : "Continue with Google"}
    </Button>
  )
}
