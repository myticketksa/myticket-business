export interface LiveDoorScan {
  time: string
  ticket: string
  detail: string
  gate: string
  result: "Valid" | "Rejected" | "Wrong event"
}

export const liveDoorEventLabel = "Jeddah Comedy Night"

export const liveDoorLiveLabel = "Live · updated just now"

export const liveDoorFeedFooter =
  "Full record in scan history — filterable by result, gate, scanner and time."

export const liveDoorDisconnect = {
  lead: "If this feed disconnects",
  body: "The page never freezes silently. The live badge flips to a full-width “Live connection lost — retrying” banner (#FF9147) with how long ago the last scan arrived. Gate scanning continues offline and reconciles when the connection returns.",
}

export const liveDoorFailedIntro =
  "1.9% of attempts — normal range is under 3%."

export const liveDoorFailedReasons: {
  label: string
  count: string
  tone: "danger" | "muted"
}[] = [
  { label: "Already scanned", count: "14", tone: "danger" },
  { label: "Wrong event", count: "6", tone: "danger" },
  { label: "Refunded ticket", count: "3", tone: "muted" },
  { label: "Unreadable code", count: "1", tone: "muted" },
]

export const liveDoorGates = [
  { name: "Gate A · Huda", value: "512", percent: 85 },
  { name: "Gate B · Yousef", value: "604", percent: 100 },
  { name: "VIP · Salem", value: "130", percent: 22 },
]

export const liveDoorScans: LiveDoorScan[] = [
  {
    time: "21:42:08",
    ticket: "TKT-88410-C4",
    detail: "Sara A. · Gold",
    gate: "Gate B · Yousef",
    result: "Valid",
  },
  {
    time: "21:42:01",
    ticket: "TKT-88102-A1",
    detail: "Fahad O. · Silver",
    gate: "Gate A · Huda",
    result: "Valid",
  },
  {
    time: "21:41:47",
    ticket: "TKT-87990-B2",
    detail: "Already scanned 21:12 at Gate A",
    gate: "Gate B · Yousef",
    result: "Rejected",
  },
  {
    time: "21:41:30",
    ticket: "TKT-88231-D7",
    detail: "Noura Q. · VIP",
    gate: "VIP · Salem",
    result: "Valid",
  },
  {
    time: "21:41:22",
    ticket: "TKT-88377-A9",
    detail: "Majed R. · Silver",
    gate: "Gate A · Huda",
    result: "Valid",
  },
  {
    time: "21:41:10",
    ticket: "TKT-81222-F2",
    detail: "Ticket is for Winter Nights (12 Nov)",
    gate: "Gate B · Yousef",
    result: "Wrong event",
  },
  {
    time: "21:40:58",
    ticket: "TKT-88018-B5",
    detail: "Aisha K. · Gold",
    gate: "Gate B · Yousef",
    result: "Valid",
  },
  {
    time: "21:40:41",
    ticket: "TKT-88290-C2",
    detail: "Tariq S. · Silver",
    gate: "Gate A · Huda",
    result: "Valid",
  },
]
