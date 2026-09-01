import type { CSSProperties } from "react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position="bottom-left"
      duration={5000}
      gap={14}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-surface-card)",
          "--normal-text": "var(--color-ink-primary)",
          "--normal-border": "var(--color-border-default)",
          "--border-radius": "var(--radius-lg)",
        } as CSSProperties
      }
      {...props}
    />
  )
}
