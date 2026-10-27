import { useEffect, useRef, useState } from 'react'
import { useFieldArray, useWatch, type Control, type FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { EventFormValues } from '@/schemas/event.schema'

type DateRow = EventFormValues['sessions'][number]
type Rule = {
  from: string
  to: string
  weekdays: number[]
  discountType: DateRow['discountType']
  discountValue: string
}

const MAX_DATES = 500
const ALL_WEEK = [0, 1, 2, 3, 4, 5, 6]
const pad = (n: number) => String(n).padStart(2, '0')
const dayKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/**
 * As in the old system: an event runs from a start date to an end date on the
 * chosen weekdays, and each of those days is bookable on its own. Hours belong
 * to the ticket types, so a day is the whole day.
 */
export function daysOf(rule: Pick<Rule, 'from' | 'to' | 'weekdays'>): string[] {
  if (!rule.from || !rule.to || rule.to < rule.from) return []
  const days: string[] = []
  const end = new Date(`${rule.to}T00:00`)
  for (let day = new Date(`${rule.from}T00:00`); day <= end && days.length < MAX_DATES; day.setDate(day.getDate() + 1)) {
    if (rule.weekdays.includes(day.getDay())) days.push(dayKey(day))
  }
  return days
}

/** The rule a saved list of dates follows: first and last day, and the weekdays used. */
function ruleOf(rows: DateRow[]): Rule | null {
  const dated = rows.filter((row) => row.startsAt).sort((a, b) => a.startsAt.localeCompare(b.startsAt))
  if (dated.length === 0) return null
  const upcoming = dated.find((row) => new Date(row.endsAt || row.startsAt).getTime() >= Date.now()) ?? dated[0]
  return {
    from: dated[0].startsAt.slice(0, 10),
    to: dated[dated.length - 1].startsAt.slice(0, 10),
    weekdays: [...new Set(dated.map((row) => new Date(`${row.startsAt.slice(0, 10)}T00:00`).getDay()))].sort(),
    discountType: upcoming.discountType,
    discountValue: upcoming.discountValue ?? '',
  }
}

export default function DatesEditor({
  control,
  errors,
  bookedBySession = {},
  discount: eventDiscount,
  hint,
}: {
  control: Control<EventFormValues>
  errors: FieldErrors<EventFormValues>
  /** Tickets taken on each saved date; a date with any is never dropped. */
  bookedBySession?: Record<number, number>
  /** The discount set under Rules: new dates get it too. */
  discount?: { discountType: DateRow['discountType']; discountValue: string }
  /** A line under the title (with activities: they run on their own days within these). */
  hint?: string
}) {
  const { t, i18n } = useTranslation()
  const { fields, replace } = useFieldArray({ control, name: 'sessions', keyName: 'key' })
  const sessions = useWatch({ control, name: 'sessions' }) ?? []
  const [rule, setRule] = useState<Rule>({ from: '', to: '', weekdays: ALL_WEEK, discountType: '', discountValue: '' })

  // The dates the event was saved with: kept by id, so editing never loses them.
  const saved = useRef<DateRow[]>([])
  const filled = useRef(false)
  useEffect(() => {
    if (filled.current) return
    const withIds = fields.filter((field) => field.id)
    if (withIds.length === 0) return
    filled.current = true
    saved.current = withIds.map(({ id, startsAt, endsAt, discountType, discountValue }) => ({ id, startsAt, endsAt, discountType, discountValue }))
    const found = ruleOf(saved.current)
    if (found) setRule(found)
  }, [fields])

  const isOver = (row: DateRow) => new Date(row.endsAt || row.startsAt).getTime() < Date.now()
  const isKept = (row: DateRow) => Boolean(row.id) && (isOver(row) || (bookedBySession[row.id!] ?? 0) > 0)

  // The rule becomes the list of dates: a day already saved keeps its record;
  // a new day is the whole day; a past or booked date outside the rule stays.
  const apply = (next: Rule) => {
    setRule(next)
    // A saved day as it is in the form now (its discount may have been changed under Rules).
    const byDay = new Map(
      [...saved.current, ...sessions.filter((row) => row.id)].map((row) => [row.startsAt.slice(0, 10), row]),
    )
    // Discounts are set under Rules (27 Oct 2026); a new date gets that one,
    // a saved date keeps its own.
    const discount = {
      discountType: eventDiscount?.discountType ?? ('' as DateRow['discountType']),
      discountValue: eventDiscount?.discountType ? eventDiscount.discountValue : '',
    }
    const rows: DateRow[] = []
    const used = new Set<string>()
    for (const day of daysOf(next)) {
      const existing = byDay.get(day)
      if (existing) {
        rows.push(existing)
        used.add(day)
      } else if (new Date(`${day}T23:59`).getTime() >= Date.now()) {
        rows.push({ startsAt: `${day}T00:00`, endsAt: `${day}T23:59`, ...discount })
      }
    }
    for (const row of saved.current) {
      if (!used.has(row.startsAt.slice(0, 10)) && isKept(row)) rows.push(row)
    }
    replace(rows.sort((a, b) => a.startsAt.localeCompare(b.startsAt)))
  }

  const weekdayNames = Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(i18n.language, { weekday: 'short' }).format(new Date(2024, 0, 7 + index)),
  )
  const formatDay = (day: string) =>
    new Intl.DateTimeFormat(i18n.language, { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(`${day}T00:00`))

  const inRule = new Set(daysOf(rule))
  const upcoming = sessions.filter((row) => row.startsAt && !isOver(row))
  const kept = sessions.filter((row) => row.startsAt && isKept(row) && !inRule.has(row.startsAt.slice(0, 10)))
  const listError = errors.sessions?.root?.message ?? errors.sessions?.message
  const rowMessage = Array.isArray(errors.sessions)
    ? errors.sessions.map((e) => e?.startsAt?.message ?? e?.endsAt?.message ?? e?.discountValue?.message).find(Boolean)
    : undefined

  const input = 'w-full rounded-md border border-slate-300 px-3 py-2 text-sm'

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold text-slate-800">{t('events.dates.title')}</h2>
      <p className="mb-3 text-xs text-slate-500">{hint ?? t('events.dates.hint')}</p>

      <div className="grid grid-cols-2 gap-3">
        <label className="text-xs font-medium text-slate-700">
          {t('events.dates.startDate')}
          <input
            type="date"
            value={rule.from}
            onChange={(e) => apply({ ...rule, from: e.target.value, to: rule.to && rule.to >= e.target.value ? rule.to : e.target.value })}
            className={`mt-1 ${input}`}
          />
        </label>
        <label className="text-xs font-medium text-slate-700">
          {t('events.dates.endDate')}
          <input
            type="date"
            value={rule.to}
            min={rule.from || undefined}
            onChange={(e) => apply({ ...rule, to: e.target.value })}
            className={`mt-1 ${input}`}
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-700">{t('events.dates.onDays')}</span>
        {weekdayNames.map((name, day) => {
          const on = rule.weekdays.includes(day)
          return (
            <button
              key={day}
              type="button"
              aria-pressed={on}
              onClick={() => apply({ ...rule, weekdays: on ? rule.weekdays.filter((d) => d !== day) : [...rule.weekdays, day] })}
              className={`rounded-full border px-3 py-1 text-xs ${on ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300 text-slate-600'}`}
            >
              {name}
            </button>
          )
        })}
      </div>

      {upcoming.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium text-slate-700">{t('events.dates.bookableDays', { count: upcoming.length })}</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {upcoming.map((row) => (
              <span key={row.startsAt} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700">
                {formatDay(row.startsAt.slice(0, 10))}
                {row.id && bookedBySession[row.id] ? ` · ${t('events.dates.booked', { count: bookedBySession[row.id] })}` : ''}
              </span>
            ))}
          </div>
        </div>
      )}
      {kept.length > 0 && <p className="mt-2 text-xs text-slate-500">{t('events.dates.keptDays', { count: kept.length })}</p>}
      {rowMessage && <p className="mt-2 text-sm text-red-600">{rowMessage}</p>}
      {listError && <p className="mt-2 text-sm text-red-600">{listError}</p>}
    </section>
  )
}
