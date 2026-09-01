import type { ReactNode } from "react"
import {
  CheckIcon,
  CurrencyCircleDollarIcon,
  HourglassMediumIcon,
  LockSimpleIcon,
  XIcon,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import type { LegendKind } from "@/mocks/seating"

const swatchClass: Record<LegendKind, string> = {
  sold: "bg-surface-inverse",
  held: "bg-ink-muted",
  vip: "border-[1.5px] border-ink-primary bg-surface-inverse",
  gold: "border-[1.5px] border-brand-primary bg-surface-brand-wash",
  silver: "border-[1.5px] border-ink-placeholder bg-surface-sold",
  selected: "bg-brand-gradient",
  unassigned: "border-[1.5px] border-dashed border-[#e8d5c6] bg-surface-card",
  override: "border-[1.5px] border-brand-primary bg-surface-brand-wash",
  disabled: "bg-surface-sold",
}

const swatchIcon: Partial<Record<LegendKind, ReactNode>> = {
  sold: <LockSimpleIcon className="size-[13px] text-ink-inverse" weight="fill" />,
  held: (
    <HourglassMediumIcon className="size-[13px] text-ink-inverse" weight="fill" />
  ),
  selected: <CheckIcon className="size-[13px] text-ink-inverse" weight="bold" />,
  override: (
    <CurrencyCircleDollarIcon
      className="size-[13px] text-brand-primary"
      weight="fill"
    />
  ),
  disabled: <XIcon className="size-[13px] text-ink-faint" weight="bold" />,
}

interface SeatCellProps {
  kind: LegendKind
  label: string
  note: string
}

export function SeatCell({ kind, label, note }: SeatCellProps) {
  return (
    <div className="flex items-center gap-gap-md">
      <span
        className={cn(
          "inline-flex size-[26px] shrink-0 items-center justify-center overflow-clip rounded-[7px]",
          swatchClass[kind],
        )}
        aria-hidden
      >
        {swatchIcon[kind]}
      </span>
      <span className="flex min-w-0 flex-col gap-px">
        <span className="text-[13px] font-bold leading-normal text-ink-primary">
          {label}
        </span>
        <span className="text-[11.5px] font-normal leading-normal text-ink-faint">
          {note}
        </span>
      </span>
    </div>
  )
}
