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

        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          {/* A wide table makes the list unusable on a phone. Render the same
              information as compact cards below the small breakpoint instead. */}
          <div className="divide-y divide-slate-100 pane-sm:hidden">
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="p-4">
                  <div className="h-4 animate-pulse rounded bg-slate-100" />
                </div>
              ))}

            {!isLoading && (data?.data?.length ?? 0) === 0 && (
              <p className="px-4 py-10 text-center text-sm text-slate-500">{t('events.list.noEvents')}</p>
            )}

            {data?.data.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="block p-4 transition-colors hover:bg-slate-50"
              >
                <h2 className="min-w-0 text-sm font-semibold text-slate-900">
                  {event.title.en || event.title.ar || '—'}
                </h2>
                <dl className="mt-3 grid gap-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="shrink-0 text-slate-500">{t('events.list.colVenue')}</dt>
                    <dd className="min-w-0 text-end text-slate-700">{event.place || '—'}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="shrink-0 text-slate-500">{t('events.list.colStarts')}</dt>
                    <dd className="text-end text-slate-700">{formatDateTime(event.startTime)}</dd>
                  </div>
                </dl>
              </Link>
            ))}
          </div>

          <div className="hidden pane-sm:block">
          <table className="w-full text-start text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                <th className="px-4 py-3 font-medium">{t('events.list.colTitle')}</th>
                <th className="px-4 py-3 font-medium">{t('events.list.colVenue')}</th>
                <th className="px-4 py-3 font-medium">{t('events.list.colStarts')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading &&
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={3} className="px-4 py-4">
                      <div className="h-4 animate-pulse rounded bg-slate-100" />
                    </td>
                  </tr>
                ))}

              {!isLoading && (data?.data?.length ?? 0) === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center text-slate-500">
                    {t('events.list.noEvents')}
                  </td>
                </tr>
              )}

              {data?.data.map((event) => (
                <tr key={event.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <Link to={`/events/${event.id}`} className="block">
                      {event.title.en || event.title.ar || '—'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <Link to={`/events/${event.id}`} className="block">
                      {event.place}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <Link to={`/events/${event.id}`} className="block">
                      {formatDateTime(event.startTime)}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

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
