import type { ComponentProps } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface AppTextareaProps extends ComponentProps<"textarea"> {
  label?: string
  error?: string
}

export function AppTextarea({
  id,
  label,
  error,
  className,
  ...props
}: AppTextareaProps) {
  return (
    <div className="flex w-full flex-col gap-gap-md">
      {label ? (
        <Label htmlFor={id} className="text-body-s text-ink-body">
          {label}
        </Label>
      ) : null}
      <Textarea
        id={id}
        aria-invalid={Boolean(error)}
        className={cn(
          "min-h-24 rounded-sm border-border-default bg-surface-card px-sm text-[15px] leading-5 text-ink-primary placeholder:text-ink-placeholder focus-visible:border-[1.5px] focus-visible:border-brand-primary focus-visible:ring-0 aria-invalid:border-[1.5px] aria-invalid:border-status-danger aria-invalid:ring-0 disabled:bg-surface-sold",
          className,
        )}
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
