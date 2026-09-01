import { BarListRow, PanelCard } from "@/components/biz/bar-list-row"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { KpiCard } from "@/components/biz/kpi-card"
import { NoteCard } from "@/components/biz/note-card"
import { PageHead } from "@/components/biz/page-head"
import { AppButton } from "@/components/primitive/app-button"
import { cn } from "@/lib/utils"
import {
  attendanceArrivalBars,
  attendanceArrivalCaption,
  attendanceArrivalMeta,
  attendanceByGate,
  attendanceByType,
  attendanceEventLabel,
  attendanceHistory,
  attendanceKpis,
  attendanceSub,
} from "@/mocks/organizer-attendance"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

const arrivalMax = Math.max(...attendanceArrivalBars.map((bar) => bar.value))

export function OrganizerAttendancePage() {
  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-lg px-gutter pt-8 pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead eyebrow="Door operations" title="Attendance" sub={attendanceSub} />
        <div className="flex flex-wrap items-center gap-gap-md">
          <ClosedDropdown label={attendanceEventLabel} />
          <AppButton variant="secondary" size="m" className={secondaryClass}>
            Export
          </AppButton>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-base sm:grid-cols-2 xl:grid-cols-4">
        {attendanceKpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            kind="noIcon"
            label={kpi.label}
            value={kpi.value}
            note={kpi.note}
            valueTone={kpi.valueTone}
            className="max-w-none"
          />
        ))}
      </section>

      <div className="grid grid-cols-1 items-start gap-lg xl:grid-cols-[minmax(0,668px)_minmax(0,432px)]">
        <PanelCard title="When people arrived" meta={attendanceArrivalMeta}>
          <div className="flex h-[160px] items-end gap-gap-sm px-xl pt-[22px] pb-px">
            {attendanceArrivalBars.map((bar) => (
              <div
                key={bar.time}
                className="flex h-full min-w-px flex-1 flex-col items-center gap-px"
              >
                <p className="text-[10.5px] font-bold text-ink-faint">{bar.count}</p>
                <div className="flex min-h-0 w-full flex-1 flex-col justify-end">
                  <div
                    className={cn(
                      "w-full rounded-t-xs rounded-b-[3px]",
                      bar.peak ? "bg-brand-gradient" : "bg-border-strong",
                    )}
                    style={{ height: `${Math.round((bar.value / arrivalMax) * 83)}px` }}
                  />
                </div>
                <p className="text-[10px] font-semibold text-ink-faint">{bar.time}</p>
              </div>
            ))}
          </div>
          <p className="border-t border-border-subtle px-lg py-xs text-[12.5px] font-medium text-ink-muted">
            {attendanceArrivalCaption}
          </p>
        </PanelCard>

        <div className="flex flex-col gap-lg">
          <PanelCard title="By ticket type">
            <div className="flex flex-col gap-base px-lg py-md">
              {attendanceByType.map((row) => (
                <BarListRow
                  key={row.name}
                  name={row.name}
                  value={row.value}
                  percent={row.percent}
                />
              ))}
            </div>
          </PanelCard>
          <PanelCard title="By gate">
            <div className="flex flex-col gap-base px-lg py-md">
              {attendanceByGate.map((row) => (
                <BarListRow
                  key={row.name}
                  name={row.name}
                  value={row.value}
                  percent={row.percent}
                />
              ))}
            </div>
          </PanelCard>
          <NoteCard
            tone="neutral"
            lead={attendanceHistory.lead}
            body={attendanceHistory.body}
            className="border-transparent bg-surface-canvas"
          />
        </div>
      </div>
    </main>
  )
}
