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
  name: string
  price: string
  isSpecialNeeds?: boolean
  isVatIncluded?: boolean
  entryTimeStart?: string | null
  entryTimeEnd?: string | null
  // Both are real columns, but the ticket-type response carries only id, name
  // and price — so treat them as absent rather than assuming a zero.
  quantity_total?: number | null
  quantity_sold?: number | null
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
  short_description: LocalizedText
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
  isFeatured: boolean
  isFree: boolean
  created_at: string
  organizer?: OrganizerSummary | null
  adminEvent?: boolean
  talents?: { id: number; performer: { stageName: string | null } }[]
}

export interface EventDetail extends EventListItem {
  description: LocalizedText
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
