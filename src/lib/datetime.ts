/**
 * The API runs in UTC and hands back UTC timestamps; a `datetime-local` input
 * has no timezone at all, it is just wall-clock digits. Pushing one straight
 * into the other is how an edit form could show 6:00 PM for an event the
 * rest of the panel shows at 9:00 PM — and re-saving that form would have
 * moved the event three hours earlier for real.
 *
 * So: everything typed or read in a datetime box is the organizer's own
 * local time (Riyadh, in practice), matching how every other screen renders
 * times, and these two functions do the conversion at the edges.
 */

/** UTC timestamp from the API → the `YYYY-MM-DDTHH:mm` a datetime-local wants,
 *  in the organizer's own timezone. */
export function utcToLocalInput(value: string | null | undefined): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}`
  )
}

/** What was typed (local wall time) → an explicit UTC instant for the API. */
export function localInputToUtc(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString()
}
