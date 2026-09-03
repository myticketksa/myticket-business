import { useMemo, useState } from "react"
import { useNavigate } from "react-router"
import {
  CaretDownIcon,
  CopySimpleIcon,
  PlusIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { FilterPill } from "@/components/biz/filter-pill"
import { HatchPlaceholder } from "@/components/biz/hatch-placeholder"
import { ListFooter } from "@/components/biz/list-footer"
import { LiveDot } from "@/components/biz/live-dot"
import { PageHead } from "@/components/biz/page-head"
import { ProgressBar } from "@/components/biz/progress-bar"
import { AppButton } from "@/components/primitive/app-button"
import { SearchField } from "@/components/primitive/search-field"
import { StatusBadge } from "@/components/primitive/status-badge"
import { cn } from "@/lib/utils"
import {
  eventsFilterPills,
  eventsFooterMeta,
  eventsPageSub,
  filterOrganizerEvents,
  organizerEvents,
  type EventsFilterId,
  type OrganizerEventCard,
} from "@/mocks/organizer-events"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

export function OrganizerEventsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<EventsFilterId>("all")
  const [query, setQuery] = useState("")

  const visible = useMemo(
    () => filterOrganizerEvents(organizerEvents, filter, query),
    [filter, query],
  )

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-lg px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead eyebrow="Operate" title="Events" sub={eventsPageSub} />
        <AppButton
          size="m"
          className="h-[42px]"
          icon={<PlusIcon className="size-[18px]" weight="bold" />}
          onClick={() => {
            navigate("/app/events/new/edit")
          }}
        >
          Create event
        </AppButton>
      </div>

      <section className="overflow-hidden rounded-lg border border-border-default bg-surface-card">
        <div className="flex flex-wrap items-center gap-gap-md border-b border-border-subtle px-lg py-base">
          <div className="w-full sm:w-[248px]">
            <SearchField
              size="pill"
              placeholder="Search your events…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
              }}
            />
          </div>
          {eventsFilterPills.map((pill) => (
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
          <div className="ml-auto flex flex-wrap items-center gap-base">
            <button
              type="button"
              className="inline-flex items-center gap-gap-sm text-[13px] font-semibold text-ink-primary"
            >
              Venue
              <CaretDownIcon className="size-3.5 text-ink-muted" weight="bold" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-gap-sm text-[13px] font-semibold text-ink-primary"
            >
              Sort: date
              <CaretDownIcon className="size-3.5 text-ink-muted" weight="bold" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1080px]">
            {visible.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        </div>

        <div className="border-t border-border-subtle">
          <ListFooter buttonLabel="Show 6 more" meta={eventsFooterMeta} />
        </div>
      </section>
    </main>
  )
}

function EventRow({ event }: { event: OrganizerEventCard }) {
  const navigate = useNavigate()

  return (
    <article
      className={cn(
        "flex items-center gap-md border-b border-border-subtle px-lg py-base",
        event.status === "Declined" && "bg-status-danger-light",
      )}
    >
      <HatchPlaceholder
        caption="cover"
        className="h-[58px] w-[92px] shrink-0 overflow-hidden rounded-sm"
      />
      <div className="flex w-[360px] shrink-0 flex-col gap-[3px]">
        <div className="flex items-center gap-gap-sm">
          {event.live ? <LiveDot /> : null}
          <h2 className="truncate text-[15px] font-bold text-ink-primary">
            {event.title}
          </h2>
        </div>
        <p className="truncate text-[12.5px] font-medium text-ink-muted">{event.meta}</p>
        {event.reason ? (
          <div className="flex items-center gap-[5px]">
            <WarningCircleIcon
              className="size-[13px] shrink-0 text-status-danger-strong"
              weight="fill"
            />
            <p className="text-[12px] font-semibold text-status-danger-strong">
              {event.reason}
            </p>
          </div>
        ) : null}
      </div>
      <StatusBadge label={event.status} />
      <div className="flex w-[150px] shrink-0 flex-col gap-3xs">
        <p className="text-[12.5px] font-semibold text-ink-muted">
          {event.salesKind === "progress"
            ? event.sold
            : event.salesKind === "closed"
              ? "Sales not open"
              : "—"}
        </p>
        <ProgressBar
          value={event.salesKind === "progress" ? (event.percent ?? 0) : 0}
          size={6}
        />
      </div>
      <p className="w-[110px] shrink-0 text-right text-[13.5px] font-bold text-ink-primary">
        {event.revenue}
      </p>
      <div className="flex size-[22px] shrink-0 items-center justify-center">
        {event.needs ? (
          <span className="inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-[11px] bg-brand-strong px-3xs text-[12px] font-extrabold text-ink-inverse">
            {event.needs}
          </span>
        ) : null}
      </div>
      <button
        type="button"
        aria-label={`Duplicate ${event.title}`}
        className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-pill border-[1.5px] border-border-default bg-surface-card text-ink-primary"
      >
        <CopySimpleIcon className="size-4" />
      </button>
      <AppButton
        variant="secondary"
        size="m"
        className={secondaryClass}
        onClick={() => {
          navigate(event.href)
        }}
      >
        {event.action}
      </AppButton>
    </article>
  )
}
