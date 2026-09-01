import { cn } from "@/lib/utils"

export type LiveDotSurface = "light" | "dark"

interface LiveDotProps {
  surface?: LiveDotSurface
}

export function LiveDot({ surface = "light" }: LiveDotProps) {
  return (
    <span
      className={cn(
        "relative inline-flex size-2.5",
        surface === "dark" ? "text-ink-inverse" : "text-status-success",
      )}
      aria-hidden
    >
      <span className="absolute inset-0 animate-ping rounded-pill bg-current opacity-40 [animation-duration:1.5s]" />
      <span className="relative size-2.5 rounded-pill bg-current" />
    </span>
  )
}
