import { useTranslation } from 'react-i18next'

export default function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  const { t } = useTranslation()
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? t('common.search')}
      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm pane-sm:w-64"
    />
  )
}
