export type ArchiveAttendanceTone = "success" | "alert"

export interface ArchiveEvent {
  id: string
  title: string
  meta: string
  tickets: string
  revenue: string
  attended: string
  noShows: string
  attendedTone: ArchiveAttendanceTone
  rating: string
}

export const archiveSub =
  "Ended and archived events with their final figures. Duplicating one is the fastest way to run it again."

export const archiveCountLabel = "14 archived events"

export const archiveFooterMeta =
  "Showing 4 of 14 · deep-dive any event in Attendance and Sales"

export const archiveEvents: ArchiveEvent[] = [
  {
    id: "autumn-jazz",
    title: "Autumn Jazz Evening",
    meta: "Ended 9 Aug · The Ritz Ballroom, Riyadh",
    tickets: "870 / 900",
    revenue: "SAR 284,900",
    attended: "92%",
    noShows: "70 no-shows",
    attendedTone: "success",
    rating: "4.8",
  },
  {
    id: "summer-souq",
    title: "Summer Souq Nights",
    meta: "Ended 1 Aug · King Abdullah Park · 3 days",
    tickets: "4,420 / 5,000",
    revenue: "SAR 412,180",
    attended: "84%",
    noShows: "707 no-shows",
    attendedTone: "success",
    rating: "4.6",
  },
  {
    id: "eid-family",
    title: "Eid Family Festival",
    meta: "Ended 8 Jun · Boulevard City",
    tickets: "7,910 / 8,000",
    revenue: "SAR 861,400",
    attended: "88%",
    noShows: "949 no-shows",
    attendedTone: "success",
    rating: "4.7",
  },
  {
    id: "spring-comedy",
    title: "Spring Comedy Slam",
    meta: "Ended 14 Mar · City Walk Arena, Jeddah",
    tickets: "1,120 / 1,600",
    revenue: "SAR 96,300",
    attended: "71%",
    noShows: "325 no-shows",
    attendedTone: "alert",
    rating: "4.2",
  },
]
