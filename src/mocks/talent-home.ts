export interface TalentWaitingRequest {
  id: string
  initials: string
  name: string
  meta: string
  brief: string
  wait: string
  waitTone: "danger" | "brand" | "muted"
}

export interface TalentWorkItem {
  id: string
  month: string
  day: string
  title: string
  meta: string
  status: string
}

export interface TalentHomeReview {
  id: string
  author: string
  stars: number
  when: string
  body: string
}

export const talentWaitingRequests: TalentWaitingRequest[] = [
  {
    id: "riyadh-winter",
    initials: "RE",
    name: "Riyadh Events Co.",
    meta: "4.8 · 34 events",
    brief: "Oud performance · Winter Nights: Amr Diab Live · 12 Nov · Riyadh",
    wait: "waiting 4 days",
    waitTone: "danger",
  },
  {
    id: "jeddah-season",
    initials: "JS",
    name: "Jeddah Season",
    meta: "4.9 · 120 events",
    brief: "Opening act · Corniche Nights Festival · 3–5 Dec · Jeddah",
    wait: "waiting 1 day",
    waitTone: "brand",
  },
  {
    id: "alula-nights",
    initials: "AN",
    name: "AlUla Nights",
    meta: "4.7 · 18 events",
    brief: "Acoustic set · Heritage Evening · 19 Dec · AlUla",
    wait: "waiting 3 hours",
    waitTone: "muted",
  },
]

export const talentWorkItems: TalentWorkItem[] = [
  {
    id: "aramco",
    month: "Sep",
    day: "14",
    title: "Corporate gala · Aramco Annual Dinner",
    meta: "Accepted · Dhahran · organizer: Star Productions",
    status: "Accepted",
  },
  {
    id: "warmup",
    month: "Oct",
    day: "8",
    title: "Winter Nights warm-up show",
    meta: "Accepted · Riyadh · organizer: Riyadh Events Co.",
    status: "Accepted",
  },
  {
    id: "jazz",
    month: "Aug",
    day: "9",
    title: "Autumn Jazz Evening",
    meta: "Performed 9 Aug · awaiting your review of the organizer",
    status: "Completed",
  },
]

export const talentHomeReviews: TalentHomeReview[] = [
  {
    id: "re",
    author: "Riyadh Events Co.",
    stars: 5,
    when: "2 weeks ago",
    body: "Lina was flawless — arrived early, read the room, and the crowd asked for an encore. Booking again for Winter Nights.",
  },
  {
    id: "sp",
    author: "Star Productions",
    stars: 5,
    when: "1 month ago",
    body: "Professional from first message to final bow. Exactly the calibre our corporate clients expect.",
  },
]

export interface TalentStrengthTask {
  id: string
  label: string
  done: boolean
  gain?: string
}

export const talentStrengthTasks: TalentStrengthTask[] = [
  { id: "photo", label: "Add a profile photo", done: true },
  { id: "bio", label: "Write your biography", done: true },
  { id: "portfolio", label: "Add 3 more portfolio pieces", done: false, gain: "+18%" },
  { id: "video", label: "Add a performance video", done: false, gain: "+12%" },
]

export const talentProfileStats = [
  { value: "1,842", label: "profile views", tone: "default" as const },
  { value: "14", label: "enquiries received", tone: "default" as const },
  { value: "78%", label: "acceptance rate", tone: "success" as const },
  { value: "4.9", label: "average rating", tone: "default" as const },
]
