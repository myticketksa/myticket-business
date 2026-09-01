import type { BusinessRole } from "@/types/role"

export type ReviewFilterId = "all" | "5" | "4" | "below"

export interface ReviewItem {
  id: string
  author: string
  initials: string
  stars: number
  meta: string
  body: string
  reported?: boolean
}

export interface ReviewFilter {
  id: ReviewFilterId
  label: string
  stars?: number
  suffix?: string
}

export interface ReviewsDataset {
  eyebrow: string
  sub: string
  score: string
  scoreStars: number
  countLine: string
  distribution: { name: string; value: string; percent: number }[]
  showTrend: boolean
  explainer:
    | { kind: "note"; lead: string; body: string }
    | { kind: "plain"; body: string }
  filters: ReviewFilter[]
  eventDropdown: string
  items: ReviewItem[]
  footerMeta: string
  belowMax: number
}

export const reviewMonths = [
  { month: "Mar", height: 50 },
  { month: "Apr", height: 66 },
  { month: "May", height: 69 },
  { month: "Jun", height: 70 },
  { month: "Jul", height: 72 },
  { month: "Aug", height: 74, peak: true },
]

const organizer: ReviewsDataset = {
  eyebrow: "Grow",
  sub: "What attendees and partners say about you. You can report a review — never edit or delete one.",
  score: "4.7",
  scoreStars: 4,
  countLine: "1,842 reviews · all events",
  distribution: [
    { name: "5", value: "76%", percent: 76 },
    { name: "4", value: "15%", percent: 15 },
    { name: "3", value: "5%", percent: 5 },
    { name: "2", value: "2%", percent: 2 },
    { name: "1", value: "2%", percent: 2 },
  ],
  showTrend: true,
  explainer: {
    kind: "note",
    lead: "Why you can't remove reviews:",
    body: "if businesses could delete criticism, every rating on MyTicket would be worthless — including your good ones. Reporting sends a review to MyTicket to assess against the content rules. A brand-new account shows “New on MyTicket”, never a zero rating.",
  },
  filters: [
    { id: "all", label: "All" },
    { id: "5", label: "5", stars: 5 },
    { id: "4", label: "4", stars: 4 },
    { id: "below", label: "3", stars: 3, suffix: "& below" },
  ],
  eventDropdown: "Event",
  items: [
    {
      id: "sara",
      author: "Sara A.",
      initials: "SA",
      stars: 5,
      meta: "Attendee · Jeddah Comedy Night · tonight",
      body: "Entry took two minutes, the lineup was hilarious, and the venue was spotless. Best comedy night in Jeddah, hands down.",
    },
    {
      id: "lina",
      author: "Lina Hakim",
      initials: "LH",
      stars: 5,
      meta: "Talent · Autumn Jazz Evening engagement · 2 weeks ago",
      body: "Clear briefs, sound check on time, paid attention to artists' needs. The kind of organizer you say yes to twice.",
    },
    {
      id: "fahad",
      author: "Fahad O.",
      initials: "FO",
      stars: 3,
      meta: "Attendee · Summer Souq Nights · 3 weeks ago",
      body: "Great food and music, but the queues for parking were rough on day two. Consider more signage next time.",
    },
    {
      id: "anon",
      author: "Anonymous user",
      initials: "??",
      stars: 1,
      meta: "Attendee · Spring Comedy Slam · reported by you · 12 Mar",
      body: "[Review text hidden while MyTicket assesses your report for abusive content.]",
      reported: true,
    },
  ],
  footerMeta: "Showing 4 of 1,842",
  belowMax: 3,
}

const talent: ReviewsDataset = {
  eyebrow: "Presence",
  sub: "What organizers say after working with you. You can report a review — never edit or delete one.",
  score: "4.9",
  scoreStars: 5,
  countLine: "86 reviews · all engagements",
  distribution: [
    { name: "5", value: "88%", percent: 88 },
    { name: "4", value: "9%", percent: 9 },
    { name: "3", value: "2%", percent: 2 },
    { name: "2", value: "1%", percent: 1 },
    { name: "1", value: "0%", percent: 0 },
  ],
  showTrend: false,
  explainer: {
    kind: "plain",
    body: 'Reviews come from completed engagements only — an organizer can review you once the work is marked complete, and you review them back. Reporting sends a review to MyTicket to assess; a new account shows "New on MyTicket", never a zero rating.',
  },
  filters: [
    { id: "all", label: "All" },
    { id: "5", label: "5", stars: 5 },
    { id: "below", label: "4", stars: 4, suffix: "& below" },
  ],
  eventDropdown: "Engagement",
  items: [
    {
      id: "riyadh",
      author: "Riyadh Events Co.",
      initials: "RE",
      stars: 5,
      meta: "Organizer · Autumn Jazz Evening · 2 weeks ago",
      body: "Lina was flawless — arrived early, read the room, and the crowd asked for an encore. Booking again for Winter Nights.",
    },
    {
      id: "star",
      author: "Star Productions",
      initials: "SP",
      stars: 5,
      meta: "Organizer · corporate gala · 1 month ago",
      body: "Professional from first message to final bow. Exactly the calibre our corporate clients expect.",
    },
    {
      id: "gala-x",
      author: "Gala X",
      initials: "GX",
      stars: 4,
      meta: "Organizer · private gala, Diriyah · 2 months ago",
      body: "Beautiful set. Only note: the second rider arrived late to sound check — worth padding travel time.",
    },
  ],
  footerMeta: "Showing 3 of 86",
  belowMax: 4,
}

const vendor: ReviewsDataset = {
  eyebrow: "Presence",
  sub: "What organizers say after working with you. You can report a review — never edit or delete one.",
  score: "4.7",
  scoreStars: 5,
  countLine: "52 reviews · all engagements",
  distribution: [
    { name: "5", value: "80%", percent: 80 },
    { name: "4", value: "14%", percent: 14 },
    { name: "3", value: "2%", percent: 2 },
    { name: "2", value: "1%", percent: 1 },
    { name: "1", value: "0%", percent: 0 },
  ],
  showTrend: false,
  explainer: {
    kind: "plain",
    body: 'Reviews come from completed engagements only — an organizer can review you once the work is marked complete, and you review them back. Reporting sends a review to MyTicket to assess; a new account shows "New on MyTicket", never a zero rating.',
  },
  filters: [
    { id: "all", label: "All" },
    { id: "5", label: "5", stars: 5 },
    { id: "below", label: "4", stars: 4, suffix: "& below" },
  ],
  eventDropdown: "Engagement",
  items: [
    {
      id: "star",
      author: "Star Productions",
      initials: "SP",
      stars: 5,
      meta: "Organizer · corporate gala, 800 covers · 3 weeks ago",
      body: "Layla's team fed 800 guests without a single queue forming. The live station concept was the talk of the gala.",
    },
    {
      id: "jeddah",
      author: "Jeddah Season",
      initials: "JS",
      stars: 5,
      meta: "Organizer · festival catering · 2 months ago",
      body: "3,500 covers a day for three days, on time, every time. Logistics were immaculate.",
    },
    {
      id: "souq",
      author: "Summer Souq Nights",
      initials: "SS",
      stars: 4,
      meta: "Organizer · food court operation · 3 weeks ago",
      body: "Great food and friendly staff. Day-two restock ran an hour late — worth a second truck at that scale.",
    },
  ],
  footerMeta: "Showing 3 of 52",
  belowMax: 4,
}

export const reviewsByRole: Record<BusinessRole, ReviewsDataset> = {
  organizer,
  talent,
  vendor,
}

export const reviewDistribution = organizer.distribution
export const reviewItems = organizer.items
