import type { StatusBadgeTone } from "@/lib/status-badge-tone"

export type TicketFilterId = "all" | "scanned" | "notScanned"

export interface EventTicketRow {
  code: string
  holder: string
  note?: string
  type: string
  seat: string
  status: string
  statusTone?: StatusBadgeTone
  scanned: string
  wash?: boolean
}

export const ticketFilterPills: { id: TicketFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "scanned", label: "Scanned" },
  { id: "notScanned", label: "Not scanned" },
]

export const eventTicketsFooterMeta = "Showing 7 of 7,240"

export const eventTicketsNote = {
  lead: "Complimentary tickets",
  body: "are issued at no charge, count against capacity, and are marked in exports. Resold tickets show their current holder — the original buyer no longer holds a valid code.",
}

export const eventTickets: EventTicketRow[] = [
  {
    code: "TKT-88410-C4",
    holder: "Sara Alghamdi",
    type: "Gold",
    seat: "E-14",
    status: "Valid",
    scanned: "not yet",
  },
  {
    code: "TKT-88102-A1",
    holder: "Fahad Alotaibi",
    type: "Silver",
    seat: "K-08",
    status: "Valid",
    scanned: "not yet",
  },
  {
    code: "TKT-87990-B2",
    holder: "Reem Aldossary",
    note: " · resold from Omar B.",
    type: "Gold",
    seat: "F-02",
    status: "Resold",
    scanned: "not yet",
  },
  {
    code: "TKT-88231-D7",
    holder: "Noura Alqahtani",
    type: "VIP",
    seat: "A-05",
    status: "Refunded",
    statusTone: "InfoTint",
    scanned: "—",
    wash: true,
  },
  {
    code: "TKT-88377-A9",
    holder: "Majed Alrashid",
    note: " · gift from Aisha K.",
    type: "Gold",
    seat: "E-15",
    status: "Valid",
    scanned: "not yet",
  },
  {
    code: "TKT-88018-B5",
    holder: "Media pass · Al Arabiya",
    note: " · complimentary",
    type: "VIP",
    seat: "A-01",
    status: "Complimentary",
    scanned: "not yet",
  },
  {
    code: "TKT-87811-E3",
    holder: "Tariq Saleh",
    type: "Silver",
    seat: "L-22",
    status: "Cancelled",
    scanned: "—",
  },
]
