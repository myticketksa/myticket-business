export type HireFilterId = "all" | "awaiting" | "accepted" | "completed"

export interface HireThread {
  id: string
  name: string
  craft: string
  initials: string
  time: string
  preview: string
  status: string
  unread?: boolean
  filter: Exclude<HireFilterId, "all"> | "declined"
}

export const hireFilterPills: { id: HireFilterId; label: string }[] = [
  { id: "all", label: "All · 9" },
  { id: "awaiting", label: "Awaiting · 3" },
  { id: "accepted", label: "Accepted · 3" },
  { id: "completed", label: "Completed · 2" },
]

export const hireThreads: HireThread[] = [
  {
    id: "dj-khalid-noor",
    name: "DJ Khalid Noor",
    craft: "DJ",
    initials: "KN",
    time: "Mon",
    preview: "You: Stage plan & set times.pdf",
    status: "Awaiting response · 4d",
    filter: "awaiting",
  },
  {
    id: "lina-hakim",
    name: "Lina Hakim",
    craft: "Oud soloist",
    initials: "LH",
    time: "1h",
    preview: "Wonderful — with percussionist it is. Confirming…",
    status: "Accepted",
    unread: true,
    filter: "accepted",
  },
  {
    id: "layla-catering",
    name: "Layla Catering",
    craft: "Vendor",
    initials: "LC",
    time: "Thu",
    preview: "We can do live stations for 2,000 — menu attached.",
    status: "Awaiting response · 2d",
    unread: true,
    filter: "awaiting",
  },
  {
    id: "sarah-al-anzi",
    name: "Sarah Al-Anzi",
    craft: "Host & MC",
    initials: "SA",
    time: "Wed",
    preview: "Accepted! Send the run-of-show when ready.",
    status: "Accepted",
    filter: "accepted",
  },
  {
    id: "omar-basheer",
    name: "Omar Basheer",
    craft: "Comedian",
    initials: "OB",
    time: "9 Aug",
    preview: "Great working with you again — thanks!",
    status: "Completed · review them",
    filter: "completed",
  },
  {
    id: "nour-ensemble",
    name: "Nour Ensemble",
    craft: "Strings",
    initials: "NE",
    time: "2 Aug",
    preview: "Sorry, we're fully booked that week.",
    status: "Declined",
    filter: "declined",
  },
]

export const khalidConversation = {
  headerStatus: "Awaiting their response · 4d",
  ratingLine: "4.8 (132) · answers 71% · usually 2d · For:",
  eventLine: "Winter Nights: Amr Diab Live · 12 Nov",
  explainer:
    "You ask; they answer. Khalid accepts or declines — you can message, cancel, or mark the work complete once done. Contracts, pricing and payment stay between you two, outside MyTicket.",
  dateLabel: "MON 18 AUG",
  messages: [
    {
      id: "m1",
      body: "Salam Khalid — we'd love a 60-minute DJ set to close Winter Nights on 12 Nov at Boulevard City, right after the headline act (~23:00). Full club rig on site. Are you open to it?",
      caption: "You · Mon 21:14",
    },
  ],
  attachment: {
    name: "Stage plan & set times.pdf",
    size: "840 KB",
    caption: "You · Mon 21:15",
  },
}
