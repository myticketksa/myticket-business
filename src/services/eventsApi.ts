import { buildFormData } from '@/lib/buildFormData'
import { localInputToUtc } from '@/lib/datetime'
import type { EventFormValues } from '@/schemas/event.schema'
import { api } from '@/services/api'
import type { SeatBlock } from '@/types/seatMap'
import type {
  ApiEnvelope,
  EventCategory,
  EventDetail,
  EventListItem,
  PaginatedEnvelope,
  Venue,
} from '@/types/event'

function toTranslationsArray(translations: EventFormValues['translations']) {
  return [
    {
      locale: 'en',
      title: translations.en.title,
      short_description: translations.en.shortDescription || undefined,
      description: translations.en.description,
    },
    {
      locale: 'ar',
      title: translations.ar.title,
      short_description: translations.ar.shortDescription || undefined,
      description: translations.ar.description,
    },
  ]
}

type WithSeatMap = EventFormValues & { seatMap?: SeatBlock[] }

function toCreatePayload(values: WithSeatMap) {
  return {
    category_id: values.categoryId,
    venue_id: values.venueId,
    seeting_type: values.seatingType,
    is_free: values.isFree,
    // Datetime boxes hold local wall time; the API stores UTC. See lib/datetime.
    starts_at: localInputToUtc(values.startsAt),
    ends_at: localInputToUtc(values.endsAt),
    sales_start_at: localInputToUtc(values.salesStartAt),
    sales_end_at: localInputToUtc(values.salesEndAt),
    min_age: values.minAge || undefined,
    cover_image: values.coverImage,
    discount_type: values.discountType || undefined,
    discount_value: values.discountValue || undefined,
    discount_starts_at: localInputToUtc(values.discountStartsAt),
    discount_ends_at: localInputToUtc(values.discountEndsAt),
    translations: toTranslationsArray(values.translations),
    ticketTypes: values.ticketTypes?.map((ticketType) => ({
      name: ticketType.name,
      is_special_needs: ticketType.isSpecialNeeds ?? false,
      price: ticketType.price,
      is_vat_inclusive: ticketType.isVatIncluded ?? true,
      entry_time_start: ticketType.entryTimeStart || undefined,
      entry_time_end: ticketType.entryTimeEnd || undefined,
      quantity_total: ticketType.quantityTotal,
    })),
    // Seated events are created with their seat map; blocks point at
    // ticket types by their position in the list above.
    // One JSON field, not nested form fields: a big hall would pass the
    // server's 1000-field limit and be cut short.
    seatMap: values.seatMap
      ? JSON.stringify(values.seatMap.map(({ ticketTypeId, ...block }) => ({ ...block, ticketTypeIndex: ticketTypeId })))
      : undefined,
    // No myticketCommission/is_featured/status here — those are the
    // platform's own call. The backend ignores or refuses them from this
    // side (see Organizer\EventService).
  }
}

// Optional fields go as '' when empty so clearing one actually clears it
// on the server (a missing field means "leave unchanged").
function toUpdatePayload(values: WithSeatMap) {
  return {
    category_id: values.categoryId,
    venue_id: values.venueId,
    is_free: values.isFree,
    cover_image: values.coverImage,
    starts_at: localInputToUtc(values.startsAt),
    ends_at: localInputToUtc(values.endsAt) ?? '',
    sales_start_at: localInputToUtc(values.salesStartAt) ?? '',
    sales_end_at: localInputToUtc(values.salesEndAt) ?? '',
    min_age: values.minAge ?? '',
    discount_type: values.discountType || '',
    discount_value: values.discountValue || '',
    discount_starts_at: localInputToUtc(values.discountStartsAt) ?? '',
    discount_ends_at: localInputToUtc(values.discountEndsAt) ?? '',
    seeting_type: values.seatingType,
    seatMap: values.seatMap ? JSON.stringify(values.seatMap) : undefined,
    translations: toTranslationsArray(values.translations),
    // The full list: rows with an id are updated, new rows added, and ones
    // left out removed (the server refuses removing one with sales).
    ticketTypes: values.ticketTypes?.map((ticketType) => ({
      id: ticketType.id,
      name: ticketType.name,
      is_special_needs: ticketType.isSpecialNeeds ?? false,
      price: ticketType.price,
      is_vat_inclusive: ticketType.isVatIncluded ?? true,
      entry_time_start: ticketType.entryTimeStart || undefined,
      entry_time_end: ticketType.entryTimeEnd || undefined,
      quantity_total: ticketType.quantityTotal,
    })),
  }
}

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

    // An organizer with no event yet can create exactly one of their own
    // (the backend refuses a second — see EventService::create). Once they
    // have one, this stops being reachable from the UI, though the guard is
    // enforced server-side either way.
    createEvent: build.mutation<EventDetail, WithSeatMap>({
      query: (values) => ({
        url: '/organizer/event',
        method: 'POST',
        body: buildFormData(toCreatePayload(values)),
      }),
      transformResponse: (response: ApiEnvelope<EventDetail>) => response.data,
      invalidatesTags: [{ type: 'Events', id: 'LIST' }],
    }),

    updateEvent: build.mutation<EventDetail, { id: number; values: WithSeatMap }>({
      query: ({ id, values }) => ({
        url: `/organizer/event/${id}`,
        method: 'POST',
        body: buildFormData(toUpdatePayload(values)),
      }),
      transformResponse: (response: ApiEnvelope<EventDetail>) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Events', id },
        { type: 'Events', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetEventCategoriesQuery,
  useGetVenuesQuery,
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
} = eventsApi
