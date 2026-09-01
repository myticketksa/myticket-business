import { CaretDownIcon, TicketIcon } from "@phosphor-icons/react"
import { AlertBanner } from "@/components/biz/alert-banner"
import { AlertStrip } from "@/components/biz/alert-strip"
import { EmptyState } from "@/components/biz/empty-state"
import { EventTabBar } from "@/components/biz/event-tab-bar"
import { FilterPill } from "@/components/biz/filter-pill"
import { KpiCard } from "@/components/biz/kpi-card"
import { NoteCard } from "@/components/biz/note-card"
import { NotificationRow } from "@/components/biz/notification-row"
import { PageHead } from "@/components/biz/page-head"
import { ProgressBar } from "@/components/biz/progress-bar"
import { SectionHeader } from "@/components/biz/section-header"
import { TableCard, TableRow } from "@/components/biz/table-card"
import { UnderlineTab } from "@/components/biz/underline-tab"
import { AppButton } from "@/components/primitive/app-button"
import { SearchField } from "@/components/primitive/search-field"
import { StatusBadge } from "@/components/primitive/status-badge"

function ClosedDropdown({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-9 items-center gap-2xs rounded-pill border border-border-default bg-surface-card px-sm text-action-s text-ink-primary"
    >
      {label}
      <CaretDownIcon className="size-3.5 text-ink-muted" weight="bold" />
    </button>
  )
}

export function P1Gallery() {
  return (
    <main className="mx-auto flex max-w-[1192px] flex-col gap-lg px-gutter py-xl">
      <header className="flex flex-col gap-2xs">
        <p className="text-eyebrow text-brand-link">Dev only</p>
        <h1 className="text-display-s text-ink-primary">P1 shared chrome</h1>
        <p className="text-body-s text-ink-muted">
          Not a product screen. Copy below is from the Figma extract or
          placeholder slots — no guest waitlist empty-state defaults.
        </p>
      </header>

      <PageHead
        eyebrow="Workspace"
        title="Home"
        sub="Sunday 31 Aug"
        sub2="Riyadh Events Co."
      />

      <SectionHeader
        overline="Overview"
        heading="This week"
        lede="Figures from the last seven days."
        link="View all"
      />

      <div className="flex flex-wrap gap-base">
        <KpiCard
          kind="standard"
          label="Events"
          value="12"
          trend="+2"
          note="On sale"
          icon={<TicketIcon className="size-5" />}
        />
        <KpiCard kind="noIcon" label="Tickets" value="7,240" />
        <KpiCard kind="coloured" label="Revenue" value="SAR 84,210.00" />
      </div>

      <div className="flex flex-wrap gap-2xs">
        <FilterPill label="All · 12" state="active" size={36} />
        <FilterPill label="On sale · 3" size={36} />
        <FilterPill label="Drafts · 2" size={32} />
      </div>

      <div className="flex gap-lg">
        <UnderlineTab label="Talents" active />
        <UnderlineTab label="Vendors" />
      </div>

      <EventTabBar
        showCounts
        activeId="edit"
        tabs={[
          { id: "edit", label: "Edit event", path: "/dev/p1" },
          { id: "orders", label: "Orders", path: "/dev/p1", count: "3,412" },
          { id: "tickets", label: "Tickets issued", path: "/dev/p1", count: "7,240" },
          { id: "refunds", label: "Refund requests", path: "/dev/p1", count: "2" },
          { id: "notify", label: "Notify holders", path: "/dev/p1" },
          { id: "liveDoor", label: "Live door", path: "/dev/p1" },
        ]}
      />

      <NoteCard
        tone="warm"
        showIcon
        lead="About refunds"
        body="Refunds are handled on the event operations tab."
      />

      <AlertBanner
        tone="danger"
        lead="Winter Nights opens doors in 3 days and has no scanners assigned."
        body="Create a scanner before doors open."
        ctaLabel="Create scanner"
      />

      <AlertBanner
        tone="info"
        lead="A refund on this event is still with MyTicket."
        body="We will email you when the review finishes."
      />

      <AlertStrip
        tone="lock"
        body="7,240 seats sold — layout is locked."
      />

      <AlertStrip tone="info" body="Portfolio is under review." />

      <div className="flex w-full max-w-[320px] flex-col gap-2xs">
        <p className="text-body-2xs text-ink-muted">ProgressBar · 8 · Light</p>
        <ProgressBar value={72} size={8} surface="light" />
      </div>

      <EmptyState
        variant="firstUse"
        title="No events yet"
        body="Create your first event to see it listed here."
        action={<AppButton size="s">Create event</AppButton>}
      />

      <section className="overflow-hidden rounded-lg border border-border-default">
        <NotificationRow
          state="actionNeeded"
          title="Hire request waiting"
          body="Lina Hakim asked to confirm a booking."
          time="2h ago"
        />
        <NotificationRow
          state="read"
          title="Payout sent"
          body="SAR 12,400.00 left With MyTicket."
          time="Yesterday"
        />
      </section>

      <TableCard
        search={<SearchField placeholder="Search by reference or buyer…" />}
        filters={<FilterPill label="All statuses" state="active" />}
        dropdowns={
          <>
            <ClosedDropdown label="Ticket type" />
            <ClosedDropdown label="All dates" />
          </>
        }
        exportAction={
          <AppButton variant="secondary" size="s">
            Export
          </AppButton>
        }
        columns={[
          { key: "order", label: "Order" },
          { key: "buyer", label: "Buyer" },
          { key: "qty", label: "Qty" },
          { key: "amount", label: "Amount" },
          { key: "fee", label: "Fee" },
          { key: "net", label: "Net" },
          { key: "payment", label: "Payment" },
          { key: "status", label: "Status" },
          { key: "placed", label: "Placed" },
        ]}
      >
        <TableRow
          cells={[
            "ORD-93371",
            "Noura Alqahtani",
            "2",
            "SAR 850.00",
            "SAR 42.50",
            "SAR 807.50",
            "Mada",
            <StatusBadge key="paid" label="Paid" />,
            "Thu 12 Nov 2026 · 20:00",
          ]}
        />
      </TableCard>
    </main>
  )
}
