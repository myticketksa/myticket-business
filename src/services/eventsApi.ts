import { buildFormData } from '@/lib/buildFormData'
import { localInputToUtc } from '@/lib/datetime'
import type { EventFormValues } from '@/schemas/event.schema'
import { api } from '@/services/api'
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

function toCreatePayload(values: EventFormValues) {
  return {
    category_id: values.categoryId,
    venue_id: values.venueId,
    seeting_type: values.seatingType,
    is_free: values.isFree,
    // Datetime boxes hold local wall time; the API stores UTC. See lib/datetime.
    starts_at: localInputToUtc(values.startsAt),
    ends_at: localInputToUtc(values.endsAt),
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
    // No myticketCommission/is_featured/status here — those are the
    // platform's own call. The backend ignores or refuses them from this
    // side (see Organizer\EventService).
  }
}

// The update endpoint only accepts this subset (see UpdateEventRequest on the backend) —
// category, venue, seating type, free flag, discounts and ticket types can't be
// changed after creation, and status is admin-only.
function toUpdatePayload(values: EventFormValues) {
  return {
    starts_at: localInputToUtc(values.startsAt),
    ends_at: localInputToUtc(values.endsAt),
    sales_start_at: localInputToUtc(values.salesStartAt),
    sales_end_at: localInputToUtc(values.salesEndAt),
    min_age: values.minAge || undefined,
    translations: toTranslationsArray(values.translations),
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
    createEvent: build.mutation<EventDetail, EventFormValues>({
      query: (values) => ({
        url: '/organizer/event',
        method: 'POST',
        body: buildFormData(toCreatePayload(values)),
      }),
      transformResponse: (response: ApiEnvelope<EventDetail>) => response.data,
      invalidatesTags: [{ type: 'Events', id: 'LIST' }],
    }),

    updateEvent: build.mutation<EventDetail, { id: number; values: EventFormValues }>({
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
