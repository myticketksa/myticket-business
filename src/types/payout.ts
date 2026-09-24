export interface MyBalance {
  netSales: number
  platformCommission: number
  organizerShare: number
  transferredOut: number
  balanceHeld: number
}

export type SettlementStatus = 'completed' | 'reversed'

export interface Settlement {
  id: number
  eventId: number
  eventTitle: string | null
  organizerId: number
  status: SettlementStatus
  scopeType: 'all_pending' | 'ticket_numbers' | 'cutoff_date' | 'migrated'
  grossAmount: number
  platformAmount: number
  organizerAmount: number
  ticketCount: number
  currency: string
  reference: string | null
  isMigrated: boolean
  createdAt: string
}
