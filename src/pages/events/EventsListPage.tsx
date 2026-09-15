import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import SearchInput from '@/components/SearchInput'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useGetEventCategoriesQuery, useGetEventsQuery } from '@/services/eventsApi'

const statusOptions = ['draft', 'published', 'postponed', 'cancelled', 'sold_out'] as const

function formatDateTime(value: string) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function EventsListPage() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')
  const [free, setFree] = useState<'' | 'true' | 'false'>('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const search = useDebouncedValue(searchInput)
  useEffect(() => setPage(1), [search, status, category, free, from, to])

  const { data: categories } = useGetEventCategoriesQuery()
  const { data, isLoading, isFetching } = useGetEventsQuery({
    page,
    search: search || undefined,
    status: status || undefined,
    category: category || undefined,
    free: free || undefined,
    from: from || undefined,
    to: to || undefined,
  })

  return (
    <div>
      <PageHeader
        crumbs={[{ label: t('common.dashboard'), path: '/' }, { label: t('common.events') }]}
        title={t('events.list.title')}
      />

      <div className="animate-fade-in px-4 pb-8 pane-sm:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <SearchInput value={searchInput} onChange={setSearchInput} />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">{t('common.allStatuses')}</option>
            {statusOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">{t('common.allCategories')}</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name.en || c.name.ar}
              </option>
            ))}
          </select>
          <select
            value={free}
            onChange={(e) => setFree(e.target.value as '' | 'true' | 'false')}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">{t('events.list.free')} / {t('events.list.colPrice')}</option>
            <option value="true">{t('events.list.free')}</option>
            <option value="false">{t('events.list.colPrice')}</option>
          </select>
          <label className="flex items-center gap-1 text-sm text-slate-600">
            {t('common.from')}
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="rounded-md border border-slate-300 px-2 py-2 text-sm"
            />
          </label>
          <label className="flex items-center gap-1 text-sm text-slate-600">
            {t('common.to')}
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="rounded-md border border-slate-300 px-2 py-2 text-sm"
            />
          </label>
        </div>

        {/* Most organizers run one or two events at a time, so a dense
            admin-style table is the wrong shape here — cards read better
            at that scale, and each one gets an explicit view-details
            button instead of relying on the whole row being clickable. */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 pane-sm:grid-cols-2 pane-lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-32 animate-pulse rounded-lg border border-slate-200 bg-white" />
            ))}
          </div>
        )}

        {!isLoading && (data?.data?.length ?? 0) === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white py-16 text-center text-sm text-slate-500 shadow-sm">
            {t('events.list.noEvents')}
          </div>
        )}

        {!isLoading && (data?.data?.length ?? 0) > 0 && (
          <div className="grid grid-cols-1 gap-4 pane-sm:grid-cols-2 pane-lg:grid-cols-3">
            {data?.data.map((event) => (
              <div
                key={event.id}
                className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    {event.title.en || event.title.ar || '—'}
                  </h2>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="shrink-0 text-slate-500">{t('events.list.colVenue')}</dt>
                      <dd className="min-w-0 text-end text-slate-700">{event.place || '—'}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="shrink-0 text-slate-500">{t('events.list.colStarts')}</dt>
                      <dd className="text-end text-slate-700">{formatDateTime(event.startTime)}</dd>
                    </div>
                  </dl>
                </div>
                <Link
                  to={`/events/${event.id}`}
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-100"
                >
                  {t('events.list.viewDetails')}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 rtl:-scale-x-100">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}

        {data && data.pagination.totalPages > 1 && (
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 pane-sm:flex-row pane-sm:items-center pane-sm:justify-between">
            <span>
              {t('events.list.pageInfo', {
                current: data.pagination.currentPage,
                total: data.pagination.totalPages,
                count: data.pagination.total,
              })}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-md border border-slate-300 px-3 py-1.5 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                {t('common.previous')}
              </button>
              <button
                type="button"
                disabled={page >= data.pagination.totalPages || isFetching}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-md border border-slate-300 px-3 py-1.5 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                {t('common.next')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
