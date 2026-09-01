import { AppButton } from "@/components/primitive/app-button"

interface AppPaginationProps {
  shown: number
  total: number
  increment?: number
  onShowMore?: () => void
}

export function AppPagination({
  shown,
  total,
  increment = 24,
  onShowMore,
}: AppPaginationProps) {
  const remaining = Math.max(total - shown, 0)
  const nextCount = Math.min(increment, remaining)

  return (
    <div className="flex items-center gap-sm">
      <AppButton
        variant="secondary"
        size="s"
        disabled={remaining === 0}
        onClick={onShowMore}
      >
        Show {nextCount} more
      </AppButton>
      <p className="text-body-xs text-ink-muted">
        Showing {shown} of {total}
      </p>
    </div>
  )
}
