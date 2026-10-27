import { useState } from 'react'
import { useWatch, type Control, type FieldErrors, type UseFormRegister, type UseFormSetValue } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { EventFormValues } from '@/schemas/event.schema'

/**
 * One ticket type's fields: names, price, what it includes, and its limit.
 *
 * - `plain`: an ordinary event — quantity per date is asked, and the daily
 *   entry hours (a "morning" ticket).
 * - `activity`: inside an activity — its tickets share the activity's places
 *   per time, so a quantity of its own is behind "Limit this ticket type",
 *   and its hours are the activity's times.
 */
export default function TicketTypeFields({
  index,
  mode,
  control,
  register,
  setValue,
  errors,
  onRemove,
  sold,
}: {
  index: number
  mode: 'plain' | 'activity'
  control: Control<EventFormValues>
  register: UseFormRegister<EventFormValues>
  setValue: UseFormSetValue<EventFormValues>
  errors: FieldErrors<EventFormValues>
  onRemove: () => void
  sold?: number | null
}) {
  const { t } = useTranslation()
  const quantity = useWatch({ control, name: `ticketTypes.${index}.quantityTotal` })
  const [limited, setLimited] = useState(Boolean(quantity))
  const err = errors.ticketTypes?.[index]
  const input = (bad?: unknown) =>
    `mt-1 w-full rounded-md border px-3 py-2 text-sm font-normal ${bad ? 'border-red-400' : 'border-slate-300'}`
  const showQuantity = mode === 'plain' || limited

  return (
    <div className="rounded-md border border-slate-200 bg-white p-3">
      <div className="grid grid-cols-1 gap-3 pane-sm:grid-cols-[1fr_1fr_8rem_auto]">
        {(
          [
            ['nameEn', 'events.form.ticketNameEn', 'ltr'],
            ['nameAr', 'events.form.ticketNameAr', 'rtl'],
          ] as const
        ).map(([name, label, dir]) => (
          <label key={name} className="block text-xs font-medium text-slate-600">
            {t(label)}
            <input type="text" dir={dir} aria-invalid={Boolean(err?.[name])} className={input(err?.[name])} {...register(`ticketTypes.${index}.${name}`)} />
            {err?.[name] && <span className="mt-1 block font-normal text-red-600">{err[name]?.message}</span>}
          </label>
        ))}
        <label className="block text-xs font-medium text-slate-600">
          {t('events.form.ticketPrice')}
          <input type="text" inputMode="decimal" aria-invalid={Boolean(err?.price)} className={input(err?.price)} {...register(`ticketTypes.${index}.price`)} />
          {err?.price && <span className="mt-1 block font-normal text-red-600">{err.price.message}</span>}
        </label>
        <button type="button" onClick={onRemove} className="self-end pb-2 text-sm text-red-600 hover:text-red-700">
          {t('events.form.remove')}
        </button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 pane-sm:grid-cols-2">
        {(
          [
            ['descriptionEn', 'events.form.ticketDescriptionEn', 'ltr'],
            ['descriptionAr', 'events.form.ticketDescriptionAr', 'rtl'],
          ] as const
        ).map(([name, label, dir]) => (
          <label key={name} className="block text-xs font-medium text-slate-600">
            {t(label)}
            <textarea rows={2} maxLength={500} dir={dir} className={input()} {...register(`ticketTypes.${index}.${name}`)} />
          </label>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        {mode === 'activity' && (
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={limited}
              onChange={(e) => {
                setLimited(e.target.checked)
                if (!e.target.checked) setValue(`ticketTypes.${index}.quantityTotal`, '', { shouldDirty: true, shouldValidate: true })
              }}
            />
            {t('events.activities.limitType')}
          </label>
        )}
        {showQuantity && (
          <label className="flex items-center gap-2 text-sm text-slate-700">
            {t(mode === 'activity' ? 'events.activities.typeLimit' : 'events.form.ticketQuantity')}
            <input
              type="text"
              inputMode="numeric"
              aria-invalid={Boolean(err?.quantityTotal)}
              className={`w-24 rounded-md border px-2 py-1 text-sm ${err?.quantityTotal ? 'border-red-400' : 'border-slate-300'}`}
              {...register(`ticketTypes.${index}.quantityTotal`)}
            />
          </label>
        )}
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" {...register(`ticketTypes.${index}.isSpecialNeeds`)} />
          {t('events.form.ticketSpecialNeeds')}
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" {...register(`ticketTypes.${index}.isVatIncluded`)} />
          {t('events.form.ticketVatIncluded')}
        </label>
        {sold ? <span className="text-xs text-slate-500">{t('events.form.ticketSold', { count: sold })}</span> : null}
      </div>
      {err?.quantityTotal && <p className="mt-1 text-xs text-red-600">{err.quantityTotal.message}</p>}

      {mode === 'plain' && (
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            {t('events.form.entryWindow')}
            <input type="time" className="rounded-md border border-slate-300 px-2 py-1 text-sm" {...register(`ticketTypes.${index}.entryTimeStart`)} />
          </label>
          <span className="text-sm text-slate-400">–</span>
          <input
            aria-label={t('events.form.entryWindowEnd')}
            type="time"
            className="rounded-md border border-slate-300 px-2 py-1 text-sm"
            {...register(`ticketTypes.${index}.entryTimeEnd`)}
          />
          <span className="text-xs text-slate-400">{t('events.form.entryWindowHint')}</span>
        </div>
      )}
    </div>
  )
}
