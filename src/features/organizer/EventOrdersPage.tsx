import { useMemo, useState } from "react"
import { useParams } from "react-router"
import { ExportIcon } from "@phosphor-icons/react"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { FilterPill } from "@/components/biz/filter-pill"
import { KpiCard } from "@/components/biz/kpi-card"
import { ListFooter } from "@/components/biz/list-footer"
import { EventOpsChrome } from "@/features/organizer/EventOpsChrome"
import { AppButton } from "@/components/primitive/app-button"
import { SearchField } from "@/components/primitive/search-field"
import { StatusBadge } from "@/components/primitive/status-badge"
import { cn } from "@/lib/utils"
import {
  eventOrderKpis,
  eventOrders,
  eventOrdersFooterMeta,
  type EventOrderRow,
} from "@/mocks/event-orders"

export function EventOrdersPage() {
  const { eventId = "winter-nights" } = useParams()
  const [query, setQuery] = useState("")

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) {
      return eventOrders
    }

    return eventOrders.filter(
      (row) =>
        row.order.toLowerCase().includes(normalized) ||
        row.buyer.toLowerCase().includes(normalized),
    )
  }, [query])

  return (
    <EventOpsChrome eventId={eventId} activeId="orders" title="Orders">
      <div className="grid grid-cols-1 gap-base sm:grid-cols-2 xl:grid-cols-4">
        {eventOrderKpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            kind="noIcon"
            label={kpi.label}
            value={kpi.value}
            note={kpi.note}
            className="max-w-none"
          />
        ))}
      </div>

      <section className="overflow-hidden rounded-lg border border-border-default bg-surface-card">
        <div className="flex flex-wrap items-center gap-gap-md border-b border-border-subtle px-lg py-base">
          <div className="w-[248px]">
            <SearchField
              size="pill"
              placeholder="Search by reference or buyer…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
              }}
            />
          </div>
          <FilterPill label="All statuses" size={38} state="active" />
          <ClosedDropdown label="Ticket type" />
          <ClosedDropdown label="All dates" />
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
          <div className="min-w-[1080px]">
            <div className="flex items-center gap-xs border-b border-border-subtle bg-surface-canvas px-lg py-xs text-[11.5px] font-bold tracking-[0.345px] text-ink-faint uppercase">
              <p className="w-[120px] shrink-0">Order</p>
              <p className="w-[238px] shrink-0">Buyer</p>
              <p className="w-[70px] shrink-0 text-right">Qty</p>
              <p className="w-[110px] shrink-0 text-right">Amount</p>
              <p className="w-[90px] shrink-0 text-right">Fee</p>
              <p className="w-[100px] shrink-0 text-right">Net</p>
              <p className="w-[110px] shrink-0">Payment</p>
              <p className="w-[88px] shrink-0">Status</p>
              <p className="min-w-0 flex-1 text-right">Placed</p>
            </div>
            {rows.map((row) => (
              <OrderRow key={row.order} row={row} />
            ))}
          </div>
        </div>

        <div className="border-t border-border-subtle">
          <ListFooter buttonLabel="Show 24 more" meta={eventOrdersFooterMeta} />
        </div>
      </section>
    </EventOpsChrome>
  )
}

function OrderRow({ row }: { row: EventOrderRow }) {
  return (
    <article
      className={cn(
        "flex h-14 items-center gap-xs border-b border-border-subtle px-lg",
        row.wash && "bg-status-info-light",
      )}
    >
      <p className="w-[120px] shrink-0 text-[13.5px] font-bold text-ink-primary">
        {row.order}
      </p>
      <p className="flex w-[238px] shrink-0 items-center truncate text-[13.5px]">
        <span className="font-bold text-ink-primary">{row.buyer}</span>
        <span className="font-medium text-ink-muted">{row.tickets}</span>
      </p>
      <p className="w-[70px] shrink-0 text-right text-[13.5px] font-semibold text-ink-primary">
        {row.qty}
      </p>
      <p className="w-[110px] shrink-0 text-right text-[13.5px] font-semibold text-ink-primary">
        {row.amount}
      </p>
      <p className="w-[90px] shrink-0 text-right text-[13.5px] font-medium text-ink-faint">
        {row.fee}
      </p>
      <p className="w-[100px] shrink-0 text-right text-[13.5px] font-bold text-ink-primary">
        {row.net}
      </p>
      <p className="w-[110px] shrink-0 text-[13.5px] font-medium text-ink-muted">
        {row.payment}
      </p>
      <div className="w-[88px] shrink-0">
        <StatusBadge label={row.status} tone={row.statusTone} />
      </div>
      <p className="min-w-0 flex-1 text-right text-[12.5px] font-medium text-ink-faint">
        {row.placed}
      </p>
    </article>
  )
}
