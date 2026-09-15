export interface MyBalance {
  netSales: number
  platformCommission: number
  organizerShare: number
  transferredOut: number
  balanceHeld: number
}

export type TransferStatus = 'completed' | 'reversed'

export interface Transfer {
  id: number
  event_id: number
  organizer_id: number
  amount: number
  currency: string
  status: TransferStatus
  created_at: string
  updated_at: string
}
