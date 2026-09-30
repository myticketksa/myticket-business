import { useAppDispatch } from '@/app/hooks'
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

    // Blocked seats stay on the map but can't be booked by anyone.
    setSeatsBlocked: build.mutation<
      { changed: number; skipped: number },
      { eventId: number; seatIds: number[]; blocked: boolean }
    >({
      query: ({ eventId, seatIds, blocked }) => ({
        url: `/organizer/event/${eventId}/seats/block`,
        method: 'POST',
        body: { seatIds, blocked },
      }),
      transformResponse: (response: ApiEnvelope<{ changed: number; skipped: number }>) => response.data,
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

export const { useGetSeatMapQuery, useGenerateSeatMapMutation, useClearSeatMapMutation, useSetSeatsBlockedMutation } = seatMapApi

/**
 * Seats marked reserved in the builder only exist once the map is saved, so
 * they're taken off sale right after: look up the new seats by row and
 * number, then block those.
 */
export function useReserveNewSeats() {
  const dispatch = useAppDispatch()
  const [setSeatsBlocked] = useSetSeatsBlockedMutation()
  return async (eventId: number, positions: { row: string; number: number }[]) => {
    if (positions.length === 0) return
    const request = dispatch(seatMapApi.endpoints.getSeatMap.initiate(eventId, { forceRefetch: true }))
    try {
      const seats = await request.unwrap()
      const wanted = new Set(positions.map((p) => `${p.row}|${p.number}`))
      const seatIds = seats.filter((seat) => wanted.has(`${seat.row}|${seat.number}`)).map((seat) => seat.id)
      if (seatIds.length > 0) await setSeatsBlocked({ eventId, seatIds, blocked: true }).unwrap()
    } finally {
      request.unsubscribe()
    }
  }
}
