import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface RadioOption {
  value: string
  label: string
}

interface RadioFieldProps {
  value?: string
  options: RadioOption[]
  onValueChange?: (value: string) => void
  disabled?: boolean
  layout?: "column" | "row"
}

export function RadioField({
  value,
  options,
  onValueChange,
  disabled,
  layout = "column",
}: RadioFieldProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      className={
        layout === "row"
          ? "flex flex-row flex-wrap gap-base"
          : "flex flex-col gap-gap-md"
      }
    >
      {options.map((option) => {
        const id = `radio-${option.value}`

        return (
          <div key={option.value} className="flex items-center gap-gap-md">
            <RadioGroupItem
              id={id}
              value={option.value}
              className="size-4 border-border-default data-checked:border-brand-primary data-checked:bg-brand-primary"
            />
            <Label htmlFor={id} className="text-body-s text-ink-body">
              {option.label}
            </Label>
          </div>
        )
      })}
    </RadioGroup>
  )
}
