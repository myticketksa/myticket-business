import type { BusinessRole } from "@/types/role"

export type ChannelState = boolean | "na"

export interface PrefRow {
  id: string
  subject: string
  note: string
  email: ChannelState
  push: ChannelState
  sms: ChannelState
  locked?: boolean
}

export interface SettingsAccount {
  fullName: string
  displayName: string
  email: string
  phone: string
  phoneLabel: string
  language: string
  appearance: string
}

export interface SettingsDataset {
  account: SettingsAccount
  prefRows: PrefRow[]
}

export const settingsSessions = [
  {
    id: "mac",
    device: "MacBook Pro · Chrome",
    meta: "Riyadh, Saudi Arabia · active now",
    current: true,
    icon: "desktop" as const,
  },
  {
    id: "iphone",
    device: "iPhone 15 Pro · Safari",
    meta: "Riyadh, Saudi Arabia · 2h ago",
    current: false,
    icon: "mobile" as const,
  },
  {
    id: "windows",
    device: "Windows PC · Edge",
    meta: "Jeddah, Saudi Arabia · 3 days ago",
    current: false,
    icon: "desktop" as const,
  },
]

const organizerPrefs: PrefRow[] = [
  {
    id: "event-reviews",
    subject: "Event reviews",
    note: "Approvals, declines and review progress",
    email: true,
    push: true,
    sms: true,
  },
  {
    id: "refunds",
    subject: "Refund requests",
    note: "New requests and MyTicket's decisions",
    email: true,
    push: true,
    sms: "na",
  },
  {
    id: "hire",
    subject: "Hire requests",
    note: "Responses, new messages, completions",
    email: true,
    push: true,
    sms: "na",
  },
  {
    id: "payouts",
    subject: "Payouts & compliance",
    note: "Status changes, holds, document outcomes",
    email: true,
    push: true,
    sms: true,
  },
  {
    id: "sales",
    subject: "Sales milestones",
    note: "Sell-out warnings, sales opening and closing",
    email: "na",
    push: true,
    sms: "na",
  },
  {
    id: "reviews",
    subject: "New reviews",
    note: "When someone reviews you or your events",
    email: true,
    push: "na",
    sms: "na",
  },
]

const partnerSecurityRow: PrefRow = {
  id: "security",
  subject: "Account security",
  note: "Sign-ins and security changes — always on",
  email: true,
  push: true,
  sms: true,
  locked: true,
}

const talentPrefs: PrefRow[] = [
  {
    id: "hire",
    subject: "Hire requests",
    note: "New requests, messages, cancellations",
    email: true,
    push: true,
    sms: true,
  },
  {
    id: "presence",
    subject: "Profile & portfolio reviews",
    note: "Approvals and declines of your changes",
    email: true,
    push: true,
    sms: "na",
  },
  {
    id: "payouts",
    subject: "Payouts & compliance",
    note: "Status changes, holds, document outcomes",
    email: true,
    push: true,
    sms: true,
  },
  {
    id: "reviews",
    subject: "New reviews",
    note: "When an organizer reviews your work",
    email: true,
    push: "na",
    sms: "na",
  },
  partnerSecurityRow,
]

const vendorPrefs: PrefRow[] = [
  {
    id: "hire",
    subject: "Hire requests",
    note: "New requests, messages, cancellations",
    email: true,
    push: true,
    sms: true,
  },
  {
    id: "presence",
    subject: "Profile & gallery reviews",
    note: "Approvals and declines of your changes",
    email: true,
    push: true,
    sms: "na",
  },
  {
    id: "payouts",
    subject: "Payouts & compliance",
    note: "Status changes, holds, document outcomes",
    email: true,
    push: true,
    sms: true,
  },
  {
    id: "reviews",
    subject: "New reviews",
    note: "When an organizer reviews your work",
    email: true,
    push: "na",
    sms: "na",
  },
  partnerSecurityRow,
]

export const settingsByRole: Record<BusinessRole, SettingsDataset> = {
  organizer: {
    account: {
      fullName: "Reem Al-Otaibi",
      displayName: "Riyadh Events Co.",
      email: "team@riyadhevents.sa",
      phone: "05x xxx 4821",
      phoneLabel: "Phone — changed via verification",
      language: "English",
      appearance: "Light",
    },
    prefRows: organizerPrefs,
  },
  talent: {
    account: {
      fullName: "Lina Hakim",
      displayName: "Lina Hakim",
      email: "lina@linahakim.com",
      phone: "05x xxx 4821",
      phoneLabel: "Phone — verified",
      language: "English",
      appearance: "Light",
    },
    prefRows: talentPrefs,
  },
  vendor: {
    account: {
      fullName: "Layla Al-Harbi",
      displayName: "Layla Catering",
      email: "hello@laylacatering.sa",
      phone: "05x xxx 4821",
      phoneLabel: "Phone — verified",
      language: "English",
      appearance: "Light",
    },
    prefRows: vendorPrefs,
  },
}

export const settingsAccount = settingsByRole.organizer.account
export const settingsPrefRows = settingsByRole.organizer.prefRows
