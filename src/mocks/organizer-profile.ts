import type { PublicProfileValues } from "@/schemas/public-profile"

export const profileDraft: PublicProfileValues = {
  displayName: "Riyadh Events Co.",
  type: "company",
  biography:
    "Riyadh's home of unforgettable nights — concerts, festivals and galas since 2014. 40+ events, half a million guests, and counting.",
  contactEmail: "hello@riyadhevents.sa",
  phone: "05x xxx 4821",
  region: "Central Region",
  city: "Riyadh",
}

export const profileCompany = {
  registeredAr: "شركة فعاليات الرياض",
  registeredEn: "Riyadh Events Co. LLC",
  responsible: "Reem Al-Otaibi · Managing Director",
}

export const profileFixed = {
  reference: "ORG-2481",
  publicUrl: "myticket.sa/o/riyadh-events",
  rating: "4.7 (1,842)",
  eventsRun: "14",
  account: "Active",
}

export const profilePortfolio = [
  { id: "eid", name: "Eid Family Festival", meta: "7,910 attended · 4.7" },
  { id: "jazz", name: "Autumn Jazz Evening", meta: "800 attended · 4.8" },
]

export const profileLinks = [
  { id: "web", kind: "globe" as const, label: "riyadhevents.sa" },
  { id: "x", kind: "x" as const, label: "@riyadhevents" },
]
