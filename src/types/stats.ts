export type StatsScope = 'platform' | 'organizer' | 'event'

export interface StatsTotals {
  grossSales: number
  refunds: number
  refundedOrders: number
  netSales: number
  platformCommission: number
  organizerShare: number
  transferredOut: number
  balanceHeld: number
  paidOrders: number
  ticketsSold: number
  ticketsScanned: number
  /** Null when nothing was sold — a scan rate out of zero is not zero. */
  scanRate: number | null
  averageOrderValue: number
}

export interface StatsTrendPoint {
  date: string
  netSales: number
  ticketsSold: number
}

export interface StatsBreakdownRow {
  label: string
  value: number
  tickets: number
}

export interface StatsResponse {
  scope: StatsScope
  scopeId: number | null
  from: string
  to: string
  totals: StatsTotals
  /** The same figures for the window immediately before, for the deltas. */
  previousTotals: StatsTotals
  trend: StatsTrendPoint[]
  breakdown: {
    by: 'ticketType' | 'event' | 'category'
    rows: StatsBreakdownRow[]
  }
  counters: {
    usersByRole: Record<string, number>
    events: { total: number; upcoming: number }
  } | null
}
