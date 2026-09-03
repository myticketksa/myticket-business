import type { ReactNode } from "react"
import { StatusBadge } from "@/components/primitive/status-badge"
import { cn } from "@/lib/utils"

export type NotificationRowState = "actionNeeded" | "read"
export type NotificationTileTone = "danger" | "brand" | "success" | "info"

interface NotificationRowProps {
  title: string
  body: string
  time: string
  state?: NotificationRowState
  unread?: boolean
  icon?: ReactNode
  tileTone?: NotificationTileTone
}

const tileToneClass: Record<NotificationTileTone, string> = {
  danger: "bg-status-danger-light text-status-danger",
  brand: "bg-surface-brand-wash text-brand-primary",
  success: "bg-status-success-light text-status-success",
  info: "bg-status-info-light text-status-info",
}

export function NotificationRow({
  title,
  body,
  time,
  state = "read",
  unread = false,
  icon,
  tileTone = "brand",
}: NotificationRowProps) {
  const needsAction = state === "actionNeeded"

  return (
    <article
      className={cn(
        "flex items-start gap-xs px-base py-sm sm:px-lg",
        unread || needsAction ? "bg-surface-canvas" : "bg-surface-card",
      )}
    >
      {icon ? (
        <span
          className={cn(
            "flex size-[38px] shrink-0 items-center justify-center rounded-sm",
            tileToneClass[tileTone],
          )}
        >
          {icon}
        </span>
      ) : (
        <span
          className={cn(
            "mt-xs size-2 shrink-0 rounded-pill",
            needsAction ? "bg-status-danger" : "bg-transparent",
          )}
          aria-hidden
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-3xs">
        <div className="flex flex-col gap-3xs sm:flex-row sm:items-start sm:justify-between sm:gap-sm">
          <div className="flex min-w-0 flex-wrap items-center gap-2xs">
            <p className="text-[14px] font-bold text-ink-primary">{title}</p>
            {needsAction ? <StatusBadge label="Action needed" /> : null}
          </div>
          <div className="flex shrink-0 items-center gap-[6px]">
            <p className="text-[12px] text-ink-faint">{time}</p>
            {unread ? (
              <span className="size-[9px] rounded-pill bg-status-danger" aria-hidden />
            ) : null}
          </div>
        </div>
        <p className="text-[13px] leading-[1.45] text-ink-muted">{body}</p>
      </div>
    </article>
  )
}
