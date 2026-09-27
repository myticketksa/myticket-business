export type SeatStatus = 'available' | 'held' | 'reserved' | 'sold' | 'blocked'

export interface EventSeat {
  id: number
  ticket_type: { id: number; name: string; price: string } | null
  row: string
  section: string | null
  label: string | null
  number: number
  isAccessible: boolean
  price: string
  status: SeatStatus
  created_at: string
}

export interface SeatBlockRow {
  row: string
  seatCount: number
  startNumber?: number
}

export interface SeatBlock {
  ticketTypeId: number
  section?: string
  price?: string
  rows: SeatBlockRow[]
}
