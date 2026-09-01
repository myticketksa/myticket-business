import { CaretDownIcon } from "@phosphor-icons/react"

interface ClosedDropdownProps {
  label: string
}

export function ClosedDropdown({ label }: ClosedDropdownProps) {
  return (
    <button
      type="button"
      className="inline-flex h-9 items-center gap-2xs rounded-pill border border-border-default bg-surface-card px-sm text-action-s whitespace-nowrap text-ink-primary"
    >
      {label}
      <CaretDownIcon className="size-3.5 text-ink-muted" weight="bold" />
    </button>
  )
}
