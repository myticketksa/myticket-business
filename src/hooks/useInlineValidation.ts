import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

/**
 * Turns the browser's own constraint checks (`required`, `type="email"`,
 * `minLength`, `min`/`max`) into inline messages under the field, instead of
 * the native pop-up bubbles.
 *
 * Two reasons not to just leave the native ones alone: they looked nothing
 * like the event form, which reports errors inline, and they come out in the
 * *browser's* language, so an admin working in Arabic got English bubbles.
 * The messages below are ours and translated.
 *
 * Usage: `noValidate` on the form, `if (!validate(e.currentTarget)) return` at
 * the top of the submit handler, and a <FieldError> under each input keyed by
 * its id.
 */
export function useInlineValidation() {
  const { t } = useTranslation()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const messageFor = (field: Field): string => {
    const v = field.validity
    if (v.valueMissing) return t('validation.required')
    if (v.typeMismatch) {
      return field.type === 'email' ? t('validation.email') : t('validation.invalid')
    }
    if (v.tooShort && 'minLength' in field) {
      return t('validation.minLength', { count: field.minLength })
    }
    if (v.tooLong && 'maxLength' in field) {
      return t('validation.maxLength', { count: field.maxLength })
    }
    if (v.rangeUnderflow && 'min' in field) return t('validation.min', { min: field.min })
    if (v.rangeOverflow && 'max' in field) return t('validation.max', { max: field.max })
    if (v.stepMismatch) return t('validation.invalid')
    if (v.patternMismatch) return t('validation.invalid')
    return t('validation.invalid')
  }

  const validate = (form: HTMLFormElement) => {
    const next: Record<string, string> = {}
    for (const element of Array.from(form.elements)) {
      const field = element as Field
      if (typeof field.checkValidity !== 'function' || field.disabled) continue
      const key = field.id || field.name
      if (!key || field.checkValidity()) continue
      next[key] = messageFor(field)
    }
    setErrors(next)
    if (Object.keys(next).length === 0) return true
    // Put the person where the first problem is, the way the event form does.
    const firstInvalid = form.querySelector<Field>(':invalid')
    firstInvalid?.focus()
    firstInvalid?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    return false
  }

  /** Drop a field's message as soon as it's edited, so it doesn't sit there
   *  contradicting what's now in the box. */
  const clearError = (key: string) =>
    setErrors((prev) => {
      if (!(key in prev)) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })

  return { errors, validate, clearError }
}
