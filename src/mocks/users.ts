import type { AuthUser } from "@/types/user"
import type { BusinessRole } from "@/types/role"

export const mockUsers: Record<BusinessRole, AuthUser> = {
  organizer: {
    id: "org-2481",
    displayName: "Riyadh Events Co.",
    initials: "RE",
    role: "organizer",
    roleLabel: "Organizer",
    reference: "ORG-2481",
    bellCount: "7",
  },
  talent: {
    id: "tal-0917",
    displayName: "Lina Hakim",
    initials: "LH",
    role: "talent",
    roleLabel: "Talent",
    reference: "TAL-0917",
    bellCount: "4",
  },
  vendor: {
    id: "ven-1204",
    displayName: "Layla Catering",
    initials: "LC",
    role: "vendor",
    roleLabel: "Vendor",
    reference: "VEN-1204",
    bellCount: "2",
  },
}
