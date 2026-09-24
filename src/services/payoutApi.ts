import { api } from '@/services/api'
import type { ApiEnvelope, PaginatedEnvelope } from '@/types/event'
import type { MyBalance, Settlement } from '@/types/payout'

// Read-only, on purpose — only an admin moves money (see myticket-new-api's
// Admin\SettlementService). An organizer gets to see where things stand, not
// a settle/reverse action.
export const payoutApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyBalance: build.query<MyBalance, void>({
      query: () => '/organizer/balance',
      transformResponse: (response: ApiEnvelope<MyBalance>) => response.data,
      providesTags: [{ type: 'Transfers', id: 'BALANCE' }],
    }),

    getSettlementHistory: build.query<PaginatedEnvelope<Settlement[]>, { page?: number }>({
      query: ({ page = 1 }) => `/organizer/balance/settlements?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((settlement) => ({ type: 'Transfers' as const, id: settlement.id })),
              { type: 'Transfers' as const, id: 'LIST' },
            ]
          : [{ type: 'Transfers' as const, id: 'LIST' }],
    }),

    // Blob response, not JSON — the route needs the Bearer header, which a
    // plain `<a href>` can't attach.
    getSettlementReceipt: build.query<Blob, number>({
      query: (id) => ({
        url: `/organizer/balance/settlements/${id}/receipt`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
})

export const { useGetMyBalanceQuery, useGetSettlementHistoryQuery, useLazyGetSettlementReceiptQuery } = payoutApi
