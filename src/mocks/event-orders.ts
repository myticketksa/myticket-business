import type { StatusBadgeTone } from "@/lib/status-badge-tone"

export interface EventOrderRow {
  order: string
  buyer: string
  tickets: string
  qty: string
  amount: string
  fee: string
  net: string
  payment: string
  status: string
  statusTone?: StatusBadgeTone
  placed: string
  wash?: boolean
}

export const eventOrderKpis = [
  { label: "Orders", value: "3,412", note: "42 today" },
  { label: "Gross", value: "SAR 2.03M", note: "incl. platform fees" },
  { label: "Net to you", value: "SAR 1.83M", note: "after 10% fee" },
  {
    label: "Refunded",
    value: "38 orders",
    note: "SAR 21,340 returned to buyers",
  },
] as const

export const eventOrdersFooterMeta =
  "Showing 7 of 3,412 · refunded orders stay listed and reduce your net revenue"

export const eventOrders: EventOrderRow[] = [
  {
    order: "ORD-93412",
    buyer: "Sara Alghamdi",
    tickets: " · 2 × Gold",
    qty: "2",
    amount: "SAR 588.00",
    fee: "SAR 28.00",
    net: "SAR 560.00",
    payment: "Mada",
    status: "Paid",
    placed: "2h ago",
  },
  {
    order: "ORD-93408",
    buyer: "Fahad Alotaibi",
    tickets: " · 4 × Silver",
    qty: "4",
    amount: "SAR 756.00",
    fee: "SAR 36.00",
    net: "SAR 720.00",
    payment: "Apple Pay",
    status: "Paid",
    placed: "3h ago",
  },
  {
    order: "ORD-93371",
    buyer: "Noura Alqahtani",
    tickets: " · 1 × VIP",
    qty: "1",
    amount: "SAR 892.50",
    fee: "SAR 42.50",
    net: "SAR 850.00",
    payment: "Visa",
    status: "Refunded",
    statusTone: "InfoTint",
    placed: "Yesterday",
    wash: true,
  },
  {
    order: "ORD-93340",
    buyer: "Omar Basha",
    tickets: " · 2 × Gold",
    qty: "2",
    amount: "SAR 588.00",
    fee: "SAR 28.00",
    net: "SAR 560.00",
    payment: "Wallet",
    status: "Pending",
    placed: "Yesterday",
  },
  {
    order: "ORD-93322",
    buyer: "Aisha Khan",
    tickets: " · 3 × Gold",
    qty: "3",
    amount: "SAR 882.00",
    fee: "SAR 42.00",
    net: "SAR 840.00",
    payment: "Mada",
    status: "Paid",
    placed: "Tue",
  },
  {
    order: "ORD-93290",
    buyer: "Tariq Saleh",
    tickets: " · 2 × Silver",
    qty: "2",
    amount: "SAR 378.00",
    fee: "SAR 18.00",
    net: "SAR 360.00",
    payment: "Apple Pay",
    status: "Paid",
    placed: "Tue",
  },
  {
    order: "ORD-93241",
    buyer: "Majed Alrashid",
    tickets: " · 1 × Gold · gifted",
    qty: "1",
    amount: "SAR 294.00",
    fee: "SAR 14.00",
    net: "SAR 280.00",
    payment: "Visa",
    status: "Paid",
    placed: "Mon",
  },
]
