import type { ComponentProps, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

export type AppButtonStyle =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive"
  | "icon"

export type AppButtonSize = "l" | "m" | "s"

interface AppButtonProps extends Omit<ComponentProps<"button">, "style"> {
  variant?: AppButtonStyle
  size?: AppButtonSize
  loading?: boolean
  icon?: ReactNode
}

const variantClass: Record<AppButtonStyle, string> = {
  primary: "bg-brand-gradient text-ink-inverse border-transparent hover:opacity-90",
  secondary:
    "bg-surface-card border-brand-primary text-brand-primary hover:bg-surface-brand-wash",
  ghost:
    "bg-transparent border-transparent text-brand-primary hover:bg-surface-brand-wash",
  destructive:
    "bg-status-danger text-ink-inverse border-transparent hover:bg-status-danger-strong",
  icon: "bg-transparent border-transparent text-ink-primary hover:bg-surface-brand-wash",
}

const sizeClass: Record<AppButtonSize, string> = {
  l: "h-12 min-w-12 px-md text-action-m",
  m: "h-[42px] min-w-[42px] px-[18px] text-action-s",
  s: "h-9 min-w-9 px-[15px] text-action-xs",
}

export function AppButton({
  variant = "primary",
  size = "m",
  loading = false,
  icon,
  className,
  disabled,
  children,
  ...props
}: AppButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn(
        "rounded-pill focus-visible:ring-1 focus-visible:ring-brand-primary",
        variantClass[variant],
        sizeClass[size],
        variant === "icon" && "px-0",
        className,
      )}
      {...props}
    >
      {loading ? <Spinner data-icon="inline-start" /> : icon}
      {variant === "icon" ? null : children}
    </Button>
  )
}
