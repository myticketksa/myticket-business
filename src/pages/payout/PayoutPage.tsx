import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageHeader from '@/components/PageHeader'
import { useGetMyBalanceQuery, useGetTransferHistoryQuery } from '@/services/payoutApi'

function money(value: number | undefined) {
  return value === undefined ? '—' : `${value.toLocaleString()} SAR`
}

export default function PayoutPage() {
  const { t } = useTranslation()
  const { data: balance, isLoading: isLoadingBalance } = useGetMyBalanceQuery()

  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching } = useGetTransferHistoryQuery({ page })

  return (
    <div>
      <PageHeader
        crumbs={[{ label: t('common.dashboard'), path: '/' }, { label: t('common.payout') }]}
        title={t('payout.pageTitle')}
      />

      <div className="animate-fade-in space-y-6 px-4 pb-8 pane-sm:px-8">
        <div className="grid grid-cols-1 gap-4 pane-sm:grid-cols-2 pane-lg:grid-cols-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm pane-lg:col-span-2">
            <p className="text-sm text-slate-500">{t('payout.balanceHeld')}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {isLoadingBalance ? '—' : money(balance?.balanceHeld)}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{t('payout.netSales')}</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{money(balance?.netSales)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{t('payout.organizerShare')}</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{money(balance?.organizerShare)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{t('payout.transferredOut')}</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{money(balance?.transferredOut)}</p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-slate-900">{t('payout.operations')}</p>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-start text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                    <th className="px-4 py-3 font-medium">{t('payout.colEvent')}</th>
                    <th className="px-4 py-3 font-medium">{t('payout.colAdminBalance')}</th>
                    <th className="px-4 py-3 font-medium">{t('payout.colOrganizerBalance')}</th>
                    <th className="px-4 py-3 font-medium">{t('payout.colStatus')}</th>
                    <th className="px-4 py-3 font-medium">{t('payout.colDate')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading &&
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index}>
                        <td colSpan={5} className="px-4 py-4">
                          <div className="h-4 animate-pulse rounded bg-slate-100" />
                        </td>
                      </tr>
                    ))}

                  {!isLoading && (data?.data?.length ?? 0) === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                        {t('payout.noTransfers')}
                      </td>
                    </tr>
                  )}

                  {data?.data.map((transfer) => (
                    <tr key={transfer.id} className="transition-colors hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-600">#{transfer.event_id}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {transfer.adminBalance.toLocaleString()} {transfer.currency}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {transfer.amount.toLocaleString()} {transfer.currency}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            transfer.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {t(`payout.status.${transfer.status}`)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(transfer.created_at).toLocaleDateString()}
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
    </div>
  )
}
