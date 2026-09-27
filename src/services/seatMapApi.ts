import { api } from '@/services/api'
import type { ApiEnvelope } from '@/types/event'
import type { EventSeat, SeatBlock } from '@/types/seatMap'

export const seatMapApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSeatMap: build.query<EventSeat[], number>({
      query: (eventId) => `/organizer/event/${eventId}/seats`,
      transformResponse: (response: ApiEnvelope<EventSeat[]>) => response.data,
      providesTags: (_result, _error, eventId) => [{ type: 'SeatMap' as const, id: eventId }],
    }),

    generateSeatMap: build.mutation<{ created: number }, { eventId: number; blocks: SeatBlock[] }>({
      query: ({ eventId, blocks }) => ({
        url: `/organizer/event/${eventId}/seats`,
        method: 'POST',
        body: { blocks },
      }),
      transformResponse: (response: ApiEnvelope<{ created: number }>) => response.data,
      invalidatesTags: (_result, _error, { eventId }) => [{ type: 'SeatMap' as const, id: eventId }],
    }),

    clearSeatMap: build.mutation<void, number>({
      query: (eventId) => ({
        url: `/organizer/event/${eventId}/seats`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, eventId) => [{ type: 'SeatMap' as const, id: eventId }],
    }),
  }),
})

export const { useGetSeatMapQuery, useGenerateSeatMapMutation, useClearSeatMapMutation } = seatMapApi
