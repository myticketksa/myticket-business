import { api } from '@/services/api'
import type { ApiEnvelope, PaginatedEnvelope } from '@/types/event'
import type { MyBalance, Transfer } from '@/types/payout'

// Read-only, on purpose — only an admin moves money (see myticket-new-api's
// Admin\BalanceService). An organizer gets to see where things stand, not a
// transfer/reverse action.
export const payoutApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyBalance: build.query<MyBalance, void>({
      query: () => '/organizer/balance',
      transformResponse: (response: ApiEnvelope<MyBalance>) => response.data,
      providesTags: [{ type: 'Transfers', id: 'BALANCE' }],
    }),

    getTransferHistory: build.query<PaginatedEnvelope<Transfer[]>, { page?: number }>({
      query: ({ page = 1 }) => `/organizer/balance/transfers?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((transfer) => ({ type: 'Transfers' as const, id: transfer.id })),
              { type: 'Transfers' as const, id: 'LIST' },
            ]
          : [{ type: 'Transfers' as const, id: 'LIST' }],
    }),
  }),
})

export const { useGetMyBalanceQuery, useGetTransferHistoryQuery } = payoutApi
