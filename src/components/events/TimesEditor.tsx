import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sortTimes, toMinutes, toTime, generateTimes } from '@/lib/times'

/**
 * An activity's start times as real time pickers (27 Oct 2026): "Add time"
 * for one more, "Generate times" for a run (from, to, every N minutes).
 * Empty: the whole day, nothing for the customer to pick.
 */
export default function TimesEditor({ value, onChange }: { value: string[]; onChange: (times: string[]) => void }) {
  const { t } = useTranslation()
  const [generating, setGenerating] = useState(false)
  const [from, setFrom] = useState('09:00')
  const [to, setTo] = useState('15:00')
  const [every, setEvery] = useState('60')
  const input = 'rounded-md border border-slate-300 px-2 py-1.5 text-sm'

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {value.map((time, index) => (
          <span key={index} className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-1">
            <input
              type="time"
              value={time}
              aria-label={t('events.activities.time')}
              onChange={(e) => onChange(value.map((v, i) => (i === index ? e.target.value : v)))}
              onBlur={() => onChange(sortTimes(value))}
              className="bg-transparent text-sm"
            />
            <button
              type="button"
              aria-label={t('events.activities.removeTime')}
              onClick={() => onChange(value.filter((_, i) => i !== index))}
              className="px-1 text-slate-400 hover:text-red-600"
            >
              ×
            </button>
          </span>
        ))}
        <button
          type="button"
          onClick={() => {
            const last = value[value.length - 1]
            onChange(sortTimes([...value, last ? toTime(Math.min(toMinutes(last) + 60, 23 * 60 + 59)) : '09:00']))
          }}
          className="text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          {t('events.activities.addTime')}
        </button>
        <button type="button" onClick={() => setGenerating((g) => !g)} className="text-sm font-medium text-slate-600 hover:text-slate-800">
          {t('events.activities.generateTimes')}
        </button>
      </div>

      {generating && (
        <div className="mt-2 flex flex-wrap items-center gap-2 rounded-md bg-slate-50 p-2 text-xs text-slate-700">
          {t('events.activities.genFrom')}
          <input type="time" value={from} onChange={(e) => setFrom(e.target.value)} className={input} />
          {t('events.activities.genTo')}
          <input type="time" value={to} onChange={(e) => setTo(e.target.value)} className={input} />
          {t('events.activities.genEvery')}
          <select value={every} onChange={(e) => setEvery(e.target.value)} className={input}>
            {[15, 30, 45, 60, 90, 120, 180, 240].map((m) => (
              <option key={m} value={m}>
                {t('events.activities.minutes', { count: m })}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              onChange(sortTimes([...value, ...generateTimes(from, to, Number(every))]))
              setGenerating(false)
            }}
            className="rounded-md bg-orange-500 px-3 py-1.5 font-medium text-white"
          >
            {t('events.activities.generate')}
          </button>
        </div>
      )}
      {value.length === 0 && <p className="mt-1 text-xs text-slate-400">{t('events.activities.noTimesHint')}</p>}
    </div>
  )
}
