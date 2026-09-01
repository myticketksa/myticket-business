import { cn } from "@/lib/utils"

export type ProgressBarSize = 5 | 6 | 7 | 8 | 10
export type ProgressBarSurface = "light" | "dark"

interface ProgressBarProps {
  value: number
  size?: ProgressBarSize
  surface?: ProgressBarSurface
}

export function ProgressBar({
  value,
  size = 8,
  surface = "light",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cn(
        "w-full overflow-hidden rounded-pill",
        surface === "dark" ? "bg-ink-disabled/40" : "bg-surface-sold",
      )}
      style={{ height: size }}
    >
      <div
        className="h-full rounded-pill bg-brand-gradient"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
