import type { ReactNode } from "react"
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export type KpiCardKind = "standard" | "noIcon" | "compact" | "coloured"
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
  const showIcon = kind !== "noIcon" && kind !== "compact" && icon
  const isCompact = kind === "compact"
  const TrendGlyph =
    trendTone === "down"
      ? CaretDownIcon
      : trendTone === "success"
        ? CaretUpIcon
        : null

  return (
    <article
      className={cn(
        "flex w-full min-w-0 sm:max-w-[320px] flex-col rounded-lg border",
        isCompact
          ? "gap-2xs px-lg py-md"
          : "gap-gap-md px-[22px] py-lg",
        kind === "coloured"
          ? "border-border-strong bg-surface-footer"
          : "border-border-default bg-surface-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-sm">
        <p className="text-[13px] font-semibold text-ink-muted">{label}</p>
        {showIcon ? <span className="text-brand-primary">{icon}</span> : null}
      </div>
      <p
        className={cn(
          "leading-none font-extrabold",
          isCompact
            ? "text-[26px] tracking-[-0.52px]"
            : "text-[30px] tracking-[-0.6px]",
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
