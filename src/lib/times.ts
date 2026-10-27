// Start times as "HH:MM" (activities, 27 Oct 2026).
/** "09:00" → minutes after midnight. */
export const toMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}
export const toTime = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`

/** Start times from `from` to `to` (inclusive), every `every` minutes. */
export function generateTimes(from: string, to: string, every: number): string[] {
  if (!from || !to || !(every >= 5)) return []
  const out: string[] = []
  for (let m = toMinutes(from); m <= toMinutes(to) && out.length < 48; m += every) out.push(toTime(m))
  return out
}

export const sortTimes = (times: string[]) => [...new Set(times.filter(Boolean))].sort()

