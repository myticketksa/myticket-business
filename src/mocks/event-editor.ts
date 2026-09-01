import type { EventEditorValues } from "@/schemas/event-editor"
import type { AreaRailState } from "@/components/biz/area-rail-item"

export const eventEditorCategoryOptions = [
  { value: "concert-live", label: "Concert & live music" },
]

export const winterNightsEditorValues: EventEditorValues = {
  title: "Winter Nights: Amr Diab Live",
  shortSummary:
    "An intimate winter evening with Amr Diab, live at Boulevard City Amphitheatre.",
  description:
    "Amr Diab returns to Riyadh for a single winter performance at Boulevard City Amphitheatre — a full band set spanning three decades of his catalogue, staged in the round for a fully seated audience.",
  category: "concert-live",
  promoVideo: "https://youtu.be/amr-diab-winter-nights",
  starts: "Thu 12 Nov 2026 · 20:00",
  ends: "Thu 12 Nov 2026 · 23:00",
  repetition: "one-time",
  scanning: "single",
  entryInstructions:
    "Doors open 18:30. Enter via Gate A or Gate B — VIP holders use the dedicated VIP gate. Government-issued ID must match the name on the ticket.",
  refunds: "cutoff",
  platformFeeRefundable: false,
}

export const emptyEventEditorValues: EventEditorValues = {
  title: "",
  shortSummary: "",
  description: "",
  category: "",
  promoVideo: "",
  starts: "",
  ends: "",
  repetition: "one-time",
  scanning: "single",
  entryInstructions: "",
  refunds: "cutoff",
  platformFeeRefundable: false,
}

export const eventEditorGates = ["Gate A", "Gate B", "VIP Gate"] as const

export const additionalImageCaptions = [
  "crowd shot",
  "stage render",
  "venue exterior",
] as const

export const editorEventRef = "EV-88412"

export const editorHeadMeta =
  "Thu 12 Nov · 20:00 · Boulevard City Amphitheatre, Riyadh"

export const editorMissingNote = "3 items are still missing"

export const editorTimezoneNote = {
  before: "Shown to everyone in ",
  strong: "Arabia Standard Time (AST, UTC+3)",
  after: ", converted automatically for buyers elsewhere.",
}

export const editorVenue = {
  name: "Boulevard City Amphitheatre",
  address:
    "Boulevard Riyadh City, King Abdullah Financial District · Riyadh, Riyadh Region",
  facts: "Capacity 8,000 · saved venue, used in 4 previous events",
}

export const editorReadiness = {
  title: "Ready to submit",
  meta: "6 of 9 areas",
  percent: 62,
  blockers: [
    "Silver ticket needs a quantity",
    "Sale window has no end date",
    "214 seats have no ticket type",
  ],
  footnote:
    "When everything is complete, your event goes to MyTicket for review — only the company can make it public.",
}

export const editorAreas: {
  id: string
  label: string
  state: AreaRailState
  number?: string
  count?: string
}[] = [
  { id: "area-basics", label: "Basics", state: "complete" },
  { id: "area-schedule", label: "Schedule", state: "complete" },
  { id: "area-venue", label: "Venue", state: "complete" },
  { id: "area-tickets", label: "Tickets", state: "error", number: "4", count: "2" },
  { id: "area-seating", label: "Seating", state: "incomplete", number: "5" },
  { id: "area-refunds", label: "Refund policy", state: "complete" },
  { id: "area-lineup", label: "Lineup", state: "complete" },
  { id: "area-entry", label: "Entry", state: "complete" },
  {
    id: "area-review",
    label: "Review & submit",
    state: "incomplete",
    number: "9",
  },
]

export const editorTicketTypes: {
  name: string
  desc: string
  price: string
  quantity: string
  sold: string
  revenue: string
  onSale: boolean
  error?: boolean
}[] = [
  {
    name: "VIP",
    desc: "Front sections · meet & greet",
    price: "SAR 850.00",
    quantity: "200",
    sold: "0",
    revenue: "SAR 0.00",
    onSale: true,
  },
  {
    name: "Gold",
    desc: "Sections A–B",
    price: "SAR 280.00",
    quantity: "1,200",
    sold: "0",
    revenue: "SAR 0.00",
    onSale: true,
  },
  {
    name: "Silver",
    desc: "Quantity missing — required before submitting",
    price: "SAR 180.00",
    quantity: "—",
    sold: "0",
    revenue: "SAR 0.00",
    onSale: false,
    error: true,
  },
]

export const editorLineupTalents = [
  {
    initials: "AD",
    name: "Amr Diab",
    role: "Musician · headliner",
    billing: "Headline performance",
  },
]

export const editorLineupVendors = [
  {
    initials: "LC",
    name: "Layla Catering",
    role: "Catering",
    billing: "VIP hospitality catering",
  },
  {
    initials: "SB",
    name: "Sonic Bloom AV",
    role: "Audio-visual",
    billing: "Full PA & stage lighting",
  },
]

export const editorReviewChecks: {
  label: string
  done: boolean
  note?: string
}[] = [
  { label: "1 · Basics", done: true },
  { label: "2 · Schedule", done: true },
  { label: "3 · Venue", done: true },
  { label: "4 · Tickets", done: false, note: "2 items missing" },
  { label: "5 · Seating", done: false, note: "214 seats unassigned" },
  { label: "6 · Refund policy", done: true },
  { label: "7 · Lineup", done: true },
  { label: "8 · Entry", done: true },
  { label: "9 · Review & submit", done: false },
]

export const editorRefundPreview = {
  kicker: "Exactly what your customers will read",
  body: "Refunds are available until 72 hours before the event starts. The MyTicket platform fee is not refundable. Refunds are processed by MyTicket to the original payment method.",
  footnote:
    "You are writing customer-facing terms. MyTicket decides and executes every refund under this policy.",
}

export const editorSubmitNote =
  "Once submitted, MyTicket reviews it — only the company can make it public. You'll be told immediately if anything changes."

export const editorPublicPreviewMeta =
  "Thu 12 Nov · Boulevard City Amphitheatre · SAR 180–850"

export function eventEditorValuesFor(eventId: string): EventEditorValues {
  if (eventId === "winter-nights") {
    return { ...winterNightsEditorValues }
  }

  if (eventId === "jeddah-comedy") {
    return {
      ...emptyEventEditorValues,
      title: "Jeddah Comedy Night",
    }
  }

  return { ...emptyEventEditorValues }
}
