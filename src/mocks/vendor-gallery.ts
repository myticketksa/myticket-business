export type VendorGalleryStatus =
  | "Approved"
  | "Under review"
  | "Declined"
  | "Expiring 11 Sep"

export interface VendorGalleryItem {
  id: string
  title: string
  caption: string
  mediaCaption: string
  status: VendorGalleryStatus
  kind: "photo" | "video" | "document"
  lead?: boolean
  note?: string
  reason?: string
}

export const vendorGalleryItems: VendorGalleryItem[] = [
  {
    id: "aramco",
    title: "Aramco gala · live stations",
    caption: "800 covers, plated + stations · 2026",
    mediaCaption: "lead photo · live stations at gala",
    status: "Approved",
    kind: "photo",
    lead: true,
  },
  {
    id: "walkthrough",
    title: "Corniche Nights walkthrough",
    caption: "2:10 · 3,500 covers/day",
    mediaCaption: "video · festival service walkthrough",
    status: "Under review",
    kind: "video",
    note: "Your approved gallery stays public until this is approved.",
  },
  {
    id: "heritage",
    title: "Heritage banquet, Diriyah",
    caption: "Traditional service · 2025",
    mediaCaption: "photo · traditional banquet setup",
    status: "Approved",
    kind: "photo",
  },
  {
    id: "certificate",
    title: "Credential document",
    caption: "Food safety certificate.pdf",
    mediaCaption: "Food safety certificate.pdf",
    status: "Expiring 11 Sep",
    kind: "document",
    reason: "Renew before it lapses or your Verified badge hides.",
  },
  {
    id: "flambe",
    title: "Live flambé station",
    caption: "",
    mediaCaption: "video · live flambé station",
    status: "Declined",
    kind: "video",
    reason:
      "open-flame cooking shown without a current fire-safety permit on file.",
    note: "Add your renewed fire-safety letter to credentials, then replace this item to resubmit.",
  },
]
