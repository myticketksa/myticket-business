import { XIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { CountBadge } from "@/components/primitive/count-badge"

export type FilterChipState = "default" | "selected" | "removable"

interface FilterChipProps {
  label: string
  count?: string
  state?: FilterChipState
  onClick?: () => void
  onRemove?: () => void
}

export function FilterChip({
  label,
  count,
  state = "default",
  onClick,
  onRemove,
}: FilterChipProps) {
  const selected = state === "selected" || state === "removable"

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-[38px] items-center gap-2xs rounded-[19px] border px-sm text-body-s focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary",
        selected
          ? "border-transparent bg-brand-gradient text-ink-inverse"
          : "border-border-default bg-surface-card text-ink-primary",
      )}
    >
      {label}
      {count ? <CountBadge count={count} /> : null}
      {state === "removable" ? (
        <span
          role="button"
          tabIndex={0}
          aria-label={`Remove ${label}`}
          onClick={(event) => {
            event.stopPropagation()
            onRemove?.()
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault()
              onRemove?.()
            }
          }}
        >
          <XIcon className="size-4" weight="bold" />
        </span>
      ) : null}
    </button>
  )
}
