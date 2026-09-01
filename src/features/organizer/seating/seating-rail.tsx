import { CheckIcon } from "@phosphor-icons/react"
import { SeatCell } from "@/components/biz/seat-cell"
import { AppButton } from "@/components/primitive/app-button"
import { cn } from "@/lib/utils"
import {
  seatingBlockedFoot,
  seatingBlockedReason,
  seatingLegend,
  seatingLockedLayoutNote,
  seatingRegenNote,
  seatingTiers,
  seatingUnlockedLayoutNote,
  type LayoutMode,
  type SeatKind,
} from "@/mocks/seating"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

const layoutOptions: { value: LayoutMode; label: string }[] = [
  { value: "free", label: "Free seating" },
  { value: "rows", label: "Rows & columns" },
  { value: "sections", label: "Sections" },
]

interface SeatingRailProps {
  locked: boolean
  mode: LayoutMode
  selectedCount: number
  assignTier: SeatKind
  onModeChange: (mode: LayoutMode) => void
  onAssignTier: (tier: SeatKind) => void
  onOverride: () => void
  onDisable: () => void
  onRegenerate: () => void
}

export function SeatingRail({
  locked,
  mode,
  selectedCount,
  assignTier,
  onModeChange,
  onAssignTier,
  onOverride,
  onDisable,
  onRegenerate,
}: SeatingRailProps) {
  return (
    <aside className="flex h-full w-[300px] shrink-0 flex-col gap-md overflow-y-auto border-r border-border-default bg-surface-card px-md pb-xl pt-md">
      <LayoutGroup locked={locked} mode={mode} onModeChange={onModeChange} />

      {mode === "sections" ? (
        <>
          <AssignGroup
            selectedCount={selectedCount}
            assignTier={assignTier}
            onAssignTier={onAssignTier}
            onOverride={onOverride}
            onDisable={onDisable}
          />
          <LegendGroup selectedCount={selectedCount} />
        </>
      ) : null}

      {mode === "free" ? <CapacityGroup /> : null}
      {mode === "rows" ? <GenerateGridGroup /> : null}

      {locked ? (
        <div className="flex flex-col gap-2xs">
          <div className="flex flex-col gap-gap-sm">
            <span className="inline-flex h-10 cursor-not-allowed items-center rounded-[20px] bg-surface-sold px-lg text-[14px] font-semibold text-ink-disabled">
              Regenerate layout
            </span>
            <p className="text-[11.5px] font-semibold leading-normal text-accent-amber">
              {seatingBlockedReason}
            </p>
          </div>
          <p className="text-[11.5px] font-medium leading-[1.4] text-ink-faint">
            {seatingBlockedFoot}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2xs">
          <AppButton
            size="m"
            className="h-[42px] self-start"
            onClick={onRegenerate}
          >
            Regenerate layout
          </AppButton>
          <p className="text-[11.5px] font-medium leading-[1.4] text-ink-faint">
            {seatingRegenNote}
          </p>
        </div>
      )}
    </aside>
  )
}

function LayoutGroup({
  locked,
  mode,
  onModeChange,
}: {
  locked: boolean
  mode: LayoutMode
  onModeChange: (mode: LayoutMode) => void
}) {
  return (
    <div className="flex w-full flex-col gap-gap-md" role="radiogroup" aria-label="Layout">
      <p className="text-[11px] font-bold tracking-[0.88px] text-ink-faint uppercase">
        Layout
      </p>
      {layoutOptions.map((option) => {
        const checked = mode === option.value
        const disabled = locked && option.value !== "sections"

        return (
          <div key={option.value} className="flex items-center gap-2xs">
            <button
              type="button"
              role="radio"
              aria-checked={checked}
              disabled={disabled}
              onClick={() => {
                onModeChange(option.value)
              }}
              className="flex items-center gap-gap-md disabled:cursor-not-allowed"
            >
              <span
                className={cn(
                  "size-4 shrink-0 rounded-pill bg-surface-card",
                  checked && "border-0 bg-brand-primary",
                  !checked && disabled && "border-[1.5px] border-[#e8d5c6]",
                  !checked && !disabled && "border border-border-default",
                )}
              />
              <span
                className={cn(
                  "text-[14px] font-medium leading-[1.5]",
                  disabled ? "text-ink-placeholder" : "text-ink-primary",
                )}
              >
                {option.label}
              </span>
            </button>
            {option.value === "sections" && locked ? (
              <span className="rounded-[9px] bg-surface-brand-wash px-2xs py-[3px] text-[11px] font-bold text-accent-amber">
                locked
              </span>
            ) : null}
          </div>
        )
      })}
      <p className="text-[11.5px] font-medium leading-[1.4] text-ink-faint">
        {locked ? seatingLockedLayoutNote : seatingUnlockedLayoutNote}
      </p>
    </div>
  )
}

function AssignGroup({
  selectedCount,
  assignTier,
  onAssignTier,
  onOverride,
  onDisable,
}: {
  selectedCount: number
  assignTier: SeatKind
  onAssignTier: (tier: SeatKind) => void
  onOverride: () => void
  onDisable: () => void
}) {
  return (
    <div className="flex w-full flex-col gap-gap-md">
      <p className="text-[11px] font-bold tracking-[0.88px] text-ink-faint uppercase">
        Assign to selection · {selectedCount} seats
      </p>
      {seatingTiers.map((tier) => {
        const active = assignTier === tier.id

        return (
          <button
            key={tier.id}
            type="button"
            onClick={() => {
              onAssignTier(tier.id)
            }}
            className={cn(
              "flex h-[42px] w-full items-center gap-gap-md overflow-clip rounded-sm px-sm",
              active
                ? "border-[1.5px] border-brand-primary bg-surface-brand-wash"
                : "border border-border-default bg-surface-card",
            )}
          >
            <span
              className={cn(
                "size-[14px] shrink-0 rounded-[4px]",
                tier.swatch === "gold" && "bg-brand-gradient",
                tier.swatch === "vip" && "bg-surface-inverse",
                tier.swatch === "silver" && "bg-ink-placeholder",
              )}
            />
            <span
              className={cn(
                "min-w-0 flex-1 text-left text-[14px]",
                active
                  ? "font-bold text-accent-amber"
                  : "font-semibold text-ink-primary",
              )}
            >
              {tier.label}
            </span>
            {active ? (
              <CheckIcon className="size-4 text-brand-primary" weight="bold" />
            ) : null}
          </button>
        )
      })}
      <div className="flex w-full gap-2xs">
        <AppButton
          variant="secondary"
          size="m"
          className={cn("min-w-0 flex-1", secondaryClass)}
          onClick={onOverride}
        >
          Override price…
        </AppButton>
        <AppButton
          variant="secondary"
          size="m"
          className={cn("min-w-0 flex-1", secondaryClass)}
          onClick={onDisable}
        >
          Disable seats
        </AppButton>
      </div>
    </div>
  )
}

function LegendGroup({ selectedCount }: { selectedCount: number }) {
  return (
    <div className="flex w-full flex-col gap-2xs">
      <p className="text-[11px] font-bold tracking-[0.88px] text-ink-faint uppercase">
        Legend & counts
      </p>
      {seatingLegend.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-gap-md overflow-clip"
        >
          <SeatCell kind={item.id} label={item.label} note={item.note} />
          <p className="shrink-0 text-[12.5px] font-bold text-ink-primary">
            {item.id === "selected" ? String(selectedCount) : item.count}
          </p>
        </div>
      ))}
    </div>
  )
}

function CapacityGroup() {
  return (
    <div className="flex w-full flex-col gap-gap-md">
      <p className="text-[11px] font-bold tracking-[0.88px] text-ink-faint uppercase">
        Capacity by type
      </p>
      <div className="flex items-center gap-2xs">
        <span className="size-3 shrink-0 rounded-[3px] bg-surface-inverse" />
        <p className="text-[12px] font-medium text-ink-primary">VIP standing</p>
        <span className="min-w-0 flex-1" />
        <p className="text-[12px] font-medium text-ink-muted">300</p>
      </div>
      <div className="flex items-center gap-2xs">
        <span className="size-3 shrink-0 rounded-[3px] bg-brand-primary" />
        <p className="text-[12px] font-medium text-ink-primary">General floor</p>
        <span className="min-w-0 flex-1" />
        <p className="text-[12px] font-medium text-ink-muted">2,600</p>
      </div>
      <button
        type="button"
        className="flex h-8 w-full items-center justify-center rounded-pill border-[1.5px] border-dashed border-border-default text-[11.5px] font-semibold text-brand-primary"
      >
        + Add zone
      </button>
    </div>
  )
}

function GenerateGridGroup() {
  return (
    <div className="flex w-full flex-col gap-gap-md">
      <p className="text-[11px] font-bold tracking-[0.88px] text-ink-faint uppercase">
        Generate grid
      </p>
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-medium text-ink-muted">Rows</span>
        <span className="font-bold text-ink-primary">12</span>
      </div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-medium text-ink-muted">Seats / row</span>
        <span className="font-bold text-ink-primary">24</span>
      </div>
      <div className="flex items-center gap-2xs">
        <span className="size-3 shrink-0 rounded-[3px] bg-brand-primary" />
        <p className="text-[12px] font-medium text-ink-primary">
          Front (1–6) · SAR 220
        </p>
      </div>
      <div className="flex items-center gap-2xs">
        <span className="size-3 shrink-0 rounded-[3px] bg-ink-placeholder" />
        <p className="text-[12px] font-medium text-ink-primary">
          Rear (7–12) · SAR 140
        </p>
      </div>
    </div>
  )
}
