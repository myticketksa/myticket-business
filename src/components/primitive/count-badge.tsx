import { cn } from "@/lib/utils"

interface CountBadgeProps {
  count: string
  platform?: "web" | "mobile"
}

export function CountBadge({ count, platform = "web" }: CountBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-[17px] min-w-[17px] items-center justify-center rounded-[9px] bg-brand-strong px-[4px] font-extrabold text-[10px] leading-none text-ink-inverse",
        platform === "mobile" && "rounded-pill",
      )}
    >
      {count}
    </span>
  )
}
