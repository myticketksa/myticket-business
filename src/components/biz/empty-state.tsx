import type { ReactNode } from "react"

export type EmptyStateVariant = "firstUse" | "filters" | "gated"

interface EmptyStateProps {
  variant?: EmptyStateVariant
  title: string
  body: string
  action?: ReactNode
}

export function EmptyState({ title, body, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-sm rounded-lg border border-border-default bg-surface-card p-lg">
      <h2 className="text-title-xl text-ink-primary">{title}</h2>
      <p className="text-body-s text-ink-muted">{body}</p>
      {action}
    </div>
  )
}
