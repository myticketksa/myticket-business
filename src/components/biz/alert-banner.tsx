import { InfoIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { AppButton } from "@/components/primitive/app-button"
import { cn } from "@/lib/utils"

export type AlertBannerTone = "danger" | "info" | "brand"

interface AlertBannerProps {
  lead: string
  body?: string
  tone?: AlertBannerTone
  ctaLabel?: string
  onCtaClick?: () => void
}

export function AlertBanner({
  lead,
  body,
  tone = "danger",
  ctaLabel,
  onCtaClick,
}: AlertBannerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-sm overflow-clip rounded-[16px] border px-[22px] py-[18px]",
        tone === "danger"
          ? "border-status-danger-border bg-status-danger-light"
          : tone === "brand"
            ? "border-border-default bg-surface-brand-wash"
            : "border-border-default bg-status-info-light",
      )}
    >
      {tone === "danger" ? (
        <WarningCircleIcon
          className="size-5 shrink-0 text-status-danger"
          weight="fill"
        />
      ) : (
        <InfoIcon
          className={cn(
            "size-5 shrink-0",
            tone === "brand" ? "text-brand-primary" : "text-status-info",
          )}
          weight="fill"
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <p
          className={cn(
            "text-[14.5px] font-bold leading-normal",
            tone === "danger"
              ? "text-status-danger-strong"
              : tone === "brand"
                ? "text-ink-primary"
                : "text-status-info",
          )}
        >
          {lead}
        </p>
        {body ? (
          <p className="text-[13.5px] leading-[1.55] font-normal text-ink-muted">
            {body}
          </p>
        ) : null}
      </div>
      {ctaLabel ? (
        <AppButton
          variant="secondary"
          size="s"
          className={
            tone === "danger"
              ? "h-[38px] shrink-0 border-status-danger bg-surface-card text-status-danger hover:bg-status-danger-light"
              : "h-[38px] shrink-0"
          }
          onClick={onCtaClick}
        >
          {ctaLabel}
        </AppButton>
      ) : null}
    </div>
  )
}
