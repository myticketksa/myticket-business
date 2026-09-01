import { cn } from "@/lib/utils"

interface ScannerStatusBarProps {
  time: string
  tone?: "light" | "dark"
}

export function ScannerStatusBar({
  time,
  tone = "light",
}: ScannerStatusBarProps) {
  return (
    <div
      className={cn(
        "flex h-[30px] shrink-0 items-center justify-end px-lg pt-2xs",
        tone === "dark" ? "bg-[#12100d]" : "bg-surface-canvas",
      )}
    >
      <p
        className={cn(
          "text-[13px] font-bold",
          tone === "dark" ? "text-ink-inverse" : "text-ink-primary",
        )}
      >
        {time}
      </p>
    </div>
  )
}
