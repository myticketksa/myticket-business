import { useMemo, useState } from "react"
import { useParams } from "react-router"
import { ExportIcon, TicketIcon } from "@phosphor-icons/react"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { FilterPill } from "@/components/biz/filter-pill"
import { ListFooter } from "@/components/biz/list-footer"
import { NoteCard } from "@/components/biz/note-card"
import { EventOpsChrome } from "@/features/organizer/EventOpsChrome"
import { AppButton } from "@/components/primitive/app-button"
import { SearchField } from "@/components/primitive/search-field"
import { StatusBadge } from "@/components/primitive/status-badge"
import { cn } from "@/lib/utils"
import {
  eventTickets,
  eventTicketsFooterMeta,
  eventTicketsNote,
  ticketFilterPills,
  type EventTicketRow,
  type TicketFilterId,
} from "@/mocks/event-tickets"

function isScanned(scanned: string) {
  return scanned !== "not yet" && scanned !== "—"
}

export function EventTicketsPage() {
  const { eventId = "winter-nights" } = useParams()
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<TicketFilterId>("all")

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return eventTickets.filter((row) => {
      if (filter === "scanned" && !isScanned(row.scanned)) {
        return false
      }
      if (filter === "notScanned" && isScanned(row.scanned)) {
        return false
      }
      if (!normalized) {
        return true
      }
      return (
        row.code.toLowerCase().includes(normalized) ||
        row.holder.toLowerCase().includes(normalized)
      )
    })
  }, [filter, query])

  return (
    <EventOpsChrome
      eventId={eventId}
      activeId="tickets"
      title="Tickets issued"
      action={
        <AppButton
          size="m"
          className="h-[42px]"
          icon={<TicketIcon className="size-[18px]" />}
        >
          Issue complimentary ticket
        </AppButton>
      }
    >
      <section className="overflow-hidden rounded-lg border border-border-default bg-surface-card">
        <div className="flex flex-wrap items-center gap-gap-md border-b border-border-subtle px-lg py-base">
          <div className="w-full sm:w-[248px]">
            <SearchField
              size="pill"
              placeholder="Search by code or holder…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
              }}
            />
          </div>
          {ticketFilterPills.map((pill) => (
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
          <ClosedDropdown label="Ticket type" />
          <AppButton
            variant="ghost"
            size="m"
            className="ml-auto h-[42px] text-ink-muted"
            icon={<ExportIcon className="size-[18px]" />}
          >
            Export
          </AppButton>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
            <div className="flex items-center gap-xs border-b border-border-subtle bg-surface-canvas px-lg py-xs text-[11.5px] font-bold tracking-[0.345px] text-ink-faint uppercase">
              <p className="w-[140px] shrink-0">Code</p>
              <p className="min-w-0 flex-1">Holder</p>
              <p className="w-[100px] shrink-0">Type</p>
              <p className="w-[90px] shrink-0">Seat</p>
              <p className="w-[150px] shrink-0">Status</p>
              <p className="w-[130px] shrink-0 text-right">Scanned</p>
            </div>
            {rows.map((row) => (
              <TicketRow key={row.code} row={row} />
            ))}
          </div>
        </div>

        <div className="border-t border-border-subtle">
          <ListFooter buttonLabel="Show 24 more" meta={eventTicketsFooterMeta} />
        </div>
      </section>

      <NoteCard
        tone="warm"
        className="border border-border-default"
        lead={eventTicketsNote.lead}
        body={eventTicketsNote.body}
      />
    </EventOpsChrome>
  )
}

function TicketRow({ row }: { row: EventTicketRow }) {
  return (
    <article
      className={cn(
        "flex h-14 items-center gap-xs border-b border-border-subtle px-lg",
        row.wash && "bg-status-info-light",
      )}
    >
      <p className="w-[140px] shrink-0 text-[13.5px] font-bold text-ink-primary">
        {row.code}
      </p>
      <p className="flex min-w-0 flex-1 items-center truncate text-[13.5px]">
        <span className="font-bold text-ink-primary">{row.holder}</span>
        {row.note ? (
          <span className="font-medium text-ink-faint">{row.note}</span>
        ) : null}
      </p>
      <p className="w-[100px] shrink-0 text-[13.5px] font-semibold text-ink-primary">
        {row.type}
      </p>
      <p className="w-[90px] shrink-0 text-[13.5px] font-semibold text-ink-muted">
        {row.seat}
      </p>
      <div className="w-[150px] shrink-0">
        <StatusBadge label={row.status} tone={row.statusTone} />
      </div>
      <p className="w-[130px] shrink-0 text-right text-[12.5px] font-medium text-ink-faint">
        {row.scanned}
      </p>
    </article>
  )
}
