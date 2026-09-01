export interface WelcomeTask {
  id: string
  title: string
  body: string
  action: string
  href: string
  done?: boolean
}

export interface WelcomeCopy {
  workspaceKind: string
  profilePath: string
  subLine: string
  tasks: WelcomeTask[]
}

export const welcomeNote = {
  lead: "This list stays on your home page until it's complete, then disappears.",
  body: "Talents see portfolio + categories + availability here; vendors see gallery + services + coverage.",
}

export const organizerWelcome: WelcomeCopy = {
  workspaceKind: "organizer workspace",
  profilePath: "myticket.sa/o/riyadh-events",
  subLine: "four things will get your first event selling fastest:",
  tasks: [
    {
      id: "profile",
      title: "Complete your public profile",
      body: "Logo, biography and links — done during your application.",
      action: "Review",
      href: "/app/profile",
      done: true,
    },
    {
      id: "venue",
      title: "Add your first venue",
      body: "Save the address, capacity and map position once — reuse it in every event.",
      action: "Add venue",
      href: "/app/venues",
    },
    {
      id: "event",
      title: "Create your first event",
      body: "Nine areas, any order, save as you go. Submit for review when it's ready.",
      action: "Create event",
      href: "/app/events/new/edit",
    },
    {
      id: "bank",
      title: "Add bank details for payouts",
      body: "Payouts can't release without a verified account — verification takes 1–2 days, so do it early.",
      action: "Add bank account",
      href: "/app/finance",
    },
  ],
}

export const talentWelcome: WelcomeCopy = {
  workspaceKind: "talent workspace",
  profilePath: "myticket.sa/t/lina-hakim",
  subLine: "four things will get you booked fastest:",
  tasks: [
    {
      id: "profile",
      title: "Complete your public profile",
      body: "Logo, biography and links — done during your application.",
      action: "Review",
      href: "/app/profile",
      done: true,
    },
    {
      id: "portfolio",
      title: "Complete your portfolio",
      body: "Add images, video or audio — organizers hire from what they can see and hear before they message you.",
      action: "Add portfolio",
      href: "/app/portfolio",
    },
    {
      id: "categories",
      title: "Set your performance categories",
      body: "Every category you perform in helps the marketplace surface you to the right search — add all that fit.",
      action: "Set categories",
      href: "/app/profile",
    },
    {
      id: "availability",
      title: "Set your availability",
      body: "Show whether you're available or reserved, so organizers know before they ask.",
      action: "Set availability",
      href: "/app/availability",
    },
  ],
}

export const vendorWelcome: WelcomeCopy = {
  workspaceKind: "vendor workspace",
  profilePath: "myticket.sa/v/layla-catering",
  subLine: "four things will get you hired fastest:",
  tasks: [
    {
      id: "profile",
      title: "Complete your public profile",
      body: "Logo, biography and links — done during your application.",
      action: "Review",
      href: "/app/profile",
      done: true,
    },
    {
      id: "gallery",
      title: "Complete your gallery",
      body: "Add photos of your work — organizers hire from what they can see.",
      action: "Add gallery",
      href: "/app/gallery",
    },
    {
      id: "services",
      title: "Confirm your services & coverage",
      body: "Set your service categories and the area you cover, so the right organizers can find you.",
      action: "Set services",
      href: "/app/profile",
    },
    {
      id: "availability",
      title: "Set your availability",
      body: "Show whether you're available or reserved, so organizers know before they ask.",
      action: "Set availability",
      href: "/app/availability",
    },
  ],
}

export const organizerWelcomeTasks = organizerWelcome.tasks.map((task) => ({
  id: task.id,
  label: task.title,
}))
