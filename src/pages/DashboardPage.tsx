import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'
import LoadingSpinner from '@/components/LoadingSpinner'
import NavIcon from '@/components/NavIcon'
import StatTile from '@/components/stats/StatTile'
import TrendChart from '@/components/stats/TrendChart'
import type { NavIconName } from '@/config/nav'
import { useGetStatsQuery } from '@/services/statsApi'

/**
 * Things you come here to *do*, rather than a second copy of the sidebar.
 * Getting to a section was never the problem — the sidebar does that — so the
 * home screen carries the headline figures and a one-click route into the
 * handful of jobs that make up most days.
 */
const quickActions: { path: string; labelKey: string; icon: NavIconName }[] = [
  { path: '/events', labelKey: 'dashboard.actions.viewEvents', icon: 'events' },
  { path: '/cashiers', labelKey: 'dashboard.actions.manageCashiers', icon: 'cashiers' },
  { path: '/payout', labelKey: 'dashboard.actions.viewPayout', icon: 'payout' },
  { path: '/reports', labelKey: 'dashboard.actions.viewReports', icon: 'reports' },
]

export default function DashboardPage() {
  const { t } = useTranslation()
  const user = useAppSelector((state) => state.auth.user)

  // The same figures the reports page shows, for the last month — a window
  // onto that, not a second set of numbers.
  const { data: stats, isLoading } = useGetStatsQuery({ days: 30 })
  const totals = stats?.totals
  const previous = stats?.previousTotals

  return (
    <div className="animate-fade-in p-4 pane-sm:p-8">
      <h1 className="text-xl font-semibold text-slate-900 pane-sm:text-2xl">
        {t('dashboard.welcome', { name: user?.name ?? user?.email })}
      </h1>
      <p className="mt-1 text-sm text-slate-500">{t('dashboard.statsSubtitle')}</p>

      {isLoading && <LoadingSpinner />}

      {stats && totals && (
        <>
          <div className="mt-6 grid grid-cols-1 gap-4 pane-sm:grid-cols-2 pane-lg:grid-cols-4">
            <StatTile
              label={t('stats.organizerShare')}
              value={totals.organizerShare}
              previous={previous?.organizerShare}
              money
            />
            <StatTile label={t('stats.balanceHeld')} value={totals.balanceHeld} money />
            <StatTile
              label={t('stats.ticketsSold')}
              value={totals.ticketsSold}
              previous={previous?.ticketsSold}
            />
            <StatTile
              label={t('stats.refunds')}
              value={totals.refunds}
              previous={previous?.refunds}
              money
              invertDelta
            />
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">{t('stats.trendTitle')}</h2>
              <Link
                to="/reports"
                className="text-sm font-medium text-orange-600 transition-colors hover:text-orange-700"
              >
                {t('dashboard.fullReports')}
              </Link>
            </div>
            <TrendChart points={stats.trend} />
          </div>
        </>
      )}

      <h2 className="mt-8 text-sm font-semibold text-slate-900">{t('dashboard.quickActions')}</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 pane-sm:grid-cols-3 pane-lg:grid-cols-4">
        {quickActions.map((action, index) => (
          <Link
            key={action.path}
            to={action.path}
            style={{ animationDelay: `${index * 30}ms` }}
            className="animate-slide-up group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
          >
            <span className="rounded-lg bg-orange-50 p-2 text-orange-600 transition-colors group-hover:bg-orange-100">
              <NavIcon name={action.icon} />
            </span>
            <span className="text-sm font-medium text-slate-800">{t(action.labelKey)}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
