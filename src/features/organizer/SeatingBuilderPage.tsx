import { useMemo, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router"
import { ArrowLeftIcon, CheckCircleIcon } from "@phosphor-icons/react"
import { AlertStrip } from "@/components/biz/alert-strip"
import { AppButton } from "@/components/primitive/app-button"
import { AppModal } from "@/components/primitive/app-modal"
import { TextInput } from "@/components/primitive/text-input"
import {
  FreeSeatingCanvas,
  RowsCanvas,
  SectionsCanvas,
} from "@/features/organizer/seating/seating-canvas"
import { SeatingRail } from "@/features/organizer/seating/seating-rail"
import { eventEditorValuesFor } from "@/mocks/event-editor"
import {
  cloneSeatingSections,
  seatingLockBody,
  seatingVenueLine,
  type LayoutMode,
  type SeatKind,
  type SeatSection,
} from "@/mocks/seating"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

const layoutSubtitle: Record<LayoutMode, string> = {
  sections: `Sections layout · ${seatingVenueLine}`,
  free: `Free seating · ${seatingVenueLine}`,
  rows: `Rows & columns · ${seatingVenueLine}`,
}

function countSelected(sections: SeatSection[]) {
  return sections.reduce(
    (total, section) =>
      total +
      section.rows.reduce(
        (rowTotal, row) =>
          rowTotal + row.seats.filter((seat) => seat.selected).length,
        0,
      ),
    0,
  )
}

function mutateSelected(
  sections: SeatSection[],
  update: (kind: SeatKind) => SeatKind | null,
): SeatSection[] {
  return sections.map((section) => ({
    ...section,
    rows: section.rows.map((row) => ({
      ...row,
      seats: row.seats.map((seat) => {
        if (!seat.selected) {
          return seat
        }
        const next = update(seat.kind)
        if (next === null) {
          return seat
        }
        return { kind: next, selected: next !== "disabled" }
      }),
    })),
  }))
}

export function SeatingBuilderPage() {
  const { eventId = "winter-nights" } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const locked = searchParams.get("unlocked") !== "1"
  const title = eventEditorValuesFor(eventId).title || "Event"

  const [mode, setMode] = useState<LayoutMode>("sections")
  const [sections, setSections] = useState(cloneSeatingSections)
  const [assignTier, setAssignTier] = useState<SeatKind>("gold")
  const [overrideOpen, setOverrideOpen] = useState(false)
  const [overridePrice, setOverridePrice] = useState("320")

  const selectedCount = useMemo(() => countSelected(sections), [sections])
  const editorPath = `/app/events/${eventId}/edit`

  function goBack() {
    void navigate(editorPath)
  }

  function toggleSeat(
    sectionId: string,
    rowLabel: string,
    index: number,
    extend: boolean,
  ) {
    setSections((current) =>
      current.map((section) => {
        if (section.id !== sectionId) {
          return section
        }

        return {
          ...section,
          rows: section.rows.map((row) => {
            if (row.label !== rowLabel) {
              return row
            }

            if (extend) {
              const lastSelected = row.seats.reduce(
                (found, seat, seatIndex) => (seat.selected ? seatIndex : found),
                -1,
              )
              const start = lastSelected === -1 ? index : Math.min(lastSelected, index)
              const end = lastSelected === -1 ? index : Math.max(lastSelected, index)

              return {
                ...row,
                seats: row.seats.map((seat, seatIndex) => {
                  if (
                    seatIndex < start ||
                    seatIndex > end ||
                    seat.kind === "sold" ||
                    seat.kind === "held" ||
                    seat.kind === "disabled"
                  ) {
                    return seat
                  }
                  return { ...seat, selected: true }
                }),
              }
            }

            return {
              ...row,
              seats: row.seats.map((seat, seatIndex) => {
                if (seatIndex !== index) {
                  return seat
                }
                if (
                  seat.kind === "sold" ||
                  seat.kind === "held" ||
                  seat.kind === "disabled"
                ) {
                  return seat
                }
                return { ...seat, selected: !seat.selected }
              }),
            }
          }),
        }
      }),
    )
  }

  function assignToSelection(tier: SeatKind) {
    setAssignTier(tier)
    setSections((current) => mutateSelected(current, () => tier))
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-surface-canvas">
      <header className="flex h-16 shrink-0 items-center justify-between gap-md overflow-clip border-b border-border-default bg-surface-canvas px-[28px] backdrop-blur-[7px]">
        <div className="flex min-w-0 items-center gap-base">
          <button
            type="button"
            onClick={goBack}
            className="flex shrink-0 items-center gap-gap-sm text-[13.5px] font-semibold text-ink-muted"
          >
            <ArrowLeftIcon className="size-[15px]" />
            Back to event
          </button>
          <span className="h-6 w-px shrink-0 bg-border-default" />
          <img
            src="/brand/myticket-logo.png"
            alt="MyTicket"
            className="h-[26px] w-[47.45px] shrink-0 object-contain object-left"
          />
          <div className="flex min-w-0 flex-col gap-px">
            <p className="truncate text-[14.5px] font-extrabold leading-normal text-ink-primary">
              Seating builder — {title}
            </p>
            <p className="truncate text-[11.5px] font-medium leading-normal text-ink-faint">
              {layoutSubtitle[mode]}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-sm">
          <span className="flex items-center gap-gap-sm text-[12.5px] font-semibold text-status-success">
            <CheckCircleIcon className="size-[15px]" weight="fill" />
            Saved just now
          </span>
          <AppButton variant="secondary" size="m" className={secondaryClass}>
            Preview as customer
          </AppButton>
          <AppButton size="m" className="h-[42px]" onClick={goBack}>
            Done
          </AppButton>
        </div>
      </header>

      {locked ? (
        <AlertStrip tone="lock" layout="flush" body={seatingLockBody} />
      ) : null}

      <div className="flex min-h-0 flex-1 items-stretch overflow-hidden">
        <SeatingRail
          locked={locked}
          mode={mode}
          selectedCount={selectedCount}
          assignTier={assignTier}
          onModeChange={setMode}
          onAssignTier={assignToSelection}
          onOverride={() => {
            setOverrideOpen(true)
          }}
          onDisable={() => {
            setSections((current) => mutateSelected(current, () => "disabled"))
          }}
          onRegenerate={() => {
            setSections(cloneSeatingSections())
            setAssignTier("gold")
            setMode("sections")
          }}
        />
        {mode === "free" ? (
          <FreeSeatingCanvas />
        ) : mode === "rows" ? (
          <RowsCanvas />
        ) : (
          <SectionsCanvas sections={sections} onToggleSeat={toggleSeat} />
        )}
      </div>

      <AppModal
        open={overrideOpen}
        title="Override price…"
        onOpenChange={setOverrideOpen}
      >
        <div className="flex flex-col gap-md pt-sm">
          <TextInput
            id="override-price"
            label="Price (SAR)"
            value={overridePrice}
            onChange={(event) => {
              setOverridePrice(event.target.value)
            }}
          />
          <div className="flex justify-end gap-2xs">
            <AppButton
              variant="secondary"
              size="m"
              className={secondaryClass}
              onClick={() => {
                setOverrideOpen(false)
              }}
            >
              Cancel
            </AppButton>
            <AppButton
              size="m"
              className="h-[42px]"
              onClick={() => {
                setSections((current) => mutateSelected(current, () => "override"))
                setOverrideOpen(false)
              }}
            >
              Apply
            </AppButton>
          </div>
        </div>
      </AppModal>
    </div>
  )
}
