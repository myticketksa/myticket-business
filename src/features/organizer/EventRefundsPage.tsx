import { useMemo, useState } from "react"
import { useParams } from "react-router"
import {
  CheckCircleIcon,
  ExportIcon,
  HourglassIcon,
  XCircleIcon,
} from "@phosphor-icons/react"
import { AlertBanner } from "@/components/biz/alert-banner"
import { FilterPill } from "@/components/biz/filter-pill"
import { EventOpsChrome } from "@/features/organizer/EventOpsChrome"
import { AppButton } from "@/components/primitive/app-button"
import { StatusBadge } from "@/components/primitive/status-badge"
import { cn } from "@/lib/utils"
import {
  eventRefunds,
  refundFilterPills,
  refundsBanner,
  refundsFootnote,
  type EventRefundCard,
  type RefundFilterId,
  type RefundKind,
} from "@/mocks/event-refunds"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

const kindTile: Record<RefundKind, string> = {
  pending: "bg-surface-brand-wash text-brand-primary",
  refunded: "bg-status-success-light text-status-success",
  declined: "bg-status-danger-light text-status-danger",
}

function KindIcon({ kind }: { kind: RefundKind }) {
  if (kind === "refunded") {
    return <CheckCircleIcon className="size-[18px]" weight="fill" />
  }
  if (kind === "declined") {
    return <XCircleIcon className="size-[18px]" weight="fill" />
  }
  return <HourglassIcon className="size-[18px]" />
}

export function EventRefundsPage() {
  const { eventId = "winter-nights" } = useParams()
  const [filter, setFilter] = useState<RefundFilterId>("all")

  const cards = useMemo(() => {
    if (filter === "all") {
      return eventRefunds
    }
    if (filter === "withMyTicket") {
      return eventRefunds.filter((card) => card.kind === "pending")
    }
    if (filter === "refunded") {
      return eventRefunds.filter((card) => card.kind === "refunded")
    }
    return eventRefunds.filter((card) => card.kind === "declined")
  }, [filter])

  return (
    <EventOpsChrome eventId={eventId} activeId="refunds" title="Refund requests">
      <AlertBanner
        tone="brand"
        lead={refundsBanner.lead}
        body={refundsBanner.body}
      />

      <section className="overflow-hidden rounded-lg border border-border-default bg-surface-card">
        <div className="flex flex-wrap items-center gap-gap-md border-b border-border-subtle px-lg py-base">
          {refundFilterPills.map((pill) => (
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
          <AppButton
            variant="ghost"
            size="m"
            className="ml-auto h-[42px] text-ink-muted"
            icon={<ExportIcon className="size-[18px]" />}
          >
            Export
          </AppButton>
        </div>

        {cards.map((card) => (
          <RefundRow key={card.id} card={card} />
        ))}
      </section>

      <p className="text-[12.5px] font-medium leading-[1.55] text-ink-faint">
        {refundsFootnote}
      </p>
    </EventOpsChrome>
  )
}

function RefundRow({ card }: { card: EventRefundCard }) {
  return (
    <article className="flex flex-wrap items-start gap-sm sm:gap-base border-b border-border-subtle px-base py-base sm:px-lg">
      <span
        className={cn(
          "inline-flex size-[38px] shrink-0 items-center justify-center rounded-sm",
          kindTile[card.kind],
        )}
      >
        <KindIcon kind={card.kind} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <p className="flex flex-wrap items-baseline text-[14px]">
          <span className="font-bold text-ink-primary">{card.ticket}</span>
          <span className="text-[13px] font-medium text-ink-muted">{card.meta}</span>
        </p>
        <p className="text-[12.5px] font-medium text-ink-faint">{card.reason}</p>
        {card.resolution ? (
          <p
            className={cn(
              "text-[12.5px] font-semibold",
              card.kind === "declined"
                ? "text-status-danger-strong"
                : "text-status-success",
            )}
          >
            {card.resolution}
          </p>
        ) : null}
      </div>
      <p className="w-[110px] shrink-0 text-right text-[14px] font-bold text-ink-primary">
        {card.amount}
      </p>
      <StatusBadge
        label={card.status}
        tone={card.status === "Refunded" ? "InfoTint" : undefined}
      />
      <AppButton variant="secondary" size="m" className={secondaryClass}>
        Raise support case
      </AppButton>
    </article>
  )
}
