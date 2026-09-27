import { z } from 'zod'

type T = (key: string) => string

function buildTranslationSchema(t: T) {
  return z.object({
    title: z.string().min(1, t('events.form.validation.titleRequired')),
    shortDescription: z.string().max(500).optional(),
    description: z.string().min(1, t('events.form.validation.descriptionRequired')),
  })
}

/**
 * No `myticketCommission`, `isFeatured` or `status` fields — those are the
 * platform's own call, not the organizer's, and the API ignores or refuses
 * them from this side (see Organizer\EventService on the backend).
 */
export function buildEventFormSchema(t: T, isEdit = false) {
  const translationSchema = buildTranslationSchema(t)

  return z
    .object({
      categoryId: z.string().min(1, t('events.form.validation.categoryRequired')),
      venueId: z.string().min(1, t('events.form.validation.venueRequired')),
      seatingType: z.enum(['free', 'assigned']),
      isFree: z.boolean(),
      startsAt: z.string().min(1, t('events.form.validation.startsAtRequired')),
      endsAt: z.string().optional(),
      salesStartAt: z.string().optional(),
      salesEndAt: z.string().optional(),
      minAge: z.string().optional(),

      discountType: z.enum(['', 'fixed', 'percentage']).optional(),
      discountValue: z.string().optional(),
      discountStartsAt: z.string().optional(),
      discountEndsAt: z.string().optional(),

      translations: z.object({
        en: translationSchema,
        ar: translationSchema,
      }),

      ticketTypes: z
        .array(
          z.object({
            // Set for a ticket type that already exists (edit); `sold` is
            // display-only, the count already sold or being bought.
            id: z.number().optional(),
            sold: z.number().optional(),
            name: z.string().min(1, t('events.form.validation.ticketNameRequired')),
            isSpecialNeeds: z.boolean().optional(),
            price: z.string().min(1, t('events.form.validation.ticketPriceRequired')),
            isVatIncluded: z.boolean().optional(),
            // Time of day, not a date — leave both blank for no restriction.
            entryTimeStart: z.string().optional(),
            entryTimeEnd: z.string().optional(),
            quantityTotal: z.string().min(1, t('events.form.validation.ticketQuantityRequired')),
          }),
        )
        .optional(),

      // NOT NULL on the API side — a create request without one passed
      // validation and then crashed on the actual insert instead of failing
      // cleanly. Edit-only stays optional: blank means unchanged (and isn't
      // actually sent — see toUpdatePayload).
      coverImage: isEdit
        ? z.instanceof(File).optional()
        : z.instanceof(File, { message: t('events.form.validation.coverImageRequired') }),
    })
    .superRefine((values, ctx) => {
      values.ticketTypes?.forEach((ticketType, index) => {
        if (ticketType.sold && Number(ticketType.quantityTotal) < ticketType.sold) {
          ctx.addIssue({
            code: 'custom',
            path: ['ticketTypes', index, 'quantityTotal'],
            message: t('events.form.validation.quantityBelowSold').replace('{{count}}', String(ticketType.sold)),
          })
        }
      })
      // Both seating kinds need at least one ticket type; an assigned event's
      // seats get built against these afterward, on the event's own detail
      // page.
      if (!values.ticketTypes || values.ticketTypes.length === 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['ticketTypes'],
          message: t('events.form.validation.ticketTypesRequired'),
        })
      }
    })
}

export type EventFormValues = z.infer<ReturnType<typeof buildEventFormSchema>>

export const emptyEventFormValues: EventFormValues = {
  categoryId: '',
  venueId: '',
  seatingType: 'assigned',
  isFree: false,
  startsAt: '',
  endsAt: '',
  salesStartAt: '',
  salesEndAt: '',
  minAge: '',
  discountType: '',
  discountValue: '',
  discountStartsAt: '',
  discountEndsAt: '',
  translations: {
    en: { title: '', shortDescription: '', description: '' },
    ar: { title: '', shortDescription: '', description: '' },
  },
  ticketTypes: [],
  coverImage: undefined,
}
