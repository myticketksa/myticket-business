import { useMemo, useState } from "react"
import { CaretDownIcon, ExportIcon, StarIcon } from "@phosphor-icons/react"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { PageHead } from "@/components/biz/page-head"
import { AppButton } from "@/components/primitive/app-button"
import { SearchField } from "@/components/primitive/search-field"
import { cn } from "@/lib/utils"
import {
  archiveCountLabel,
  archiveEvents,
  archiveFooterMeta,
  archiveSub,
} from "@/mocks/organizer-archive"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

function SortHead({ label, width }: { label: string; width: string }) {
  return (
    <div className={cn("flex shrink-0 items-end justify-end", width)}>
      <span className="inline-flex items-center gap-[3px]">
        {label}
        <CaretDownIcon className="size-2.5 text-ink-faint" weight="bold" />
      </span>
    </div>
  )
}

export function OrganizerArchivePage() {
  const [query, setQuery] = useState("")

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return archiveEvents
    }
    return archiveEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(normalized) ||
        event.meta.toLowerCase().includes(normalized),
    )
  }, [query])

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-lg px-gutter pt-8 pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead eyebrow="Operate" title="Archive" sub={archiveSub} />
        <AppButton
          variant="secondary"
          size="m"
          className={secondaryClass}
          icon={<ExportIcon className="size-[18px]" />}
        >
          Export figures
        </AppButton>
      </div>

      <section className="overflow-hidden rounded-lg border border-border-default bg-surface-card">
        <div className="flex flex-wrap items-center justify-between gap-sm border-b border-border-subtle px-lg py-base">
          <div className="flex flex-wrap items-center gap-gap-md">
            <div className="w-[248px]">
              <SearchField
                size="pill"
                placeholder="Search your events…"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                }}
              />
            </div>
            <ClosedDropdown label="2026" />
          </div>
          <p className="text-[12.5px] font-semibold text-ink-faint">{archiveCountLabel}</p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
            <div className="flex items-center gap-sm border-b border-border-subtle bg-surface-canvas px-xl py-[10px] text-[11.5px] font-bold tracking-[0.345px] text-ink-faint uppercase">
              <p className="min-w-0 flex-1">Event</p>
              <SortHead label="Tickets sold" width="w-[130px]" />
              <SortHead label="Net revenue" width="w-[130px]" />
              <SortHead label="Attended" width="w-[130px]" />
              <SortHead label="Rating" width="w-[110px]" />
              <div className="w-[190px] shrink-0" />
            </div>

            {rows.map((event) => (
              <div
                key={event.id}
                className="flex h-16 items-center gap-sm border-b border-border-subtle px-xl"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                  <p className="truncate text-[15px] font-bold text-ink-primary">
                    {event.title}
                  </p>
                  <p className="truncate text-[12.5px] font-medium text-ink-muted">
                    {event.meta}
                  </p>
                </div>
                <p className="w-[130px] shrink-0 text-right text-[13.5px] font-semibold text-ink-primary">
                  {event.tickets}
                </p>
                <p className="w-[130px] shrink-0 text-right text-[13.5px] font-bold text-ink-primary">
                  {event.revenue}
                </p>
                <div className="flex w-[130px] shrink-0 flex-col items-end gap-[2px] text-right">
                  <p
                    className={cn(
                      "text-[13.5px] font-semibold",
                      event.attendedTone === "success"
                        ? "text-status-success"
                        : "text-accent-amber",
                    )}
                  >
                    {event.attended}
                  </p>
                  <p className="text-[11.5px] font-medium text-ink-faint">{event.noShows}</p>
                </div>
                <div className="flex w-[110px] shrink-0 items-center justify-end gap-3xs">
                  <StarIcon className="size-[13px] text-brand-primary" weight="fill" />
                  <p className="text-[13.5px] font-bold text-ink-primary">{event.rating}</p>
                </div>
                <div className="flex w-[190px] shrink-0 items-center gap-2xs">
                  <AppButton
                    variant="secondary"
                    size="m"
                    className={secondaryClass}
                  >
                    Run again
                  </AppButton>
                  <AppButton
                    variant="ghost"
                    size="m"
                    className="h-[42px] text-ink-muted"
                  >
                    Restore
                  </AppButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-sm border-t border-border-subtle px-lg py-sm">
          <AppButton variant="secondary" size="m" className={secondaryClass}>
            Show 10 more
          </AppButton>
          <p className="text-[12.5px] font-medium text-ink-faint">{archiveFooterMeta}</p>
        </div>
      </section>
    </main>
  )
}
