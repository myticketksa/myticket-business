import { StarIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  value: number
  size?: number
  className?: string
}

export function StarRating({ value, size = 11, className }: StarRatingProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-[2px] text-brand-primary", className)}
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          className="shrink-0"
          style={{ width: size, height: size }}
          weight={index < value ? "fill" : "regular"}
        />
      ))}
    </span>
  )
}
