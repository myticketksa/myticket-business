export const attendanceSub =
  "Final figures for a finished event — who actually turned up, when, and through which gate."

export const attendanceEventLabel = "Autumn Jazz Evening · ended 9 Aug"

export const attendanceHistory = {
  lead: "Against your history:",
  body: "92% attendance is your second-best rate across 14 finished events (average 84%). Seated indoor events consistently outperform your outdoor festivals by ~9 points.",
}

export const attendanceKpis: {
  label: string
  value: string
  note: string
  valueTone: "ink" | "success" | "danger"
}[] = [
  { label: "Tickets sold", value: "870", note: "of 900 capacity", valueTone: "ink" },
  {
    label: "Actually attended",
    value: "800",
    note: "scanned at the door",
    valueTone: "ink",
  },
  {
    label: "Attendance rate",
    value: "92%",
    note: "your average is 84%",
    valueTone: "success",
  },
  {
    label: "No-shows",
    value: "70",
    note: "8% of ticket holders",
    valueTone: "danger",
  },
]

export const attendanceArrivalMeta =
  "doors 18:00 · show 20:00 · 15-min buckets"

export const attendanceArrivalCaption =
  "Peak 19:30–19:45 — 96 people in 15 minutes. 8% arrived after the show started."

export const attendanceArrivalBars = [
  { time: "18:00", count: "22", value: 22, peak: false },
  { time: "18:15", count: "35", value: 35, peak: false },
  { time: "18:30", count: "48", value: 48, peak: false },
  { time: "18:45", count: "61", value: 61, peak: false },
  { time: "19:00", count: "74", value: 74, peak: false },
  { time: "19:15", count: "88", value: 88, peak: false },
  { time: "19:30", count: "96", value: 96, peak: true },
  { time: "19:45", count: "92", value: 92, peak: true },
  { time: "20:00", count: "78", value: 78, peak: false },
  { time: "20:15", count: "41", value: 41, peak: false },
  { time: "20:30", count: "24", value: 24, peak: false },
  { time: "20:45", count: "12", value: 12, peak: false },
]

export const attendanceByType = [
  { name: "VIP", value: "96 / 100 · 96%", percent: 96 },
  { name: "Gold", value: "462 / 490 · 94%", percent: 94 },
  { name: "Silver", value: "242 / 280 · 86%", percent: 86 },
]

export const attendanceByGate = [
  { name: "Main entrance", value: "612 scans", percent: 100 },
  { name: "VIP entrance", value: "188 scans", percent: 31 },
]
