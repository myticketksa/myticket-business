import type { ReactNode } from "react"
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export type KpiCardKind = "standard" | "noIcon" | "coloured"
export type KpiTrendTone = "success" | "down" | "muted"
export type KpiValueTone = "ink" | "success" | "danger"

interface KpiCardProps {
  label: string
  value: string
  trend?: string
  trendTone?: KpiTrendTone
  valueTone?: KpiValueTone
  note?: string
  icon?: ReactNode
  kind?: KpiCardKind
  className?: string
  showTrendIcon?: boolean
}

const trendToneClass: Record<KpiTrendTone, string> = {
  success: "text-status-success",
  down: "text-accent-amber",
  muted: "text-ink-faint",
}

const valueToneClass: Record<KpiValueTone, string> = {
  ink: "text-ink-primary",
  success: "text-status-success",
  danger: "text-accent-amber",
}

export function KpiCard({
  label,
  value,
  trend,
  trendTone = "success",
  valueTone = "ink",
  note,
  icon,
  kind = "standard",
  className,
  showTrendIcon = true,
}: KpiCardProps) {
  const showIcon = kind !== "noIcon" && icon
  const TrendGlyph =
    trendTone === "down"
      ? CaretDownIcon
      : trendTone === "success"
        ? CaretUpIcon
        : null

  return (
    <article
      className={cn(
        "flex w-full min-w-0 max-w-[320px] flex-col gap-gap-md rounded-lg border border-border-default px-[22px] py-lg",
        kind === "coloured" ? "bg-surface-brand-wash" : "bg-surface-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-sm">
        <p className="text-[13px] font-semibold text-ink-muted">{label}</p>
        {showIcon ? <span className="text-brand-primary">{icon}</span> : null}
      </div>
      <p
        className={cn(
          "text-[30px] leading-none font-extrabold tracking-[-0.6px]",
          valueToneClass[valueTone],
        )}
      >
        {value}
      </p>
      {trend || note ? (
        <div className="flex flex-wrap items-center gap-[6px] text-[12.5px]">
          {trend && TrendGlyph && showTrendIcon ? (
            <TrendGlyph
              className={cn("size-3", trendToneClass[trendTone])}
              weight="fill"
            />
          ) : null}
          {trend ? (
            <p className={cn("font-semibold", trendToneClass[trendTone])}>
              {trend}
            </p>
          ) : null}
          {note ? <p className="font-medium text-ink-faint">{note}</p> : null}
        </div>
      ) : null}
    </article>
  )
}
