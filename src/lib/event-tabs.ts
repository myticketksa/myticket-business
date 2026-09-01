import type { EventTab } from "@/components/biz/event-tab-bar"

export function eventOpsTabs(eventId: string, showWinterCounts: boolean): EventTab[] {
  return [
    { id: "edit", label: "Edit event", path: `/app/events/${eventId}/edit` },
    {
      id: "orders",
      label: "Orders",
      path: `/app/events/${eventId}/orders`,
      count: showWinterCounts ? "3,412" : undefined,
    },
    {
      id: "tickets",
      label: "Tickets issued",
      path: `/app/events/${eventId}/tickets`,
      count: showWinterCounts ? "7,240" : undefined,
    },
    {
      id: "refunds",
      label: "Refund requests",
      path: `/app/events/${eventId}/refunds`,
      count: showWinterCounts ? "2" : undefined,
    },
    { id: "notify", label: "Notify holders", path: `/app/events/${eventId}/notify` },
    { id: "liveDoor", label: "Live door", path: `/app/events/${eventId}/live-door` },
  ]
}
