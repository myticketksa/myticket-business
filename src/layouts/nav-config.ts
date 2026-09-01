import type { BusinessRole } from "@/types/role"

export type NavIconName =
  | "house-fill"
  | "calendar-blank"
  | "storefront"
  | "archive"
  | "users-three"
  | "circle-dashed"
  | "chats-circle"
  | "qr-code"
  | "door-open"
  | "chart-line-up"
  | "receipt"
  | "bank"
  | "star"
  | "user-circle"
  | "images"
  | "gear"
  | "lifebuoy"

export interface NavItemConfig {
  label: string
  path: string
  icon?: NavIconName
  count?: string
  countTone?: "hot" | "neutral"
}

export interface NavGroupConfig {
  heading: string
  items: NavItemConfig[]
}

export const organizerNav: NavGroupConfig[] = [
  {
    heading: "",
    items: [{ label: "Home", path: "/app", icon: "house-fill" }],
  },
  {
    heading: "Operate",
    items: [
      { label: "Events", path: "/app/events", icon: "calendar-blank", count: "2", countTone: "hot" },
      { label: "Venues", path: "/app/venues", icon: "storefront" },
      { label: "Archive", path: "/app/archive", icon: "archive" },
    ],
  },
  {
    heading: "Hire",
    items: [
      { label: "Marketplace", path: "/app/marketplace", icon: "users-three" },
      {
        label: "Hire requests",
        path: "/app/hire-requests",
        icon: "chats-circle",
        count: "3",
        countTone: "hot",
      },
    ],
  },
  {
    heading: "Door",
    items: [
      { label: "Scanners", path: "/app/scanners", icon: "qr-code", count: "1", countTone: "hot" },
      { label: "Live door", path: "/app/live-door", icon: "door-open" },
      { label: "Attendance", path: "/app/attendance", icon: "chart-line-up" },
    ],
  },
  {
    heading: "Grow",
    items: [
      { label: "Sales", path: "/app/sales", icon: "receipt" },
      {
        label: "Finance & payouts",
        path: "/app/finance",
        icon: "bank",
        count: "1",
        countTone: "hot",
      },
      { label: "Ratings & reviews", path: "/app/reviews", icon: "star" },
    ],
  },
  {
    heading: "Account",
    items: [
      { label: "Profile", path: "/app/profile", icon: "user-circle" },
      { label: "Settings", path: "/app/settings", icon: "gear" },
      { label: "Support", path: "/app/support", icon: "lifebuoy" },
    ],
  },
]

export const talentNav: NavGroupConfig[] = [
  {
    heading: "",
    items: [{ label: "Home", path: "/app", icon: "house-fill" }],
  },
  {
    heading: "Work",
    items: [
      {
        label: "Hire requests",
        path: "/app/hire-requests",
        icon: "chats-circle",
        count: "✓",
        countTone: "hot",
      },
      { label: "Availability", path: "/app/availability", icon: "circle-dashed" },
    ],
  },
  {
    heading: "Presence",
    items: [
      { label: "Profile", path: "/app/profile", icon: "user-circle" },
      { label: "Portfolio", path: "/app/portfolio", icon: "images", count: "1", countTone: "neutral" },
      { label: "Ratings & reviews", path: "/app/reviews", icon: "star" },
    ],
  },
  {
    heading: "Money",
    items: [{ label: "Payments", path: "/app/finance", icon: "receipt" }],
  },
  {
    heading: "Account",
    items: [
      { label: "Settings", path: "/app/settings", icon: "gear" },
      { label: "Support", path: "/app/support", icon: "lifebuoy" },
    ],
  },
]

export const vendorNav: NavGroupConfig[] = [
  {
    heading: "",
    items: [{ label: "Home", path: "/app", icon: "house-fill" }],
  },
  {
    heading: "Work",
    items: [
      {
        label: "Hire requests",
        path: "/app/hire-requests",
        icon: "chats-circle",
        count: "2",
        countTone: "hot",
      },
      { label: "Availability", path: "/app/availability", icon: "circle-dashed" },
    ],
  },
  {
    heading: "Presence",
    items: [
      { label: "Profile", path: "/app/profile", icon: "user-circle" },
      { label: "Gallery", path: "/app/gallery", icon: "images" },
      { label: "Ratings & reviews", path: "/app/reviews", icon: "star" },
    ],
  },
  {
    heading: "Money",
    items: [{ label: "Payments", path: "/app/finance", icon: "receipt" }],
  },
  {
    heading: "Account",
    items: [
      { label: "Settings", path: "/app/settings", icon: "gear" },
      { label: "Support", path: "/app/support", icon: "lifebuoy" },
    ],
  },
]

export function navForRole(role: BusinessRole): NavGroupConfig[] {
  if (role === "talent") {
    return talentNav
  }

  if (role === "vendor") {
    return vendorNav
  }

  return organizerNav
}
