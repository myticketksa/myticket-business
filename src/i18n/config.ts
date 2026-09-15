import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from '@/i18n/locales/ar.json'
import en from '@/i18n/locales/en.json'

const STORAGE_KEY = 'myticket_admin_lang'
const savedLang = localStorage.getItem(STORAGE_KEY)

export const supportedLngs = ['en', 'ar'] as const
export type SupportedLng = (typeof supportedLngs)[number]

function applyDirection(lng: string) {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = lng
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLang && supportedLngs.includes(savedLang as SupportedLng) ? savedLang : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(STORAGE_KEY, lng)
  applyDirection(lng)
})

applyDirection(i18n.language)

export default i18n
