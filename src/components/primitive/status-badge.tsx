import { Badge } from "@/components/ui/badge"
import {
  resolveStatusBadgeTone,
  type StatusBadgeTone,
} from "@/lib/status-badge-tone"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  label: string
  tone?: StatusBadgeTone
}

const toneClass: Record<StatusBadgeTone, string> = {
  SuccessTint: "border-transparent bg-status-success-light text-status-success",
  DangerTint:
    "border-status-danger-border bg-status-danger-light text-status-danger",
  InfoTint: "border-transparent bg-status-info-light text-status-info",
  BrandTint: "border-transparent bg-surface-brand-wash text-accent-amber",
  NeutralOutline: "border-border-default bg-surface-canvas text-ink-muted",
  Inactive: "border-transparent bg-surface-sold text-ink-faint",
  LiveSolid: "border-transparent bg-status-success text-ink-inverse",
  UrgentSolid: "border-transparent bg-status-danger text-ink-inverse",
  Terminal: "border-transparent bg-surface-inverse text-ink-inverse",
}

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  const resolved = resolveStatusBadgeTone(label, tone)

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-auto rounded-pill px-xs py-3xs text-tag-m",
        toneClass[resolved],
      )}
    >
      {label}
    </Badge>
  )
}
