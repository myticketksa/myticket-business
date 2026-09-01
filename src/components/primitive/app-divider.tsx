import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export type DividerTone = "divider" | "border"

interface AppDividerProps {
  tone?: DividerTone
  orientation?: "horizontal" | "vertical"
}

export function AppDivider({
  tone = "divider",
  orientation = "horizontal",
}: AppDividerProps) {
  return (
    <Separator
      orientation={orientation}
      className={cn(
        tone === "divider" ? "bg-border-subtle" : "bg-border-default",
      )}
    />
  )
}
