import type { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AppModalProps {
  open: boolean
  title: string
  body?: string
  onOpenChange: (open: boolean) => void
  children?: ReactNode
}

export function AppModal({
  open,
  title,
  body,
  onOpenChange,
  children,
}: AppModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[460px] max-w-[calc(100%-2rem)] rounded-lg bg-surface-card p-lg shadow-modal sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle className="text-title-l text-ink-primary">{title}</DialogTitle>
          {body ? (
            <DialogDescription className="text-body-s text-ink-muted">
              {body}
            </DialogDescription>
          ) : null}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
