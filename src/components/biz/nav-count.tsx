import { cn } from "@/lib/utils"

interface NavCountProps {
  count: string
  tone?: "hot" | "neutral"
}

export function NavCount({ count, tone = "neutral" }: NavCountProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-[10px] px-3xs text-[11.5px] font-[800] leading-none",
        tone === "hot"
          ? "bg-brand-strong text-ink-inverse"
          : "bg-surface-chip text-ink-muted",
      )}
    >
      {count}
    </span>
  )
}
