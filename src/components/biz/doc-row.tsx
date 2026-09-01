import type { ReactNode } from "react"
import { StatusBadge } from "@/components/primitive/status-badge"
import type { StatusBadgeTone } from "@/lib/status-badge-tone"
import { cn } from "@/lib/utils"

export type DocRowState =
  | "verified"
  | "missing"
  | "expiring"
  | "expiringQuiet"
  | "review"

interface DocRowProps {
  title: string
  note: string
  icon: ReactNode
  state?: DocRowState
  badge?: string
}

const stateChrome: Record<
  DocRowState,
  { row: string; tile: string; note: string; badge: string; tone: StatusBadgeTone }
> = {
  verified: {
    row: "bg-surface-card",
    tile: "bg-status-success-light text-status-success",
    note: "text-ink-faint",
    badge: "Verified",
    tone: "SuccessTint",
  },
  missing: {
    row: "bg-status-danger-light",
    tile: "bg-status-danger-light text-status-danger",
    note: "text-status-danger",
    badge: "Missing",
    tone: "DangerTint",
  },
  expiring: {
    row: "bg-status-danger-light",
    tile: "bg-status-danger-light text-status-danger",
    note: "text-status-danger",
    badge: "Expiring",
    tone: "DangerTint",
  },
  expiringQuiet: {
    row: "bg-surface-card",
    tile: "bg-surface-canvas text-ink-muted",
    note: "text-status-danger",
    badge: "Expiring",
    tone: "BrandTint",
  },
  review: {
    row: "bg-surface-card",
    tile: "bg-surface-canvas text-ink-muted",
    note: "text-ink-faint",
    badge: "Under review",
    tone: "BrandTint",
  },
}

export function DocRow({
  title,
  note,
  icon,
  state = "verified",
  badge,
}: DocRowProps) {
  const chrome = stateChrome[state]

  return (
    <div
      className={cn(
        "flex items-center gap-xs rounded-sm px-lg py-sm",
        chrome.row,
      )}
    >
      <div
        className={cn(
          "flex size-[34px] shrink-0 items-center justify-center rounded-badge",
          chrome.tile,
        )}
      >
        {icon}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <p className="truncate text-[13.5px] font-bold text-ink-primary">{title}</p>
        <p className={cn("text-[12px]", chrome.note)}>{note}</p>
      </div>
      <StatusBadge label={badge ?? chrome.badge} tone={chrome.tone} />
    </div>
  )
}
