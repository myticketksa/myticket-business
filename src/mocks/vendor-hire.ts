export type VendorHireFilterId = "awaiting" | "accepted" | "completed" | "all"

export interface VendorHireThread {
  id: string
  name: string
  initials: string
  time: string
  preview: string
  status: string
  filter: Exclude<VendorHireFilterId, "all"> | "declined"
  ratingLine: string
  eventLine: string
}

export interface VendorHireMessage {
  id: string
  from: "them" | "you"
  body?: string
  caption: string
  attachment?: { name: string; size: string }
}

export const vendorHireFilterPills: { id: VendorHireFilterId; label: string }[] =
  [
    { id: "awaiting", label: "Awaiting · 2" },
    { id: "accepted", label: "Accepted · 3" },
    { id: "completed", label: "Completed · 38" },
    { id: "all", label: "All" },
  ]

export const vendorHireThreads: VendorHireThread[] = [
  {
    id: "riyadh-winter",
    name: "Riyadh Events Co.",
    initials: "RE",
    time: "Fri",
    preview: "Can you confirm halal certification paperwork…",
    status: "Awaiting your response · 2d",
    filter: "awaiting",
    ratingLine: "4.8 · 34 events · Riyadh · For:",
    eventLine: "Winter Nights: Amr Diab Live · 12 Nov",
  },
  {
    id: "alula-heritage",
    name: "AlUla Nights",
    initials: "AN",
    time: "13:05",
    preview: "Traditional dinner service for our Heritage Evening…",
    status: "Awaiting your response · 5h",
    filter: "awaiting",
    ratingLine: "4.7 · 18 events · AlUla · For:",
    eventLine: "Heritage Evening · 19 Dec",
  },
  {
    id: "jeddah-corniche",
    name: "Jeddah Season",
    initials: "JS",
    time: "14 Aug",
    preview: "Confirmed — see you at the site walkthrough.",
    status: "Accepted · reserves you",
    filter: "accepted",
    ratingLine: "4.9 · 120 events · Jeddah · For:",
    eventLine: "Corniche Nights Festival · 3–5 Dec",
  },
  {
    id: "star-aramco",
    name: "Star Productions",
    initials: "SP",
    time: "12 Aug",
    preview: "Plated dinner for 800 — menu approved.",
    status: "Accepted",
    filter: "accepted",
    ratingLine: "4.8 · 22 events · Dhahran · For:",
    eventLine: "Aramco Annual Dinner · 14 Sep",
  },
  {
    id: "summer-souq",
    name: "Summer Souq Nights",
    initials: "SS",
    time: "1 Aug",
    preview: "Delivered — please mark complete when ready.",
    status: "In progress",
    filter: "accepted",
    ratingLine: "Riyadh · For:",
    eventLine: "Summer Souq Nights · 1 Aug",
  },
  {
    id: "gala-x",
    name: "Gala X",
    initials: "GX",
    time: "20 Jul",
    preview: "Understood, maybe next season.",
    status: "Declined by you",
    filter: "declined",
    ratingLine: "4.6 · 19 events · Riyadh · For:",
    eventLine: "Gala X Anniversary Dinner · 20 Jul",
  },
]

export const vendorHireAdvisory =
  "MyTicket hosts the introduction and records the outcome. Contracts, pricing and payment happen between you and the organizer, outside MyTicket. Accepting sets your availability to Reserved."

export const vendorHireFootnote =
  "You respond to requests — starting new conversations is done by organizers."

export const vendorWinterConversation: VendorHireMessage[] = [
  {
    id: "m1",
    from: "them",
    body: "Salam — we're staging Winter Nights with Amr Diab on 12 Nov at Boulevard City, 8,000 capacity. We'd love live cooking stations for roughly 2,000 covers across the VIP and Gold areas, 18:30–23:00. Is this in your range?",
    caption: "Riyadh Events Co. · Thu 15:40",
  },
  {
    id: "m2",
    from: "you",
    body: "2,000 covers is comfortably in range — we ran 3,500/day at Corniche Nights. Sending our stations menu and power requirements now.",
    caption: "You · Thu 17:02",
  },
  {
    id: "m3",
    from: "you",
    caption: "You · Thu 17:03",
    attachment: { name: "Live stations menu & specs.pdf", size: "2.1 MB" },
  },
  {
    id: "m4",
    from: "them",
    body: "Menu looks brilliant. Can you confirm halal certification paperwork for the venue file, and whether the 3rd is workable for a site visit?",
    caption: "Riyadh Events Co. · Fri 09:18",
  },
]

export const vendorDeclinedConversation: VendorHireMessage[] = [
  {
    id: "d1",
    from: "them",
    body: "Could you cover cocktail catering for our Gala X Anniversary Dinner on 20 Jul, roughly 300 guests?",
    caption: "Gala X · 20 Jul, 10:02",
  },
  {
    id: "d2",
    from: "you",
    body: "Thanks for thinking of us — we're fully booked that week and won't be able to take this one on. Wishing you a great event.",
    caption: "You · 20 Jul, 16:40",
  },
  {
    id: "d3",
    from: "them",
    body: "Understood, maybe next season.",
    caption: "Gala X · 20 Jul, 17:05",
  },
]
