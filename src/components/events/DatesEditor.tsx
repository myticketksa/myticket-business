import { useEffect, useRef, useState } from 'react'
import { useFieldArray, useWatch, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { EventFormValues } from '@/schemas/event.schema'

type DateRow = EventFormValues['sessions'][number]
type Kind = 'single' | 'days' | 'pass'

const MAX_DATES = 500
const pad = (n: number) => String(n).padStart(2, '0')
const dayKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
const emptyRow = (): DateRow => ({ startsAt: '', endsAt: '', discountType: '', discountValue: '' })

/**
 * Turns "every Thursday and Friday from 1 to 31 March, 7 to 10 pm" into one
 * row per date, the way the old system let organizers set a run of shows.
 * An end time earlier than the start runs past midnight into the next day.
 */
export function expandDates(options: {
  from: string
  to: string
  weekdays: number[]
  startTime: string
  endTime: string
  discountType: DateRow['discountType']
  discountValue: string
}): DateRow[] {
  const rows: DateRow[] = []
  const start = new Date(`${options.from}T00:00`)
  const end = new Date(`${options.to}T00:00`)
  for (let day = new Date(start); day <= end && rows.length < MAX_DATES; day.setDate(day.getDate() + 1)) {
    if (!options.weekdays.includes(day.getDay())) continue
    const date = dayKey(day)
    // A run that began earlier only adds the days still to come.
    if (new Date(`${date}T${options.startTime}`).getTime() < Date.now()) continue
    let endsAt = ''
    if (options.endTime) {
      const endDay = new Date(day)
      if (options.endTime <= options.startTime) endDay.setDate(endDay.getDate() + 1)
      endsAt = `${dayKey(endDay)}T${options.endTime}`
    }
    rows.push({
      startsAt: `${date}T${options.startTime}`,
      endsAt,
      discountType: options.discountType,
      discountValue: options.discountType ? options.discountValue : '',
    })
  }
  return rows
}

/**
 * The rule a list of dates follows, for the summary line and to fill the
 * schedule fields when an event is opened: first to last day, the weekdays
 * used, and the hours when every date shares them.
 */
export function scheduleOf(rows: Pick<DateRow, 'startsAt' | 'endsAt'>[]) {
  const dated = rows.filter((row) => row.startsAt).sort((a, b) => a.startsAt.localeCompare(b.startsAt))
  if (dated.length === 0) return null
  const timeOf = (value?: string | null) => (value ? value.slice(11, 16) : '')
  const sameHours = dated.every(
    (row) => timeOf(row.startsAt) === timeOf(dated[0].startsAt) && timeOf(row.endsAt) === timeOf(dated[0].endsAt),
  )
  return {
    from: dated[0].startsAt.slice(0, 10),
    to: dated[dated.length - 1].startsAt.slice(0, 10),
    weekdays: [...new Set(dated.map((row) => new Date(`${row.startsAt.slice(0, 10)}T00:00`).getDay()))].sort(),
    startTime: sameHours ? timeOf(dated[0].startsAt) : '',
    endTime: sameHours ? timeOf(dated[0].endsAt) : '',
  }
}

/** What kind of event a saved list of dates is: one show, a run of days, or one span. */
function kindOf(rows: Pick<DateRow, 'startsAt' | 'endsAt'>[]): Kind | null {
  const dated = rows.filter((row) => row.startsAt)
  if (dated.length === 0) return null
  if (dated.length > 1) return 'days'
  const { startsAt, endsAt } = dated[0]
  if (!endsAt) return 'single'
  // Ending more than a day after it starts: one ticket for the whole period.
  return new Date(endsAt).getTime() - new Date(startsAt).getTime() > 24 * 3600 * 1000 ? 'pass' : 'single'
}

export default function DatesEditor({
  control,
  register,
  errors,
  bookedBySession = {},
}: {
  control: Control<EventFormValues>
  register: UseFormRegister<EventFormValues>
  errors: FieldErrors<EventFormValues>
  /** Tickets taken on each saved date; a date with any can't be removed. */
  bookedBySession?: Record<number, number>
}) {
  const { t, i18n } = useTranslation()
  const { fields, remove, replace } = useFieldArray({ control, name: 'sessions', keyName: 'key' })
  // What's typed in the rows now; `fields` only has the values they started with.
  const sessions = useWatch({ control, name: 'sessions' })
  const [kind, setKind] = useState<Kind | null>(null)
  const [repeat, setRepeat] = useState({
    from: '',
    to: '',
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    startTime: '19:00',
    endTime: '22:00',
    discountType: '' as DateRow['discountType'],
    discountValue: '',
  })
  const [repeatError, setRepeatError] = useState<string | null>(null)

  // An event opened for editing: its kind, and the rule its dates follow. Once only.
  const filled = useRef(false)
  useEffect(() => {
    if (filled.current) return
    const found = scheduleOf(fields)
    if (!found) return
    filled.current = true
    setKind(kindOf(fields))
    // Adding to a run that has already begun starts from today.
    const today = dayKey(new Date())
    setRepeat((current) => ({
      ...current,
      ...found,
      from: found.from < today ? today : found.from,
      to: found.to < today ? today : found.to,
      startTime: found.startTime || current.startTime,
      endTime: found.endTime || current.endTime,
    }))
  }, [fields])

  const rows = sessions ?? []
  const rule = scheduleOf(rows)

  // Sunday-first names in the dashboard's own language.
  const weekdayNames = Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(i18n.language, { weekday: 'short' }).format(new Date(2024, 0, 7 + index)),
  )
  const listJoin = i18n.language.startsWith('ar') ? '، ' : ', '
  const formatDay = (day: string) =>
    new Intl.DateTimeFormat(i18n.language, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${day}T00:00`))
  const formatRow = (row: Pick<DateRow, 'startsAt' | 'endsAt'>) => {
    const start = new Date(row.startsAt)
    const day = new Intl.DateTimeFormat(i18n.language, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(start)
    const hours = `${row.startsAt.slice(11, 16)}${row.endsAt ? `–${row.endsAt.slice(11, 16)}` : ''}`
    return `${day} · ${hours}`
  }

  const summary = (() => {
    if (!rule) return null
    if (kind === 'pass' && rows[0]?.endsAt) {
      return `${formatDay(rows[0].startsAt.slice(0, 10))} ${rows[0].startsAt.slice(11, 16)} – ${formatDay(rows[0].endsAt.slice(0, 10))} ${rows[0].endsAt.slice(11, 16)}`
    }
    return [
      rule.from === rule.to ? formatDay(rule.from) : `${formatDay(rule.from)} – ${formatDay(rule.to)}`,
      rule.from === rule.to ? null : rule.weekdays.map((day) => weekdayNames[day]).join(listJoin),
      rule.startTime ? `${rule.startTime}${rule.endTime ? `–${rule.endTime}` : ''}` : null,
    ]
      .filter(Boolean)
      .join(' · ')
  })()

  // One date or one span is a single row; a run of days is a list. Switching
  // never drops a saved date: one with several saved dates stays a run.
  const choose = (next: Kind) => {
    if (next === kind) return
    if (next !== 'days' && rows.length > 1) return
    setKind(next)
    if (next === 'days') {
      replace(rows.filter((row) => row.startsAt))
    } else if (rows.length === 0) {
      replace([emptyRow()])
    }
  }

  const input = 'w-full rounded-md border border-slate-300 px-3 py-2 text-sm'

  const addRange = () => {
    setRepeatError(null)
    // Every run has a first and a last day and its hours, so no date is left
    // without an end (a one-day run has the same from and to).
    if (!repeat.from || !repeat.to || !repeat.startTime || !repeat.endTime || repeat.weekdays.length === 0) {
      setRepeatError(t('events.dates.repeatIncomplete'))
      return
    }
    if (repeat.to < repeat.from) {
      setRepeatError(t('events.dates.toBeforeFrom'))
      return
    }
    const added = expandDates(repeat)
    if (added.length === 0) {
      setRepeatError(t('events.dates.repeatNone'))
      return
    }
    // Keep what's already there, skip exact duplicates, and list everything in date order.
    const taken = new Set(rows.map((row) => row.startsAt))
    const merged = [...rows.filter((row) => row.startsAt), ...added.filter((row) => !taken.has(row.startsAt))]
    if (merged.length > MAX_DATES) {
      setRepeatError(t('events.dates.tooMany', { max: MAX_DATES }))
      return
    }
    replace(merged.sort((a, b) => a.startsAt.localeCompare(b.startsAt)))
  }

  const listError = errors.sessions?.root?.message ?? errors.sessions?.message
  // A saved single date that's over or sold can't be moved: its tickets carry it.
  const firstPast = Boolean(rows[0]?.startsAt) && new Date(rows[0].startsAt).getTime() < Date.now()
  const firstBooked = fields[0]?.id ? (bookedBySession[fields[0].id] ?? 0) : 0
  const firstLocked = Boolean(fields[0]?.id) && (firstPast || firstBooked > 0)
  const firstErrors = errors.sessions?.[0]

  const discountFields = (index: number) => (
    <>
      <label className="text-xs font-medium text-slate-700">
        {t('events.dates.discount')}
        <select className={`mt-1 ${input}`} {...register(`sessions.${index}.discountType`)}>
          <option value="">{t('events.form.discountNone')}</option>
          <option value="percentage">{t('events.form.discountPercentage')}</option>
          <option value="fixed">{t('events.form.discountFixed')}</option>
        </select>
      </label>
      {rows[index]?.discountType ? (
        <label className="text-xs font-medium text-slate-700">
          {t('events.form.valuePlaceholder')}
          <input type="number" min={0} className={`mt-1 ${input}`} {...register(`sessions.${index}.discountValue`)} />
          {errors.sessions?.[index]?.discountValue && (
            <span className="text-red-600">{errors.sessions[index]?.discountValue?.message}</span>
          )}
        </label>
      ) : null}
    </>
  )

  const kinds: { id: Kind; label: string }[] = [
    { id: 'single', label: t('events.dates.kindSingle') },
    { id: 'days', label: t('events.dates.kindDays') },
    { id: 'pass', label: t('events.dates.kindPass') },
  ]

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-800">{t('events.dates.title')}</h2>
        {summary && <p className="text-xs font-medium text-slate-700">{summary}</p>}
      </div>

      <p className="mb-2 text-xs font-medium text-slate-700">{t('events.dates.kindQuestion')}</p>
      <div className="mb-4 grid gap-2 pane-sm:grid-cols-3">
        {kinds.map((option) => {
          const active = kind === option.id
          const blocked = option.id !== 'days' && rows.length > 1
          return (
            <button
              key={option.id}
              type="button"
              disabled={blocked}
              onClick={() => choose(option.id)}
              className={`rounded-md border px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      {(kind === 'single' || kind === 'pass') && fields[0] && firstLocked && rows[0]?.startsAt && (
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <span className="min-w-0 flex-1 font-medium">{formatRow(rows[0])}</span>
          {firstBooked > 0 && <span className="text-xs">{t('events.dates.booked', { count: firstBooked })}</span>}
          {firstPast && <span className="text-xs font-medium">{t('events.dates.past')}</span>}
        </div>
      )}

      {(kind === 'single' || kind === 'pass') && fields[0] && !firstLocked && (
        <div className="grid gap-3 pane-sm:grid-cols-2 pane-md:grid-cols-4">
          <label className="text-xs font-medium text-slate-700">
            {kind === 'pass' ? t('events.dates.passStart') : t('events.dates.start')}
            <input type="datetime-local" className={`mt-1 ${input}`} {...register('sessions.0.startsAt')} />
            {firstErrors?.startsAt && <span className="text-red-600">{firstErrors.startsAt.message}</span>}
          </label>
          <label className="text-xs font-medium text-slate-700">
            {kind === 'pass' ? t('events.dates.passEnd') : t('events.dates.end')}
            <input type="datetime-local" className={`mt-1 ${input}`} {...register('sessions.0.endsAt')} />
            {firstErrors?.endsAt && <span className="text-red-600">{firstErrors.endsAt.message}</span>}
          </label>
          {discountFields(0)}
        </div>
      )}

      {kind === 'days' && (
        <>
          <p className="mb-3 text-xs text-slate-500">{t('events.dates.hint')}</p>
          <div className="mb-4 space-y-3 rounded-md border border-orange-200 bg-orange-50/50 p-3">
            <div className="grid grid-cols-2 gap-3 pane-sm:grid-cols-4">
              <label className="text-xs font-medium text-slate-700">
                {t('events.dates.from')}
                <input type="date" value={repeat.from} onChange={(e) => setRepeat({ ...repeat, from: e.target.value })} className={`mt-1 ${input}`} />
              </label>
              <label className="text-xs font-medium text-slate-700">
                {t('events.dates.to')}
                <input type="date" value={repeat.to} onChange={(e) => setRepeat({ ...repeat, to: e.target.value })} className={`mt-1 ${input}`} />
              </label>
              <label className="text-xs font-medium text-slate-700">
                {t('events.dates.startTime')}
                <input type="time" value={repeat.startTime} onChange={(e) => setRepeat({ ...repeat, startTime: e.target.value })} className={`mt-1 ${input}`} />
              </label>
              <label className="text-xs font-medium text-slate-700">
                {t('events.dates.endTime')}
                <input type="time" value={repeat.endTime} onChange={(e) => setRepeat({ ...repeat, endTime: e.target.value })} className={`mt-1 ${input}`} />
              </label>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-600">{t('events.dates.onDays')}</span>
              {weekdayNames.map((name, day) => {
                const on = repeat.weekdays.includes(day)
                return (
                  <button
                    key={day}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      setRepeat({ ...repeat, weekdays: on ? repeat.weekdays.filter((d) => d !== day) : [...repeat.weekdays, day] })
                    }
                    className={`rounded-full border px-2.5 py-1 text-xs ${on ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300 text-slate-600'}`}
                  >
                    {name}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-600">{t('events.dates.discount')}</span>
              <select
                value={repeat.discountType}
                onChange={(e) => setRepeat({ ...repeat, discountType: e.target.value as DateRow['discountType'] })}
                className="rounded-md border border-slate-300 px-2 py-1.5 text-xs"
              >
                <option value="">{t('events.form.discountNone')}</option>
                <option value="percentage">{t('events.form.discountPercentage')}</option>
                <option value="fixed">{t('events.form.discountFixed')}</option>
              </select>
              {repeat.discountType && (
                <input
                  type="number"
                  min={0}
                  value={repeat.discountValue}
                  onChange={(e) => setRepeat({ ...repeat, discountValue: e.target.value })}
                  placeholder={t('events.form.valuePlaceholder')}
                  className="w-24 rounded-md border border-slate-300 px-2 py-1.5 text-xs"
                />
              )}
              <button
                type="button"
                onClick={addRange}
                className="ms-auto rounded-md bg-gradient-to-r from-orange-500 to-orange-400 px-3 py-1.5 text-xs font-medium text-white"
              >
                {t('events.dates.addThese')}
              </button>
            </div>
            {repeatError && <p className="text-xs text-red-600">{repeatError}</p>}
          </div>

          <h3 className="mb-2 text-xs font-semibold text-slate-700">
            {t('events.dates.list')} <span className="font-normal text-slate-400">({fields.length})</span>
          </h3>
          {fields.length === 0 && <p className="text-sm text-slate-500">{t('events.dates.empty')}</p>}

          <div className="space-y-1.5">
            {fields.map((field, index) => {
              const row = rows[index]
              if (!row?.startsAt) return null
              const rowErrors = errors.sessions?.[index]
              const past = new Date(row.startsAt).getTime() < Date.now()
              const booked = field.id ? (bookedBySession[field.id] ?? 0) : 0
              // A past date or one with bookings is a record: shown, not edited or removed.
              const locked = Boolean(field.id) && (past || booked > 0)
              return (
                <div
                  key={field.key}
                  className={`flex flex-wrap items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                    past ? 'border-slate-200 bg-slate-50 text-slate-500' : 'border-slate-200 text-slate-800'
                  }`}
                >
                  <span className="min-w-0 flex-1 font-medium">{formatRow(row)}</span>
                  {booked > 0 && <span className="text-xs text-slate-500">{t('events.dates.booked', { count: booked })}</span>}
                  {past && <span className="text-xs font-medium">{t('events.dates.past')}</span>}
                  {!past && (
                    <>
                      <select className="rounded-md border border-slate-300 px-2 py-1 text-xs" {...register(`sessions.${index}.discountType`)}>
                        <option value="">{t('events.form.discountNone')}</option>
                        <option value="percentage">{t('events.form.discountPercentage')}</option>
                        <option value="fixed">{t('events.form.discountFixed')}</option>
                      </select>
                      {row.discountType ? (
                        <input
                          type="number"
                          min={0}
                          className="w-20 rounded-md border border-slate-300 px-2 py-1 text-xs"
                          {...register(`sessions.${index}.discountValue`)}
                        />
                      ) : null}
                    </>
                  )}
                  {!locked && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      aria-label={t('events.dates.remove')}
                      className="px-1.5 text-slate-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                  )}
                  {(rowErrors?.startsAt || rowErrors?.endsAt || rowErrors?.discountValue) && (
                    <span className="basis-full text-xs text-red-600">
                      {rowErrors.startsAt?.message ?? rowErrors.endsAt?.message ?? rowErrors.discountValue?.message}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}
      {listError && <p className="mt-2 text-sm text-red-600">{listError}</p>}
    </section>
  )
}
