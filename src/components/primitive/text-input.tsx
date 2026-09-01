import type { ComponentProps } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface TextInputProps extends ComponentProps<"input"> {
  label?: string
  error?: string
}

const fieldClass =
  "h-12 rounded-sm border-border-default bg-surface-card px-sm text-[15px] leading-5 text-ink-primary placeholder:text-ink-placeholder focus-visible:border-[1.5px] focus-visible:border-brand-primary focus-visible:ring-0 aria-invalid:border-[1.5px] aria-invalid:border-status-danger aria-invalid:ring-0 disabled:bg-surface-sold disabled:text-ink-disabled"

export function TextInput({
  id,
  label,
  error,
  className,
  ...props
}: TextInputProps) {
  const invalid = Boolean(error)

  return (
    <div className="flex w-full flex-col gap-gap-md">
      {label ? (
        <Label htmlFor={id} className="text-body-s text-ink-body">
          {label}
        </Label>
      ) : null}
      <Input
        id={id}
        aria-invalid={invalid}
        className={cn(fieldClass, className)}
        {...props}
      />
      {error ? (
        <p className="text-body-xs text-status-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
