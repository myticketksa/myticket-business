export type VendorFinanceKpiIcon = "coins" | "hourglass" | "handshake" | "check"

export interface VendorFinanceKpi {
  label: string
  value: string
  note: string
  kind: "coloured" | "standard"
  icon: VendorFinanceKpiIcon
}

export interface VendorPaymentRow {
  id: string
  title: string
  organizer: string
  amount: string
  amountTone: "default" | "action"
  status: string
  updated: string
  highlight?: boolean
}

export const vendorFinanceKpis: VendorFinanceKpi[] = [
  {
    label: "Needs your confirmation",
    value: "SAR 48,200",
    note: "1 engagement · organizer marked paid",
    kind: "coloured",
    icon: "coins",
  },
  {
    label: "Awaiting payment",
    value: "SAR 64,500",
    note: "1 engagement · invoice sent 14 Sep terms",
    kind: "standard",
    icon: "hourglass",
  },
  {
    label: "Agreed, upcoming",
    value: "SAR 118,000",
    note: "1 engagement · deposit received",
    kind: "standard",
    icon: "handshake",
  },
  {
    label: "Received in 2026",
    value: "SAR 486,300",
    note: "self-reported · settled outside MyTicket",
    kind: "standard",
    icon: "check",
  },
]

export const vendorPaymentRows: VendorPaymentRow[] = [
  {
    id: "souq",
    title: "Summer Souq Nights · 3 days",
    organizer: "Jeddah Season",
    amount: "SAR 48,200",
    amountTone: "default",
    status: "Confirm receipt",
    updated: "5h",
    highlight: true,
  },
  {
    id: "aramco",
    title: "Aramco Annual Dinner · plated 800",
    organizer: "Star Productions",
    amount: "SAR 64,500",
    amountTone: "default",
    status: "Awaiting payment",
    updated: "14 Aug",
  },
  {
    id: "corniche",
    title: "Corniche Nights Festival · 3 days",
    organizer: "Jeddah Season",
    amount: "SAR 118,000",
    amountTone: "default",
    status: "Deposit received",
    updated: "10 Aug",
  },
  {
    id: "ramadan",
    title: "Ramadan tent · nightly buffet",
    organizer: "Diriyah Gate Co.",
    amount: "SAR 96,000",
    amountTone: "default",
    status: "Received",
    updated: "2 Jun",
  },
  {
    id: "winter",
    title: "Winter Nights · live stations",
    organizer: "Desert Beats Co.",
    amount: "Add amount",
    amountTone: "action",
    status: "No amount recorded",
    updated: "18 Aug",
  },
]

export const vendorTrackingSteps = [
  {
    title: "Agree terms directly",
    body: "Quote, contract and payment schedule are between you and the organizer — in the hire thread or off-platform.",
  },
  {
    title: "Record the agreed amount",
    body: "Either side can add it. Both of you see the same number; it never leaves this record.",
  },
  {
    title: "Mark paid, confirm received",
    body: "The organizer marks paid when they send the money; you confirm when it arrives. That's the whole system.",
  },
]
