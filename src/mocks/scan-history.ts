export type ScanHistoryFilterId = "all" | "valid" | "failed"

export interface ScanHistoryRow {
  time: string
  ticket: string
  holder: string
  gate: string
  scanner: string
  result: string
}

export const scanHistorySub =
  "The complete, permanent record of every scan — the live door’s feed, after the night ends."

export const scanHistoryFooterMeta = "Showing 9 of 1,270 · summary in Attendance"

export const scanHistoryPills: { id: ScanHistoryFilterId; label: string }[] = [
  { id: "all", label: "All results · 1,270" },
  { id: "valid", label: "Valid · 1,246" },
  { id: "failed", label: "Failed · 24" },
]

export const scanHistoryRows: ScanHistoryRow[] = [
  {
    time: "21:42:08",
    ticket: "TKT-88410-C4",
    holder: "Sara A. · Gold",
    gate: "Gate B",
    scanner: "Yousef",
    result: "Valid",
  },
  {
    time: "21:42:01",
    ticket: "TKT-88102-A1",
    holder: "Fahad O. · Silver",
    gate: "Gate A",
    scanner: "Huda",
    result: "Valid",
  },
  {
    time: "21:41:47",
    ticket: "TKT-87990-B2",
    holder: "Already scanned 21:12 at Gate A",
    gate: "Gate B",
    scanner: "Yousef",
    result: "Already scanned",
  },
  {
    time: "21:41:30",
    ticket: "TKT-88231-D7",
    holder: "Noura Q. · VIP",
    gate: "VIP",
    scanner: "Salem",
    result: "Valid",
  },
  {
    time: "21:41:22",
    ticket: "TKT-88377-A9",
    holder: "Majed R. · Silver",
    gate: "Gate A",
    scanner: "Huda",
    result: "Valid",
  },
  {
    time: "21:41:10",
    ticket: "TKT-81222-F2",
    holder: "Ticket is for Winter Nights (12 Nov)",
    gate: "Gate B",
    scanner: "Yousef",
    result: "Wrong event",
  },
  {
    time: "21:40:58",
    ticket: "TKT-88018-B5",
    holder: "Aisha K. · Gold",
    gate: "Gate B",
    scanner: "Yousef",
    result: "Valid",
  },
  {
    time: "21:40:44",
    ticket: "TKT-86544-B1",
    holder: "Refunded 18 Aug — no longer valid",
    gate: "Gate A",
    scanner: "Huda",
    result: "Refunded",
  },
  {
    time: "21:40:41",
    ticket: "TKT-88290-C2",
    holder: "Tariq S. · Silver",
    gate: "Gate A",
    scanner: "Huda",
    result: "Valid",
  },
]
