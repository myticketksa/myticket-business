import { api } from '@/services/api'
import type { ApiEnvelope } from '@/types/event'
import type { StatsResponse } from '@/types/stats'

// Scope/id are decided server-side from the authenticated organizer — see
// Organizer\Service::getStats() in myticket-new-api — so there's nothing to
// pass here but the date window.
export const statsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStats: build.query<StatsResponse, { days?: number; from?: string; to?: string }>({
      query: ({ days, from, to }) => {
        const params = new URLSearchParams()
        if (from) params.set('from', from)
        if (to) params.set('to', to)
        if (!from && days) params.set('days', String(days))
        return `/organizer/stats?${params.toString()}`
      },
      transformResponse: (response: ApiEnvelope<StatsResponse>) => response.data,
      providesTags: [{ type: 'Stats', id: 'ALL' }],
    }),
  }),
})

export const { useGetStatsQuery } = statsApi
