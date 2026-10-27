export interface LocalizedText {
  en: string | null
  ar: string | null
}

export interface City {
  id: number
  slug: string
  name: LocalizedText
}

export interface TicketType {
  id: number
  /** In the panel's language; the two below are what the form edits. */
  name: string
  nameEn?: string | null
  nameAr?: string | null
  /** Optional: what this ticket type includes. */
  descriptionEn?: string | null
  descriptionAr?: string | null
  /** The activity it books (every type has one; an ordinary event's is hidden). */
  activityId?: number | null
  price: string
  isSpecialNeeds?: boolean
  isVatIncluded?: boolean
  entryTimeStart?: string | null
  entryTimeEnd?: string | null
  // Both are real columns, but the ticket-type response carries only id, name
  // and price — so treat them as absent rather than assuming a zero.
  quantity_total?: number | null
  quantity_sold?: number | null
  quantity_reserved?: number | null
}

/** One thing to book inside an event, on its own days and times. */
export interface EventActivity {
  id: number
  name: string | null
  nameEn: string | null
  nameAr: string | null
  descriptionEn: string | null
  descriptionAr: string | null
  /** 0 = Sunday … 6 = Saturday; null = every day the event has a date. */
  weekdays: number[] | null
  /** "HH:MM"; empty = the whole day. */
  startTimes: string[]
  durationMinutes: number | null
  /** Places per time, all its ticket types together; null = no limit. */
  capacity: number | null
  ticketTypeIds: number[]
}

/** Only for the event's own organizer (and admins): what the edit form pre-fills from. */
export interface EventManageFields {
  categoryId: number | null
  venueId: number | null
  endsAt: string | null
  discountType: 'fixed' | 'percentage' | null
  discountValue: string | null
  discountStartsAt: string | null
  discountEndsAt: string | null
  hasBookings: boolean
}

export interface OrganizerSummary {
  id: number
  name?: string
  publicPresence?: { publicName?: string | null }
  [key: string]: unknown
}

export interface EventListItem {
  id: number
  title: LocalizedText
  slug: string
  startTime: string
  raters: number
  rating: number | null
  place: string
  latitude: string | number | null
  longitude: string | number | null
  priceFrom: string | number | null
  discountedPrice: string | number | null
  seatingType: 'free' | 'assigned'
  ticketTypes: TicketType[]
  cover: string | null
  /** More photos after the cover, in order. */
  gallery?: string[]
  /** Always open: no end date; open on these weekdays (null = every day). */
  isPermanent?: boolean
  openWeekdays?: number[] | null
  isFeatured: boolean
  isFree: boolean
  /** Hours before the start refunds stay open; null = no refunds. */
  refundUntilHours?: number | null
  created_at: string
  organizer?: OrganizerSummary | null
  adminEvent?: boolean
  talents?: { id: number; performer: { stageName: string | null } }[]
}

export interface EventSession {
  id: number
  startsAt: string
  endsAt: string | null
  discountType: 'fixed' | 'percentage' | null
  discountValue: number | null
  /** Each ticket type on this date and how many are left. */
  /** `remaining` is null for a type with no limit of its own (its activity's places limit it). */
  tickets?: { ticketTypeId: number; remaining: number | null }[]
}

export interface EventDetail extends EventListItem {
  description: LocalizedText
  sessions?: EventSession[]
  activities?: EventActivity[]
  manage?: EventManageFields
}

export interface EventCategory {
  id: number
  name: LocalizedText
  slug: string
  icon: string | null
  created_at: string
}

export interface Venue {
  id: number
  name: string
  address: string | null
  city: { id: number; name?: string } | null
}

export interface Pagination {
  total: number
  count: number
  perPage: number
  currentPage: number
  totalPages: number
}

export interface ApiEnvelope<T> {
  success: boolean
  message: string | null
  data: T
}

export interface PaginatedEnvelope<T> extends ApiEnvelope<T> {
  pagination: Pagination
}
