import {
  useFieldArray,
  useWatch,
  type Control,
  type FieldErrors,
  type UseFormGetValues,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { EventFormValues } from '@/schemas/event.schema'
import { activitySummary, weekdayName } from '@/lib/activitySummary'
import { emptyTicketType, newActivityKey } from '@/lib/eventFormDefaults'
import TicketTypeFields from './TicketTypeFields'
import TimesEditor from './TimesEditor'
import { sortTimes } from '@/lib/times'

const ALL_WEEK = [0, 1, 2, 3, 4, 5, 6]
type TicketTypeValues = EventFormValues['ticketTypes'][number]

/**
 * Things to book inside one event (27 Oct 2026, reworked after the form
 * review): a compact list — name, schedule, capacity, prices, what's
 * missing — and one activity at a time opened in place in the list (not a
 * side panel: owner, 27 Oct 2026), always in the order Name → Schedule →
 * Capacity → Prices. Each activity's ticket types live inside it and share
 * its places per time.
 */
export default function ActivitiesEditor({
  control,
  register,
  setValue,
  getValues,
  errors,
  typeFields,
  appendType,
  removeTypes,
  soldFor,
  onBackToOne,
  editing,
  setEditing,
}: {
  control: Control<EventFormValues>
  register: UseFormRegister<EventFormValues>
  setValue: UseFormSetValue<EventFormValues>
  getValues: UseFormGetValues<EventFormValues>
  errors: FieldErrors<EventFormValues>
  /** The page's ticket type rows (one list for the whole event). */
  typeFields: { key: string }[]
  appendType: (type: TicketTypeValues | TicketTypeValues[]) => void
  removeTypes: (indexes: number[]) => void
  soldFor: (index: number) => number | null | undefined
  /** The last activity removed: back to an ordinary event, its ticket types kept. */
  onBackToOne: () => void
  editing: number | null
  setEditing: (index: number | null) => void
}) {
  const { t, i18n } = useTranslation()
  const { fields, append, remove } = useFieldArray({ control, name: 'activities', keyName: 'rowKey' })
  const activities = useWatch({ control, name: 'activities' }) ?? []
  const types = useWatch({ control, name: 'ticketTypes' }) ?? []

  const label = (index: number) => {
    const a = activities[index]
    const name = (i18n.language.startsWith('ar') ? a?.nameAr || a?.nameEn : a?.nameEn || a?.nameAr)?.trim()
    return name || t('events.activities.activityNumber', { number: index + 1 })
  }
  const typesOf = (key: string | undefined) => types.flatMap((type, index) => (key && type.activityKey === key ? [index] : []))

  /** What still needs filling in, in words. */
  const problems = (index: number): string[] => {
    const a = activities[index]
    if (!a) return []
    const out: string[] = []
    if (!a.nameEn.trim() && !a.nameAr.trim()) out.push(t('events.activities.needsName'))
    if (a.weekdays.length === 0) out.push(t('events.activities.needsDays'))
    const own = typesOf(a.key)
    if (own.length === 0) out.push(t('events.activities.needsTicketType'))
    else if (own.some((i) => !types[i].price?.trim())) out.push(t('events.activities.needsPrice'))
    if (own.some((i) => errors.ticketTypes?.[i])) out.push(t('events.activities.needsTicketFix'))
    if (errors.activities?.[index] && out.length === 0) out.push(t('events.activities.needsFix'))
    return out
  }

  const addActivity = () => {
    const key = newActivityKey()
    append({ key, nameEn: '', nameAr: '', descriptionEn: '', descriptionAr: '', weekdays: ALL_WEEK, startTimes: [], durationMinutes: '60', capacity: '' })
    appendType(emptyTicketType(key))
    setEditing(fields.length)
  }
  const duplicate = (index: number) => {
    const source = getValues(`activities.${index}`)
    const key = newActivityKey()
    append({ ...source, id: undefined, key })
    const copies = typesOf(source.key).map((i) => ({ ...getValues(`ticketTypes.${i}`), id: undefined, activityKey: key }))
    if (copies.length) appendType(copies)
    setEditing(fields.length)
  }
  const removeActivity = (index: number) => {
    if (fields.length === 1) onBackToOne()
    else removeTypes(typesOf(activities[index]?.key))
    remove(index)
    setEditing(null)
  }

  const open = editing != null && activities[editing] ? editing : null
  const current = open != null ? activities[open] : null
  const priceRange = (key: string) => {
    const p = typesOf(key)
      .map((i) => Number(types[i].price))
      .filter((n) => types.length > 0 && Number.isFinite(n) && n > 0)
    if (!p.length) return ''
    const lo = Math.min(...p)
    const hi = Math.max(...p)
    return ` · ${lo === hi ? lo : `${lo}–${hi}`} ${t('events.activities.sar')}`
  }


  /** One activity's fields, opened in place under its row. */
  const editor = (open: number, current: (typeof activities)[number]) => (
            <div className="space-y-4 border-t border-orange-200 bg-orange-50/40 p-4">
              {/* 1. Name */}
              <section className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="mb-2 text-sm font-semibold text-slate-800">{t('events.activities.stepName')}</h3>
                <div className="grid grid-cols-1 gap-3 pane-sm:grid-cols-2">
                  {(
                    [
                      ['nameEn', 'events.activities.nameEn', 'ltr'],
                      ['nameAr', 'events.activities.nameAr', 'rtl'],
                    ] as const
                  ).map(([name, labelKey, dir]) => (
                    <label key={name} className="block text-xs font-medium text-slate-600">
                      {t(labelKey)}
                      <input type="text" dir={dir} maxLength={100} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal" {...register(`activities.${open}.${name}`)} />
                    </label>
                  ))}
                  {(
                    [
                      ['descriptionEn', 'events.activities.descriptionEn', 'ltr'],
                      ['descriptionAr', 'events.activities.descriptionAr', 'rtl'],
                    ] as const
                  ).map(([name, labelKey, dir]) => (
                    <label key={name} className="block text-xs font-medium text-slate-600">
                      {t(labelKey)}
                      <textarea rows={2} dir={dir} maxLength={1000} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal" {...register(`activities.${open}.${name}`)} />
                    </label>
                  ))}
                </div>
                {errors.activities?.[open]?.nameEn && <p className="mt-1 text-xs text-red-600">{errors.activities[open]?.nameEn?.message}</p>}
              </section>

              {/* 2. Schedule */}
              <section className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="mb-2 text-sm font-semibold text-slate-800">{t('events.activities.stepSchedule')}</h3>
                <p className="mb-1 text-xs font-medium text-slate-600">{t('events.activities.days')}</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_WEEK.map((day) => {
                    const on = current.weekdays.includes(day)
                    return (
                      <button
                        key={day}
                        type="button"
                        aria-pressed={on}
                        onClick={() =>
                          setValue(`activities.${open}.weekdays`, on ? current.weekdays.filter((d) => d !== day) : [...current.weekdays, day].sort(), {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                        className={`rounded-full border px-3 py-1 text-xs ${on ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300 text-slate-600'}`}
                      >
                        {weekdayName(day, i18n.language)}
                      </button>
                    )
                  })}
                </div>
                <p className="mb-1 mt-3 text-xs font-medium text-slate-600">{t('events.activities.times')}</p>
                <TimesEditor
                  value={current.startTimes}
                  onChange={(times) => setValue(`activities.${open}.startTimes`, sortTimes(times), { shouldDirty: true, shouldValidate: true })}
                />
                {current.startTimes.length > 0 && (
                  <label className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-600">
                    {t('events.activities.duration')}
                    <input type="text" inputMode="numeric" className="w-20 rounded-md border border-slate-300 px-2 py-1 text-sm font-normal" {...register(`activities.${open}.durationMinutes`)} />
                  </label>
                )}
                <p className="mt-3 rounded-md bg-orange-50 px-3 py-2 text-sm text-slate-700">{activitySummary(current, t, i18n.language)}</p>
                <p className="mt-1 text-xs text-slate-400">{t('events.activities.withinDates')}</p>
              </section>

              {/* 3. Capacity */}
              <section className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="mb-2 text-sm font-semibold text-slate-800">{t('events.activities.stepCapacity')}</h3>
                <label className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
                  {current.startTimes.length ? t('events.activities.capacityQuestion') : t('events.activities.capacityQuestionDay')}
                  <input type="text" inputMode="numeric" className="w-24 rounded-md border border-slate-300 px-2 py-1 text-sm" {...register(`activities.${open}.capacity`)} />
                </label>
                <p className="mt-1 text-xs text-slate-500">{t('events.activities.capacityHint')}</p>
              </section>

              {/* 4. Prices — this activity's ticket types */}
              <section className="rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="mb-1 text-sm font-semibold text-slate-800">{t('events.activities.stepPrices')}</h3>
                {current.capacity?.trim() && <p className="mb-2 text-xs text-slate-500">{t('events.activities.sharedPlaces', { count: Number(current.capacity) })}</p>}
                <div className="space-y-3">
                  {typeFields.map((field, index) =>
                    types[index]?.activityKey === current.key ? (
                      <TicketTypeFields
                        key={field.key}
                        index={index}
                        mode="activity"
                        control={control}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        sold={soldFor(index)}
                        onRemove={() => removeTypes([index])}
                      />
                    ) : null,
                  )}
                </div>
                <button type="button" onClick={() => appendType(emptyTicketType(current.key))} className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-700">
                  {t('events.form.addTicketType')}
                </button>
              </section>
            </div>
  )

  return (
    <div>
      <ul className="divide-y divide-slate-100 rounded-md border border-slate-200">
        {fields.map((field, index) => {
          const a = activities[index]
          const issues = problems(index)
          return (
            <li key={field.rowKey} className={open === index ? 'bg-white ring-2 ring-orange-300' : ''}>
              <div className="flex flex-wrap items-center gap-3 px-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-800">{label(index)}</p>
                <p className="text-xs text-slate-500">{a ? activitySummary(a, t, i18n.language) : ''}</p>
                <p className="text-xs text-slate-500">
                  {a?.capacity?.trim() ? t('events.activities.capacityLine', { count: Number(a.capacity) }) : t('events.activities.noCapacity')}
                  {priceRange(a?.key ?? '')}
                </p>
                {issues.length > 0 && <p className="mt-0.5 text-xs text-red-600">{issues.join(' · ')}</p>}
              </div>
              <div className="flex gap-3 text-sm">
                <button type="button" onClick={() => setEditing(open === index ? null : index)} className="font-medium text-orange-600 hover:text-orange-700">
                  {open === index ? t('events.activities.done') : t('events.activities.edit')}
                </button>
                <button type="button" onClick={() => duplicate(index)} className="text-slate-600 hover:text-slate-800">
                  {t('events.activities.duplicate')}
                </button>
                <button type="button" onClick={() => removeActivity(index)} className="text-red-600 hover:text-red-700">
                  {t('events.activities.remove')}
                </button>
              </div>
              </div>
              {open === index && current ? (
                <>
                  {editor(index, current)}
                  <div className="flex justify-end border-t border-orange-200 bg-orange-50/40 px-4 py-3">
                    <button type="button" onClick={() => setEditing(null)} className="rounded-md bg-orange-500 px-4 py-1.5 text-sm font-medium text-white">
                      {t('events.activities.done')}
                    </button>
                  </div>
                </>
              ) : null}
            </li>
          )
        })}
      </ul>
      <button type="button" onClick={addActivity} className="mt-3 text-sm font-medium text-orange-600 hover:text-orange-700">
        {t('events.activities.add')}
      </button>


    </div>
  )
}
