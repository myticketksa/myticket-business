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
        "rounded-lg px-base py-md sm:px-lg",
        showIcon ? "flex gap-sm" : "flex flex-col gap-3xs",
        tone === "warm" ? "bg-surface-footer" : "bg-surface-canvas",
        className,
      )}
    >
      {showIcon ? (
        <InfoIcon
          className="mt-3xs size-[17px] shrink-0 text-accent-amber"
          weight="fill"
        />
      ) : null}
      <div className="flex min-w-0 flex-col gap-3xs">
        <p
          className={cn(
            showIcon
              ? "text-[15px] font-bold"
              : "text-[13.5px] font-bold",
            tone === "warm" ? "text-accent-amber" : "text-ink-primary",
          )}
        >
          {lead}
        </p>
        {body ? (
          <p className="text-[13.5px] leading-[1.55] font-normal text-ink-muted">
            {body}
          </p>
        ) : null}
      </div>
    </aside>
  )
}
