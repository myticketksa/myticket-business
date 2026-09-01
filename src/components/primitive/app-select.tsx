import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface AppSelectOption {
  value: string
  label: string
}

interface AppSelectProps {
  id?: string
  label?: string
  value?: string
  placeholder?: string
  options: AppSelectOption[]
  onValueChange?: (value: string) => void
  disabled?: boolean
}

export function AppSelect({
  id,
  label,
  value,
  placeholder,
  options,
  onValueChange,
  disabled,
}: AppSelectProps) {
  return (
    <div className="flex w-full flex-col gap-gap-md">
      {label ? (
        <Label htmlFor={id} className="text-body-s text-ink-body">
          {label}
        </Label>
      ) : null}
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          id={id}
          className="h-12 w-full rounded-sm border-border-default bg-surface-card px-sm text-[15px] text-ink-primary focus-visible:border-[1.5px] focus-visible:border-brand-primary focus-visible:ring-0 data-[size=default]:h-12"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
