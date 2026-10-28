/** Format SAR amounts consistently across dashboard and payout. */
export function formatSar(value: number | null | undefined, locale?: string): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'
  return `${value.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} SAR`
}
