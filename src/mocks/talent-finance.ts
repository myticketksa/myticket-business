export type TalentFinanceKpiIcon = "coins" | "hourglass" | "handshake" | "check"

export interface TalentFinanceKpi {
  label: string
  value: string
  note: string
  kind: "coloured" | "standard"
  icon: TalentFinanceKpiIcon
}

export interface TalentPaymentRow {
  id: string
  title: string
  organizer: string
  amount: string
  amountTone: "default" | "action"
  status: string
  updated: string
  highlight?: boolean
}

export const talentFinanceKpis: TalentFinanceKpi[] = [
  {
    label: "Needs your confirmation",
    value: "SAR 18,500",
    note: "1 engagement · organizer marked paid",
    kind: "coloured",
    icon: "coins",
  },
  {
    label: "Awaiting payment",
    value: "SAR 9,800",
    note: "1 engagement · work delivered",
    kind: "standard",
    icon: "hourglass",
  },
  {
    label: "Agreed, upcoming",
    value: "SAR 34,000",
    note: "1 engagement · due after the event",
    kind: "standard",
    icon: "handshake",
  },
  {
    label: "Received in 2026",
    value: "SAR 41,200",
    note: "self-reported · settled outside MyTicket",
    kind: "standard",
    icon: "check",
  },
]

export const talentPaymentRows: TalentPaymentRow[] = [
  {
    id: "aramco",
    title: "Aramco Annual Dinner",
    organizer: "Star Productions",
    amount: "SAR 18,500",
    amountTone: "default",
    status: "Confirm receipt",
    updated: "2h",
    highlight: true,
  },
  {
    id: "jazz",
    title: "Autumn Jazz Evening · solo set",
    organizer: "Rawa Nights",
    amount: "SAR 9,800",
    amountTone: "default",
    status: "Awaiting payment",
    updated: "9 Aug",
  },
  {
    id: "warmup",
    title: "Winter Nights · warm-up + doors",
    organizer: "Desert Beats Co.",
    amount: "SAR 34,000",
    amountTone: "default",
    status: "Agreed · due Nov",
    updated: "12 Aug",
  },
  {
    id: "gala",
    title: "Private gala · Diriyah",
    organizer: "Gala X",
    amount: "SAR 6,400",
    amountTone: "default",
    status: "Received",
    updated: "28 Jul",
  },
  {
    id: "retreat",
    title: "Corporate retreat · AlUla",
    organizer: "Horizon Events",
    amount: "Add amount",
    amountTone: "action",
    status: "No amount recorded",
    updated: "21 Jul",
  },
]

export const talentTrackingSteps = [
  {
    title: "Agree terms directly",
    body: "Fee, schedule and contract are between you and the organizer — in the hire thread or off-platform.",
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
