"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "cn"

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-left text-[13px] text-ink transition-colors hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:outline-none",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        aria-hidden="true"
        className="size-4 shrink-0 text-ink-muted"
      />
    </SelectPrimitive.Trigger>
  )
}

type SelectContentProps = React.ComponentProps<typeof SelectPrimitive.Popup> & {
  align?: React.ComponentProps<typeof SelectPrimitive.Positioner>["align"]
  sideOffset?: React.ComponentProps<typeof SelectPrimitive.Positioner>["sideOffset"]
}

function SelectContent({
  align = "start",
  sideOffset = 4,
  className,
  children,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        align={align}
        sideOffset={sideOffset}
        className="z-50 outline-none"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "z-50 max-h-64 w-(--anchor-width) overflow-y-auto rounded-xl border border-white/10 bg-night-raised p-1 text-ink shadow-lg",
            className
          )}
          {...props}
        >
          {children}
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex cursor-default items-center rounded-lg py-1.5 pr-8 pl-2 text-[13px] outline-none select-none focus:bg-white/10 focus:text-white data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2 flex items-center justify-center">
        <CheckIcon aria-hidden="true" className="size-3.5" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem }
