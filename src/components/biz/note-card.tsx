import { InfoIcon } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export type NoteCardTone = "warm" | "neutral"

interface NoteCardProps {
  lead: string
  body?: string
  tone?: NoteCardTone
  showIcon?: boolean
  className?: string
}

export function NoteCard({
  lead,
  body,
  tone = "warm",
  showIcon = false,
  className,
}: NoteCardProps) {
  return (
    <aside
      className={cn(
        "flex gap-sm rounded-lg border p-lg",
        tone === "warm"
          ? "border-border-brand bg-surface-footer"
          : "border-border-default bg-surface-card",
        className,
      )}
    >
      {showIcon ? (
        <InfoIcon
          className="mt-3xs size-5 shrink-0 text-accent-amber"
          weight="fill"
        />
      ) : null}
      <div className="flex flex-col gap-3xs">
        <p
          className={cn(
            "text-title-m",
            tone === "warm" ? "text-accent-amber" : "text-ink-primary",
          )}
        >
          {lead}
        </p>
        {body ? <p className="text-body-s text-ink-body">{body}</p> : null}
      </div>
    </aside>
  )
}
