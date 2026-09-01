import type { ComponentProps } from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type SearchFieldSize = "field" | "pill" | "icon"

interface SearchFieldProps extends Omit<ComponentProps<"input">, "size"> {
  size?: SearchFieldSize
}

const sizeClass: Record<SearchFieldSize, string> = {
  field: "h-11 rounded-[22px] px-sm",
  pill: "h-[38px] rounded-[19px] px-sm",
  icon: "size-11 rounded-pill px-0",
}

export function SearchField({
  size = "field",
  className,
  ...props
}: SearchFieldProps) {
  if (size === "icon") {
    return (
      <button
        type="button"
        aria-label={props.placeholder ?? "Search"}
        className={cn(
          "inline-flex items-center justify-center border border-border-default bg-surface-card text-ink-muted",
          sizeClass.icon,
          className,
        )}
      >
        <MagnifyingGlassIcon className="size-6" weight="regular" />
      </button>
    )
  }

  return (
    <div className="relative w-full">
      <MagnifyingGlassIcon
        className="pointer-events-none absolute top-1/2 left-sm size-6 -translate-y-1/2 text-ink-muted"
        weight="regular"
      />
      <Input
        className={cn(
          "border-border-default bg-surface-card pl-10 text-body-s text-ink-primary placeholder:text-ink-placeholder focus-visible:border-[1.5px] focus-visible:border-brand-primary focus-visible:ring-0",
          sizeClass[size],
          className,
        )}
        {...props}
      />
    </div>
  )
}
