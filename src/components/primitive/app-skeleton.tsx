import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export type SkeletonType = "media" | "line"

interface AppSkeletonProps {
  type?: SkeletonType
  className?: string
}

export function AppSkeleton({ type = "line", className }: AppSkeletonProps) {
  return (
    <Skeleton
      className={cn(
        "animate-pulse bg-surface-skeleton",
        type === "media" ? "aspect-video w-full rounded-lg" : "h-3 w-full rounded-xs",
        className,
      )}
    />
  )
}
