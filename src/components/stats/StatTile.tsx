import { useTranslation } from 'react-i18next'

/**
 * One number, with how it compares to the window before it.
 *
 * A figure on its own doesn't tell anyone whether things are going well, so
 * every tile that has a previous value shows the direction too.
 */
export default function StatTile({
  label,
  value,
  previous,
  money = false,
  suffix,
  hint,
  invertDelta = false,
}: {
  label: string
  value: number | null
  previous?: number
  money?: boolean
  suffix?: string
  hint?: string
  /** For figures where up is bad — refunds, chiefly. */
  invertDelta?: boolean
}) {
  const { t } = useTranslation()

  const formatted =
    value === null
      ? '—'
      : money
        ? value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : value.toLocaleString()

  // A change from nothing isn't a percentage, it's just "new".
  const hasDelta = previous !== undefined && previous !== 0 && value !== null
  const deltaPercent = hasDelta ? ((value - previous) / Math.abs(previous)) * 100 : null
  const isUp = (deltaPercent ?? 0) > 0
  const isGood = invertDelta ? !isUp : isUp

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-slate-900">
        {formatted}
        {suffix && value !== null && <span className="text-sm text-slate-400">{suffix}</span>}
        {money && <span className="ms-1 text-xs font-normal text-slate-400">{t('common.sar')}</span>}
      </p>
      {deltaPercent !== null && Math.abs(deltaPercent) >= 0.1 && (
        <p className={`mt-1 text-xs font-medium ${isGood ? 'text-green-600' : 'text-red-600'}`}>
          {isUp ? '↑' : '↓'} {Math.abs(deltaPercent).toFixed(1)}%{' '}
          <span className="font-normal text-slate-400">{t('stats.vsPrevious')}</span>
        </p>
      )}
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}
