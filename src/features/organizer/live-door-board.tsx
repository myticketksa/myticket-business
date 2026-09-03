import {
  CaretDownIcon,
  ClockIcon,
  ExportIcon,
  LightningIcon,
  PauseIcon,
  XCircleIcon,
} from "@phosphor-icons/react"
import { BarListRow, PanelCard } from "@/components/biz/bar-list-row"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { FeedRow } from "@/components/biz/feed-row"
import { KpiCard } from "@/components/biz/kpi-card"
import { LiveDot } from "@/components/biz/live-dot"
import { PageHead } from "@/components/biz/page-head"
import { AppButton } from "@/components/primitive/app-button"
import {
  liveDoorDisconnect,
  liveDoorEventLabel,
  liveDoorFailedIntro,
  liveDoorFailedReasons,
  liveDoorFeedFooter,
  liveDoorGates,
  liveDoorLiveLabel,
  liveDoorScans,
} from "@/mocks/live-door"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

const chipClass =
  "inline-flex items-center gap-[5px] rounded-[16px] border-[1.5px] border-border-default bg-surface-card px-xs py-[10px] text-[12.5px] font-semibold text-ink-primary"

export function LiveDoorBoard() {
  return (
    <>
      <section className="grid grid-cols-1 gap-base sm:grid-cols-2 xl:grid-cols-4">
        <article className="flex min-w-0 flex-col gap-gap-md rounded-lg bg-surface-inverse px-[22px] py-lg">
          <p className="text-[13px] font-semibold text-ink-inverse">Scanned so far</p>
          <p className="flex items-center gap-gap-sm text-ink-inverse">
            <span className="text-[30px] font-extrabold tracking-[-0.6px]">1,246</span>
            <span className="text-[15px] font-semibold">/ 1,600</span>
          </p>
          <div className="h-[7px] w-full overflow-hidden rounded-[4px] bg-surface-canvas">
            <div className="h-full w-[78%] rounded-[4px] bg-brand-gradient" />
          </div>
          <p className="text-[12.5px] font-semibold text-brand-light">
            78% of sold tickets are in
          </p>
        </article>
        <KpiCard
          label="Scan rate"
          value="9.4/min"
          note="peak 22/min at 20:05"
          icon={<LightningIcon className="size-[19px]" weight="fill" />}
          className="max-w-none"
        />
        <KpiCard
          label="Failed scans"
          value="24"
          note="1.9% of attempts"
          icon={<XCircleIcon className="size-[19px]" weight="fill" />}
          className="max-w-none [&_svg]:text-status-danger"
        />
        <KpiCard
          label="Doors close"
          value="00:48:12"
          trend="354 ticket holders not yet in"
          trendTone="down"
          showTrendIcon={false}
          icon={<ClockIcon className="size-[19px]" />}
          className="max-w-none"
        />
      </section>

      <div className="grid grid-cols-1 items-start gap-lg xl:grid-cols-[minmax(0,668px)_minmax(0,432px)]">
        <section className="overflow-hidden rounded-lg border border-border-default bg-surface-card">
          <header className="flex flex-wrap items-center justify-between gap-2xs border-b border-border-subtle px-lg py-sm">
            <div className="flex items-center gap-2xs">
              <LiveDot />
              <h2 className="text-[14px] font-bold text-ink-primary">
                Scans as they happen
              </h2>
            </div>
            <div className="flex items-center gap-2xs">
              <button type="button" className={chipClass}>
                All gates
                <CaretDownIcon className="size-[11px] text-ink-muted" weight="bold" />
              </button>
              <button type="button" className={chipClass}>
                <PauseIcon className="size-[13px]" weight="fill" />
                Pause
              </button>
            </div>
          </header>
          <div className="overflow-x-auto">
            {liveDoorScans.map((scan) => (
              <FeedRow
                key={`${scan.ticket}-${scan.time}`}
                time={scan.time}
                ticket={scan.ticket}
                detail={scan.detail}
                gate={scan.gate}
                result={scan.result}
              />
            ))}
          </div>
          <p className="border-t border-border-subtle px-lg py-sm text-[12.5px] font-normal leading-[1.5] text-ink-faint">
            {liveDoorFeedFooter}
          </p>
        </section>

        <div className="flex flex-col gap-lg">
          <PanelCard title="By gate">
            <div className="flex flex-col gap-base px-lg py-md">
              {liveDoorGates.map((row) => (
                <BarListRow
                  key={row.name}
                  name={row.name}
                  value={row.value}
                  percent={row.percent}
                />
              ))}
            </div>
          </PanelCard>
          <PanelCard title="Failed scans · 24">
            <div className="flex flex-col gap-sm px-lg py-md">
              <p className="text-[13.5px] leading-[1.5] text-ink-muted">
                {liveDoorFailedIntro}
              </p>
              {liveDoorFailedReasons.map((reason) => (
                <div key={reason.label} className="flex items-center gap-gap-md">
                  <span
                    className={
                      reason.tone === "danger"
                        ? "size-2 shrink-0 rounded-pill bg-status-danger"
                        : reason.tone === "amber"
                          ? "size-2 shrink-0 rounded-pill bg-accent-amber"
                          : "size-2 shrink-0 rounded-pill bg-ink-faint"
                    }
                  />
                  <p className="min-w-0 flex-1 text-[13px] font-medium text-ink-primary">
                    {reason.label}
                  </p>
                  <p className="text-[13px] font-bold text-ink-primary">{reason.count}</p>
                </div>
              ))}
            </div>
          </PanelCard>
          <aside className="flex flex-col gap-gap-md rounded-lg bg-surface-inverse px-lg py-md">
            <div className="flex items-center gap-2xs">
              <span className="size-[9px] shrink-0 rounded-pill bg-brand-light" />
              <p className="text-[14.5px] font-bold text-ink-inverse">
                {liveDoorDisconnect.lead}
              </p>
            </div>
            <p className="text-[13px] leading-[1.55] text-ink-inverse">
              {liveDoorDisconnect.body}
            </p>
          </aside>
        </div>
      </div>
    </>
  )
}

export function LiveDoorHead() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-sm">
      <div className="flex flex-wrap items-center gap-xs">
        <PageHead eyebrow="Door operations" title="Live door" />
        <span className="inline-flex items-center gap-gap-sm rounded-[12px] bg-status-success px-[10px] py-[6px]">
          <LiveDot surface="dark" />
          <span className="text-[12px] font-extrabold text-ink-inverse">
            {liveDoorLiveLabel}
          </span>
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-gap-md">
        <ClosedDropdown label={liveDoorEventLabel} />
        <AppButton
          variant="secondary"
          size="m"
          className={secondaryClass}
          icon={<ExportIcon className="size-[18px]" />}
        >
          Export
        </AppButton>
      </div>
    </div>
  )
}
