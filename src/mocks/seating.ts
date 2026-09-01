export type SeatKind =
  | "sold"
  | "held"
  | "vip"
  | "gold"
  | "silver"
  | "unassigned"
  | "override"
  | "disabled"

export type LayoutMode = "free" | "rows" | "sections"

export type LegendKind = SeatKind | "selected"

export interface MapSeat {
  kind: SeatKind
  selected: boolean
}

export interface SeatRow {
  label: string
  seats: MapSeat[]
}

export interface SeatSection {
  id: string
  title: string
  meta: string
  swatch: "vip" | "gold" | "silver"
  rows: SeatRow[]
}

export const seatingTiers = [
  { id: "gold" as const, label: "Gold · SAR 280", swatch: "gold" as const },
  { id: "vip" as const, label: "VIP · SAR 850", swatch: "vip" as const },
  { id: "silver" as const, label: "Silver · SAR 180", swatch: "silver" as const },
]

export const seatingLegend: {
  id: LegendKind
  label: string
  note: string
  count: string
}[] = [
  {
    id: "sold",
    label: "Sold — locked",
    note: "locked — cannot restructure",
    count: "7,240",
  },
  {
    id: "held",
    label: "Held in checkout",
    note: "locked while held",
    count: "18",
  },
  {
    id: "vip",
    label: "VIP · SAR 850",
    note: "carries type colour",
    count: "200",
  },
  {
    id: "gold",
    label: "Gold · SAR 280",
    note: "carries type colour",
    count: "1,200",
  },
  {
    id: "silver",
    label: "Silver · SAR 180",
    note: "carries type colour",
    count: "6,386",
  },
  {
    id: "selected",
    label: "Selected",
    note: "in current selection",
    count: "24",
  },
  {
    id: "unassigned",
    label: "Unassigned",
    note: "assign a ticket type",
    count: "214",
  },
  {
    id: "override",
    label: "Price override",
    note: "individual price set",
    count: "12",
  },
  {
    id: "disabled",
    label: "Disabled",
    note: "not sellable",
    count: "40",
  },
]

export const seatingStats = [
  { value: "8,000", label: "total", tone: "ink" as const },
  { value: "7,786", label: "assigned", tone: "success" as const },
  { value: "214", label: "unassigned", tone: "danger" as const },
  { value: "7,240", label: "sold", tone: "ink" as const },
  { value: "18", label: "held in checkout", tone: "ink" as const },
]

export const seatingLockBody =
  "Structure is locked: 7,240 seats are sold and 18 are held in checkouts. You can still assign types to unassigned seats, override prices, and disable unsold seats — but the layout can't be regenerated or reshaped, and sold or held seats can't be changed at all."

export const seatingLockedLayoutNote =
  "Layout type can't change after a sale. Duplicate the event to start a new layout."

export const seatingUnlockedLayoutNote =
  "Layout type can be changed freely — this locks the moment the first seat sells."

export const seatingBlockedReason =
  "Blocked: 7,240 seats are sold. Regenerating would destroy sold seats."

export const seatingBlockedFoot =
  "Disabled because seats have sold — regenerating would destroy sold seats. This becomes available again only on an event with no sales."

export const seatingRegenNote =
  "Regenerating clears the current layout and reassigns every seat — safe until any seat sells."

export const seatingHint =
  "Select seats by clicking, or drag for a range · shift-click extends"

export const seatingVenueLine = "Boulevard City Amphitheatre · capacity 8,000"

const seatCode: Record<string, SeatKind | "selected"> = {
  S: "sold",
  H: "held",
  V: "vip",
  G: "gold",
  I: "silver",
  C: "selected",
  U: "unassigned",
  O: "override",
  D: "disabled",
}

function expand(pattern: string, selectedKind: SeatKind): MapSeat[] {
  return pattern.split("").map((code) => {
    const mapped = seatCode[code]
    if (!mapped) {
      throw new Error(`Unknown seat code: ${code}`)
    }
    if (mapped === "selected") {
      return { kind: selectedKind, selected: true }
    }
    return { kind: mapped, selected: false }
  })
}

/** Schematic map from Figma 298:5394 — not a full 8,000-seat model. */
export const seatingSections: SeatSection[] = [
  {
    id: "vip",
    title: "Section VIP",
    meta: "3 rows × 10 · mostly sold",
    swatch: "vip",
    rows: [
      { label: "A", seats: expand("SSSSSSSSSS", "vip") },
      { label: "B", seats: expand("SSSSSSSSSV", "vip") },
      { label: "C", seats: expand("SSVSSSSVSS", "vip") },
    ],
  },
  {
    id: "gold",
    title: "Section Gold",
    meta: "4 rows × 16 · selection active in row G",
    swatch: "gold",
    rows: [
      { label: "D", seats: expand("GGOGGGGSSGGGGOGG", "gold") },
      { label: "E", seats: expand("GGGGGGGSGSGGGGGG", "gold") },
      { label: "F", seats: expand("GGGGCCCCCCCCGGGG", "gold") },
      { label: "G", seats: expand("CCCCCCCCCCCCCCCC", "gold") },
    ],
  },
  {
    id: "silver",
    title: "Section Silver",
    meta: "5 rows × 20 · 214 unassigned at the back, 40 disabled (camera platform)",
    swatch: "silver",
    rows: [
      { label: "H", seats: expand("IIIIIIIIIIIIIIIIIIII", "silver") },
      { label: "J", seats: expand("IIIIIIIIIIIIIIIIIIII", "silver") },
      { label: "K", seats: expand("IIIIIIIIIHHIIIIIIIII", "silver") },
      { label: "L", seats: expand("IIIIIIUUUUUUUUIIIIII", "silver") },
      { label: "M", seats: expand("UUUUUUUUDDDDUUUUUUUU", "silver") },
    ],
  },
]

export function cloneSeatingSections(): SeatSection[] {
  return seatingSections.map((section) => ({
    ...section,
    rows: section.rows.map((row) => ({
      ...row,
      seats: row.seats.map((seat) => ({ ...seat })),
    })),
  }))
}

export const freeSeatingZones = [
  { label: "VIP standing", capacity: "300", tone: "vip" as const },
  { label: "General floor", capacity: "2,600", tone: "gold" as const },
]

export const rowsGridMeta = {
  rows: "12",
  seatsPerRow: "24",
  bands: [
    { label: "Front (1–6) · SAR 220", tone: "gold" as const },
    { label: "Rear (7–12) · SAR 140", tone: "silver" as const },
  ],
}

type MiniSeat = "front" | "rear" | "sold" | "unassigned"

function mini(pattern: string): MiniSeat[] {
  return pattern.split("").map((code) => {
    if (code === "F") return "front"
    if (code === "R") return "rear"
    if (code === "S") return "sold"
    return "unassigned"
  })
}

/** Compact 12×20 schematic from Figma 298:6258 (label says 24 seats / row). */
export const rowsGridRows: { label: string; seats: MiniSeat[] }[] = [
  { label: "1", seats: mini("FFSSFFFFFFFFFFSFFFFF") },
  { label: "2", seats: mini("FFFFFSFFFFFFFFFFFFFF") },
  { label: "3", seats: mini("FFFFFFFFFFFFFFFFFFFF") },
  { label: "4", seats: mini("FFFFFFFFFFFFFFFFFFFF") },
  { label: "5", seats: mini("FFFFFFFFFFFFFFFFFFFF") },
  { label: "6", seats: mini("FFFFFFFFFFFFFFFFFFFF") },
  { label: "7", seats: mini("RRRRRRRRRRRRRRRRRRRR") },
  { label: "8", seats: mini("RRRRRRRRRRRRRRRRRRRR") },
  { label: "9", seats: mini("RRRRRRRRRRRRRRRRRRRR") },
  { label: "10", seats: mini("UURRRRRRRRRRRRRRRRUU") },
  { label: "11", seats: mini("RRRRRRRRRRRRRRRRRRRR") },
  { label: "12", seats: mini("RRRRRRRUUURRRRRRRRRR") },
]
