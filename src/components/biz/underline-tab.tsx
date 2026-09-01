import { cn } from "@/lib/utils"

export type UnderlineTabSize = "s" | "m"

interface UnderlineTabProps {
  label: string
  active?: boolean
  size?: UnderlineTabSize
  onClick?: () => void
}

export function UnderlineTab({
  label,
  active = false,
  size = "m",
  onClick,
}: UnderlineTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border-b-2 pb-2xs",
        size === "s" ? "text-action-xs" : "text-action-s",
        active
          ? "border-brand-primary text-brand-link"
          : "border-transparent text-ink-muted",
      )}
    >
      {label}
    </button>
  )
}
