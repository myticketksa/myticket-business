export interface OrganizerAttentionItem {
  id: string
  title: string
  body: string
  meta: string
  action: string
  href: string
  tone: "danger" | "brand" | "canvas"
  icon: "warning" | "lock" | "qr" | "hourglass" | "chat"
}

export interface OrganizerHomeEventRow {
  id: string
  month: string
  day: string
  title: string
  detail: string
  status: string
  sold: string
  percent: number
}

export interface OrganizerActivityItem {
  id: string
  body: string
  time: string
  tone: "success" | "brand" | "info"
  icon: "ticket" | "qr" | "handshake" | "star" | "refund"
}

export interface OrganizerHomeKpi {
  label: string
  value: string
  trend: string
  trendTone: "success" | "muted"
  note?: string
  icon: "ticket" | "coins" | "bank" | "calendar"
  showTrendIcon?: boolean
}

export const organizerHomeKpis: OrganizerHomeKpi[] = [
  {
    label: "Tickets sold · 30d",
    value: "12,418",
    trend: "18%",
    trendTone: "success" as const,
    note: "vs previous 30 days",
    icon: "ticket" as const,
  },
  {
    label: "Gross revenue · 30d",
    value: "SAR 1.84M",
    trend: "12%",
    trendTone: "success" as const,
    note: "vs previous 30 days",
    icon: "coins" as const,
  },
  {
    label: "Net after fees · 30d",
    value: "SAR 1.66M",
    trend: "fees SAR 184,120",
    trendTone: "muted" as const,
    icon: "bank" as const,
  },
  {
    label: "Upcoming events",
    value: "6",
    trend: "1 live now",
    trendTone: "success" as const,
    note: "· 2 on sale",
    icon: "calendar" as const,
    showTrendIcon: false,
  },
]

export const organizerAttentionItems: OrganizerAttentionItem[] = [
  {
    id: "declined",
    title: "“Desert Beats Festival” was declined",
    body: "Reason: ticket sale window ends after the event starts. Fix the sales window and resubmit.",
    meta: "2h ago",
    action: "Open event",
    href: "/app/events",
    tone: "danger",
    icon: "warning",
  },
  {
    id: "payout",
    title: "Payout of SAR 84,210.00 is held",
    body: "Missing: Commercial Registration certificate. Bank account and VAT certificate are verified.",
    meta: "1d",
    action: "Upload",
    href: "/app/finance",
    tone: "danger",
    icon: "lock",
  },
  {
    id: "scanners",
    title: "Winter Nights has no scanners assigned",
    body: "Doors open in 3 days. Without scanners, tickets can't be checked at the gate.",
    meta: "3d to doors",
    action: "Assign",
    href: "/app/scanners",
    tone: "brand",
    icon: "qr",
  },
  {
    id: "review",
    title: "“New Year Gala” is under review",
    body: "Submitted Thu · usually decided within 2 working days. Editing it restarts the review.",
    meta: "2d",
    action: "View",
    href: "/app/events",
    tone: "brand",
    icon: "hourglass",
  },
  {
    id: "hire",
    title: "DJ Khalid Noor hasn't answered your request",
    body: "Hire request for Winter Nights. Consider a follow-up or another artist.",
    meta: "waiting 4d",
    action: "Open thread",
    href: "/app/hire-requests",
    tone: "canvas",
    icon: "chat",
  },
]

export const organizerLiveEvent = {
  title: "Jeddah Comedy Night",
  detail: "Doors opened 19:30 · City Walk Arena, Jeddah",
  scanned: "1,246",
  capacity: "/ 1,600 in",
  scannedNote: "78% scanned ·",
  percent: 78,
  href: "/app/live-door",
}

export const organizerHomeEvents: OrganizerHomeEventRow[] = [
  {
    id: "winter-nights",
    month: "Nov",
    day: "12",
    title: "Winter Nights: Amr Diab Live",
    detail: "Boulevard City Amphitheatre, Riyadh · 20:00",
    status: "On sale",
    sold: "7,240 / 8,000",
    percent: 90.5,
  },
  {
    id: "food-truck",
    month: "Nov",
    day: "20",
    title: "Riyadh Food Truck Weekend",
    detail: "King Abdullah Park · 2 days",
    status: "On sale",
    sold: "2,180 / 5,000",
    percent: 43.6,
  },
  {
    id: "gala",
    month: "Dec",
    day: "31",
    title: "New Year Gala 2027",
    detail: "The Ritz Ballroom, Riyadh · 21:00",
    status: "Under review",
    sold: "Sales not open",
    percent: 0,
  },
]

/** Pixel heights from Figma 298:4694 (110px track). Thursday is the peak. */
export const organizerWeekBars = [
  { day: "Sat", height: 42, peak: false },
  { day: "Sun", height: 57, peak: false },
  { day: "Mon", height: 48, peak: false },
  { day: "Tue", height: 77, peak: false },
  { day: "Wed", height: 64, peak: false },
  { day: "Thu", height: 101, peak: true },
  { day: "Fri", height: 88, peak: false },
]

export const organizerHomeActivity: OrganizerActivityItem[] = [
  {
    id: "sale",
    body: "Sara A. bought 2 × Gold — Winter Nights (SAR 588.00)",
    time: "4 min ago",
    tone: "success",
    icon: "ticket",
  },
  {
    id: "scans",
    body: "1,246 scans at Jeddah Comedy Night — 78% of sold",
    time: "live",
    tone: "success",
    icon: "qr",
  },
  {
    id: "hire",
    body: "Layla Catering accepted your hire request",
    time: "1h ago",
    tone: "brand",
    icon: "handshake",
  },
  {
    id: "review",
    body: "New 5★ review on Autumn Jazz Evening",
    time: "3h ago",
    tone: "brand",
    icon: "star",
  },
  {
    id: "refund",
    body: "Refund request on ORD-93371 — handled by MyTicket",
    time: "5h ago",
    tone: "info",
    icon: "refund",
  },
]

export const organizerRefundsNote = {
  lead: "About refunds",
  body: "2 refund requests are open against your events. MyTicket decides and executes all refunds under the policy you set — no action is needed from you.",
}
