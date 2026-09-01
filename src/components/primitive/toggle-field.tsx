import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface ToggleFieldProps {
  id: string
  label?: string
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function ToggleField({
  id,
  label,
  checked,
  disabled,
  onCheckedChange,
}: ToggleFieldProps) {
  return (
    <div className="flex items-center gap-gap-md">
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className="h-[26px] w-[44px] data-checked:bg-transparent data-checked:bg-brand-gradient data-unchecked:bg-border-muted [&_[data-slot=switch-thumb]]:size-5 [&_[data-slot=switch-thumb]]:bg-surface-card"
      />
      {label ? (
        <Label htmlFor={id} className="text-body-s text-ink-body">
          {label}
        </Label>
      ) : null}
    </div>
  )
}
