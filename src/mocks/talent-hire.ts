export type TalentHireFilterId = "awaiting" | "accepted" | "completed" | "all"

export interface TalentHireThread {
  id: string
  name: string
  initials: string
  time: string
  preview: string
  status: string
  filter: Exclude<TalentHireFilterId, "all"> | "declined"
  ratingLine: string
  eventLine: string
}

export interface TalentHireMessage {
  id: string
  from: "them" | "you"
  body?: string
  caption: string
  attachment?: { name: string; size: string }
}

export const talentHireFilterPills: { id: TalentHireFilterId; label: string }[] = [
  { id: "awaiting", label: "Awaiting · 3" },
  { id: "accepted", label: "Accepted · 2" },
  { id: "completed", label: "Completed · 12" },
  { id: "all", label: "All" },
]

export const talentHireThreads: TalentHireThread[] = [
  {
    id: "riyadh-winter",
    name: "Riyadh Events Co.",
    initials: "RE",
    time: "Mon",
    preview: "We lock the printed programme on the 28th…",
    status: "Awaiting your response · 4d",
    filter: "awaiting",
    ratingLine: "4.8 · 34 events · Riyadh · For:",
    eventLine: "Winter Nights: Amr Diab Live · 12 Nov",
  },
  {
    id: "jeddah-season",
    name: "Jeddah Season",
    initials: "JS",
    time: "Fri",
    preview: "Opening act, Corniche Nights Festival, 3–5 Dec…",
    status: "Awaiting your response · 1d",
    filter: "awaiting",
    ratingLine: "4.9 · 120 events · Jeddah · For:",
    eventLine: "Corniche Nights Festival · 3–5 Dec",
  },
  {
    id: "alula-nights",
    name: "AlUla Nights",
    initials: "AN",
    time: "18:02",
    preview: "Acoustic set for our Heritage Evening on 19 Dec…",
    status: "Awaiting your response · 3h",
    filter: "awaiting",
    ratingLine: "4.7 · 18 events · AlUla · For:",
    eventLine: "Heritage Evening · 19 Dec",
  },
  {
    id: "star-productions",
    name: "Star Productions",
    initials: "SP",
    time: "12 Aug",
    preview: "Confirmed — see you at rehearsal on the 13th.",
    status: "Accepted",
    filter: "accepted",
    ratingLine: "4.8 · 22 events · Dhahran · For:",
    eventLine: "Aramco Annual Dinner · 14 Sep",
  },
  {
    id: "riyadh-completed",
    name: "Riyadh Events Co.",
    initials: "RE",
    time: "9 Aug",
    preview: "Wonderful evening — review is live on your profile.",
    status: "Completed",
    filter: "completed",
    ratingLine: "4.8 · 34 events · Riyadh · For:",
    eventLine: "Riyadh Summer Nights · 9 Aug",
  },
  {
    id: "gala-x",
    name: "Gala X",
    initials: "GX",
    time: "2 Aug",
    preview: "Understood, thanks for letting us know.",
    status: "Declined",
    filter: "declined",
    ratingLine: "4.2 · 8 events · Riyadh · For:",
    eventLine: "Gala X · 2 Aug",
  },
]

export const talentHireAdvisory =
  "MyTicket hosts the introduction and records the outcome. Contracts, pricing and payment happen between you and the organizer, outside MyTicket. Accepting sets your availability to Reserved."

export const talentHireFootnote =
  "You respond to requests — starting new conversations is done by organizers."

export const talentWinterConversation: TalentHireMessage[] = [
  {
    id: "m1",
    from: "them",
    body: "Salam Lina — we're producing Winter Nights with Amr Diab on 12 Nov at Boulevard City Amphitheatre. We'd love a 30-minute oud set as the doors-open performance, 19:00–19:30. Sound check same day 16:00. Would you be available?",
    caption: "Riyadh Events Co. · Mon 14:22",
  },
  {
    id: "m2",
    from: "them",
    caption: "Riyadh Events Co. · Mon 14:23",
    attachment: { name: "Stage & rider details.pdf", size: "1.2 MB" },
  },
  {
    id: "m3",
    from: "you",
    body: "Wa alaikum salam! The date works in principle — reviewing the rider now. Is the set solo oud, or with my percussionist?",
    caption: "You · Mon 18:41",
  },
  {
    id: "m4",
    from: "them",
    body: "Either works — with percussionist would be wonderful. We'll cover the second rider. When could you confirm by? We lock the printed programme on the 28th.",
    caption: "Riyadh Events Co. · Mon 19:05",
  },
]

export const talentCompletedConversation: TalentHireMessage[] = [
  {
    id: "c1",
    from: "them",
    body: "Thank you for tonight — the set was perfect, exactly what we hoped for.",
    caption: "Riyadh Events Co. · 9 Aug, 23:10",
  },
  {
    id: "c2",
    from: "you",
    body: "It was a wonderful evening — thank you for having me. Marked as complete on my end.",
    caption: "You · 9 Aug, 23:14",
  },
]
