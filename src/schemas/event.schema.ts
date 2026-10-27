import { z } from 'zod'

type T = (key: string) => string

function buildTranslationSchema(t: T) {
  return z.object({
    title: z.string().min(1, t('events.form.validation.titleRequired')),
    description: z.string().min(1, t('events.form.validation.descriptionRequired')),
  })
}

export function buildEventFormSchema(t: T, isEdit = false, needsCover = !isEdit) {
  const translationSchema = buildTranslationSchema(t)

  return z
    .object({
      // Category/venue are only shown (and only settable) at creation — in
      // edit mode these stay blank since they're not editable, so they can't
      // be required or the form would silently refuse to ever save an edit.
      categoryId: isEdit
        ? z.string().optional()
        : z.string().min(1, t('events.form.validation.categoryRequired')),
      venueId: isEdit
        ? z.string().optional()
        : z.string().min(1, t('events.form.validation.venueRequired')),
      seatingType: z.enum(['free', 'assigned']),
      isFree: z.boolean(),
      // The dates the event runs on, each with an optional discount of its own.
      sessions: z
        .array(
          z
            .object({
              id: z.number().optional(),
              startsAt: z.string().min(1, t('events.form.validation.startsAtRequired')),
              endsAt: z.string().optional(),
              discountType: z.enum(['', 'fixed', 'percentage']),
              discountValue: z.string().optional(),
            })
            // Checked on each date rather than on the whole form: a
            // form-level check only runs once every other field is valid, so
            // these errors used to show up a round later than the rest.
            .superRefine((session, ctx) => {
              // Every date ends at a set time, so it leaves the lists and stops
              // selling when it's actually over. Past dates kept on edit are spared.
              if (!session.endsAt && (!session.id || new Date(session.startsAt).getTime() >= Date.now())) {
                ctx.addIssue({ code: 'custom', path: ['endsAt'], message: t('events.dates.endRequired') })
              }
              if (session.endsAt && session.endsAt <= session.startsAt) {
                ctx.addIssue({ code: 'custom', path: ['endsAt'], message: t('events.dates.endBeforeStart') })
              }
              // New dates only: an existing event keeps its past dates on edit.
              // A whole day stays addable until it ends.
              if (!session.id && new Date(session.endsAt || session.startsAt).getTime() < Date.now()) {
                ctx.addIssue({ code: 'custom', path: ['startsAt'], message: t('events.dates.startInPast') })
              }
              const value = Number(session.discountValue)
              if (session.discountType && !(value > 0)) {
                ctx.addIssue({ code: 'custom', path: ['discountValue'], message: t('events.dates.valueRequired') })
              }
              if (session.discountType === 'percentage' && value > 100) {
                ctx.addIssue({ code: 'custom', path: ['discountValue'], message: t('events.dates.percentMax') })
              }
            }),
        )
        , // at least one unless always open — checked below
      // Always open: no dates, only the weekdays it opens (all = every day).
      isPermanent: z.boolean(),
      openWeekdays: z.array(z.number()),

      // Hours before the start refunds stay open; '' = no refunds.
      refundUntilHours: z.enum(['', '24', '72', '168']),

      translations: z.object({
        en: translationSchema,
        ar: translationSchema,
      }),

      // Things to book inside the event (a boat trip, a course…), each on its
      // own weekdays and start times with places shared by its ticket types.
      // `key` is the id for a saved one, a made-up key for a new one; ticket
      // types point at it by that key.
      activities: z.array(
        z
          .object({
            id: z.number().optional(),
            key: z.string(),
            nameEn: z.string(),
            nameAr: z.string(),
            descriptionEn: z.string().max(1000).optional(),
            descriptionAr: z.string().max(1000).optional(),
            weekdays: z.array(z.number()),
            // Start times ("09:00"); none: the whole day.
            startTimes: z.array(z.string()),
            durationMinutes: z.string().optional(),
            capacity: z.string().optional(),
          })
          .superRefine((activity, ctx) => {
            if (!activity.nameEn.trim() && !activity.nameAr.trim()) {
              ctx.addIssue({ code: 'custom', path: ['nameEn'], message: t('events.activities.nameRequired') })
            }
            if (activity.weekdays.length === 0) {
              ctx.addIssue({ code: 'custom', path: ['weekdays'], message: t('events.activities.daysRequired') })
            }
            if (activity.startTimes.some((time) => !/^([01]\d|2[0-3]):[0-5]\d$/.test(time))) {
              ctx.addIssue({ code: 'custom', path: ['startTimes'], message: t('events.activities.timesInvalid') })
            }
            const capacity = activity.capacity?.trim()
            if (capacity && !(Number.isInteger(Number(capacity)) && Number(capacity) >= 1)) {
              ctx.addIssue({ code: 'custom', path: ['capacity'], message: t('events.form.validation.quantityPositive') })
            }
            const duration = activity.durationMinutes?.trim()
            if (duration && !(Number.isInteger(Number(duration)) && Number(duration) >= 5)) {
              ctx.addIssue({ code: 'custom', path: ['durationMinutes'], message: t('events.activities.durationInvalid') })
            }
          }),
      ),

      ticketTypes: z
        .array(
          z.object({
            // The activity it books ('' = none); only asked when the event has activities.
            activityKey: z.string().optional(),
            // Set on an existing type when editing; the server keeps it (and
            // refuses to drop one with sales).
            id: z.number().optional(),
            // A name in each language; customers see theirs. One is enough.
            nameEn: z.string(),
            nameAr: z.string(),
            // Optional line about what the ticket includes, in each language.
            descriptionEn: z.string().max(500).optional(),
            descriptionAr: z.string().max(500).optional(),
            isSpecialNeeds: z.boolean().optional(),
            price: z
              .string()
              .min(1, t('events.form.validation.ticketPriceRequired'))
              .refine((v) => Number(v) >= 0, t('events.form.validation.priceNotNegative')),
            isVatIncluded: z.boolean().optional(),
            // Time of day, not a date — leave both blank for no restriction.
            entryTimeStart: z.string().optional(),
            entryTimeEnd: z.string().optional(),
            // Empty: no limit of its own — its activity's capacity limits it
            // (checked below: something has to).
            quantityTotal: z
              .string()
              .optional()
              .refine((v) => !v || (Number.isInteger(Number(v)) && Number(v) >= 1), t('events.form.validation.quantityPositive')),
          }).refine((type) => type.nameEn.trim() || type.nameAr.trim(), {
            message: t('events.form.validation.ticketNameRequired'),
            path: ['nameEn'],
          }),
        )
        // Required on edit too: an empty list is left out of the request,
        // which the server reads as "no change", so the save looked fine
        // while every ticket type stayed.
        .min(1, t('events.form.validation.ticketTypesRequired')),

      // Every event has a cover. Edit keeps the current one when no new file
      // is picked, and only asks for one if the event has none.
      coverImage: needsCover
        ? z.instanceof(File, { message: t('events.form.validation.coverImageRequired') })
        : z.instanceof(File).optional(),
    })
    // With activities, every ticket type books one of them.
    .superRefine((values, ctx) => {
      if (!values.isPermanent && values.sessions.length === 0) {
        ctx.addIssue({ code: 'custom', path: ['sessions'], message: t('events.dates.required') })
      }
      // Something must limit every general-admission ticket type: its own
      // quantity, or its activity's capacity per time.
      if (values.seatingType === 'free') {
        values.ticketTypes.forEach((type, index) => {
          const activity = values.activities.find((a) => a.key === type.activityKey)
          if (!type.quantityTotal?.trim() && !activity?.capacity?.trim()) {
            ctx.addIssue({
              code: 'custom',
              path: ['ticketTypes', index, 'quantityTotal'],
              message: activity ? t('events.activities.needsLimit') : t('events.form.validation.ticketQuantityRequired'),
            })
          }
        })
      }
      if (values.activities.length === 0) return
      const keys = new Set(values.activities.map((a) => a.key))
      // And every activity has something to book.
      values.activities.forEach((activity, index) => {
        if (!values.ticketTypes.some((type) => type.activityKey === activity.key)) {
          ctx.addIssue({ code: 'custom', path: ['activities', index, 'nameEn'], message: t('events.activities.needsTicketType') })
        }
      })
      values.ticketTypes.forEach((type, index) => {
        if (!type.activityKey || !keys.has(type.activityKey)) {
          ctx.addIssue({ code: 'custom', path: ['ticketTypes', index, 'activityKey'], message: t('events.activities.typeNeedsActivity') })
        }
      })
    })
}

export type EventFormValues = z.infer<ReturnType<typeof buildEventFormSchema>>


export const emptyEventFormValues: EventFormValues = {
  categoryId: '',
  venueId: '',
  seatingType: 'free',
  isFree: false,
  sessions: [],
  isPermanent: false,
  openWeekdays: [0, 1, 2, 3, 4, 5, 6],
  refundUntilHours: '',
  translations: {
    en: { title: '', description: '' },
    ar: { title: '', description: '' },
  },
  activities: [],
  ticketTypes: [],
  coverImage: undefined,
}
