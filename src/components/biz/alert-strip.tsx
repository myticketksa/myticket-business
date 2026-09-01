import { InfoIcon, LockSimpleIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export type AlertStripTone = "info" | "lock"

interface AlertStripProps {
  body: string
  tone?: AlertStripTone
  layout?: "card" | "flush"
}

export function AlertStrip({
  body,
  tone = "info",
  layout = "card",
}: AlertStripProps) {
  const Icon = tone === "lock" ? LockSimpleIcon : InfoIcon

  return (
    <div
      className={cn(
        "flex items-center gap-gap-md",
        layout === "flush"
          ? "w-full border-b border-border-subtle px-[28px] py-[10px]"
          : "rounded-sm border px-sm py-2xs",
        tone === "lock"
          ? layout === "flush"
            ? "bg-surface-brand-wash text-ink-muted"
            : "border-border-brand bg-surface-footer text-accent-amber"
          : layout === "flush"
            ? "bg-surface-footer text-status-info"
            : "border-transparent bg-status-info-light text-status-info",
      )}
    >
      <Icon className="size-4 shrink-0" weight="fill" />
      <p className={layout === "flush" ? "text-[13px] leading-normal" : "text-body-xs"}>
        {body}
      </p>
    </div>
  )
}
