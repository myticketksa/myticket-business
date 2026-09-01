import { StatusBadge } from "@/components/primitive/status-badge"
import { cn } from "@/lib/utils"

export type FeedRowResult = "Valid" | "Rejected" | "Wrong event"

interface FeedRowProps {
  time: string
  ticket: string
  detail: string
  gate: string
  result: FeedRowResult
}

export function FeedRow({ time, ticket, detail, gate, result }: FeedRowProps) {
  const failed = result !== "Valid"

  return (
    <div
      className={cn(
        "flex h-11 items-center gap-sm border-b border-border-subtle px-lg text-[13px]",
        failed && "bg-status-danger-light",
      )}
    >
      <p className="w-16 shrink-0 font-normal text-ink-faint">{time}</p>
      <p className="w-[120px] shrink-0 font-bold text-ink-primary">{ticket}</p>
      <p className="min-w-0 flex-1 truncate font-normal text-ink-muted">{detail}</p>
      <p className="shrink-0 font-normal text-ink-faint">{gate}</p>
      <span className="shrink-0">
        <StatusBadge label={result} />
      </span>
    </div>
  )
}
