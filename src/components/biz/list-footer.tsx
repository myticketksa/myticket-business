import { AppButton } from "@/components/primitive/app-button"

interface ListFooterProps {
  buttonLabel: string
  meta: string
}

export function ListFooter({ buttonLabel, meta }: ListFooterProps) {
  return (
    <div className="flex items-center justify-between px-lg py-sm">
      <AppButton
        variant="secondary"
        size="s"
        className="h-[38px] border-border-default text-ink-primary hover:bg-surface-tint"
      >
        {buttonLabel}
      </AppButton>
      <p className="text-[12.5px] font-medium text-ink-faint">{meta}</p>
    </div>
  )
}
