export interface ScannerEvent {
  id: string
  title: string
  detail: string
  live: boolean
  gates: string[]
}

export const scannerAssignedEvents: ScannerEvent[] = [
  {
    id: "comedy",
    title: "Jeddah Comedy Night",
    detail: "City Walk Arena · doors 19:30–22:30",
    live: true,
    gates: ["Gate B", "Gate A", "VIP"],
  },
  {
    id: "winter",
    title: "Winter Nights: Amr Diab Live",
    detail: "Boulevard City · Thu 12 Nov · not started",
    live: false,
    gates: [],
  },
]

export const scannerRecentLogs = [
  { time: "21:43:51", ticket: "TKT-88102-A1", result: "Valid" },
  { time: "21:43:12", ticket: "TKT-88399-C1", result: "Valid · queued" },
  { time: "21:42:40", ticket: "TKT-81222-F2", result: "Wrong event" },
]

export type ScannerOutcomeId =
  | "valid"
  | "already"
  | "wrong-event"
  | "cancelled"
  | "refunded"
  | "resold"
  | "reentry"

export interface ScannerOutcome {
  id: ScannerOutcomeId
  time: string
  eventLine: string
  connection: "online" | "offline"
  tone: "success" | "danger"
  icon: "check" | "x" | "pin" | "prohibit" | "refund" | "resold"
  title: string
  detail: string
  note: string
  showViewport?: boolean
  showOfflineBanner?: boolean
  showCounters?: boolean
  showRecent?: boolean
  showDismiss?: boolean
}

export const scannerOutcomes: Record<ScannerOutcomeId, ScannerOutcome> = {
  valid: {
    id: "valid",
    time: "21:42",
    eventLine: "Jeddah Comedy Night · Gate B",
    connection: "online",
    tone: "success",
    icon: "check",
    title: "Valid — let in",
    detail: "Sara A. · Gold · TKT-88410-C4",
    note: "First scan · single-entry event",
    showViewport: true,
    showCounters: true,
  },
  already: {
    id: "already",
    time: "21:44",
    eventLine: "Jeddah Comedy Night · Gate B",
    connection: "offline",
    tone: "danger",
    icon: "x",
    title: "Already scanned",
    detail: "TKT-87990-B2 · scanned 21:12 at Gate A",
    note: "Single-entry event — do not admit. Direct the holder to the box office.",
    showOfflineBanner: true,
    showRecent: true,
    showDismiss: true,
  },
  "wrong-event": {
    id: "wrong-event",
    time: "22:03",
    eventLine: "Winter Nights · Gate A",
    connection: "online",
    tone: "danger",
    icon: "pin",
    title: "Wrong event",
    detail: "TKT-81222-F2 · issued for Riyadh Season Fireworks",
    note: "This ticket is for a different event — it can't be scanned here.",
    showRecent: true,
    showDismiss: true,
  },
  cancelled: {
    id: "cancelled",
    time: "22:05",
    eventLine: "Jeddah Comedy Night · Gate B",
    connection: "online",
    tone: "danger",
    icon: "prohibit",
    title: "Ticket cancelled",
    detail: "TKT-88220-D1 · cancelled by the organizer 2 days ago",
    note: "This ticket was cancelled and is no longer valid — do not admit.",
    showRecent: true,
    showDismiss: true,
  },
  refunded: {
    id: "refunded",
    time: "22:07",
    eventLine: "Jeddah Comedy Night · Gate B",
    connection: "online",
    tone: "danger",
    icon: "refund",
    title: "Ticket refunded",
    detail: "TKT-87765-B9 · refunded 09:14 today",
    note: "This ticket was refunded and is no longer valid — do not admit.",
    showRecent: true,
    showDismiss: true,
  },
  resold: {
    id: "resold",
    time: "22:09",
    eventLine: "Jeddah Comedy Night · Gate B",
    connection: "online",
    tone: "danger",
    icon: "resold",
    title: "Resold — code replaced",
    detail: "TKT-88410-C1 · resold Tue, new ticket issued",
    note: "A newer ticket was issued when this one was resold. This code no longer admits — ask for the current ticket.",
    showRecent: true,
    showDismiss: true,
  },
  reentry: {
    id: "reentry",
    time: "22:11",
    eventLine: "Jeddah Comedy Night · Gate B",
    connection: "online",
    tone: "danger",
    icon: "x",
    title: "Already scanned",
    detail: "TKT-88099-E2 · scanned 20:47 at Gate A",
    note: "Single-entry event — this ticket already admitted someone at Gate A. Do not admit again.",
    showRecent: true,
    showDismiss: true,
  },
}

export const scannerOutcomeOrder: ScannerOutcomeId[] = [
  "valid",
  "already",
  "wrong-event",
  "cancelled",
  "refunded",
  "resold",
  "reentry",
]
