import { cn } from "@/lib/utils"

export type AvatarSize = 28 | 34 | 38 | 42 | 44 | 52 | 96
export type AvatarShape = "circle" | "squircle"
export type AvatarTone = "brand" | "muted"

interface AvatarProps {
  initials: string
  size?: AvatarSize
  shape?: AvatarShape
  tone?: AvatarTone
  className?: string
}

export function Avatar({
  initials,
  size = 28,
  shape = "circle",
  tone = "brand",
  className,
}: AvatarProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-bold",
        tone === "brand"
          ? "bg-brand-gradient text-ink-inverse"
          : "bg-surface-sold text-ink-faint",
        size === 28 && "size-7 text-tag-s",
        size === 34 && "size-[34px] text-[12.5px]",
        size === 38 && "size-[38px] text-tag-m",
        size === 42 && "size-[42px] text-[13px]",
        size === 44 && "size-11 text-[13.5px]",
        size === 52 && "size-[52px] text-title-m",
        size === 96 && "size-24 text-[30px] font-extrabold",
        shape === "circle" ? "rounded-pill" : "rounded-sm",
        className,
      )}
    >
      {initials}
    </span>
  )
}
