import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { useLocalized } from '@/lib/localized'
import FieldError from '@/components/FieldError'
import LocationPicker from '@/components/LocationPicker'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useInlineValidation } from '@/hooks/useInlineValidation'
import { apiErrorMessage } from '@/lib/apiError'
import { useCreateVenueMutation, useGetCitiesQuery, type VenueFormValues } from '@/services/venuesApi'
import type { Venue } from '@/types/event'

const emptyValues: VenueFormValues = {
  name: '',
  cityId: '',
  address: '',
  latitude: '',
  longitude: '',
}

/**
 * Adding a venue without leaving the event form.
 *
 * Venues had no write endpoint at all until now, so the only way to get one
 * was through the database — which meant an event couldn't be created for
 * anywhere new. The point of this being a modal is that it's reachable at the
 * moment you discover the venue is missing, which is while filling in the
 * event.
 */
export default function VenueFormModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  /** Hands back the new venue so the form can select it straight away. */
  onCreated: (venue: Venue) => void
}) {
  const { t } = useTranslation()
  const localized = useLocalized()
  const { errors, validate, clearError } = useInlineValidation()
  useEscapeKey(onClose)

  const { data: cities } = useGetCitiesQuery()
  const [createVenue, { isLoading }] = useCreateVenueMutation()
  const [values, setValues] = useState<VenueFormValues>(emptyValues)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate(e.currentTarget)) return
    if (!values.latitude || !values.longitude) {
      setError(t('venues.form.locationRequired'))
      return
    }
    setError(null)
    try {
      const venue = await createVenue(values).unwrap()
      onCreated(venue)
    } catch (err) {
      setError(apiErrorMessage(err, t, 'venues.form.errorGeneric'))
    }
  }

  const inputClass =
    'w-full rounded-md border border-slate-300 px-3 py-2 text-sm transition-colors focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100'

  return createPortal(
    <div
      onClick={onClose}
      className="animate-fade-in-fast fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        onInput={(e) => clearError((e.target as HTMLElement).id)}
        onClick={(e) => e.stopPropagation()}
        className="animate-scale-in max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
      >
        <h2 className="mb-1 text-lg font-semibold text-slate-900">{t('venues.form.addTitle')}</h2>
        <p className="mb-4 text-xs text-slate-500">{t('venues.form.hint')}</p>

        <div className="space-y-3">
          <div>
            <label htmlFor="venue-name" className="mb-1 block text-sm font-medium text-slate-700">
              {t('venues.form.name')}
            </label>
            <input
              id="venue-name"
              type="text"
              required
              maxLength={255}
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              className={inputClass}
            />
            <FieldError message={errors['venue-name']} />
          </div>

          <div>
            <label htmlFor="venue-city" className="mb-1 block text-sm font-medium text-slate-700">
              {t('venues.form.city')}
            </label>
            <select
              id="venue-city"
              required
              value={values.cityId}
              onChange={(e) =>
                setValues((v) => ({ ...v, cityId: e.target.value ? Number(e.target.value) : '' }))
              }
              className={inputClass}
            >
              <option value="">{t('venues.form.selectCity')}</option>
              {cities?.map((city) => (
                <option key={city.id} value={city.id}>
                  {localized(city.name)}
                </option>
              ))}
            </select>
            <FieldError message={errors['venue-city']} />
          </div>

          <div>
            <label htmlFor="venue-address" className="mb-1 block text-sm font-medium text-slate-700">
              {t('venues.form.address')}
            </label>
            <input
              id="venue-address"
              type="text"
              maxLength={255}
              value={values.address}
              onChange={(e) => setValues((v) => ({ ...v, address: e.target.value }))}
              className={inputClass}
            />
            <FieldError message={errors['venue-address']} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t('venues.form.location')}
            </label>
            <LocationPicker
              latitude={values.latitude}
              longitude={values.longitude}
              onChange={(latitude, longitude) => setValues((v) => ({ ...v, latitude, longitude }))}
            />
          </div>
        </div>

        {error && <p className="animate-fade-in-fast mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? t('events.form.saving') : t('venues.form.save')}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  )
}
