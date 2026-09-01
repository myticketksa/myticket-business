import type { StatusBadgeTone } from "@/lib/status-badge-tone"

export interface FinanceKpi {
  label: string
  value: string
  note: string
  icon: "hourglass" | "check" | "chat"
}

export interface PayoutRow {
  reference: string
  sentTo: string
  amount: string
  status: "Held" | "Scheduled" | "Paid"
  tone: StatusBadgeTone
  date: string
}

export interface FinanceEventRevenue {
  name: string
  meta: string
  amount: string
  percent: number
}

export interface ComplianceItem {
  id: string
  title: string
  note: string
  icon: "bank" | "file-text" | "file-x" | "id"
  state: "verified" | "missing"
}

export const financeKpis: FinanceKpi[] = [
  {
    label: "Pending clearance",
    value: "SAR 132,480.00",
    note: "From sales not yet cleared",
    icon: "hourglass",
  },
  {
    label: "Lifetime paid out",
    value: "SAR 2.41M",
    note: "38 payouts since 2024",
    icon: "check",
  },
  {
    label: "Lifetime fees",
    value: "SAR 268,340.00",
    note: "10% platform fee",
    icon: "chat",
  },
]

export const payoutRows: PayoutRow[] = [
  {
    reference: "PAY-1082",
    sentTo: "SNB ···· 4821",
    amount: "SAR 84,210.00",
    status: "Held",
    tone: "DangerTint",
    date: "Due 25 Aug",
  },
  {
    reference: "PAY-1081",
    sentTo: "SNB ···· 4821",
    amount: "SAR 61,900.00",
    status: "Scheduled",
    tone: "NeutralOutline",
    date: "1 Sep",
  },
  {
    reference: "PAY-1080",
    sentTo: "SNB ···· 4821",
    amount: "SAR 118,340.00",
    status: "Paid",
    tone: "SuccessTint",
    date: "28 Jul",
  },
  {
    reference: "PAY-1079",
    sentTo: "SNB ···· 4821",
    amount: "SAR 92,115.00",
    status: "Paid",
    tone: "SuccessTint",
    date: "30 Jun",
  },
  {
    reference: "PAY-1078",
    sentTo: "SNB ···· 4821",
    amount: "SAR 45,600.00",
    status: "Paid",
    tone: "SuccessTint",
    date: "26 May",
  },
]

export const financeEventRevenue: FinanceEventRevenue[] = [
  {
    name: "Winter Nights: Amr Diab Live",
    meta: "12 Nov · on sale",
    amount: "SAR 812,400",
    percent: 100,
  },
  {
    name: "Jeddah Comedy Night",
    meta: "Live now",
    amount: "SAR 386,200",
    percent: 47.5,
  },
  {
    name: "Autumn Jazz Evening",
    meta: "Ended 9 Aug",
    amount: "SAR 284,900",
    percent: 35.1,
  },
  {
    name: "Riyadh Food Truck Weekend",
    meta: "20 Nov · on sale",
    amount: "SAR 176,510",
    percent: 21.7,
  },
]

export const complianceItems: ComplianceItem[] = [
  {
    id: "bank",
    title: "Bank account",
    note: "SNB ···· 4821",
    icon: "bank",
    state: "verified",
  },
  {
    id: "vat",
    title: "VAT certificate",
    note: "Expires Mar 2027",
    icon: "file-text",
    state: "verified",
  },
  {
    id: "cr",
    title: "Commercial Registration",
    note: "Missing — this is holding your payout",
    icon: "file-x",
    state: "missing",
  },
  {
    id: "owner",
    title: "Owner ID",
    note: "Verified Jan 2026",
    icon: "id",
    state: "verified",
  },
]
