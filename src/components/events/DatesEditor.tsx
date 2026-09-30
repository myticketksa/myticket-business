import { useState } from 'react'
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { EventFormValues } from '@/schemas/event.schema'

type DateRow = EventFormValues['sessions'][number]

const MAX_DATES = 500
const pad = (n: number) => String(n).padStart(2, '0')
const dayKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

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

export default function DatesEditor({
  control,
  register,
  errors,
}: {
  control: Control<EventFormValues>
  register: UseFormRegister<EventFormValues>
  errors: FieldErrors<EventFormValues>
}) {
  const { t, i18n } = useTranslation()
  const { fields, append, remove, replace } = useFieldArray({ control, name: 'sessions', keyName: 'key' })
  const [repeating, setRepeating] = useState(false)
  const [repeat, setRepeat] = useState({
    from: '',
    to: '',
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    startTime: '19:00',
    endTime: '',
    discountType: '' as DateRow['discountType'],
    discountValue: '',
  })
  const [repeatError, setRepeatError] = useState<string | null>(null)

  // Sunday-first names in the dashboard's own language.
  const weekdayNames = Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(i18n.language, { weekday: 'short' }).format(new Date(2024, 0, 7 + index)),
  )

  const input = 'w-full rounded-md border border-slate-300 px-3 py-2 text-sm'
  const smallButton = 'rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50'

  const addRange = () => {
    setRepeatError(null)
    if (!repeat.from || !repeat.to || !repeat.startTime || repeat.weekdays.length === 0) {
      setRepeatError(t('events.dates.repeatIncomplete'))
      return
    }
    const rows = expandDates(repeat)
    if (rows.length === 0) {
      setRepeatError(t('events.dates.repeatNone'))
      return
    }
    // Keep what's already there, skip exact duplicates, and list everything in date order.
    const current = fields.map(({ key: _key, ...row }) => row as DateRow)
    const taken = new Set(current.map((row) => row.startsAt))
    const merged = [...current.filter((row) => row.startsAt), ...rows.filter((row) => !taken.has(row.startsAt))]
    if (merged.length > MAX_DATES) {
      setRepeatError(t('events.dates.tooMany', { max: MAX_DATES }))
      return
    }
    replace(merged.sort((a, b) => a.startsAt.localeCompare(b.startsAt)))
    setRepeating(false)
  }

  const listError = (errors.sessions as { message?: string } | undefined)?.message

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-800">
          {t('events.dates.title')} <span className="font-normal text-slate-400">({fields.length})</span>
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => append({ startsAt: '', endsAt: '', discountType: '', discountValue: '' })}
            className={smallButton}
          >
            {t('events.dates.addOne')}
          </button>
          <button type="button" onClick={() => setRepeating((v) => !v)} className={smallButton}>
            {t('events.dates.addSeveral')}
          </button>
        </div>
      </div>
      <p className="mb-3 text-xs text-slate-500">{t('events.dates.hint')}</p>

      {repeating && (
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
      )}

      {fields.length === 0 && <p className="text-sm text-slate-500">{t('events.dates.empty')}</p>}

      <div className="space-y-2">
        {fields.map((field, index) => {
          const rowErrors = errors.sessions?.[index]
          return (
            <div key={field.key} className="grid grid-cols-2 items-start gap-2 rounded-md border border-slate-200 p-2 pane-md:grid-cols-[1fr_1fr_9rem_6rem_auto]">
              <label className="text-[11px] text-slate-500">
                {t('events.dates.start')}
                <input type="datetime-local" className={`mt-0.5 ${input}`} {...register(`sessions.${index}.startsAt`)} />
                {rowErrors?.startsAt && <span className="text-red-600">{rowErrors.startsAt.message}</span>}
              </label>
              <label className="text-[11px] text-slate-500">
                {t('events.dates.end')}
                <input type="datetime-local" className={`mt-0.5 ${input}`} {...register(`sessions.${index}.endsAt`)} />
                {rowErrors?.endsAt && <span className="text-red-600">{rowErrors.endsAt.message}</span>}
              </label>
              <label className="text-[11px] text-slate-500">
                {t('events.dates.discount')}
                <select className={`mt-0.5 ${input}`} {...register(`sessions.${index}.discountType`)}>
                  <option value="">{t('events.form.discountNone')}</option>
                  <option value="percentage">{t('events.form.discountPercentage')}</option>
                  <option value="fixed">{t('events.form.discountFixed')}</option>
                </select>
              </label>
              <label className="text-[11px] text-slate-500">
                {t('events.form.valuePlaceholder')}
                <input type="number" min={0} className={`mt-0.5 ${input}`} {...register(`sessions.${index}.discountValue`)} />
                {rowErrors?.discountValue && <span className="text-red-600">{rowErrors.discountValue.message}</span>}
              </label>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={t('events.dates.remove')}
                className="self-center justify-self-end px-2 text-slate-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          )
        })}
      </div>
      {listError && <p className="mt-2 text-sm text-red-600">{listError}</p>}
    </section>
  )
}
