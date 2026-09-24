import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '@/components/LoadingSpinner'
import PageHeader from '@/components/PageHeader'
import { utcToLocalInput } from '@/lib/datetime'
import { buildEventFormSchema, emptyEventFormValues, type EventFormValues } from '@/schemas/event.schema'
import {
  useCreateEventMutation,
  useGetEventCategoriesQuery,
  useGetEventQuery,
  useGetVenuesQuery,
  useUpdateEventMutation,
} from '@/services/eventsApi'
import { usePreparedImages } from '@/hooks/usePreparedImages'
import { apiErrorMessage } from '@/lib/apiError'

/**
 * Create is reachable only while the organizer has no event yet — the
 * backend refuses a second (see Organizer\EventService::create), and the
 * entry point on EventsListPage only shows while the list is empty, so this
 * form doesn't need to re-check that itself. Category, venue, seating type,
 * the free flag, discounts and ticket types are create-only either way
 * (see UpdateEventRequest on the backend) — same as the admin dashboard's
 * event form, minus the fields that are the platform's call rather than the
 * organizer's (commission, featured, status).
 */
export default function EventFormPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const eventId = id ? Number(id) : undefined
  const navigate = useNavigate()

  const { data: categories } = useGetEventCategoriesQuery(undefined, { skip: isEdit })
  const { data: venues } = useGetVenuesQuery(undefined, { skip: isEdit })
  const { data: event, isLoading: isLoadingEvent } = useGetEventQuery(eventId!, { skip: !isEdit })

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation()
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { isPreparingImages, prepareImage } = usePreparedImages()

  const eventFormSchema = useMemo(() => buildEventFormSchema(t, isEdit), [t, isEdit])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: emptyEventFormValues,
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'ticketTypes' })
  const seatingType = watch('seatingType')

  useEffect(() => {
    if (!event) return
    reset({
      ...emptyEventFormValues,
      startsAt: utcToLocalInput(event.startTime),
      translations: {
        en: {
          title: event.title.en ?? '',
          shortDescription: event.short_description.en ?? '',
          description: event.description.en ?? '',
        },
        ar: {
          title: event.title.ar ?? '',
          shortDescription: event.short_description.ar ?? '',
          description: event.description.ar ?? '',
        },
      },
    })
  }, [event, reset])

  const onSubmit = async (values: EventFormValues) => {
    setSubmitError(null)
    const coverImage = await prepareImage(values.coverImage)
    const withImages = { ...values, coverImage }
    try {
      if (isEdit && eventId) {
        await updateEvent({ id: eventId, values: withImages }).unwrap()
        navigate(`/events/${eventId}`)
      } else {
        const created = await createEvent(withImages).unwrap()
        navigate(`/events/${created.id}`)
      }
    } catch (err) {
      setSubmitError(apiErrorMessage(err, t, 'events.form.errorGeneric'))
    }
  }

  if (isEdit && isLoadingEvent) {
    return <LoadingSpinner size={160} />
  }

  const formTitle = isEdit ? t('events.form.editTitle') : t('events.form.addTitle')
  const backPath = isEdit && eventId ? `/events/${eventId}` : '/events'

  return (
    <div>
      <PageHeader
        crumbs={[
          { label: t('common.dashboard'), path: '/' },
          { label: t('common.events'), path: '/events' },
          { label: formTitle },
        ]}
        title={formTitle}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="animate-fade-in space-y-6 px-4 pb-12 pane-sm:px-8"
      >
        {!isEdit && (
          <section className="grid grid-cols-1 gap-4 rounded-lg border border-slate-200 bg-white p-5 pane-sm:grid-cols-2">
            <div>
              <label htmlFor="categoryId" className="mb-1 block text-sm font-medium text-slate-700">
                {t('events.form.category')}
              </label>
              <select
                id="categoryId"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register('categoryId')}
              >
                <option value="">{t('events.form.selectCategory')}</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name.en || category.name.ar}
                  </option>
                ))}
              </select>
              {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>}
            </div>

            <div>
              <label htmlFor="venueId" className="mb-1 block text-sm font-medium text-slate-700">
                {t('events.form.venue')}
              </label>
              <select
                id="venueId"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register('venueId')}
              >
                <option value="">{t('events.form.selectVenue')}</option>
                {venues?.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </select>
              {errors.venueId && <p className="mt-1 text-sm text-red-600">{errors.venueId.message}</p>}
            </div>

            <div>
              <label htmlFor="seatingType" className="mb-1 block text-sm font-medium text-slate-700">
                {t('events.form.seatingType')}
              </label>
              <select
                id="seatingType"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register('seatingType')}
              >
                <option value="assigned">{t('events.form.seatingAssigned')}</option>
                <option value="free">{t('events.form.seatingFree')}</option>
              </select>
            </div>

            <div className="flex items-end">
              <label htmlFor="isFree" className="flex items-center gap-2 text-sm text-slate-700">
                <input id="isFree" type="checkbox" {...register('isFree')} />{' '}
                {t('events.form.freeEventCheckbox')}
              </label>
            </div>

            <div>
              <label htmlFor="coverImage" className="mb-1 block text-sm font-medium text-slate-700">
                {t('events.form.coverImage')}
              </label>
              <input
                id="coverImage"
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) => setValue('coverImage', e.target.files?.[0])}
                className="w-full text-sm"
              />
              {errors.coverImage && (
                <p className="mt-1 text-sm text-red-600">{errors.coverImage.message}</p>
              )}
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 gap-4 rounded-lg border border-slate-200 bg-white p-5 pane-sm:grid-cols-2">
          <div>
            <label htmlFor="startsAt" className="mb-1 block text-sm font-medium text-slate-700">
              {t('events.form.startsAt')}
            </label>
            <input
              id="startsAt"
              type="datetime-local"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              {...register('startsAt')}
            />
            {errors.startsAt && <p className="mt-1 text-sm text-red-600">{errors.startsAt.message}</p>}
          </div>
          <div>
            <label htmlFor="endsAt" className="mb-1 block text-sm font-medium text-slate-700">
              {t('events.form.endsAt')}
            </label>
            <input
              id="endsAt"
              type="datetime-local"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              {...register('endsAt')}
            />
          </div>

          {isEdit && (
            <>
              <div>
                <label htmlFor="salesStartAt" className="mb-1 block text-sm font-medium text-slate-700">
                  {t('events.form.salesStart')}
                </label>
                <input
                  id="salesStartAt"
                  type="datetime-local"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register('salesStartAt')}
                />
              </div>
              <div>
                <label htmlFor="salesEndAt" className="mb-1 block text-sm font-medium text-slate-700">
                  {t('events.form.salesEnd')}
                </label>
                <input
                  id="salesEndAt"
                  type="datetime-local"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register('salesEndAt')}
                />
              </div>
              <div>
                <label htmlFor="minAge" className="mb-1 block text-sm font-medium text-slate-700">
                  {t('events.form.minAge')}
                </label>
                <input
                  id="minAge"
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register('minAge')}
                />
              </div>
            </>
          )}
        </section>

        {!isEdit && (
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-slate-800">{t('events.form.discountTitle')}</h2>
            <div className="grid grid-cols-1 gap-4 pane-sm:grid-cols-4">
              <select
                aria-label={t('events.form.discountTitle')}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register('discountType')}
              >
                <option value="">{t('events.form.discountNone')}</option>
                <option value="fixed">{t('events.form.discountFixed')}</option>
                <option value="percentage">{t('events.form.discountPercentage')}</option>
              </select>
              <input
                type="text"
                placeholder={t('events.form.valuePlaceholder')}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register('discountValue')}
              />
              <input
                type="datetime-local"
                aria-label={t('events.form.discountStartsAt')}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register('discountStartsAt')}
              />
              <input
                type="datetime-local"
                aria-label={t('events.form.discountEndsAt')}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                {...register('discountEndsAt')}
              />
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 gap-4 rounded-lg border border-slate-200 bg-white p-5 pane-md:grid-cols-2">
          {(['en', 'ar'] as const).map((locale) => (
            <div key={locale} className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-800">
                {locale === 'en' ? t('events.form.english') : t('events.form.arabic')}
              </h2>
              <div>
                <label
                  htmlFor={`title-${locale}`}
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  {t('events.form.title')}
                </label>
                <input
                  id={`title-${locale}`}
                  type="text"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`translations.${locale}.title`)}
                />
                {errors.translations?.[locale]?.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.translations[locale]?.title?.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor={`shortDescription-${locale}`}
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  {t('events.form.shortDescription')}
                </label>
                <input
                  id={`shortDescription-${locale}`}
                  type="text"
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`translations.${locale}.shortDescription`)}
                />
              </div>
              <div>
                <label
                  htmlFor={`description-${locale}`}
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  {t('events.form.description')}
                </label>
                <textarea
                  id={`description-${locale}`}
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  rows={4}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  {...register(`translations.${locale}.description`)}
                />
                {errors.translations?.[locale]?.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.translations[locale]?.description?.message}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>

        {!isEdit && (
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-800">{t('events.form.ticketTypesTitle')}</h2>
              <button
                type="button"
                onClick={() =>
                  append({
                    name: '',
                    isSpecialNeeds: false,
                    price: '',
                    isVatIncluded: true,
                    entryTimeStart: '',
                    entryTimeEnd: '',
                    quantityTotal: '',
                  })
                }
                className="text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                {t('events.form.addTicketType')}
              </button>
            </div>
            {seatingType === 'assigned' && (
              <p className="mb-3 text-xs text-slate-500">{t('events.form.ticketTypesAssignedHint')}</p>
            )}
            {errors.ticketTypes && !Array.isArray(errors.ticketTypes) && (
              <p className="mb-2 text-sm text-red-600">{errors.ticketTypes.message}</p>
            )}
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="rounded-md border border-slate-200 p-3">
                  <div className="grid grid-cols-1 gap-3 pane-sm:grid-cols-4">
                    <input
                      type="text"
                      placeholder={t('events.form.namePlaceholder')}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                      {...register(`ticketTypes.${index}.name`)}
                    />
                    <input
                      type="text"
                      placeholder={t('events.form.pricePlaceholder')}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                      {...register(`ticketTypes.${index}.price`)}
                    />
                    <input
                      type="text"
                      placeholder={t('events.form.quantityPlaceholder')}
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                      {...register(`ticketTypes.${index}.quantityTotal`)}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      {t('events.form.remove')}
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <label
                      htmlFor={`ticketTypes.${index}.isSpecialNeeds`}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <input
                        id={`ticketTypes.${index}.isSpecialNeeds`}
                        type="checkbox"
                        {...register(`ticketTypes.${index}.isSpecialNeeds`)}
                      />
                      {t('events.form.ticketSpecialNeeds')}
                    </label>
                    <label
                      htmlFor={`ticketTypes.${index}.isVatIncluded`}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <input
                        id={`ticketTypes.${index}.isVatIncluded`}
                        type="checkbox"
                        defaultChecked
                        {...register(`ticketTypes.${index}.isVatIncluded`)}
                      />
                      {t('events.form.ticketVatIncluded')}
                    </label>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <label
                      htmlFor={`ticketTypes.${index}.entryTimeStart`}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      {t('events.form.entryWindow')}
                      <input
                        id={`ticketTypes.${index}.entryTimeStart`}
                        type="time"
                        className="rounded-md border border-slate-300 px-2 py-1 text-sm"
                        {...register(`ticketTypes.${index}.entryTimeStart`)}
                      />
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
                </div>
              ))}
            </div>
          </section>
        )}

        {submitError && <p className="text-sm text-red-600">{submitError}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isCreating || isUpdating || isPreparingImages}
            className="rounded-md bg-gradient-to-r from-orange-500 to-orange-400 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {isPreparingImages
              ? t('common.preparingImages')
              : isCreating || isUpdating
                ? t('events.form.saving')
                : isEdit
                  ? t('events.form.saveChanges')
                  : t('events.form.createEvent')}
          </button>
          <Link
            to={backPath}
            className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {t('common.cancel')}
          </Link>
        </div>
      </form>
    </div>
  )
}
