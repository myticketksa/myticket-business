import type { NotifyKind } from "@/schemas/notify-holders"

export const notifyAudienceCopy =
  "Goes to everyone holding a valid ticket — 6,988 people right now."

export const notifyDraftMessage =
  "Doors will now open at 18:30 instead of 19:00 to ease entry queues. Your ticket, seat and gate stay exactly the same — just arrive earlier if you’d like first access to the food court."

export const notifySendLabel = "Send to 6,988 people"

export const notifyCancellationBanner = {
  lead: "Cancellation notices are different.",
  body: "Choosing “Cancellation” requires typing the event name to confirm, notifies every holder on every channel, and starts MyTicket’s refund process. It cannot be undone.",
}

export const notifySentFooter =
  "Delivery counts update as channels confirm. Holders who bought after a send receive schedule and venue changes automatically on purchase."

export const notifyKinds: { id: NotifyKind; label: string }[] = [
  { id: "schedule", label: "Schedule change" },
  { id: "venue", label: "Venue change" },
  { id: "announcement", label: "Announcement" },
  { id: "cancellation", label: "Cancellation" },
]

export interface PreviousNotification {
  id: string
  kind: string
  sent: string
  body: string
  stats: string
}

export const previousNotifications: PreviousNotification[] = [
  {
    id: "gate-c-parking",
    kind: "Announcement",
    sent: "Sent Tue 14:20",
    body: "Parking at Gate C is now free for ticket holders — show your QR at the barrier.",
    stats: "Push 6,412 delivered · Email 6,910 delivered · SMS not used",
  },
  {
    id: "opening-act",
    kind: "Schedule change",
    sent: "Sent 2 Aug",
    body: "The opening act now starts at 19:30. Headline time is unchanged.",
    stats: "Push 5,918 delivered · Email 6,540 delivered · SMS 6,201 delivered",
  },
  {
    id: "vip-upgrade",
    kind: "Announcement",
    sent: "Sent 20 Jul",
    body: "VIP meet & greet passes are now available as an upgrade in My Tickets.",
    stats: "Push 4,102 delivered · Email 4,876 delivered",
  },
]
