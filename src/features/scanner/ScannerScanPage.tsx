import type { ReactNode } from "react"
import { useNavigate, useSearchParams } from "react-router"
import {
  ArrowCounterClockwiseIcon,
  ArrowsLeftRightIcon,
  CheckCircleIcon,
  MapPinLineIcon,
  ProhibitIcon,
  XCircleIcon,
} from "@phosphor-icons/react"
import { LiveDot } from "@/components/biz/live-dot"
import { StatusBadge } from "@/components/primitive/status-badge"
import { ScannerStatusBar } from "@/features/scanner/ScannerStatusBar"
import {
  scannerOutcomeOrder,
  scannerOutcomes,
  scannerRecentLogs,
  type ScannerOutcomeId,
} from "@/mocks/scanner"
import { cn } from "@/lib/utils"

function isOutcomeId(value: string | null): value is ScannerOutcomeId {
  return Boolean(value && value in scannerOutcomes)
}

const outcomeIcon: Record<
  (typeof scannerOutcomes)[ScannerOutcomeId]["icon"],
  ReactNode
> = {
  check: <CheckCircleIcon className="size-[30px]" weight="fill" />,
  x: <XCircleIcon className="size-[30px]" weight="fill" />,
  pin: <MapPinLineIcon className="size-[30px]" />,
  prohibit: <ProhibitIcon className="size-[30px]" />,
  refund: <ArrowCounterClockwiseIcon className="size-[30px]" />,
  resold: <ArrowsLeftRightIcon className="size-[30px]" />,
}

export function ScannerScanPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const raw = params.get("outcome")
  const outcomeId: ScannerOutcomeId = isOutcomeId(raw) ? raw : "valid"
  const outcome = scannerOutcomes[outcomeId]
  const tint =
    outcome.tone === "success" ? "text-status-success-light" : "text-status-danger-light"

  function goTo(next: ScannerOutcomeId) {
    navigate(`/scanner/scan?outcome=${next}`, { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#12100d]">
      <ScannerStatusBar time={outcome.time} tone="dark" />
      <div className="flex flex-1 flex-col gap-lg px-lg pt-lg pb-section">
        <div className="flex items-center gap-2xs">
          <LiveDot surface="dark" />
          <p className="min-w-0 flex-1 text-[13px] font-bold text-ink-inverse">
            {outcome.eventLine}
          </p>
          <p
            className={cn(
              "text-[12px] font-bold",
              outcome.connection === "offline"
                ? "text-brand-light"
                : "text-ink-inverse/55",
            )}
          >
            {outcome.connection}
          </p>
        </div>

        {outcome.showOfflineBanner ? (
          <div className="rounded-sm border border-brand-light bg-brand-light px-base py-sm">
            <p className="text-[12.5px] leading-[1.48] font-semibold text-[#ffb48a]">
              Connection lost. Keep scanning — 12 scans are queued and will sync
              automatically.
            </p>
          </div>
        ) : null}

        {outcome.showViewport ? (
          <div className="flex aspect-square max-h-[368px] w-full flex-col items-center justify-center gap-gap-md rounded-[20px] bg-[#1a1613]">
            <div className="size-[min(252px,70vw)] rounded-[16px] border-[2.5px] border-brand-light" />
            <p className="text-[12px] font-medium text-ink-disabled">
              Point at the ticket QR
            </p>
          </div>
        ) : null}

        <div
          className={cn(
            "flex flex-col items-center gap-2xs rounded-lg p-lg",
            outcome.tone === "success"
              ? "bg-status-success"
              : "bg-status-danger",
          )}
        >
          <div className="flex items-center gap-gap-md text-ink-inverse">
            {outcomeIcon[outcome.icon]}
            <p className="text-[22px] font-extrabold text-ink-inverse">
              {outcome.title}
            </p>
          </div>
          <p className={cn("text-center text-[13.5px] font-semibold", tint)}>
            {outcome.detail}
          </p>
          <p
            className={cn(
              "text-center text-[12.5px] leading-[1.48] font-medium",
              tint,
            )}
          >
            {outcome.note}
          </p>
          {outcome.showDismiss ? (
            <button
              type="button"
              className="mt-2xs flex h-11 w-full items-center justify-center rounded-sm bg-surface-card text-[14px] font-bold text-ink-primary"
              onClick={() => {
                goTo("valid")
              }}
            >
              Dismiss &amp; scan next
            </button>
          ) : null}
        </div>

        {outcome.showCounters ? (
          <p className="text-[12.5px] font-semibold text-ink-inverse">
            You: 312 scanned
            <span className="text-ink-disabled"> · </span>
            Gate B: 604
            <span className="text-ink-disabled"> · </span>
            Event: 1,246 / 1,600
          </p>
        ) : null}

        {outcome.showRecent ? (
          <div className="flex flex-col">
            <p className="pb-2xs text-[11.5px] font-bold tracking-[0.69px] text-ink-disabled uppercase">
              Recent scans
            </p>
            {scannerRecentLogs.map((row) => (
              <div
                key={`${row.time}-${row.ticket}`}
                className="flex h-11 items-center gap-sm border-b border-border-subtle"
              >
                <p className="w-14 shrink-0 text-[13px] text-ink-disabled sm:w-16">
                  {row.time}
                </p>
                <p className="min-w-0 flex-1 truncate text-[13px] font-bold text-ink-inverse sm:w-[120px] sm:flex-none">
                  {row.ticket}
                </p>
                <StatusBadge label={row.result} />
              </div>
            ))}
          </div>
        ) : null}

        {import.meta.env.DEV ? (
          <div className="flex flex-wrap gap-3xs">
            {scannerOutcomeOrder.map((id) => (
              <button
                key={id}
                type="button"
                className={cn(
                  "rounded-badge px-2xs py-3xs text-[11px] font-bold",
                  id === outcomeId
                    ? "bg-brand-light text-ink-inverse"
                    : "bg-[#1a1613] text-ink-disabled",
                )}
                onClick={() => {
                  goTo(id)
                }}
              >
                {id}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
