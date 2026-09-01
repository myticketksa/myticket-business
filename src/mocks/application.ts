export interface ApplicationFieldRow {
  label: string
  value: string
  arabic?: string
}

export const applicationReviewRows: ApplicationFieldRow[] = [
  { label: "Applying as", value: "Organizer · company" },
  {
    label: "Company name",
    value: "Riyadh Events Co. · ",
    arabic: "شركة فعاليات الرياض",
  },
  {
    label: "What you organize",
    value:
      "Concerts, festivals and corporate galas in the Central Region, 6–10 events a year, typical capacity 1,000–8,000.",
  },
  {
    label: "Responsible person",
    value: "Reem Al-Otaibi · Managing Director · 12 years in live events",
  },
  { label: "Region & city", value: "Central Region · Riyadh" },
  { label: "Contact", value: "team@riyadhevents.sa · 05x xxx 4821" },
  {
    label: "Documents",
    value: "Commercial Registration.pdf · VAT certificate.pdf · Owner ID.pdf",
  },
]

export const applicationReviewOutcomes: Array<{
  id: "approved" | "declined" | "meanwhile"
  tone: "success" | "brand"
  title: string
  body: string
}> = [
  {
    id: "approved",
    tone: "success" as const,
    title: "If it's approved",
    body: "Your workspace opens immediately with a short setup list — profile, venue, first event, bank details.",
  },
  {
    id: "declined",
    tone: "brand" as const,
    title: "If it's declined",
    body: "You'll see exactly why, and can fix and resubmit — declining is routine and never final.",
  },
  {
    id: "meanwhile",
    tone: "brand" as const,
    title: "Meanwhile",
    body: "Your customer account works as normal — browse and buy tickets on the main website.",
  },
]

export const applicationReviewLockNote =
  "Your submission is locked on purpose — the team must approve exactly what you sent, not something that changed mid-review. It unlocks the moment there's an outcome. This is temporary, not a broken form."

export const applicationReviewFootnote =
  "Taking longer than 2 working days? That happens during busy seasons — your place in the queue is kept, and support can check its status anytime."

export const applicationDeclinedReason =
  "The Commercial Registration document you uploaded expired in March 2026, and the responsible person named on it doesn't match the application. Please upload the renewed CR and either update the responsible person or add an authorization letter."

export const applicationDeclinedNote = {
  lead: "This is fixable, and resubmitting is expected.",
  body: "Most declined applications are approved on their second try. Nothing else in your application needs to change.",
}

export const applicationDeclinedFootnote =
  "Resubmit unlocks when both flagged items are fixed. Resubmissions go back to the same queue — usually decided within 2 working days."
