import { AppButton } from "@/components/primitive/app-button"

interface ListFooterProps {
  buttonLabel: string
  meta: string
}

export function ListFooter({ buttonLabel, meta }: ListFooterProps) {
  return (
    <div className="flex flex-col gap-2xs px-base py-sm sm:flex-row sm:items-center sm:justify-between sm:px-lg">
      <AppButton
        variant="secondary"
        size="s"
        className="h-[38px] w-full border-border-default text-ink-primary hover:bg-surface-tint sm:w-auto"
      >
        {buttonLabel}
      </AppButton>
      <p className="text-[12.5px] font-medium text-ink-faint">{meta}</p>
    </div>
  )
}
