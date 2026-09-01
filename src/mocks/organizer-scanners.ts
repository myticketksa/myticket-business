import type { StatusBadgeTone } from "@/lib/status-badge-tone"
import type { AvatarTone } from "@/components/primitive/avatar"

export type ScannerDeviceKind = "registered" | "none" | "never"

export interface OrganizerScanner {
  id: string
  name: string
  initials: string
  avatarTone: AvatarTone
  email: string
  gate?: string
  assignedEvent: string
  deviceKind: ScannerDeviceKind
  device: string
  scans: string
  lastActive: string
  lastActiveTone: "success" | "muted"
  status: string
  statusTone?: StatusBadgeTone
  wash?: boolean
}

export const scannersPageSub =
  "Door staff who check tickets in the scanning app. They aren’t business accounts — no profile, no purchases, no buyer data, and they sign in to the scan app only, from registered devices."

export const scannersBanner = {
  lead: "Winter Nights opens doors in 3 days and has no scanners assigned.",
  body: "Without an assigned scanner with a registered device, nobody can check tickets at the gate.",
}

export const scannersHowItWorks = [
  "Scanners sign in to the scanning app, never to this website.",
  "A scanner scans only from a registered device — the first sign-in registers it; you can revoke it here anytime.",
  "They see the ticket result and holder name only — no buyer contact details, no orders, no money.",
  "A scanner who has never signed in or has no registered device is flagged before doors open — fix it by resending details or re-registering.",
  "Scanners are the only staff accounts on MyTicket — there are no permissions, sub-teams, or other roles. That’s deliberate.",
]

export const scannersAssignEventOptions = [
  { value: "winter-nights", label: "Winter Nights: Amr Diab Live" },
  { value: "jeddah-comedy", label: "Jeddah Comedy Night" },
]

export const organizerScanners: OrganizerScanner[] = [
  {
    id: "yousef",
    name: "Yousef Al-Harbi",
    initials: "YH",
    avatarTone: "brand",
    email: "yousef.gates@riyadhevents.sa",
    gate: "Gate B",
    assignedEvent: "Jeddah Comedy Night",
    deviceKind: "registered",
    device: "iPhone 15 · registered",
    scans: "8,412",
    lastActive: "scanning now",
    lastActiveTone: "success",
    status: "Active now",
  },
  {
    id: "huda",
    name: "Huda Al-Salem",
    initials: "HS",
    avatarTone: "brand",
    email: "huda.door@riyadhevents.sa",
    gate: "Gate A",
    assignedEvent: "Jeddah Comedy Night",
    deviceKind: "registered",
    device: "Pixel 9 · registered",
    scans: "6,208",
    lastActive: "scanning now",
    lastActiveTone: "success",
    status: "Active now",
  },
  {
    id: "salem",
    name: "Salem Al-Mutairi",
    initials: "SM",
    avatarTone: "brand",
    email: "salem.vip@riyadhevents.sa",
    gate: "VIP",
    assignedEvent: "Jeddah Comedy Night · +1",
    deviceKind: "none",
    device: "No registered device",
    scans: "3,914",
    lastActive: "2 weeks ago",
    lastActiveTone: "muted",
    status: "Can’t scan",
    statusTone: "DangerTint",
    wash: true,
  },
  {
    id: "reem",
    name: "Reem Al-Dossary",
    initials: "RD",
    avatarTone: "muted",
    email: "reem.d@riyadhevents.sa",
    assignedEvent: "Not assigned yet",
    deviceKind: "never",
    device: "Never signed in",
    scans: "0",
    lastActive: "—",
    lastActiveTone: "muted",
    status: "Never signed in",
  },
]
