/**
 * Pulls a message out of an RTK Query error.
 *
 * The one case worth special-casing is 413: that comes from the web server,
 * not the API, so there's no message in the body at all and the form would
 * otherwise show its generic "couldn't save" line for what is really "those
 * files are too big".
 */
export function apiErrorMessage(
  error: unknown,
  t: (key: string) => string,
  fallbackKey: string,
): string {
  const status = (error as { status?: number | string })?.status
  if (status === 413 || status === 'PAYLOAD_TOO_LARGE') return t('errors.uploadTooLarge')

  const message = (error as { data?: { message?: string } })?.data?.message
  return message ?? t(fallbackKey)
}
