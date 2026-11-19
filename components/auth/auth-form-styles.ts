/**
 * Shared class names for the auth forms.
 *
 * Keeping them here means the sign-in and sign-up pages cannot drift apart
 * while the dark theme tokens remain in one place.
 */

export const authInputClassName =
  "h-11 rounded-xl border-white/15 bg-white/[0.04] px-3.5 text-sm text-ink shadow-none placeholder:text-ink-muted/70 focus-visible:border-brand/60 focus-visible:ring-2 focus-visible:ring-brand/35 dark:bg-white/[0.04]"

export const authPrimaryButtonClassName =
  "h-11 w-full rounded-xl bg-brand text-sm font-semibold text-brand-foreground shadow-[0_14px_34px_-16px_rgba(92,83,254,0.95)] hover:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-night-raised"
