import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface CheckboxFieldProps {
  id: string
  label: string
  count?: string
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function CheckboxField({
  id,
  label,
  count,
  checked,
  disabled,
  onCheckedChange,
}: CheckboxFieldProps) {
  return (
    <div className="flex items-center gap-gap-md">
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(value) => {
          onCheckedChange?.(value === true)
        }}
        className="size-4 rounded-[3px] border-border-default data-checked:border-brand-primary data-checked:bg-brand-primary"
      />
      <Label htmlFor={id} className="text-body-s text-ink-body">
        {label}
        {count ? (
          <span className={cn("text-ink-faint")}> ({count})</span>
        ) : null}
      </Label>
    </div>
  )
}
