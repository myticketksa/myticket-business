import { cn } from "@/lib/utils"

interface DateChipProps {
  month: string
  day: string
  className?: string
}

export function DateChip({ month, day, className }: DateChipProps) {
  return (
    <span
      className={cn(
        "flex size-[46px] shrink-0 flex-col items-center justify-center rounded-sm bg-surface-brand-wash font-extrabold text-accent-amber",
        className,
      )}
    >
      <span className="text-[10px] uppercase">{month}</span>
      <span className="text-[17px] leading-none">{day}</span>
    </span>
  )
}
