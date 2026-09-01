import type { StatusBadgeTone } from "@/lib/status-badge-tone"
import type { BusinessRole } from "@/types/role"

export type SupportCaseIcon =
  | "lock"
  | "calendar"
  | "refund"
  | "bug"
  | "images"
  | "hourglass"
  | "tag"

export interface SupportCase {
  id: string
  title: string
  threadTitle: string
  threadListTitle?: string
  threadSnippet?: string
  threadUpdated?: string
  caseId: string
  snippet: string
  updated: string
  status: string
  tone: StatusBadgeTone
  icon: SupportCaseIcon
  headerIcon?: SupportCaseIcon
  tileTone: "brand" | "info"
  topic: string
  opened: string
}

export interface SupportMessage {
  id: string
  from: "you" | "agent"
  body: string
  caption: string
  attachment?: { name: string; size: string }
}

export interface SupportSelectOption {
  value: string
  label: string
}

export interface SupportDataset {
  defaultTopic: string
  defaultRelated: string
  topics: SupportSelectOption[]
  related: SupportSelectOption[]
  cases: SupportCase[]
  threads: Record<string, SupportMessage[]>
}

export const supportTopics: SupportSelectOption[] = [
  { value: "payout", label: "A payout or compliance" },
  { value: "event", label: "An event review" },
  { value: "technical", label: "A technical problem" },
  { value: "other", label: "Something else" },
]

const organizer: SupportDataset = {
  defaultTopic: "payout",
  defaultRelated: "pay-1082",
  topics: supportTopics,
  related: [
    { value: "pay-1082", label: "Payout PAY-1082 (held)" },
    { value: "winter", label: "Winter Nights: Amr Diab Live" },
    { value: "desert", label: "Desert Beats Festival" },
  ],
  cases: [
    {
      id: "8841",
      title: "Payout held despite uploaded CR",
      threadTitle: "Payout PAY-1082 is held",
      threadListTitle: "Payout PAY-1082 is held",
      threadSnippet:
        'MyTicket: "Your renewed CR is in the compliance queue — expect a decision by Monday."',
      threadUpdated: "Updated just now · opened 21 Aug",
      caseId: "CASE-8841",
      snippet:
        'MyTicket: "Your renewed CR is in the compliance queue — expect a decision by Monday."',
      updated: "Updated 3h ago · opened yesterday",
      status: "Open",
      tone: "BrandTint",
      icon: "lock",
      tileTone: "brand",
      topic: "Payouts & compliance",
      opened: "21 Aug",
    },
    {
      id: "8802",
      title: "Question about Desert Beats decline",
      threadTitle: "Question about Desert Beats decline",
      caseId: "CASE-8802",
      snippet: 'You: "Understood — we\'ll adjust the sales window and resubmit."',
      updated: "Updated Tue",
      status: "Awaiting you",
      tone: "NeutralOutline",
      icon: "calendar",
      tileTone: "brand",
      topic: "Event reviews",
      opened: "19 Aug",
    },
    {
      id: "8710",
      title: "Refund decision on ORD-92244",
      threadTitle: "Refund decision on ORD-92244",
      caseId: "CASE-8710",
      snippet:
        'MyTicket: "The request was outside your 72h policy, so it was declined — no action needed."',
      updated: "Closed 2 weeks ago",
      status: "Closed",
      tone: "Inactive",
      icon: "refund",
      tileTone: "info",
      topic: "Refunds",
      opened: "7 Aug",
    },
    {
      id: "8654",
      title: "Seat map preview not loading",
      threadTitle: "Seat map preview not loading",
      caseId: "CASE-8654",
      snippet: 'MyTicket: "Fixed in last week\'s release — thanks for the report."',
      updated: "Closed 1 month ago",
      status: "Closed",
      tone: "Inactive",
      icon: "bug",
      tileTone: "info",
      topic: "Technical",
      opened: "24 Jul",
    },
  ],
  threads: {
    "8841": [
      {
        id: "m1",
        from: "you",
        body: "My payout has been held for a week — the dashboard says compliance, but everything looks complete on my side.",
        caption: "You · 21 Aug, 13:58",
      },
      {
        id: "m2",
        from: "agent",
        body: "It's one outstanding item: the bank ownership letter for account ending 4471 expired on 12 Aug. Upload a current letter under Finance → Compliance documents and the payout resumes in the next cycle.",
        caption: "Amal · MyTicket Support · 21 Aug, 14:05",
      },
      {
        id: "m3",
        from: "you",
        body: "Uploaded just now — can you confirm it's the right document?",
        caption: "You · 21 Aug, 14:31",
      },
      {
        id: "m4",
        from: "agent",
        body: "Received — it's with verification now, usually within one working day. I'll update this case the moment it clears.",
        caption: "Amal · MyTicket Support · 21 Aug, 14:47",
        attachment: { name: "ownership-letter.pdf", size: "212 KB" },
      },
    ],
  },
}

const talent: SupportDataset = {
  defaultTopic: "payout",
  defaultRelated: "pay-0311",
  topics: supportTopics,
  related: [{ value: "pay-0311", label: "Payout PAY-0311 (held)" }],
  cases: [
    {
      id: "9102",
      title: "Payout held — Freelance Work Document",
      threadTitle: "Portfolio update still in review",
      threadListTitle: "Portfolio update still in review",
      threadSnippet:
        'MyTicket: "Review should complete tomorrow — you\'ll get a notification either way."',
      threadUpdated: "Updated just now · opened 19 Aug",
      caseId: "CASE-9102",
      snippet:
        'MyTicket: "Your document is in the compliance queue — expect a decision by Monday."',
      updated: "Updated 2h ago · opened yesterday",
      status: "Open",
      tone: "BrandTint",
      icon: "lock",
      headerIcon: "images",
      tileTone: "brand",
      topic: "Profile & portfolio",
      opened: "19 Aug",
    },
    {
      id: "9066",
      title: "Why was my Backstage series declined?",
      threadTitle: "Why was my Backstage series declined?",
      caseId: "CASE-9066",
      snippet: 'You: "Understood — I\'ll get the consent form and resubmit."',
      updated: "Updated Tue",
      status: "Awaiting you",
      tone: "NeutralOutline",
      icon: "images",
      tileTone: "brand",
      topic: "Event reviews",
      opened: "19 Aug",
    },
    {
      id: "8918",
      title: "Profile change review timing",
      threadTitle: "Profile change review timing",
      caseId: "CASE-8918",
      snippet: 'MyTicket: "Approved — your new biography is live."',
      updated: "Closed 2 weeks ago",
      status: "Closed",
      tone: "Inactive",
      icon: "hourglass",
      tileTone: "info",
      topic: "Profile & portfolio",
      opened: "7 Aug",
    },
  ],
  threads: {
    "9102": [
      {
        id: "m1",
        from: "you",
        body: "I replaced my lead portfolio item three days ago and it still says in review. Is something wrong?",
        caption: "You · 19 Aug, 10:12",
      },
      {
        id: "m2",
        from: "agent",
        body: "Nothing's wrong — portfolio changes are reviewed within five working days. Your previously approved version stays live the whole time, so organizers still see your full profile.",
        caption: "Noura · MyTicket Support · 19 Aug, 10:40",
      },
      {
        id: "m3",
        from: "you",
        body: "Good to know. Can you tell me if the new video meets the guidelines?",
        caption: "You · 19 Aug, 11:15",
      },
      {
        id: "m4",
        from: "agent",
        body: "It does — resolution and rights declaration both check out. Review should complete tomorrow; you'll get a notification either way.",
        caption: "Noura · MyTicket Support · 19 Aug, 11:52",
        attachment: { name: "portfolio-guidelines.pdf", size: "156 KB" },
      },
    ],
  },
}

const vendor: SupportDataset = {
  defaultTopic: "payout",
  defaultRelated: "pay-0912",
  topics: supportTopics,
  related: [{ value: "pay-0912", label: "Payout PAY-0912 (held)" }],
  cases: [
    {
      id: "9110",
      title: "Payout held — food safety renewal",
      threadTitle: "Food safety certificate rejected",
      threadListTitle: "Food safety certificate rejected",
      threadSnippet:
        'MyTicket: "That one\'s perfect — verification usually clears within one working day."',
      threadUpdated: "Updated just now · opened 20 Aug",
      caseId: "CASE-9110",
      snippet:
        'MyTicket: "The renewed certificate is being verified — expect a decision within 2 days."',
      updated: "Updated 4h ago · opened yesterday",
      status: "Open",
      tone: "BrandTint",
      icon: "lock",
      tileTone: "brand",
      topic: "Credentials & documents",
      opened: "20 Aug",
    },
    {
      id: "9071",
      title: "Custom category approval timing",
      threadTitle: "Custom category approval timing",
      caseId: "CASE-9071",
      snippet: `MyTicket: "'Live cooking stations' is with the taxonomy team."`,
      updated: "Updated Wed",
      status: "Open",
      tone: "BrandTint",
      icon: "tag",
      tileTone: "brand",
      topic: "Profile & gallery",
      opened: "19 Aug",
    },
    {
      id: "8877",
      title: "Gallery upload failing on large video",
      threadTitle: "Gallery upload failing on large video",
      caseId: "CASE-8877",
      snippet: 'MyTicket: "Fixed — uploads up to 2 GB now supported."',
      updated: "Closed 3 weeks ago",
      status: "Closed",
      tone: "Inactive",
      icon: "bug",
      tileTone: "info",
      topic: "Technical",
      opened: "30 Jul",
    },
  ],
  threads: {
    "9110": [
      {
        id: "m1",
        from: "you",
        body: "My food safety certificate was rejected but the reason just says 'unreadable'. It looks fine on my screen.",
        caption: "You · 20 Aug, 09:20",
      },
      {
        id: "m2",
        from: "agent",
        body: "The scan cut off the expiry date at the bottom edge — verification needs the full page. Re-upload with the whole document visible and it goes back into review straight away.",
        caption: "Salem · MyTicket Support · 20 Aug, 09:48",
      },
      {
        id: "m3",
        from: "you",
        body: "Re-uploaded a full-page scan just now.",
        caption: "You · 20 Aug, 10:10",
      },
      {
        id: "m4",
        from: "agent",
        body: "That one's perfect. Verification usually clears within one working day — your profile stays live in the meantime.",
        caption: "Salem · MyTicket Support · 20 Aug, 10:35",
        attachment: { name: "food-safety-cert.pdf", size: "340 KB" },
      },
    ],
  },
}

export const supportByRole: Record<BusinessRole, SupportDataset> = {
  organizer,
  talent,
  vendor,
}

export const supportCases = organizer.cases
export const supportRelated = organizer.related
export const supportThread8841 = organizer.threads["8841"]
