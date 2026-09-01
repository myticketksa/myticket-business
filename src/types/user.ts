import type { BusinessRole } from "@/types/role"

export interface AuthUser {
  id: string
  displayName: string
  initials: string
  role: BusinessRole
  roleLabel: string
  reference: string
  bellCount: string
}
