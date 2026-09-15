import { api } from '@/services/api'
import type { ApiEnvelope, EventCategory, EventDetail, EventListItem, PaginatedEnvelope, Venue } from '@/types/event'

// Organizers only monitor events now — an admin creates and assigns them
// (see myticket-new-api's admin.php `/event/assign-organizer`). No
// create/update/delete here, on purpose: there's nothing on the backend
// for an organizer to call.
export const eventsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEventCategories: build.query<EventCategory[], void>({
      query: () => '/organizer/category',
      transformResponse: (response: ApiEnvelope<EventCategory[]>) => response.data,
      providesTags: ['EventCategories'],
    }),

    getVenues: build.query<Venue[], void>({
      query: () => '/organizer/venue',
      transformResponse: (response: ApiEnvelope<Venue[]>) => response.data,
      providesTags: ['Venues'],
    }),

    getEvents: build.query<
      PaginatedEnvelope<EventListItem[]>,
      {
        page?: number
        search?: string
        status?: string
        category?: string
        free?: 'true' | 'false'
        from?: string
        to?: string
      }
    >({
      query: ({ page = 1, search, status, category, free, from, to }) => {
        const params = new URLSearchParams({ page: String(page) })
        if (search) params.set('search', search)
        if (status) params.set('status', status)
        if (category) params.set('category', category)
        if (free) params.set('free', free)
        if (from) params.set('from', from)
        if (to) params.set('to', to)
        return `/organizer/event?${params.toString()}`
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((event) => ({ type: 'Events' as const, id: event.id })),
              { type: 'Events' as const, id: 'LIST' },
            ]
          : [{ type: 'Events' as const, id: 'LIST' }],
    }),

    getEvent: build.query<EventDetail, number>({
      query: (id) => `/organizer/event/${id}`,
      transformResponse: (response: ApiEnvelope<EventDetail>) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Events', id }],
    }),
  }),
})

export const { useGetEventCategoriesQuery, useGetVenuesQuery, useGetEventsQuery, useGetEventQuery } = eventsApi
