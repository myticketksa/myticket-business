import { CheckIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export type AreaRailState = "complete" | "incomplete" | "error"

interface AreaRailItemProps {
  label: string
  state?: AreaRailState
  number?: string
  count?: string
  onClick?: () => void
}

export function AreaRailItem({
  label,
  state = "complete",
  number,
  count,
  onClick,
}: AreaRailItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-10 w-full items-center gap-[11px] rounded-sm px-xs text-left",
        state === "error" && "bg-surface-brand-wash",
      )}
    >
      <span
        className={cn(
          "inline-flex size-[22px] shrink-0 items-center justify-center rounded-[11px]",
          state === "complete" && "bg-status-success text-ink-inverse",
          state === "incomplete" && "bg-surface-skeleton text-ink-faint",
          state === "error" && "bg-brand-primary text-ink-inverse",
        )}
      >
        {state === "complete" ? (
          <CheckIcon className="size-[13px]" weight="bold" />
        ) : (
          <span className="text-[11px] font-extrabold">{number}</span>
        )}
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-[14px]",
          state === "error"
            ? "font-bold text-accent-amber"
            : "font-semibold text-ink-primary",
        )}
      >
        {label}
      </span>
      {count ? (
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-[10px] bg-surface-brand-wash px-[6px] text-[11.5px] font-extrabold text-accent-amber">
          {count}
        </span>
      ) : null}
    </button>
  )
}
