import { cn } from "@/lib/utils"

interface HatchPlaceholderProps {
  caption?: string
  className?: string
}

export function HatchPlaceholder({ caption, className }: HatchPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-surface-sold",
        className,
      )}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #f5ede7 0 7px, #fbf4ef 7px 14px)",
      }}
    >
      {caption ? (
        <p className="px-2xs text-center font-mono text-[11px] text-ink-faint">
          {caption}
        </p>
      ) : null}
    </div>
  )
}
