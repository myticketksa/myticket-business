import type { EventFormValues } from '@/schemas/event.schema'

type TicketTypeValues = EventFormValues['ticketTypes'][number]

/** A key for a new activity, for its ticket types to point at before it has an id. */
export const newActivityKey = () => `new-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`

/** A blank ticket type, for an activity (its key) or an ordinary event (''). */
export const emptyTicketType = (activityKey: string): TicketTypeValues => ({
  activityKey,
  nameEn: '',
  nameAr: '',
  descriptionEn: '',
  descriptionAr: '',
  isSpecialNeeds: false,
  price: '',
  isVatIncluded: true,
  entryTimeStart: '',
  entryTimeEnd: '',
  quantityTotal: '',
})
