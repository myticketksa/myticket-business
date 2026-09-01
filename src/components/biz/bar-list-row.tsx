import type { ReactNode } from "react"
import { ProgressBar } from "@/components/biz/progress-bar"
import { cn } from "@/lib/utils"

export type BarListRowLayout = "stacked" | "inline"

interface BarListRowProps {
  name: string
  value: string
  percent: number
  layout?: BarListRowLayout
}

export function BarListRow({
  name,
  value,
  percent,
  layout = "stacked",
}: BarListRowProps) {
  if (layout === "inline") {
    return (
      <div className="flex w-full items-center gap-2xs">
        <p className="w-[78px] shrink-0 truncate text-[13px] font-semibold text-ink-primary">
          {name}
        </p>
        <div className="min-w-0 flex-1">
          <ProgressBar value={percent} size={7} />
        </div>
        <p className="w-11 shrink-0 text-right text-[12.5px] font-semibold text-ink-muted">
          {value}
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-2xs">
      <div className="flex items-center justify-between gap-xs text-[13.5px] font-bold text-ink-primary">
        <p className="min-w-0 truncate">{name}</p>
        <p className="shrink-0">{value}</p>
      </div>
      <ProgressBar value={percent} size={7} />
    </div>
  )
}

interface PanelCardProps {
  title: string
  meta?: string
  action?: ReactNode
  sub?: string
  className?: string
  children: ReactNode
}

export function PanelCard({
  title,
  meta,
  action,
  sub,
  className,
  children,
}: PanelCardProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-lg border border-border-default bg-surface-card",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-sm border-b border-border-subtle px-lg py-base">
        <h2 className="text-[17px] font-bold text-ink-primary">{title}</h2>
        {meta ? <p className="text-[12.5px] font-medium text-ink-faint">{meta}</p> : null}
        {action}
      </header>
      {sub ? (
        <p className="px-lg pt-2xs text-[13px] leading-[1.45] text-ink-muted">{sub}</p>
      ) : null}
      {children}
    </section>
  )
}
