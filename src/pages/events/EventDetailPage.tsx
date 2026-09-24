import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageHeader from '@/components/PageHeader'
import { useGetEventQuery } from '@/services/eventsApi'

export default function EventDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const eventId = Number(id)
  const { data: event, isLoading } = useGetEventQuery(eventId)

  if (isLoading || !event) {
    return <div className="p-8 text-slate-500">{t('events.detail.loading')}</div>
  }

  const eventTitle = event.title.en || event.title.ar || t('events.detail.fallbackTitle')

  return (
    <div>
      <PageHeader
        crumbs={[
          { label: t('common.dashboard'), path: '/' },
          { label: t('common.events'), path: '/events' },
          { label: eventTitle },
        ]}
        title={eventTitle}
        action={
          <Link
            to={`/events/${event.id}/edit`}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            {t('common.edit')}
          </Link>
        }
      />

      <div className="animate-fade-in grid grid-cols-1 gap-6 px-4 pb-12 pane-sm:px-8 pane-lg:grid-cols-3">
        <div className="space-y-6 pane-lg:col-span-2">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-2 text-sm font-semibold text-slate-800">
              {t('events.detail.descriptionEn')}
            </h2>
            <p className="whitespace-pre-line text-sm text-slate-600">{event.description.en || '—'}</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5" dir="rtl">
            <h2 className="mb-2 text-sm font-semibold text-slate-800">
              {t('events.detail.descriptionAr')}
            </h2>
            <p className="whitespace-pre-line text-sm text-slate-600">{event.description.ar || '—'}</p>
          </div>

          {event.ticketTypes.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="mb-3 text-sm font-semibold text-slate-800">
                {t('events.detail.ticketTypesTitle')}
              </h2>
              <table className="w-full text-start text-sm">
                <thead>
                  <tr className="text-slate-500">
                    {/* Browsers center <th> text by default regardless of the
                      * table's own text-start — that default wins over the
                      * inherited value, so the header drifted away from the
                      * left-aligned data under it unless overridden here. */}
                    <th className="pb-2 text-start font-medium">{t('events.detail.colName')}</th>
                    <th className="pb-2 text-start font-medium">{t('events.detail.colPrice')}</th>
                    <th className="pb-2 text-start font-medium">{t('events.detail.colVat')}</th>
                    <th className="pb-2 text-start font-medium">{t('events.detail.colEntryWindow')}</th>
                    <th className="pb-2 text-start font-medium">{t('events.detail.colSoldTotal')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {event.ticketTypes.map((ticketType) => (
                    <tr key={ticketType.id}>
                      <td className="py-2">{ticketType.name}</td>
                      <td className="py-2">{ticketType.price}</td>
                      <td className="py-2">
                        {ticketType.isVatIncluded ? t('events.detail.vatIncluded') : t('events.detail.vatExcluded')}
                      </td>
                      <td className="py-2">
                        {ticketType.entryTimeStart && ticketType.entryTimeEnd
                          ? `${ticketType.entryTimeStart}–${ticketType.entryTimeEnd}`
                          : t('events.detail.anytime')}
                      </td>
                      <td className="py-2">
                        {ticketType.quantity_sold ?? '—'} / {ticketType.quantity_total ?? '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {event.cover && <img src={event.cover} alt="" className="w-full rounded-lg object-cover shadow-sm" />}

          <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm">
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-slate-500">{t('events.detail.venue')}</dt>
                <dd className="text-slate-800">{event.place}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">{t('events.detail.starts')}</dt>
                <dd className="text-slate-800">{new Date(event.startTime).toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">{t('events.detail.seating')}</dt>
                {/* The API's value for general admission is literally "free",
                  * which read as "this event costs nothing" on paid events. */}
                <dd className="text-slate-800">
                  {event.seatingType === 'free'
                    ? t('events.form.seatingFree')
                    : t('events.form.seatingAssigned')}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">{t('events.detail.priceFrom')}</dt>
                <dd className="text-slate-800">
                  {event.isFree ? t('events.list.free') : (event.priceFrom ?? '—')}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">{t('events.detail.rating')}</dt>
                <dd className="text-slate-800">
                  {event.rating ?? '—'} {t('events.detail.reviewsSuffix', { count: event.raters })}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">{t('events.detail.featured')}</dt>
                <dd className="text-slate-800">{event.isFeatured ? t('common.yes') : t('common.no')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
