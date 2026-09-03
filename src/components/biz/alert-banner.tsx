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
        "flex flex-col gap-sm overflow-clip border sm:flex-row sm:items-start",
        tone === "danger"
          ? "rounded-md border-status-danger-border bg-status-danger-light px-base py-sm sm:px-lg"
          : tone === "brand"
            ? "rounded-[16px] border-border-default bg-surface-footer px-base py-base sm:px-[22px] sm:py-[18px]"
            : "rounded-[16px] border-border-default bg-status-info-light px-base py-base sm:px-[22px] sm:py-[18px]",
      )}
    >
      <div className="flex min-w-0 flex-1 items-start gap-sm">
        {tone === "danger" ? (
          <WarningCircleIcon
            className="mt-3xs size-5 shrink-0 text-status-danger"
            weight="fill"
          />
        ) : (
          <InfoIcon
            className={cn(
              "mt-3xs size-5 shrink-0",
              tone === "brand" ? "text-accent-amber" : "text-status-info",
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
                  ? "text-accent-amber"
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
      </div>
      {ctaLabel ? (
        <AppButton
          variant="secondary"
          size="s"
          className={
            tone === "danger"
              ? "h-[38px] w-full shrink-0 border-status-danger bg-surface-card text-status-danger hover:bg-status-danger-light sm:w-auto"
              : "h-[38px] w-full shrink-0 sm:w-auto"
          }
          onClick={onCtaClick}
        >
          {ctaLabel}
        </AppButton>
      ) : null}
    </div>
  )
}
