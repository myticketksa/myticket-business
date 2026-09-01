export type TalentPortfolioStatus = "Approved" | "Under review" | "Declined"

export interface TalentPortfolioItem {
  id: string
  title: string
  caption: string
  mediaCaption: string
  status: TalentPortfolioStatus
  kind: "photo" | "video" | "audio"
  lead?: boolean
  note?: string
  reason?: string
  duration?: string
}

export const talentPortfolioItems: TalentPortfolioItem[] = [
  {
    id: "mawazine",
    title: "Mawazine Festival set",
    caption: "Main stage, Rabat · 2025",
    mediaCaption: "lead photo · live performance",
    status: "Approved",
    kind: "photo",
    lead: true,
  },
  {
    id: "showreel",
    title: "Showreel 2026",
    caption: "3:24 · replaces Showreel 2024",
    mediaCaption: "video · new showreel 2026",
    status: "Under review",
    kind: "video",
    note: "The 2024 version remains public until this is approved.",
  },
  {
    id: "backstage",
    title: "Backstage series",
    caption: "",
    mediaCaption: "photo · backstage series",
    status: "Declined",
    kind: "photo",
    reason: "Reason: includes an unreleased artist's likeness without consent.",
  },
  {
    id: "taqasim",
    title: "Taqasim in Hijaz",
    caption: "Studio recording · 2024",
    mediaCaption: "audio · Taqasim recording",
    status: "Approved",
    kind: "audio",
    duration: "4:12",
  },
]
