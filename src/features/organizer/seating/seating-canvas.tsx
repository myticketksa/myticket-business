import type { MouseEvent } from "react"
import { cn } from "@/lib/utils"
import {
  rowsGridRows,
  seatingHint,
  seatingStats,
  type MapSeat,
  type SeatKind,
  type SeatSection,
} from "@/mocks/seating"

const lockedKinds: SeatKind[] = ["sold", "held"]

function isSelectable(kind: SeatKind) {
  return !lockedKinds.includes(kind) && kind !== "disabled"
}

function canvasSeatClass(seat: MapSeat) {
  if (seat.selected) {
    return "bg-brand-primary"
  }

  switch (seat.kind) {
    case "sold":
      return "bg-[#12100d]"
    case "held":
      return "bg-ink-muted"
    case "vip":
      return "border-[1.5px] border-ink-primary bg-surface-card"
    case "gold":
      return "border-[1.5px] border-status-warning bg-[#fff3e3]"
    case "silver":
      return "border border-border-muted bg-surface-muted"
    case "unassigned":
      return "border border-dashed border-border-disabled bg-surface-card"
    case "override":
      return "border-2 border-brand-primary bg-surface-card"
    case "disabled":
      return "bg-[#dfd5cc]"
  }
}

const sectionSwatch: Record<SeatSection["swatch"], string> = {
  vip: "bg-surface-inverse",
  gold: "bg-brand-gradient",
  silver: "bg-ink-placeholder",
}

const statTone: Record<(typeof seatingStats)[number]["tone"], string> = {
  ink: "text-ink-primary",
  success: "text-status-success",
  danger: "text-accent-amber",
}

interface SectionsCanvasProps {
  sections: SeatSection[]
  onToggleSeat: (sectionId: string, rowLabel: string, index: number, extend: boolean) => void
}

export function SectionsCanvas({ sections, onToggleSeat }: SectionsCanvasProps) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center overflow-auto px-xl pb-gutter pt-[26px]">
      <div className="flex w-full max-w-[980px] flex-col gap-md">
        <StageBar />
        <div className="h-7" />
        {sections.map((section) => (
          <section key={section.id} className="flex w-full flex-col gap-gap-md">
            <div className="flex items-center gap-2xs">
              <span
                className={cn("size-3 shrink-0 rounded-[3px]", sectionSwatch[section.swatch])}
              />
              <p className="text-[13.5px] font-bold text-ink-primary">{section.title}</p>
              <p className="text-[12px] font-medium text-ink-faint">{section.meta}</p>
            </div>
            <div className="flex flex-col items-center gap-2xs overflow-x-auto">
              {section.rows.map((row) => (
                <div key={row.label} className="flex items-center gap-gap-sm">
                  <p className="shrink-0 text-[11px] font-medium text-ink-placeholder">
                    {row.label}
                  </p>
                  {row.seats.map((seat, index) => {
                    const selectable = isSelectable(seat.kind)

                    return (
                      <button
                        key={`${row.label}-${index}`}
                        type="button"
                        disabled={!selectable}
                        aria-pressed={seat.selected}
                        aria-label={`${section.title} ${row.label}${index + 1}`}
                        onClick={(event: MouseEvent<HTMLButtonElement>) => {
                          onToggleSeat(section.id, row.label, index, event.shiftKey)
                        }}
                        className={cn(
                          "size-[22px] shrink-0 rounded-xs disabled:cursor-not-allowed",
                          canvasSeatClass(seat),
                        )}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </section>
        ))}
        <SummaryBar />
      </div>
    </div>
  )
}

export function FreeSeatingCanvas() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center overflow-auto px-xl pb-gutter pt-[26px]">
      <div className="flex w-full max-w-[720px] flex-col">
        <div className="flex h-[44px] items-center justify-center rounded-sm bg-surface-inverse">
          <p className="text-[12px] font-bold tracking-[1.68px] text-ink-inverse uppercase">
            Stage
          </p>
        </div>
        <div className="h-3" />
        <div className="flex h-[72px] items-center justify-center rounded-[10px] border-[1.5px] border-ink-primary bg-surface-sold">
          <p className="text-[12px] font-bold text-ink-primary">
            VIP standing · 300 capacity
          </p>
        </div>
        <div className="h-2" />
        <div className="flex h-[140px] items-center justify-center rounded-[10px] border-[1.5px] border-brand-primary bg-surface-brand-wash">
          <p className="text-[12px] font-bold text-accent-amber">
            General floor · 2,600 capacity
          </p>
        </div>
        <div className="h-2.5" />
        <p className="text-[11px] font-medium leading-[1.5] text-ink-faint">
          Customers buy into a zone, not a seat — no seat map to generate.
        </p>
      </div>
    </div>
  )
}

export function RowsCanvas() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col items-center overflow-auto px-xl pb-gutter pt-[26px]">
      <div className="flex flex-col">
        <div className="flex h-[44px] w-full items-center justify-center rounded-sm bg-surface-inverse">
          <p className="text-[12px] font-bold tracking-[1.68px] text-ink-inverse uppercase">
            Stage
          </p>
        </div>
        <div className="h-3" />
        <div className="flex flex-col gap-[3px]">
          {rowsGridRows.map((row) => (
            <div key={row.label} className="flex items-center gap-[3px]">
              <p className="h-3 w-4 shrink-0 text-right text-[9px] font-bold text-ink-placeholder">
                {row.label}
              </p>
              {row.seats.map((kind, index) => (
                <span
                  key={`${row.label}-${index}`}
                  className={cn(
                    "size-3 shrink-0 rounded-[3px]",
                    kind === "front" && "bg-brand-primary",
                    kind === "rear" && "bg-ink-placeholder",
                    kind === "sold" && "bg-surface-inverse",
                    kind === "unassigned" &&
                      "border border-[#e8d5c6] bg-surface-card",
                  )}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="h-2.5" />
        <p className="text-[11px] font-medium leading-[1.5] text-ink-faint">
          Every seat numbered by row — no grouping into named sections.
        </p>
      </div>
    </div>
  )
}

function StageBar() {
  return (
    <div className="flex h-11 w-full items-center justify-center rounded-sm bg-surface-inverse">
      <p className="text-[12px] font-bold tracking-[1.68px] text-ink-inverse uppercase">
        Stage
      </p>
    </div>
  )
}

function SummaryBar() {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-md overflow-clip rounded-md border border-border-default bg-surface-card px-md py-sm text-[12.5px]">
      <div className="flex flex-wrap items-center gap-lg">
        {seatingStats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-px">
            <p className={cn("font-bold", statTone[stat.tone])}>{stat.value}</p>
            <p className="font-medium text-ink-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="font-medium text-ink-faint">{seatingHint}</p>
    </div>
  )
}
