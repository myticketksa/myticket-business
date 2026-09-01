export interface VendorWaitingRequest {
  id: string
  initials: string
  name: string
  meta: string
  brief: string
  wait: string
  waitTone: "danger" | "muted"
}

export interface VendorWorkItem {
  id: string
  month: string
  day: string
  title: string
  meta: string
  status: string
  action?: string
}

export interface VendorHomeReview {
  id: string
  author: string
  stars: number
  when: string
  body: string
}

export interface VendorStrengthTask {
  id: string
  label: string
  done: boolean
  gain?: string
  gainTone?: "danger"
}

export const vendorWaitingRequests: VendorWaitingRequest[] = [
  {
    id: "riyadh-winter",
    initials: "RE",
    name: "Riyadh Events Co.",
    meta: "4.8 · 34 events",
    brief: "Catering for 2,000 · Winter Nights: Amr Diab Live · 12 Nov · Riyadh",
    wait: "waiting 2 days",
    waitTone: "danger",
  },
  {
    id: "alula-heritage",
    initials: "AN",
    name: "AlUla Nights",
    meta: "4.7 · 18 events",
    brief: "Traditional dinner service · Heritage Evening · 19 Dec · AlUla",
    wait: "waiting 5 hours",
    waitTone: "muted",
  },
]

export const vendorWorkItems: VendorWorkItem[] = [
  {
    id: "jeddah-corniche",
    month: "Dec",
    day: "3",
    title: "Corniche Nights Festival · 3 days",
    meta: "Accepted · Jeddah Season · this engagement reserves you",
    status: "Accepted",
  },
  {
    id: "star-aramco",
    month: "Sep",
    day: "14",
    title: "Aramco Annual Dinner",
    meta: "Accepted · Star Productions · Dhahran",
    status: "Accepted",
  },
  {
    id: "summer-souq",
    month: "Aug",
    day: "1",
    title: "Summer Souq Nights",
    meta: "Delivered 1 Aug · confirm completion to reopen availability",
    status: "In progress",
    action: "Mark complete",
  },
]

export const vendorHomeReviews: VendorHomeReview[] = [
  {
    id: "sp",
    author: "Star Productions",
    stars: 5,
    when: "3 weeks ago",
    body: "Layla's team fed 800 guests without a single queue forming. The live station concept was the talk of the gala.",
  },
]

export const vendorStrengthTasks: VendorStrengthTask[] = [
  { id: "gallery", label: "Add gallery photos", done: true },
  { id: "coverage", label: "Confirm coverage area", done: true },
  {
    id: "certificate",
    label: "Renew food safety certificate",
    done: false,
    gain: "expires in 20d",
    gainTone: "danger",
  },
]

export const vendorProfileStats = [
  { value: "926", label: "profile views", tone: "default" as const },
  { value: "9", label: "enquiries received", tone: "default" as const },
  { value: "67%", label: "acceptance rate", tone: "success" as const },
  { value: "4.7", label: "average rating", tone: "default" as const },
]
