import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PageHeader from '@/components/PageHeader'
import { useGetMyBalanceQuery, useGetSettlementHistoryQuery, useLazyGetSettlementReceiptQuery } from '@/services/payoutApi'
import type { Settlement } from '@/types/payout'

function money(value: number | undefined) {
  return value === undefined ? '—' : `${value.toLocaleString()} SAR`
}

async function downloadReceipt(blob: Blob, settlementId: number) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `settlement-${settlementId}.pdf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export default function PayoutPage() {
  const { t } = useTranslation()
  const { data: balance, isLoading: isLoadingBalance } = useGetMyBalanceQuery()

  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching } = useGetSettlementHistoryQuery({ page })

  const [fetchReceipt] = useLazyGetSettlementReceiptQuery()
  const [downloadingId, setDownloadingId] = useState<number | null>(null)

  const handleDownload = async (settlement: Settlement) => {
    setDownloadingId(settlement.id)
    try {
      const blob = await fetchReceipt(settlement.id).unwrap()
      await downloadReceipt(blob, settlement.id)
    } finally {
      setDownloadingId(null)
    }
  }

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
            <p className="text-sm text-slate-500">{t('payout.platformCommission')}</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{money(balance?.platformCommission)}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{t('payout.organizerShare')}</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{money(balance?.organizerShare)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 pane-sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{t('payout.transferredOut')}</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{money(balance?.transferredOut)}</p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-slate-900">{t('payout.operations')}</p>

          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-start text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                    <th className="px-4 py-3 font-medium">{t('payout.colEvent')}</th>
                    <th className="px-4 py-3 font-medium">{t('payout.colPlatformAmount')}</th>
                    <th className="px-4 py-3 font-medium">{t('payout.colOrganizerBalance')}</th>
                    <th className="px-4 py-3 font-medium">{t('payout.colStatus')}</th>
                    <th className="px-4 py-3 font-medium">{t('payout.colDate')}</th>
                    <th className="px-4 py-3 font-medium">{t('payout.colReceipt')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading &&
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index}>
                        <td colSpan={6} className="px-4 py-4">
                          <div className="h-4 animate-pulse rounded bg-slate-100" />
                        </td>
                      </tr>
                    ))}

                  {!isLoading && (data?.data?.length ?? 0) === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                        {t('payout.noTransfers')}
                      </td>
                    </tr>
                  )}

                  {data?.data.map((settlement) => (
                    <tr key={settlement.id} className="transition-colors hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-600">
                        {settlement.eventTitle ?? `#${settlement.eventId}`}
                        {settlement.isMigrated && (
                          <span className="ms-1.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                            {t('payout.migrated')}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {settlement.platformAmount.toLocaleString()} {settlement.currency}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {settlement.organizerAmount.toLocaleString()} {settlement.currency}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            settlement.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {t(`payout.status.${settlement.status}`)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {new Date(settlement.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          disabled={downloadingId === settlement.id}
                          onClick={() => handleDownload(settlement)}
                          className="text-xs font-medium text-orange-600 hover:text-orange-700 disabled:opacity-50"
                        >
                          {downloadingId === settlement.id ? t('payout.downloading') : t('payout.receipt')}
                        </button>
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
