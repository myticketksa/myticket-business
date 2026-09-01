export type OrganizerEventStatus =
  | "On sale"
  | "Draft"
  | "Under review"
  | "Declined"
  | "Live now"

export type EventsFilterId = "all" | "onSale" | "drafts" | "inReview" | "declined"

export type EventSalesKind = "progress" | "closed" | "empty"

export interface OrganizerEventCard {
  id: string
  title: string
  meta: string
  status: OrganizerEventStatus
  live?: boolean
  reason?: string
  salesKind: EventSalesKind
  sold?: string
  percent?: number
  revenue: string
  needs?: string
  action: string
  href: string
}

export const eventsPageSub =
  "Every event you've created. Most organizers start a recurring event by duplicating the last one."

export const eventsFooterMeta =
  "Showing 6 of 12 · archived events live in the Archive"

export const eventsFilterPills: { id: EventsFilterId; label: string }[] = [
  { id: "all", label: "All · 12" },
  { id: "onSale", label: "On sale · 3" },
  { id: "drafts", label: "Drafts · 2" },
  { id: "inReview", label: "In review · 1" },
  { id: "declined", label: "Declined · 1" },
]

const filterStatus: Record<Exclude<EventsFilterId, "all">, OrganizerEventStatus> = {
  onSale: "On sale",
  drafts: "Draft",
  inReview: "Under review",
  declined: "Declined",
}

export const organizerEvents: OrganizerEventCard[] = [
  {
    id: "jeddah-comedy",
    title: "Jeddah Comedy Night",
    meta: "Tonight · City Walk Arena, Jeddah · doors 19:30",
    status: "Live now",
    live: true,
    salesKind: "progress",
    sold: "1,600 / 1,600",
    percent: 100,
    revenue: "SAR 424K",
    action: "Live door",
    href: "/app/events/jeddah-comedy/live-door",
  },
  {
    id: "winter-nights",
    title: "Winter Nights: Amr Diab Live",
    meta: "Thu 12 Nov · Boulevard City Amphitheatre, Riyadh",
    status: "On sale",
    salesKind: "progress",
    sold: "7,240 / 8,000",
    percent: 90.5,
    revenue: "SAR 2.03M",
    needs: "2",
    action: "Open",
    href: "/app/events/winter-nights/edit",
  },
  {
    id: "desert-beats",
    title: "Desert Beats Festival",
    meta: "Fri 5 Dec · King Abdullah Park, Riyadh",
    status: "Declined",
    reason: "Declined: ticket sale window ends after the event starts.",
    salesKind: "closed",
    revenue: "—",
    needs: "1",
    action: "Fix & resubmit",
    href: "/app/events/desert-beats/edit",
  },
  {
    id: "new-year-gala",
    title: "New Year Gala 2027",
    meta: "Thu 31 Dec · The Ritz Ballroom, Riyadh",
    status: "Under review",
    salesKind: "closed",
    revenue: "—",
    action: "View",
    href: "/app/events/new-year-gala/edit",
  },
  {
    id: "food-truck",
    title: "Riyadh Food Truck Weekend",
    meta: "Fri 20 Nov · King Abdullah Park · 2 days",
    status: "On sale",
    salesKind: "progress",
    sold: "2,180 / 5,000",
    percent: 43.6,
    revenue: "SAR 261K",
    action: "Open",
    href: "/app/events/food-truck/edit",
  },
  {
    id: "spring-acoustic",
    title: "Spring Acoustic Sessions",
    meta: "Draft · last edited 3 days ago · no date set",
    status: "Draft",
    salesKind: "empty",
    revenue: "—",
    action: "Continue",
    href: "/app/events/spring-acoustic/edit",
  },
]

export function filterOrganizerEvents(
  events: OrganizerEventCard[],
  filter: EventsFilterId,
  query: string,
): OrganizerEventCard[] {
  const normalized = query.trim().toLowerCase()
  const status = filter === "all" ? null : filterStatus[filter]

  return events.filter((event) => {
    if (status && event.status !== status) {
      return false
    }

    if (!normalized) {
      return true
    }

    return (
      event.title.toLowerCase().includes(normalized) ||
      event.meta.toLowerCase().includes(normalized)
    )
  })
}
