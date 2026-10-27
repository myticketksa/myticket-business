/**
 * An activity's schedule as one readable line (27 Oct 2026):
 * "Every day except Fri · 7 times 09:00–15:00 · 60 min". Shown under the
 * schedule while editing and in the activity list.
 */
type TFn = (key: string, options?: Record<string, unknown>) => string

export function weekdayName(day: number, language: string, style: 'short' | 'long' = 'short') {
  return new Intl.DateTimeFormat(language, { weekday: style }).format(new Date(2024, 0, 7 + day))
}

export function activitySummary(
  activity: { weekdays: number[]; startTimes: string[]; durationMinutes?: string },
  t: TFn,
  language: string,
): string {
  const days = [...new Set(activity.weekdays)].sort()
  const sep = language.startsWith('ar') ? '، ' : ', '
  const dayText =
    days.length === 0
      ? t('events.activities.noDays')
      : days.length === 7
        ? t('events.activities.everyDay')
        : days.length >= 5
          ? t('events.activities.everyDayExcept', {
              days: [0, 1, 2, 3, 4, 5, 6].filter((d) => !days.includes(d)).map((d) => weekdayName(d, language)).join(sep),
            })
          : days.map((d) => weekdayName(d, language)).join(sep)
  const times = [...new Set(activity.startTimes.filter(Boolean))].sort()
  const parts = [dayText]
  if (times.length === 1) parts.push(times[0])
  else if (times.length > 1) parts.push(t('events.activities.timesRange', { count: times.length, from: times[0], to: times[times.length - 1] }))
  else parts.push(t('events.activities.wholeDay'))
  if (times.length && activity.durationMinutes) parts.push(t('events.activities.minutes', { count: Number(activity.durationMinutes) }))
  return parts.join(' · ')
}
