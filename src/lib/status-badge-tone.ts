export type StatusBadgeTone =
  | "BrandTint"
  | "UrgentSolid"
  | "Terminal"
  | "NeutralOutline"
  | "LiveSolid"
  | "SuccessTint"
  | "Inactive"
  | "InfoTint"
  | "DangerTint"

const SUCCESS_LABELS = new Set([
  "Valid",
  "Accepted",
  "Paid",
  "Verified",
  "Valid · queued",
  "Approved",
  "Completed",
  "Active",
  "On",
  "Received",
  "Unlocked",
  "Deposit received",
  "Accepted · reserves you",
  "Completed · review them",
])

const BRAND_LABELS = new Set([
  "Open",
  "On sale",
  "Under review",
  "In progress",
  "Confirm receipt",
  "Announcement",
  "Pending",
  "Resold",
  "Schedule change",
  "Never signed in",
  "With MyTicket",
  "Report under assessment",
  "Expiring",
  "Expiring 11 Sep",
])

const DANGER_LABELS = new Set([
  "Wrong event",
  "Action needed",
  "Declined",
  "Declined by you",
  "Fix: Commercial Registration",
  "Fix: Responsible person",
  "Cancelled",
  "Rejected",
  "Already scanned",
  "Refunded",
  "Missing",
  "Can't scan",
  "Can’t scan",
  "Held",
])

const NEUTRAL_PREFIXES = [
  "Awaiting you",
  "Draft",
  "Awaiting your response",
  "Awaiting payment",
  "No amount recorded",
  "Complimentary",
  "This device",
  "Scheduled",
  "Agreed · due",
  "Awaiting response",
  "Awaiting their response",
]

const LIVE_LABELS = new Set(["Live now", "Active now"])
const INACTIVE_LABELS = new Set(["Closed", "Reserved"])
const INFO_LABELS = new Set(["Refunded"])

export function resolveStatusBadgeTone(
  label: string,
  toneOverride?: StatusBadgeTone,
): StatusBadgeTone {
  if (toneOverride) {
    return toneOverride
  }

  if (SUCCESS_LABELS.has(label)) {
    return "SuccessTint"
  }

  if (BRAND_LABELS.has(label)) {
    return "BrandTint"
  }

  if (LIVE_LABELS.has(label)) {
    return "LiveSolid"
  }

  if (INACTIVE_LABELS.has(label)) {
    return "Inactive"
  }

  if (INFO_LABELS.has(label) && !DANGER_LABELS.has(label)) {
    return "InfoTint"
  }

  if (DANGER_LABELS.has(label)) {
    return "DangerTint"
  }

  if (NEUTRAL_PREFIXES.some((prefix) => label.startsWith(prefix))) {
    return "NeutralOutline"
  }

  return "NeutralOutline"
}
