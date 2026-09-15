import { api } from '@/services/api'
import type { Cashier } from '@/types/cashier'
import type { PaginatedEnvelope } from '@/types/event'

export interface CashierFormValues {
  name?: string
  email?: string
  password?: string
}

export const cashierApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCashiers: build.query<PaginatedEnvelope<Cashier[]>, { page?: number; search?: string }>({
      query: ({ page = 1, search }) =>
        `/organizer/cashier?page=${page}${search ? `&search=${encodeURIComponent(search)}` : ''}`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((cashier) => ({ type: 'Cashiers' as const, id: cashier.id })),
              { type: 'Cashiers' as const, id: 'LIST' },
            ]
          : [{ type: 'Cashiers' as const, id: 'LIST' }],
    }),

    createCashier: build.mutation<void, CashierFormValues>({
      query: (body) => ({
        url: '/organizer/cashier',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Cashiers', id: 'LIST' }],
    }),

    updateCashier: build.mutation<void, { id: number; values: CashierFormValues }>({
      query: ({ id, values }) => ({
        url: `/organizer/cashier/${id}`,
        method: 'PUT',
        body: values,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Cashiers', id },
        { type: 'Cashiers', id: 'LIST' },
      ],
    }),

    deleteCashier: build.mutation<void, number>({
      query: (id) => ({
        url: `/organizer/cashier/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Cashiers', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetCashiersQuery,
  useCreateCashierMutation,
  useUpdateCashierMutation,
  useDeleteCashierMutation,
} = cashierApi
