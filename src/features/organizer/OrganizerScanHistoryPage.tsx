import { useMemo, useState } from "react"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { FilterPill } from "@/components/biz/filter-pill"
import { ListFooter } from "@/components/biz/list-footer"
import { PageHead } from "@/components/biz/page-head"
import { AppButton } from "@/components/primitive/app-button"
import { SearchField } from "@/components/primitive/search-field"
import { StatusBadge } from "@/components/primitive/status-badge"
import { cn } from "@/lib/utils"
import { liveDoorEventLabel } from "@/mocks/live-door"
import {
  scanHistoryFooterMeta,
  scanHistoryPills,
  scanHistoryRows,
  scanHistorySub,
  type ScanHistoryFilterId,
  type ScanHistoryRow,
} from "@/mocks/scan-history"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

export function OrganizerScanHistoryPage() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<ScanHistoryFilterId>("all")

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return scanHistoryRows.filter((row) => {
      if (filter === "valid" && row.result !== "Valid") {
        return false
      }
      if (filter === "failed" && row.result === "Valid") {
        return false
      }
      if (!normalized) {
        return true
      }
      return (
        row.ticket.toLowerCase().includes(normalized) ||
        row.holder.toLowerCase().includes(normalized)
      )
    })
  }, [filter, query])

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-lg px-gutter pt-8 pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead
          eyebrow="Door operations"
          title="Scan history"
          sub={scanHistorySub}
        />
        <div className="flex flex-wrap items-center gap-gap-md">
          <ClosedDropdown label={liveDoorEventLabel} />
          <AppButton variant="secondary" size="m" className={secondaryClass}>
            Export
          </AppButton>
        </div>
      </div>

      <section className="overflow-hidden rounded-lg border border-border-default bg-surface-card">
        <div className="flex flex-wrap items-center gap-gap-md border-b border-border-subtle px-lg py-base">
          <div className="w-[250px]">
            <SearchField
              size="pill"
              placeholder="Search ticket or holder…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
              }}
            />
          </div>
          {scanHistoryPills.map((pill) => (
            <FilterPill
              key={pill.id}
              label={pill.label}
              size={38}
              state={filter === pill.id ? "active" : "idle"}
              onClick={() => {
                setFilter(pill.id)
              }}
            />
          ))}
          <ClosedDropdown label="Gate" />
          <ClosedDropdown label="Scanner" />
          <ClosedDropdown label="19:00 – 23:00" />
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1080px]">
            <div className="flex h-9 items-center gap-xs bg-surface-canvas px-lg text-[11.5px] font-bold tracking-[0.69px] text-ink-faint uppercase">
              <p className="w-[90px] shrink-0">Time</p>
              <p className="w-[140px] shrink-0">Ticket</p>
              <p className="min-w-0 flex-1">Holder</p>
              <p className="w-[110px] shrink-0">Gate</p>
              <p className="w-[130px] shrink-0">Scanner</p>
              <p className="w-[130px] shrink-0">Result</p>
            </div>
            {rows.map((row) => (
              <ScanRow key={`${row.ticket}-${row.time}`} row={row} />
            ))}
          </div>
        </div>

        <div className="border-t border-border-subtle">
          <ListFooter buttonLabel="Show 50 more" meta={scanHistoryFooterMeta} />
        </div>
      </section>
    </main>
  )
}

function ScanRow({ row }: { row: ScanHistoryRow }) {
  const failed = row.result !== "Valid"

  return (
    <article
      className={cn(
        "flex h-12 items-center gap-xs border-b border-border-subtle px-lg text-[13px]",
        failed && "bg-status-danger-light",
      )}
    >
      <p className="w-[90px] shrink-0 font-normal text-ink-faint">{row.time}</p>
      <p className="w-[140px] shrink-0 font-bold text-ink-primary">{row.ticket}</p>
      <p className="min-w-0 flex-1 truncate font-normal text-ink-muted">
        {row.holder}
      </p>
      <p className="w-[110px] shrink-0 font-normal text-ink-faint">{row.gate}</p>
      <p className="w-[130px] shrink-0 font-normal text-ink-faint">{row.scanner}</p>
      <div className="w-[130px] shrink-0">
        <StatusBadge label={row.result} />
      </div>
    </article>
  )
}
