import { useTranslation } from 'react-i18next'
import type { StatsTrendPoint } from '@/types/stats'

/**
 * Net sales per day, drawn as a plain SVG area.
 *
 * No charting library: this is one series on a fixed grid, and a dependency
 * that ships a hundred kilobytes to draw a single line isn't worth it. If the
 * reports grow a second axis or interaction beyond a tooltip, revisit that.
 */
export default function TrendChart({ points }: { points: StatsTrendPoint[] }) {
  const { t } = useTranslation()

  if (points.length === 0) {
    return <p className="text-sm text-slate-500">{t('stats.noData')}</p>
  }

  const width = 900
  const height = 220
  const padding = { top: 12, right: 12, bottom: 24, left: 12 }
  const max = Math.max(...points.map((point) => point.netSales), 1)
  const innerWidth = width - padding.left - padding.right
  const innerHeight = height - padding.top - padding.bottom
  const step = points.length > 1 ? innerWidth / (points.length - 1) : 0

  const coordinates = points.map((point, index) => ({
    x: padding.left + index * step,
    y: padding.top + innerHeight - (point.netSales / max) * innerHeight,
    point,
  }))

  const line = coordinates.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ')
  const area =
    `${padding.left},${padding.top + innerHeight} ` +
    line +
    ` ${(padding.left + innerWidth).toFixed(1)},${padding.top + innerHeight}`

  const peak = coordinates.reduce((best, c) => (c.point.netSales > best.point.netSales ? c : best))
  const labelEvery = Math.ceil(points.length / 6)

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-56 w-full min-w-[520px]"
        role="img"
        aria-label={t('stats.trendTitle')}
      >
        <defs>
          <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.5, 1].map((fraction) => (
          <line
            key={fraction}
            x1={padding.left}
            x2={padding.left + innerWidth}
            y1={padding.top + innerHeight * fraction}
            y2={padding.top + innerHeight * fraction}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}

        <polygon points={area} fill="url(#trend-fill)" />
        <polyline points={line} fill="none" stroke="#f97316" strokeWidth="2" strokeLinejoin="round" />

        {/* Only the peak is marked — a dot on every day is noise at 90 days. */}
        <circle cx={peak.x} cy={peak.y} r="3.5" fill="#f97316" />

        {coordinates.map((c, index) =>
          index % labelEvery === 0 ? (
            <text
              key={c.point.date}
              x={c.x}
              y={height - 6}
              textAnchor="middle"
              className="fill-slate-400"
              fontSize="11"
            >
              {c.point.date.slice(5)}
            </text>
          ) : null,
        )}

        {coordinates.map((c) => (
          <rect
            key={c.point.date}
            x={c.x - step / 2}
            y={padding.top}
            width={Math.max(step, 2)}
            height={innerHeight}
            fill="transparent"
          >
            <title>
              {c.point.date} · {c.point.netSales.toLocaleString()} · {t('stats.ticketsCount', { count: c.point.ticketsSold })}
            </title>
          </rect>
        ))}
      </svg>
    </div>
  )
}
