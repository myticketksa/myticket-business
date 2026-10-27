import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import DatesEditor from '@/components/events/DatesEditor'
import ActivitiesEditor from '@/components/events/ActivitiesEditor'
import EventPhotos from '@/components/events/EventPhotos'
import TicketTypeFields from '@/components/events/TicketTypeFields'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '@/components/LoadingSpinner'
import PageHeader from '@/components/PageHeader'
import VenueFormModal from '@/components/venues/VenueFormModal'
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
import SeatGridEditor, { emptyGrid, gridToBlocks, reservedSeats, seatCountsByType, type SeatGrid } from '@/components/seatMap/SeatGridEditor'
import { useReserveNewSeats } from '@/services/seatMapApi'
import { useLocalized } from '@/lib/localized'
import { emptyTicketType, newActivityKey } from '@/lib/eventFormDefaults'
import type { EventActivity } from '@/types/event'

const ALL_WEEK = [0, 1, 2, 3, 4, 5, 6]
type SectionId = 'overview' | 'booking' | 'rules' | 'review'
const SECTIONS: SectionId[] = ['overview', 'booking', 'rules', 'review']

/** The activities to edit: none for an ordinary event (one, unnamed, no times). */
const shownActivities = (activities: EventActivity[] | undefined) =>
  activities?.length === 1 && !activities[0].nameEn && !activities[0].nameAr && !activities[0].startTimes?.length
    ? []
    : (activities ?? [])

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

/**
 * The organizer's event form — the same as the admin's (27 Oct 2026), minus
 * what's the platform's call (featured, status, commission). Create is only
 * reachable while the organizer has no event yet (the backend refuses a
 * second). In four sections:
 * Overview (what it is) → Booking (dates, then what customers can book) →
 * Rules (refunds, discount, status) → Review (what's still missing, each
 * item a link to it). An event with several activities keeps each one's
 * schedule, capacity and prices together in its own panel.
 */
export default function EventFormPage() {
  const { t, i18n } = useTranslation()
  const localized = useLocalized()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const eventId = id ? Number(id) : undefined
  const navigate = useNavigate()

  const { data: categories } = useGetEventCategoriesQuery()
  const { data: venues } = useGetVenuesQuery()
  const { data: event, isLoading: isLoadingEvent } = useGetEventQuery(eventId!, { skip: !isEdit })
  const reserveNewSeats = useReserveNewSeats()

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation()
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [seatGrid, setSeatGrid] = useState<SeatGrid>(() => emptyGrid())
  const { isPreparingImages, prepareImage, prepareImages } = usePreparedImages()
  // Gallery: photos already saved (their URLs, in order) and new files.
  const [galleryKept, setGalleryKept] = useState<string[]>([])
  const [galleryAdded, setGalleryAdded] = useState<File[]>([])
  const [galleryTouched, setGalleryTouched] = useState(false)
  const [editingActivity, setEditingActivity] = useState<number | null>(null)

  // On edit a cover is only asked for when the event has none yet.
  const needsCover = !isEdit || (Boolean(event) && !event?.cover)
  const eventFormSchema = useMemo(() => buildEventFormSchema(t, isEdit, needsCover), [t, isEdit, needsCover])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, submitCount },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: emptyEventFormValues,
  })

  const [addingVenue, setAddingVenue] = useState(false)
  const [newVenueName, setNewVenueName] = useState<string | null>(null)

  const { fields, append, remove } = useFieldArray({ control, name: 'ticketTypes', keyName: 'key' })
  const values = watch()
  const seatingType = values.seatingType
  const ticketTypeValues = values.ticketTypes
  const activityValues = values.activities

  useEffect(() => {
    if (!event) return
    setGalleryKept(event.gallery ?? [])
    setGalleryAdded([])
    reset({
      ...emptyEventFormValues,
      // A date without its own discount inherits the old event-wide one, so
      // saving (which moves discounts onto the dates) changes nothing.
      sessions: (event.sessions?.length
        ? event.sessions
        : [{ id: undefined, startsAt: event.startTime, endsAt: event.manage?.endsAt ?? null, discountType: null, discountValue: null }]
      ).map((session) => {
        const own = Boolean(session.discountType)
        return {
          id: session.id,
          startsAt: utcToLocalInput(session.startsAt),
          endsAt: utcToLocalInput(session.endsAt),
          discountType: (own ? session.discountType : event.manage?.discountType) ?? '',
          discountValue: String((own ? session.discountValue : event.manage?.discountValue) ?? ''),
        }
      }),
      seatingType: event.seatingType,
      categoryId: event.manage?.categoryId ? String(event.manage.categoryId) : '',
      venueId: event.manage?.venueId ? String(event.manage.venueId) : '',
      isFree: event.isFree,
      // An ordinary event's single unnamed activity isn't shown: the form
      // reads it as "no activities", and saving keeps it.
      activities: shownActivities(event.activities).map((activity) => ({
        id: activity.id,
        key: String(activity.id),
        nameEn: activity.nameEn ?? '',
        nameAr: activity.nameAr ?? '',
        descriptionEn: activity.descriptionEn ?? '',
        descriptionAr: activity.descriptionAr ?? '',
        weekdays: activity.weekdays ?? ALL_WEEK,
        startTimes: activity.startTimes ?? [],
        durationMinutes: activity.durationMinutes != null ? String(activity.durationMinutes) : '',
        capacity: activity.capacity != null ? String(activity.capacity) : '',
      })),
      ticketTypes: (event.ticketTypes ?? []).map((type) => ({
        id: type.id,
        activityKey:
          type.activityId && shownActivities(event.activities).some((a) => a.id === type.activityId) ? String(type.activityId) : '',
        // An event saved before names came in two languages has only `name`.
        nameEn: type.nameEn ?? (type.nameAr ? '' : type.name),
        nameAr: type.nameAr ?? '',
        descriptionEn: type.descriptionEn ?? '',
        descriptionAr: type.descriptionAr ?? '',
        isSpecialNeeds: type.isSpecialNeeds,
        price: String(type.price ?? ''),
        isVatIncluded: type.isVatIncluded ?? true,
        entryTimeStart: type.entryTimeStart ?? '',
        entryTimeEnd: type.entryTimeEnd ?? '',
        quantityTotal: type.quantity_total != null ? String(type.quantity_total) : '',
      })),
      refundUntilHours: event.refundUntilHours ? (String(event.refundUntilHours) as '24' | '72' | '168') : '',
      translations: {
        en: { title: event.title.en ?? '', description: event.description.en ?? '' },
        ar: { title: event.title.ar ?? '', description: event.description.ar ?? '' },
      },
    })
  }, [event, reset])

  // Tickets taken on each saved date (each type's total less what's left).
  const bookedBySession = Object.fromEntries(
    (event?.sessions ?? []).map((session) => [
      session.id,
      (session.tickets ?? []).reduce((sum, row) => {
        const total = event?.ticketTypes?.find((type) => type.id === row.ticketTypeId)?.quantity_total
        return sum + (total != null && row.remaining != null ? Math.max(0, Number(total) - row.remaining) : 0)
      }, 0),
    ]),
  )
  const soldFor = (index: number) => event?.ticketTypes?.find((type) => type.id === ticketTypeValues?.[index]?.id)?.quantity_sold

  // A seated event is created (or switched to seated) together with its seat
  // map — the server refuses one without it.
  const typeName = (tt: { nameEn: string; nameAr: string }) =>
    (i18n.language === 'ar' ? tt.nameAr || tt.nameEn : tt.nameEn || tt.nameAr).trim()
  const needsSeatMap = seatingType === 'assigned' && (!isEdit || event?.seatingType !== 'assigned')
  const seatTicketTypeOptions = isEdit
    ? (event?.ticketTypes ?? []).map((tt) => ({ value: String(tt.id), label: `${tt.name} (${tt.price})`, accessible: tt.isSpecialNeeds }))
    : (ticketTypeValues ?? []).map((tt, index) => ({
        value: String(index),
        label: typeName(tt) ? `${typeName(tt)}${tt.price ? ` (${tt.price})` : ''}` : t('events.form.ticketTypeNumber', { number: index + 1 }),
        accessible: tt.isSpecialNeeds,
      }))

  const usesActivities = seatingType === 'free' && (activityValues?.length ?? 0) > 0

  // "Several activities": the ticket types already there become the first
  // one, which opens for its name, days and times.
  const startActivities = () => {
    const key = newActivityKey()
    setValue(
      'activities',
      [{ key, nameEn: '', nameAr: '', descriptionEn: '', descriptionAr: '', weekdays: ALL_WEEK, startTimes: [], durationMinutes: '60', capacity: '' }],
      { shouldDirty: true },
    )
    if ((ticketTypeValues ?? []).length === 0) append(emptyTicketType(key))
    ;(ticketTypeValues ?? []).forEach((_, index) => setValue(`ticketTypes.${index}.activityKey`, key, { shouldDirty: true }))
    setEditingActivity(0)
  }
  // Back to one event: every ticket type stays, as the event's own.
  const backToOne = () => (getValues('ticketTypes') ?? []).forEach((_, index) => setValue(`ticketTypes.${index}.activityKey`, '', { shouldDirty: true }))
  const chooseOneEvent = () => {
    if ((activityValues?.length ?? 0) > 1 && !window.confirm(t('events.activities.mergeConfirm'))) return
    backToOne()
    setValue('activities', [], { shouldDirty: true })
    setEditingActivity(null)
  }

  // The discount, set once under Rules, lives on each date still to come.
  const upcomingSessions = (values.sessions ?? []).filter((row) => row.startsAt && new Date(row.endsAt || row.startsAt).getTime() >= Date.now())
  const discount = {
    discountType: upcomingSessions[0]?.discountType ?? '',
    discountValue: upcomingSessions[0]?.discountValue ?? '',
  }
  const setDiscount = (next: { discountType: EventFormValues['sessions'][number]['discountType']; discountValue: string }) =>
    setValue(
      'sessions',
      (getValues('sessions') ?? []).map((row) =>
        new Date(row.endsAt || row.startsAt).getTime() >= Date.now()
          ? { ...row, discountType: next.discountType, discountValue: next.discountType ? next.discountValue : '' }
          : row,
      ),
      { shouldDirty: true, shouldValidate: submitCount > 0 },
    )

  // What's still missing, in words, each pointing at where to fix it.
  const missing: { text: string; go: () => void }[] = []
  const toSection = (section: SectionId) => () => scrollTo(section)
  for (const [locale, name] of [['en', t('events.form.english')], ['ar', t('events.form.arabic')]] as const) {
    if (!values.translations?.[locale]?.title?.trim()) missing.push({ text: t('events.review.titleMissing', { language: name }), go: toSection('overview') })
    if (!values.translations?.[locale]?.description?.trim()) missing.push({ text: t('events.review.descriptionMissing', { language: name }), go: toSection('overview') })
  }
  if (needsCover && !values.coverImage) missing.push({ text: t('events.review.coverMissing'), go: toSection('overview') })
  if (!isEdit && !values.categoryId) missing.push({ text: t('events.form.validation.categoryRequired'), go: toSection('overview') })
  if (!isEdit && !values.venueId) missing.push({ text: t('events.form.validation.venueRequired'), go: toSection('overview') })
  if (upcomingSessions.length === 0) missing.push({ text: t('events.review.noDates'), go: toSection('booking') })
  if (usesActivities) {
    activityValues.forEach((activity, index) => {
      const own = (ticketTypeValues ?? []).filter((type) => type.activityKey === activity.key)
      const name = typeName(activity) || t('events.activities.activityNumber', { number: index + 1 })
      const open = () => {
        scrollTo('booking')
        setEditingActivity(index)
      }
      if (!activity.nameEn.trim() && !activity.nameAr.trim()) missing.push({ text: t('events.review.activityName', { name }), go: open })
      if (activity.weekdays.length === 0) missing.push({ text: t('events.review.activityDays', { name }), go: open })
      if (own.length === 0) missing.push({ text: t('events.review.activityTypes', { name }), go: open })
      if (own.some((type) => !type.price?.trim())) missing.push({ text: t('events.review.activityPrice', { name }), go: open })
      if (own.some((type) => !typeName(type))) missing.push({ text: t('events.review.activityTypeName', { name }), go: open })
      if (!activity.capacity?.trim() && own.some((type) => !type.quantityTotal?.trim()))
        missing.push({ text: t('events.review.activityCapacity', { name }), go: open })
    })
  } else {
    if ((ticketTypeValues ?? []).length === 0) missing.push({ text: t('events.form.validation.ticketTypesRequired'), go: toSection('booking') })
    ;(ticketTypeValues ?? []).forEach((type, index) => {
      const name = typeName(type) || t('events.form.ticketTypeNumber', { number: index + 1 })
      if (!typeName(type)) missing.push({ text: t('events.review.typeName', { number: index + 1 }), go: toSection('booking') })
      if (!type.price?.trim()) missing.push({ text: t('events.review.typePrice', { name }), go: toSection('booking') })
      if (seatingType === 'free' && !type.quantityTotal?.trim()) missing.push({ text: t('events.review.typeQuantity', { name }), go: toSection('booking') })
    })
  }

  // Which sections have errors after a save attempt (a dot in the navigation).
  const sectionHasErrors: Record<SectionId, boolean> = {
    overview: Boolean(errors.translations || errors.categoryId || errors.venueId || errors.coverImage),
    booking: Boolean(errors.sessions || errors.ticketTypes || errors.activities),
    rules: Boolean(errors.refundUntilHours),
    review: false,
  }

  const onSubmit = async (formValues: EventFormValues) => {
    setSubmitError(null)
    if (needsSeatMap) {
      const counts = seatCountsByType(seatGrid)
      if (counts.size === 0) {
        setSubmitError(t('events.form.seatMapIncomplete'))
        return
      }
      if (Array.from(counts.keys()).some((type) => !seatTicketTypeOptions.some((option) => option.value === type))) {
        setSubmitError(t('events.form.seatMapStaleType'))
        return
      }
      const missingType = seatTicketTypeOptions.find((option) => !counts.has(option.value))
      if (missingType) {
        setSubmitError(t('events.form.seatMapMissingType', { name: missingType.label }))
        return
      }
    }
    const seatMap = needsSeatMap ? gridToBlocks(seatGrid) : undefined
    const [coverImage, gallery] = await Promise.all([prepareImage(formValues.coverImage), prepareImages(galleryAdded)])
    const withImages = {
      ...formValues,
      coverImage,
      seatMap,
      gallery,
      // Only sent when the gallery was touched, so a save elsewhere can't drop photos.
      galleryKeep: isEdit && galleryTouched ? galleryKept : undefined,
    }
    let savedId: number
    let savedDates: number[] = []
    try {
      const saved = isEdit && eventId
        ? await updateEvent({ id: eventId, values: withImages }).unwrap()
        : await createEvent(withImages).unwrap()
      savedId = saved.id
      savedDates = saved.sessions?.map((session) => session.id) ?? []
    } catch (err) {
      setSubmitError(apiErrorMessage(err, t, 'events.form.errorGeneric'))
      return
    }
    try {
      // Seats blocked on the grid (kept back from sale) are reserved once the event exists.
      if (seatMap) await reserveNewSeats(savedId, reservedSeats(seatGrid), savedDates.length ? savedDates : undefined)
      navigate(`/events/${savedId}`)
    } catch {
      // The event is saved; only the reserving failed — send them where they can redo it.
      navigate(`/events/${savedId}/seating`)
    }
  }

  if (isEdit && isLoadingEvent) {
    return <LoadingSpinner size={160} />
  }

  const formTitle = isEdit
    ? (i18n.language.startsWith('ar') ? event?.title.ar || event?.title.en : event?.title.en || event?.title.ar) || t('events.form.editTitle')
    : t('events.form.addTitle')
  const card = 'rounded-lg border border-slate-200 bg-white p-5'
  const sectionTitle = (step: number, id: SectionId) => (
    <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-slate-900">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs text-white">{step}</span>
      {t(`events.sections.${id}`)}
    </h2>
  )

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

      {/* Where you are, and which sections still need something. */}
      <nav className="sticky top-0 z-30 mx-4 mb-4 flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-white/95 p-1 backdrop-blur pane-sm:mx-8">
        {SECTIONS.map((section, index) => (
          <button
            key={section}
            type="button"
            onClick={() => scrollTo(section)}
            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
          >
            <span className="text-xs text-slate-400">{index + 1}</span>
            {t(`events.sections.${section}`)}
            {(sectionHasErrors[section] || (section === 'review' && missing.length > 0)) && (
              <span className="h-2 w-2 rounded-full bg-red-500" aria-label={t('events.review.needsAttention')} />
            )}
          </button>
        ))}
      </nav>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="animate-fade-in space-y-8 px-4 pb-12 pane-sm:px-8">
        {/* 1. Overview — what it is */}
        <div id="overview" className="scroll-mt-16 space-y-4">
          {sectionTitle(1, 'overview')}

          <section className={`grid grid-cols-1 gap-4 pane-md:grid-cols-2 ${card}`}>
            {(['en', 'ar'] as const).map((locale) => (
              <div key={locale} className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-800">
                  {locale === 'en' ? t('events.form.english') : t('events.form.arabic')}
                  {values.translations?.[locale]?.title?.trim() && values.translations?.[locale]?.description?.trim() ? (
                    <span className="ms-2 text-xs font-normal text-green-600">✓</span>
                  ) : (
                    <span className="ms-2 text-xs font-normal text-slate-400">{t('events.review.required')}</span>
                  )}
                </h3>
                <div>
                  <label htmlFor={`title-${locale}`} className="mb-1 block text-sm font-medium text-slate-700">
                    {t('events.form.title')}
                  </label>
                  <input
                    id={`title-${locale}`}
                    type="text"
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    {...register(`translations.${locale}.title`)}
                  />
                  {errors.translations?.[locale]?.title && <p className="mt-1 text-sm text-red-600">{errors.translations[locale]?.title?.message}</p>}
                </div>
                <div>
                  <label htmlFor={`description-${locale}`} className="mb-1 block text-sm font-medium text-slate-700">
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
                    <p className="mt-1 text-sm text-red-600">{errors.translations[locale]?.description?.message}</p>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section className={card}>
            <EventPhotos
              coverUrl={event?.cover}
              coverFile={values.coverImage}
              onCover={(file) => setValue('coverImage', file, { shouldDirty: true, shouldValidate: submitCount > 0 })}
              coverError={errors.coverImage?.message}
              kept={galleryKept}
              onKept={(urls) => {
                setGalleryKept(urls)
                setGalleryTouched(true)
              }}
              added={galleryAdded}
              onAdded={(files) => {
                setGalleryAdded(files)
                setGalleryTouched(true)
              }}
            />
          </section>

          <section className={`grid grid-cols-1 gap-4 pane-sm:grid-cols-2 ${card}`}>
            <div>
              <label htmlFor="categoryId" className="mb-1 block text-sm font-medium text-slate-700">
                {t('events.form.category')}
              </label>
              <select id="categoryId" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register('categoryId')}>
                <option value="">{t('events.form.selectCategory')}</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {localized(category.name)}
                  </option>
                ))}
              </select>
              {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>}
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between gap-2">
                <label htmlFor="venueId" className="block text-sm font-medium text-slate-700">
                  {t('events.form.venue')}
                </label>
                {/* Adding a venue here keeps the form filled in. */}
                <button type="button" onClick={() => setAddingVenue(true)} className="text-xs font-medium text-orange-600 transition-colors hover:text-orange-700">
                  {t('venues.form.addTitle')}
                </button>
              </div>
              <select id="venueId" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register('venueId')}>
                <option value="">{t('events.form.selectVenue')}</option>
                {venues?.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name}
                  </option>
                ))}
              </select>
              {errors.venueId && <p className="mt-1 text-sm text-red-600">{errors.venueId.message}</p>}
              {newVenueName && <p className="animate-fade-in-fast mt-1 text-xs text-green-600">{t('venues.form.created', { name: newVenueName })}</p>}
            </div>
          </section>
        </div>

        {/* 2. Booking — when, and what customers can book */}
        <div id="booking" className="scroll-mt-16 space-y-4">
          {sectionTitle(2, 'booking')}

          <section className={`grid grid-cols-1 gap-4 pane-sm:grid-cols-2 ${card}`}>
            <div>
              <label htmlFor="seatingType" className="mb-1 block text-sm font-medium text-slate-700">
                {t('events.form.seatingType')}
              </label>
              {/* Not a disabled select: a disabled field drops out of the form
                  values, and the save would fail validation without a word. */}
              {isEdit && event?.manage?.hasBookings ? (
                <p id="seatingType" className="text-sm text-slate-700">
                  {event.seatingType === 'assigned' ? t('events.form.seatingAssigned') : t('events.form.seatingFree')}
                </p>
              ) : (
                <select id="seatingType" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register('seatingType')}>
                  <option value="free">{t('events.form.seatingFree')}</option>
                  <option value="assigned">{t('events.form.seatingAssigned')}</option>
                </select>
              )}
              <p className="mt-1 text-xs text-slate-500">
                {isEdit ? (event?.manage?.hasBookings ? t('events.form.lockedAfterBooking') : t('events.form.seatingHintEdit')) : t('events.form.seatingHint')}
              </p>
              {isEdit && event?.seatingType === 'assigned' && (
                <Link to={`/events/${eventId}/seating`} className="mt-1 inline-block text-xs font-medium text-orange-600 hover:text-orange-700">
                  {t('events.seating.viewSeatMap')}
                </Link>
              )}
            </div>
            <div className="flex items-end">
              <label htmlFor="isFree" className="flex items-center gap-2 text-sm text-slate-700">
                {/* Free or paid is fixed once tickets are booked (the server refuses the change). */}
                <input id="isFree" type="checkbox" disabled={Boolean(event?.manage?.hasBookings)} {...register('isFree')} /> {t('events.form.freeEventCheckbox')}
              </label>
            </div>
          </section>

          <DatesEditor
            control={control}
            errors={errors}
            bookedBySession={bookedBySession}
            discount={discount}
            hint={usesActivities ? t('events.dates.hintActivities') : undefined}
          />

          <section className={card}>
            {seatingType === 'free' && (
              <fieldset className="mb-4">
                <legend className="mb-2 text-sm font-semibold text-slate-800">{t('events.activities.whatQuestion')}</legend>
                <div className="grid grid-cols-1 gap-2 pane-sm:grid-cols-2">
                  {(
                    [
                      [false, 'events.activities.oneEvent', 'events.activities.oneEventHint'],
                      [true, 'events.activities.several', 'events.activities.severalHint'],
                    ] as const
                  ).map(([several, label, hint]) => (
                    <label
                      key={label}
                      className={`flex cursor-pointer gap-2 rounded-md border p-3 text-sm ${usesActivities === several ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}`}
                    >
                      <input
                        type="radio"
                        name="bookKind"
                        checked={usesActivities === several}
                        onChange={() => (several ? !usesActivities && startActivities() : usesActivities && chooseOneEvent())}
                      />
                      <span>
                        <span className="block font-medium text-slate-800">{t(label)}</span>
                        <span className="block text-xs text-slate-500">{t(hint)}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {(errors.ticketTypes?.root?.message ?? errors.ticketTypes?.message) && (
              <p className="mb-2 text-sm text-red-600">{errors.ticketTypes?.root?.message ?? errors.ticketTypes?.message}</p>
            )}

            {usesActivities ? (
              <ActivitiesEditor
                control={control}
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
                typeFields={fields}
                appendType={(type) => append(type)}
                removeTypes={(indexes) => remove(indexes)}
                soldFor={soldFor}
                onBackToOne={backToOne}
                editing={editingActivity}
                setEditing={setEditingActivity}
              />
            ) : (
              <>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800">{t('events.form.ticketTypesTitle')}</h3>
                  <button type="button" onClick={() => append(emptyTicketType(''))} className="text-sm font-medium text-orange-600 hover:text-orange-700">
                    {t('events.form.addTicketType')}
                  </button>
                </div>
                {seatingType === 'assigned' && <p className="mb-3 text-xs text-slate-500">{t('events.form.ticketTypesAssignedHint')}</p>}
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <TicketTypeFields
                      key={field.key}
                      index={index}
                      mode="plain"
                      control={control}
                      register={register}
                      setValue={setValue}
                      errors={errors}
                      sold={soldFor(index)}
                      onRemove={() => remove(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </section>

          {needsSeatMap && (
            <section className={card}>
              <h3 className="mb-1 text-sm font-semibold text-slate-800">{t('events.form.seatMapTitle')}</h3>
              <SeatGridEditor grid={seatGrid} onChange={setSeatGrid} ticketTypeOptions={seatTicketTypeOptions} />
            </section>
          )}
        </div>

        {/* 3. Rules — refunds, discount, status */}
        <div id="rules" className="scroll-mt-16 space-y-4">
          {sectionTitle(3, 'rules')}
          <section className={`grid grid-cols-1 gap-4 pane-sm:grid-cols-2 ${card}`}>
            <div>
              <label htmlFor="refundUntilHours" className="mb-1 block text-sm font-medium text-slate-700">
                {t('events.form.refundPolicy')}
              </label>
              <select id="refundUntilHours" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" {...register('refundUntilHours')}>
                <option value="">{t('events.form.refundNone')}</option>
                <option value="168">{t('events.form.refundUntil7Days')}</option>
                <option value="72">{t('events.form.refundUntil3Days')}</option>
                <option value="24">{t('events.form.refundUntil24Hours')}</option>
              </select>
            </div>

            <div>
              <span className="mb-1 block text-sm font-medium text-slate-700">{t('events.dates.discount')}</span>
              <div className="flex gap-2">
                <select
                  value={discount.discountType}
                  onChange={(e) => setDiscount({ ...discount, discountType: e.target.value as typeof discount.discountType })}
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="">{t('events.form.discountNone')}</option>
                  <option value="percentage">{t('events.form.discountPercentage')}</option>
                  <option value="fixed">{t('events.form.discountFixed')}</option>
                </select>
                {discount.discountType && (
                  <input
                    type="number"
                    min={0}
                    value={discount.discountValue}
                    onChange={(e) => setDiscount({ ...discount, discountValue: e.target.value })}
                    placeholder={t('events.form.valuePlaceholder')}
                    className="w-28 rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500">{t('events.review.discountHint')}</p>
            </div>

          </section>
        </div>

        {/* 4. Review — what's missing, then save */}
        <div id="review" className="scroll-mt-16 space-y-4">
          {sectionTitle(4, 'review')}
          <section className={card}>
            {missing.length === 0 ? (
              <p className="text-sm text-green-700">{t('events.review.ready')}</p>
            ) : (
              <>
                <p className="mb-2 text-sm text-slate-700">{t('events.review.stillMissing', { count: missing.length })}</p>
                <ul className="space-y-1">
                  {missing.map((item, index) => (
                    <li key={index}>
                      <button type="button" onClick={item.go} className="text-start text-sm text-red-600 hover:underline">
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

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
            <Link to={isEdit && eventId ? `/events/${eventId}` : '/events'} className="rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              {t('common.cancel')}
            </Link>
          </div>
        </div>
      </form>

      {addingVenue && (
        <VenueFormModal
          onClose={() => setAddingVenue(false)}
          onCreated={(venue) => {
            // Pick it immediately — the only reason to add one mid-form is to use it.
            setValue('venueId', String(venue.id), { shouldValidate: true })
            setNewVenueName(venue.name)
            setAddingVenue(false)
          }}
        />
      )}
    </div>
  )
}
