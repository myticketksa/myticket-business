import { cn } from "@/lib/utils"

export type FilterPillSize = 32 | 36 | 38
export type FilterPillState = "active" | "idle"

interface FilterPillProps {
  label: string
  state?: FilterPillState
  size?: FilterPillSize
  className?: string
  onClick?: () => void
}

const heightClass: Record<FilterPillSize, string> = {
  32: "h-8",
  36: "h-9",
  38: "h-[38px]",
}

export function FilterPill({
  label,
  state = "idle",
  size = 36,
  className,
  onClick,
}: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-pill border px-sm text-[13.5px]",
        heightClass[size],
        state === "active"
          ? "border-transparent bg-brand-gradient font-semibold text-ink-inverse"
          : "border-border-default bg-surface-card font-medium text-ink-primary",
        className,
      )}
    >
      {label}
    </button>
  )
}
