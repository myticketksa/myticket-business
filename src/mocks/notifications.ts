import type { NotificationTileTone } from "@/components/biz/notification-row"
import type { BusinessRole } from "@/types/role"

export type NotificationFilterId =
  | "all"
  | "action"
  | "events"
  | "money"
  | "hiring"
  | "reviews"
  | "security"

export type NotificationIcon =
  | "warning"
  | "qr"
  | "ticket"
  | "lock"
  | "chat"
  | "refund"
  | "star"
  | "shield"
  | "clock"
  | "images"
  | "file"
  | "tag"

export type NotificationCategory =
  | Exclude<NotificationFilterId, "all" | "action">
  | "presence"

export interface NotificationItem {
  id: string
  title: string
  body: string
  time: string
  unread: boolean
  actionNeeded: boolean
  icon: NotificationIcon
  tileTone: NotificationTileTone
  category: NotificationCategory
}

export interface NotificationGroup {
  label: string
  items: NotificationItem[]
}

export interface NotificationsDataset {
  actionLabel: string
  groups: NotificationGroup[]
}

export const notificationFilterBase: { id: NotificationFilterId; label: string }[] =
  [
    { id: "all", label: "All" },
    { id: "action", label: "Needs action" },
    { id: "events", label: "Events" },
    { id: "money", label: "Money" },
    { id: "hiring", label: "Hiring" },
    { id: "reviews", label: "Reviews" },
    { id: "security", label: "Security" },
  ]

const organizer: NotificationsDataset = {
  actionLabel: "Needs action · 3",
  groups: [
    {
      label: "Today",
      items: [
        {
          id: "desert-declined",
          title: "Desert Beats Festival was declined",
          body: "Reason: ticket sale window ends after the event starts. Fix and resubmit.",
          time: "14:02",
          unread: true,
          actionNeeded: true,
          icon: "warning",
          tileTone: "danger",
          category: "events",
        },
        {
          id: "no-scanners",
          title: "Winter Nights still has no scanners",
          body: "Doors open in 3 days — assign at least one scanner with a registered device.",
          time: "09:15",
          unread: true,
          actionNeeded: true,
          icon: "qr",
          tileTone: "brand",
          category: "events",
        },
        {
          id: "ninety",
          title: "Winter Nights passed 90% sold",
          body: "7,240 of 8,000 tickets sold — SAR 2.03M gross.",
          time: "08:40",
          unread: true,
          actionNeeded: false,
          icon: "ticket",
          tileTone: "success",
          category: "events",
        },
      ],
    },
    {
      label: "Yesterday",
      items: [
        {
          id: "payout-held",
          title: "Payout PAY-1082 is held",
          body: "Missing: Commercial Registration certificate. Upload it to release SAR 84,210.00.",
          time: "16:22",
          unread: true,
          actionNeeded: true,
          icon: "lock",
          tileTone: "danger",
          category: "money",
        },
        {
          id: "layla-accepted",
          title: "Layla Catering accepted your request",
          body: "Catering for Winter Nights — open the thread to coordinate details.",
          time: "11:05",
          unread: true,
          actionNeeded: false,
          icon: "chat",
          tileTone: "success",
          category: "hiring",
        },
        {
          id: "refund",
          title: "Refund requested on ORD-93371",
          body: "Noura A., 1 × VIP, SAR 850.00. MyTicket is handling it — no action needed.",
          time: "10:48",
          unread: true,
          actionNeeded: false,
          icon: "refund",
          tileTone: "info",
          category: "money",
        },
      ],
    },
    {
      label: "This week",
      items: [
        {
          id: "new-review",
          title: "New 5★ review on Autumn Jazz Evening",
          body: "“Entry took two minutes, the lineup was hilarious…”",
          time: "Tue",
          unread: true,
          actionNeeded: false,
          icon: "star",
          tileTone: "brand",
          category: "reviews",
        },
        {
          id: "signin",
          title: "New sign-in from Windows PC · Edge",
          body: "Jeddah, Saudi Arabia. If this wasn't you, secure your account now.",
          time: "Mon",
          unread: false,
          actionNeeded: false,
          icon: "shield",
          tileTone: "info",
          category: "security",
        },
      ],
    },
  ],
}

const talent: NotificationsDataset = {
  actionLabel: "Needs action · 2",
  groups: [
    {
      label: "Today",
      items: [
        {
          id: "alula-hire",
          title: "New hire request from AlUla Nights",
          body: "Acoustic set · Heritage Evening · 19 Dec. Waiting 3 hours.",
          time: "18:02",
          unread: true,
          actionNeeded: true,
          icon: "chat",
          tileTone: "brand",
          category: "hiring",
        },
        {
          id: "lina-waiting",
          title: "Lina Hakim is still waiting",
          body: "Their Winter Nights request has waited 4 days — slow answers lose repeat work.",
          time: "09:00",
          unread: true,
          actionNeeded: true,
          icon: "clock",
          tileTone: "brand",
          category: "hiring",
        },
      ],
    },
    {
      label: "Yesterday",
      items: [
        {
          id: "showreel",
          title: "Showreel 2026 approved",
          body: "Your portfolio change is now live publicly.",
          time: "15:30",
          unread: true,
          actionNeeded: false,
          icon: "images",
          tileTone: "success",
          category: "presence",
        },
        {
          id: "star-review",
          title: "New 5★ review from Star Productions",
          body: "“Professional from first message to final bow…”",
          time: "11:12",
          unread: true,
          actionNeeded: false,
          icon: "star",
          tileTone: "brand",
          category: "reviews",
        },
      ],
    },
    {
      label: "This week",
      items: [
        {
          id: "signin-iphone",
          title: "New sign-in from iPhone · Safari",
          body: "Riyadh, Saudi Arabia. If this wasn't you, secure your account now.",
          time: "Mon",
          unread: false,
          actionNeeded: false,
          icon: "shield",
          tileTone: "info",
          category: "security",
        },
      ],
    },
  ],
}

const vendor: NotificationsDataset = {
  actionLabel: "Needs action · 1",
  groups: [
    {
      label: "Today",
      items: [
        {
          id: "alula-hire",
          title: "New hire request from AlUla Nights",
          body: "Traditional dinner service · Heritage Evening · 19 Dec. Waiting 5 hours.",
          time: "13:05",
          unread: true,
          actionNeeded: true,
          icon: "chat",
          tileTone: "brand",
          category: "hiring",
        },
      ],
    },
    {
      label: "Yesterday",
      items: [
        {
          id: "food-safety",
          title: "Food safety certificate expires in 20 days",
          body: "Renew before 11 Sep or your Verified badge hides in the marketplace.",
          time: "16:00",
          unread: true,
          actionNeeded: true,
          icon: "file",
          tileTone: "danger",
          category: "money",
        },
        {
          id: "custom-category",
          title: "Custom category update",
          body: "“Live cooking stations · محطات طهي حية” is with the taxonomy team.",
          time: "10:20",
          unread: false,
          actionNeeded: false,
          icon: "tag",
          tileTone: "brand",
          category: "presence",
        },
      ],
    },
    {
      label: "This week",
      items: [
        {
          id: "star-review",
          title: "New 5★ review from Star Productions",
          body: "“Fed 800 guests without a single queue forming…”",
          time: "Tue",
          unread: false,
          actionNeeded: false,
          icon: "star",
          tileTone: "brand",
          category: "reviews",
        },
      ],
    },
  ],
}

export const notificationsByRole: Record<BusinessRole, NotificationsDataset> = {
  organizer,
  talent,
  vendor,
}

export const notificationGroups = organizer.groups
export const notificationFilters: { id: NotificationFilterId; label: string }[] =
  notificationFilterBase.map((pill) =>
    pill.id === "action" ? { ...pill, label: organizer.actionLabel } : pill,
  )
