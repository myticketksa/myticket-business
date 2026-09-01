export type RefundFilterId = "all" | "withMyTicket" | "refunded" | "declined"
export type RefundKind = "pending" | "refunded" | "declined"

export interface EventRefundCard {
  id: string
  ticket: string
  meta: string
  reason: string
  amount: string
  status: string
  kind: RefundKind
  resolution?: string
}

export const refundFilterPills: { id: RefundFilterId; label: string }[] = [
  { id: "all", label: "All · 5" },
  { id: "withMyTicket", label: "With MyTicket · 2" },
  { id: "refunded", label: "Refunded · 2" },
  { id: "declined", label: "Declined · 1" },
]

export const refundsBanner = {
  lead: "No action is needed — or possible — from you here.",
  body: "Customers pay MyTicket, so MyTicket decides and executes every refund under the refund policy you set for this event (refundable until 72h before start; platform fee not refundable). Your customers are not being ignored: each request below is being handled. This page exists so you can see refunds affecting your revenue.",
}

export const refundsFootnote =
  "The policy that applies is the one published when the buyer purchased. Refunded amounts leave your pending balance in Finance & payouts. If you believe a decision conflicts with your policy, raise a support case on the specific request."

export const eventRefunds: EventRefundCard[] = [
  {
    id: "tkt-88231-d7",
    ticket: "TKT-88231-D7 · VIP",
    meta: " · Noura Alqahtani · ORD-93371",
    reason:
      "Buyer’s reason: “Travel dates changed, can no longer attend” · requested 5h ago",
    amount: "SAR 850.00",
    status: "With MyTicket",
    kind: "pending",
  },
  {
    id: "tkt-87455-c2",
    ticket: "TKT-87455-C2 · Gold",
    meta: " · Hassan Alamri · ORD-93102",
    reason:
      "Buyer’s reason: “Bought duplicate tickets by mistake” · requested 1d ago",
    amount: "SAR 280.00",
    status: "With MyTicket",
    kind: "pending",
  },
  {
    id: "tkt-86980-a4",
    ticket: "TKT-86980-A4 · Silver",
    meta: " · Dana Alfaisal · ORD-92811",
    reason: "Buyer’s reason: “Family emergency” · requested Tue",
    amount: "SAR 180.00",
    status: "Refunded",
    kind: "refunded",
    resolution:
      "Refunded by MyTicket Wed · within your 72h policy · fee retained",
  },
  {
    id: "tkt-86544-b1",
    ticket: "TKT-86544-B1 · Gold",
    meta: " · Yara Alsheikh · ORD-92610",
    reason: "Buyer’s reason: “Event moved from my city” · requested Mon",
    amount: "SAR 280.00",
    status: "Refunded",
    kind: "refunded",
    resolution:
      "Refunded by MyTicket Mon · within your 72h policy · fee retained",
  },
  {
    id: "tkt-85990-f8",
    ticket: "TKT-85990-F8 · Silver",
    meta: " · Khalil Nasser · ORD-92244",
    reason: "Buyer’s reason: “Changed my mind” · requested 2 weeks ago",
    amount: "SAR 180.00",
    status: "Declined",
    kind: "declined",
    resolution: "Declined by MyTicket · requested after your 72h cut-off",
  },
]
