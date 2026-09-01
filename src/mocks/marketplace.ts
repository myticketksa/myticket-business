export type MarketplaceTab = "talents" | "vendors"
export type MarketplaceRating = "4.5+" | "4+" | "Any"

export interface MarketplaceTalent {
  id: string
  name: string
  specialty: string
  rating: string
  reviews: string
  city: string
  availability: "Available" | "Reserved"
  verified: boolean
  shortlisted: boolean
  history?: string
  response?: string
  photoCaption: string
  category: string
  hasProfile?: boolean
}

export const marketplaceCategories: { id: string; label: string; count: string }[] =
  [
    { id: "musicians", label: "Musicians", count: "124" },
    { id: "djs", label: "DJs", count: "58" },
    { id: "comedians", label: "Comedians", count: "36" },
    { id: "hosts", label: "Hosts & MCs", count: "41" },
    { id: "dancers", label: "Dancers", count: "29" },
  ]

export const marketplaceLooseFilters = [
  { id: "available", label: "Available now" },
  { id: "travel", label: "Willing to travel" },
  { id: "verified", label: "Verified by MyTicket" },
] as const

export const marketplaceTalents: MarketplaceTalent[] = [
  {
    id: "lina-hakim",
    name: "Lina Hakim",
    specialty: "Oud soloist · Traditional",
    rating: "4.9",
    reviews: "(86)",
    city: "Riyadh",
    availability: "Available",
    verified: true,
    shortlisted: true,
    history: "Worked with you · Autumn Jazz Evening",
    response: "Responds to 96% of requests · usually within 6h",
    photoCaption: "talent photo 16:10",
    category: "musicians",
    hasProfile: true,
  },
  {
    id: "dj-khalid-noor",
    name: "DJ Khalid Noor",
    specialty: "DJ · Electronic, Khaleeji fusion",
    rating: "4.8",
    reviews: "(132)",
    city: "Riyadh",
    availability: "Available",
    verified: true,
    shortlisted: false,
    history: "1 open request · Winter Nights",
    response: "Responds to 71% of requests · usually within 2d",
    photoCaption: "talent photo 16:10",
    category: "djs",
  },
  {
    id: "sarah-al-anzi",
    name: "Sarah Al-Anzi",
    specialty: "Host & MC · Bilingual",
    rating: "4.9",
    reviews: "(204)",
    city: "Riyadh",
    availability: "Reserved",
    verified: true,
    shortlisted: false,
    response: "Responds to 98% of requests · usually within 3h",
    photoCaption: "talent photo 16:10",
    category: "hosts",
  },
  {
    id: "firqat-al-layl",
    name: "Firqat Al-Layl",
    specialty: "Band · Khaleeji, wedding & gala",
    rating: "4.7",
    reviews: "(58)",
    city: "Jeddah · travels",
    availability: "Available",
    verified: false,
    shortlisted: false,
    response: "Responds to 84% of requests · usually within 1d",
    photoCaption: "band photo 16:10",
    category: "musicians",
  },
  {
    id: "omar-basheer",
    name: "Omar Basheer",
    specialty: "Comedian · Stand-up, Arabic",
    rating: "4.8",
    reviews: "(91)",
    city: "Riyadh",
    availability: "Available",
    verified: true,
    shortlisted: true,
    history: "Worked with you · 3 events",
    response: "Responds to 92% of requests · usually within 12h",
    photoCaption: "talent photo 16:10",
    category: "comedians",
  },
  {
    id: "nour-ensemble",
    name: "Nour Ensemble",
    specialty: "Strings · Classical, ambient",
    rating: "4.6",
    reviews: "(34)",
    city: "Dammam · travels",
    availability: "Available",
    verified: false,
    shortlisted: false,
    response: "Responds to 77% of requests · usually within 1d",
    photoCaption: "ensemble photo 16:10",
    category: "musicians",
  },
]

export const marketplaceVendors: MarketplaceTalent[] = [
  {
    id: "layla-catering",
    name: "Layla Catering",
    specialty: "Full-service event catering",
    rating: "4.7",
    reviews: "(52)",
    city: "Riyadh",
    availability: "Reserved",
    verified: true,
    shortlisted: false,
    photoCaption: "vendor photo 16:10",
    category: "catering",
  },
]
