import { ArrowRightIcon, ArrowsLeftRightIcon, CaretUpIcon, ExportIcon } from "@phosphor-icons/react"
import { BarListRow, PanelCard } from "@/components/biz/bar-list-row"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { KpiCard } from "@/components/biz/kpi-card"
import { PageHead } from "@/components/biz/page-head"
import { AppButton } from "@/components/primitive/app-button"
import {
  salesBuyerCities,
  salesChartCaption,
  salesConversion,
  salesKpis,
  salesRevenueDays,
  salesTopEvents,
} from "@/mocks/organizer-sales"
import { cn } from "@/lib/utils"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

export function OrganizerSalesPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-lg px-gutter pt-8 pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead eyebrow="Grow" title="Sales" />
        <div className="flex flex-wrap items-center gap-gap-md">
          <ClosedDropdown label="All events" />
          <ClosedDropdown label="Last 30 days" />
          <AppButton
            variant="secondary"
            size="m"
            icon={<ArrowsLeftRightIcon className="size-[18px]" />}
            className={secondaryClass}
          >
            Compare periods
          </AppButton>
          <AppButton
            variant="secondary"
            size="m"
            icon={<ExportIcon className="size-[18px]" />}
            className={secondaryClass}
          >
            Export
          </AppButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-base sm:grid-cols-2 xl:grid-cols-4">
        {salesKpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            kind="noIcon"
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            trendTone={kpi.trendTone}
            note={kpi.note}
            className="max-w-none"
          />
        ))}
      </div>

      <section className="flex flex-col gap-md rounded-lg border border-border-default bg-surface-card px-xl py-[22px]">
        <div className="flex flex-wrap items-center justify-between gap-sm">
          <div className="flex flex-wrap items-baseline gap-[6px]">
            <h2 className="text-[17px] font-bold text-ink-primary">Revenue by day</h2>
            <p className="text-[12.5px] font-medium text-ink-faint">— net of fees</p>
          </div>
          <div className="flex items-center gap-lg">
            <LegendSwatch className="bg-brand-gradient" label="This period" />
            <LegendSwatch className="bg-border-muted" label="Previous period" />
          </div>
        </div>

        <div className="flex gap-2xs overflow-x-auto">
          {salesRevenueDays.map((col) => (
            <div
              key={col.day}
              className="flex w-16 min-w-12 flex-1 flex-col items-center gap-[6px]"
            >
              <div className="flex h-[170px] w-full items-end justify-center gap-[2px]">
                <span
                  className="w-[31px] max-w-[48%] rounded-t-xs rounded-b-[2px] bg-border-muted"
                  style={{ height: col.previous }}
                />
                <span
                  className={cn(
                    "w-[31px] max-w-[48%] rounded-t-xs rounded-b-[2px]",
                    col.peak ? "bg-brand-gradient" : "bg-border-strong",
                  )}
                  style={{ height: col.current }}
                />
              </div>
              <p
                className={cn(
                  "w-full text-center text-[10px] text-ink-faint",
                  col.peak && "font-bold text-ink-primary",
                )}
              >
                {col.day}
              </p>
            </div>
          ))}
        </div>

        <p className="border-t border-border-subtle pt-sm text-[12.5px] leading-[1.5] font-medium text-ink-muted">
          {salesChartCaption}
        </p>
      </section>

      <div className="grid grid-cols-1 gap-lg xl:grid-cols-2">
        <PanelCard title="Best-performing events">
          <div className="flex flex-col gap-base px-xl py-lg">
            {salesTopEvents.map((event) => (
              <BarListRow
                key={event.name}
                name={event.name}
                value={event.value}
                percent={event.percent}
              />
            ))}
          </div>
        </PanelCard>

        <div className="flex flex-col gap-lg">
          <PanelCard title="Where buyers are">
            <div className="flex flex-col gap-sm px-xl py-lg">
              {salesBuyerCities.map((city) => (
                <BarListRow
                  key={city.name}
                  layout="inline"
                  name={city.name}
                  value={city.value}
                  percent={city.percent}
                />
              ))}
            </div>
          </PanelCard>

          <article className="flex flex-col gap-gap-md rounded-lg border border-border-default bg-surface-card px-[22px] py-lg">
            <div className="flex items-center gap-[6px] text-[15px] font-bold text-ink-primary">
              <span>View</span>
              <ArrowRightIcon className="size-3.5" weight="bold" />
              <span>purchase</span>
            </div>
            <div className="flex flex-wrap items-center gap-2xs">
              <p className="text-[30px] leading-none font-extrabold tracking-[-0.6px] text-ink-primary">
                {salesConversion.rate}
              </p>
              <p className="inline-flex items-center gap-3xs text-[12.5px] font-semibold text-status-success">
                <CaretUpIcon className="size-3" weight="fill" />
                {salesConversion.trend}
              </p>
            </div>
            <p className="text-[13.5px] leading-[1.5] text-ink-muted">
              {salesConversion.body}
            </p>
          </article>
        </div>
      </div>
    </main>
  )
}

function LegendSwatch({
  className,
  label,
}: {
  className: string
  label: string
}) {
  return (
    <div className="flex items-center gap-2xs">
      <span className={cn("size-2.5 rounded-[3px]", className)} />
      <p className="text-[12px] font-medium text-ink-muted">{label}</p>
    </div>
  )
}
