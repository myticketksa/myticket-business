import { useTranslation } from 'react-i18next'
import type { LocalizedText } from '@/types/event'

/** The text in the dashboard's current language, falling back to the other one. */
export function pickLocalized(value: Partial<LocalizedText> | null | undefined, language: string): string {
  if (!value) return ''
  const [first, second] = language === 'ar' ? [value.ar, value.en] : [value.en, value.ar]
  return first || second || ''
}

export function useLocalized() {
  const { i18n } = useTranslation()
  return (value: Partial<LocalizedText> | null | undefined) => pickLocalized(value, i18n.language)
}
