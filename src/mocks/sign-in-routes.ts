export interface SignInRouteCard {
  id: string
  title: string
  body: string
  tone: "success" | "muted" | "brand" | "danger"
  link?: { label: string; href: string }
}

export const signInRoutesIntro = {
  eyebrow: "Where sign-in can lead",
  title: "Every account state has a destination — never a dead end.",
}

export const signInRoutes: SignInRouteCard[] = [
  {
    id: "approved",
    title: "Approved business account",
    body: "Straight to your role’s home — organizer, talent or vendor.",
    tone: "success",
    link: { label: "Organizer Home", href: "/app" },
  },
  {
    id: "2fa",
    title: "Two-step verification on",
    body: "A code from your authenticator app is asked for after the password.",
    tone: "muted",
  },
  {
    id: "review",
    title: "Application still under review",
    body: "You land on the review page — read your submission, contact support, or use the main site meanwhile.",
    tone: "brand",
    link: { label: "Application Under Review", href: "/application/review" },
  },
  {
    id: "declined",
    title: "Application declined",
    body: "You land on the decline page with the reviewer’s reason first and your submission open for editing.",
    tone: "danger",
    link: { label: "Application Declined", href: "/application/declined" },
  },
  {
    id: "no-role",
    title: "No business role on this account",
    body: "You’re sent to the main website with an explanation and a route to apply.",
    tone: "muted",
  },
  {
    id: "suspended",
    title: "Account suspended",
    body: "The reason is shown with a direct route to support — never a bare refusal.",
    tone: "danger",
  },
]
