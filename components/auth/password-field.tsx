"use client"

import { useState, type ReactNode } from "react"
import { Eye, EyeOff } from "lucide-react"

import { authInputClassName } from "@/components/auth/auth-form-styles"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type PasswordFieldProps = {
  id: string
  label: string
  autoComplete: "current-password" | "new-password"
  placeholder: string
  /** Form field name. Defaults to `password` so better-auth receives it. */
  name?: string
  value: string
  onChange: (value: string) => void
  /** Optional helper text shown under the input. */
  description?: string
  /** Optional link or button aligned with the label, e.g. "Forgot password?". */
  labelAction?: ReactNode
  required?: boolean
  disabled?: boolean
}

/**
 * Password input with a show/hide control.
 *
 * The value is controlled by the page so the same state can be sent to
 * better-auth on submit.
 */
export function PasswordField({
  id,
  label,
  autoComplete,
  placeholder,
  name = "password",
  value,
  onChange,
  description,
  labelAction,
  required,
  disabled,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const descriptionId = description ? `${id}-description` : undefined

  return (
    <Field className="gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        {labelAction}
      </div>

      <div className="relative">
        <Input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          disabled={disabled}
          aria-describedby={descriptionId}
          className={`${authInputClassName} pr-11`}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          disabled={disabled}
         
          className="absolute  top-1/4 right-1.5 flex  items-center justify-center text-ink-muted hover:bg-white/10 hover:text-ink focus-visible:ring-brand/50"
        >
          {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
        </Button>
      </div>

      {description && (
        <FieldDescription id={descriptionId} className="text-xs text-ink-muted">
          {description}
        </FieldDescription>
      )}
    </Field>
  )
}
