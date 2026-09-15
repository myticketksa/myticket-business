import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LoadingSpinner from '@/components/LoadingSpinner'
import PageHeader from '@/components/PageHeader'
import StatTile from '@/components/stats/StatTile'
import TrendChart from '@/components/stats/TrendChart'
import { downloadExcel } from '@/lib/exportExcel'
import { useGetStatsQuery } from '@/services/statsApi'

const windows = [7, 30, 90] as const

export default function StatsPage() {
  const { t } = useTranslation()
  const [days, setDays] = useState<number>(30)

  const { data: stats, isLoading, isFetching } = useGetStatsQuery({ days })

  const totals = stats?.totals
  const previous = stats?.previousTotals

  const handleExport = () => {
    if (!stats || !totals) return
    downloadExcel(`myticket-report-${stats.from.slice(0, 10)}-to-${stats.to.slice(0, 10)}`, [
      {
        name: t('stats.sheetSummary'),
        rows: [
          { [t('stats.sheetMetric')]: t('common.from'), [t('stats.sheetValue')]: stats.from.slice(0, 10) },
          { [t('stats.sheetMetric')]: t('common.to'), [t('stats.sheetValue')]: stats.to.slice(0, 10) },
          ...(
            [
              ['grossSales', totals.grossSales],
              ['refunds', totals.refunds],
              ['netSales', totals.netSales],
              ['platformCommission', totals.platformCommission],
              ['organizerShare', totals.organizerShare],
              ['transferredOut', totals.transferredOut],
              ['balanceHeld', totals.balanceHeld],
              ['paidOrders', totals.paidOrders],
              ['ticketsSold', totals.ticketsSold],
              ['averageOrderValue', totals.averageOrderValue],
              ['scanRate', totals.scanRate],
            ] as [string, number | null][]
          ).map(([key, value]) => ({
            [t('stats.sheetMetric')]: t(`stats.${key}`),
            [t('stats.sheetValue')]: value ?? '',
            [t('stats.sheetPrevious')]: (previous?.[key as keyof typeof previous] as number | null) ?? '',
          })),
        ],
      },
      {
        name: t('stats.trendTitle'),
        rows: stats.trend.map((point) => ({
          [t('common.from')]: point.date,
          [t('stats.netSales')]: point.netSales,
          [t('stats.ticketsSold')]: point.ticketsSold,
        })),
      },
      {
        name: t(`stats.breakdown.${stats.breakdown.by}`),
        rows: stats.breakdown.rows.map((row) => ({
          [t('stats.sheetMetric')]: row.label,
          [t('stats.netSales')]: row.value,
          [t('stats.ticketsSold')]: row.tickets,
        })),
      },
    ])
  }

  return (
    <div>
      <PageHeader
        crumbs={[{ label: t('common.dashboard'), path: '/' }, { label: t('common.reports') }]}
        title={t('stats.pageTitle')}
        action={
          <button
            type="button"
            onClick={handleExport}
            disabled={!totals}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
          >
            {t('common.exportExcel')}
          </button>
        }
      />

      <div className="animate-fade-in space-y-6 px-4 pb-10 pane-sm:px-8">
        <div className="flex gap-2">
          {windows.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setDays(value)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                days === value
                  ? 'border-slate-800 bg-slate-800 text-white'
                  : 'border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t('stats.lastDays', { count: value })}
            </button>
          ))}
        </div>

        {isLoading && <LoadingSpinner />}

        {stats && totals && (
          <div className={isFetching ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
            <div className="grid grid-cols-1 gap-4 pane-sm:grid-cols-2 pane-lg:grid-cols-4">
              <StatTile
                label={t('stats.grossSales')}
                value={totals.grossSales}
                previous={previous?.grossSales}
                money
              />
              <StatTile
                label={t('stats.refunds')}
                value={totals.refunds}
                previous={previous?.refunds}
                money
                invertDelta
              />
              <StatTile label={t('stats.netSales')} value={totals.netSales} previous={previous?.netSales} money />
              <StatTile
                label={t('stats.platformCommission')}
                value={totals.platformCommission}
                previous={previous?.platformCommission}
                money
              />
              <StatTile
                label={t('stats.organizerShare')}
                value={totals.organizerShare}
                previous={previous?.organizerShare}
                money
              />
              <StatTile
                label={t('stats.transferredOut')}
                value={totals.transferredOut}
                previous={previous?.transferredOut}
                money
              />
              <StatTile label={t('stats.balanceHeld')} value={totals.balanceHeld} money />
              <StatTile
                label={t('stats.paidOrders')}
                value={totals.paidOrders}
                previous={previous?.paidOrders}
              />
              <StatTile
                label={t('stats.ticketsSold')}
                value={totals.ticketsSold}
                previous={previous?.ticketsSold}
              />
              <StatTile
                label={t('stats.averageOrderValue')}
                value={totals.averageOrderValue}
                previous={previous?.averageOrderValue}
                money
              />
              <StatTile
                label={t('stats.scanRate')}
                value={totals.scanRate}
                suffix="%"
                hint={t('stats.scanRateHint', {
                  scanned: totals.ticketsScanned,
                  sold: totals.ticketsSold,
                })}
              />
            </div>

            <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">{t('stats.trendTitle')}</h2>
              <TrendChart points={stats.trend} />
            </div>

            <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">
                {t(`stats.breakdown.${stats.breakdown.by}`)}
              </h2>
              {stats.breakdown.rows.length === 0 ? (
                <p className="text-sm text-slate-500">{t('stats.noData')}</p>
              ) : (
                <ul className="space-y-2">
                  {stats.breakdown.rows.map((row) => {
                    const max = Math.max(...stats.breakdown.rows.map((r) => r.value), 1)
                    return (
                      <li key={row.label} className="text-sm">
                        <div className="mb-1 flex justify-between">
                          <span className="text-slate-700">{row.label}</span>
                          <span className="font-medium text-slate-900">
                            {row.value.toLocaleString()}{' '}
                            <span className="text-xs text-slate-400">
                              ({t('stats.ticketsCount', { count: row.tickets })})
                            </span>
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-400"
                            style={{ width: `${Math.round((row.value / max) * 100)}%` }}
                          />
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
