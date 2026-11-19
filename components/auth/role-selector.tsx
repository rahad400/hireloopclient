"use client"

import { Building2, ShieldCheck, UserRound } from "lucide-react"

import { FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const roleOptions = [
  {
    value: "candidate",
    label: "Job Seeker",
    description: "Find roles and apply",
    icon: UserRound,
  },
  {
    value: "employer",
    label: "Employer",
    description: "Post jobs and hire",
    icon: Building2,
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage the platform",
    icon: ShieldCheck,
  },
] as const

export type UserRole = (typeof roleOptions)[number]["value"]

/**
 * Three-role picker for the sign-up form.
 *
 * The selected role is sent to better-auth with the rest of the sign-up
 * fields, so it must stay controlled by the page.
 */
export function RoleSelector({
  value,
  onValueChange,
}: {
  value: UserRole
  onValueChange: (value: UserRole) => void
}) {
  return (
    <FieldSet>
      <FieldLegend variant="label">I am joining as</FieldLegend>

      <RadioGroup
        name="role"
        value={value}
        onValueChange={(nextValue) => onValueChange(nextValue as UserRole)}
        className="grid gap-2.5 sm:grid-cols-3"
      >
        {roleOptions.map((role) => {
          const RoleIcon = role.icon

          return (
            <FieldLabel
              key={role.value}
              className="relative flex w-full cursor-pointer flex-col items-start gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06] has-data-checked:border-brand/60 has-data-checked:bg-brand/10 has-data-checked:ring-1 has-data-checked:ring-brand/40"
            >
              <RadioGroupItem
                value={role.value}
                className="absolute top-3 right-3 border-white/25 data-checked:border-brand data-checked:bg-brand"
              />

              <RoleIcon
                className="size-5 text-brand-strong"
                aria-hidden="true"
              />

              <span className="text-sm font-medium text-ink">{role.label}</span>
              <span className="text-[11px] leading-snug text-ink-muted">
                {role.description}
              </span>
            </FieldLabel>
          )
        })}
      </RadioGroup>
    </FieldSet>
  )
}
