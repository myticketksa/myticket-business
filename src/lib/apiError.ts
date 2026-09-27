/**
 * The API refuses things in two shapes: form validation sends
 * `{ message, errors: { field: [...] } }`, while service-level refusals send
 * `{ message: 'validation_error', data: { message: 'the actual reason' } }`.
 * Reading only `message` showed a bare code for the second and Laravel's
 * "(and 1 more error)" summary for the first.
 */
export function apiErrorText(error: unknown): string | undefined {
  const body = (error as { data?: unknown })?.data
  if (!body || typeof body !== 'object') return undefined

  const { message, errors, data } = body as {
    message?: unknown
    errors?: unknown
    data?: { message?: unknown } | null
  }

  if (errors && typeof errors === 'object') {
    const lines = Object.values(errors)
      .map((value) => (Array.isArray(value) ? value[0] : value))
      .filter((value): value is string => typeof value === 'string')
    if (lines.length > 0) return lines.join(' ')
  }

  if (data && typeof data === 'object' && typeof data.message === 'string') return data.message

  // A bare status code like "validation_error" means nothing to the reader.
  if (typeof message === 'string' && !/^[a-z]+(_[a-z]+)*$/.test(message)) return message

  return undefined
}

/**
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

  return apiErrorText(error) ?? t(fallbackKey)
}
