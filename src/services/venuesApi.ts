import { api } from '@/services/api'
import type { ApiEnvelope, City, Venue } from '@/types/event'

export interface VenueFormValues {
  name: string
  cityId: number | ''
  address: string
  latitude: string
  longitude: string
}

// Organizers add venues from the event form, as admins do. The API puts them
// in the same shared list the event form's venue picker reads.
export const venuesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCities: build.query<City[], void>({
      query: () => '/generals/cities',
      transformResponse: (response: ApiEnvelope<City[]>) => response.data,
    }),

    createVenue: build.mutation<Venue, VenueFormValues>({
      query: (values) => ({
        url: '/organizer/venue',
        method: 'POST',
        body: {
          name: values.name,
          city_id: values.cityId || undefined,
          address: values.address || undefined,
          latitude: values.latitude || undefined,
          longitude: values.longitude || undefined,
        },
      }),
      transformResponse: (response: ApiEnvelope<Venue>) => response.data,
      invalidatesTags: ['Venues'],
    }),
  }),
})

export const { useGetCitiesQuery, useCreateVenueMutation } = venuesApi
