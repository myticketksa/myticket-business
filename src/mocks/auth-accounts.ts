import { mockUsers } from "@/mocks/users"
import type { AuthUser } from "@/types/user"

export type AuthDestination = "welcome" | "review" | "declined"

export interface MockAuthResult {
  user: AuthUser | null
  destination: AuthDestination
}

const accounts: Record<string, MockAuthResult> = {
  "team@riyadhevents.sa": {
    user: mockUsers.organizer,
    destination: "welcome",
  },
  "lina.hakim@myticket.sa": {
    user: mockUsers.talent,
    destination: "welcome",
  },
  "hello@laylacatering.sa": {
    user: mockUsers.vendor,
    destination: "welcome",
  },
  "review@riyadhevents.sa": {
    user: null,
    destination: "review",
  },
  "declined@riyadhevents.sa": {
    user: null,
    destination: "declined",
  },
}

const destinationPath: Record<AuthDestination, string> = {
  welcome: "/welcome",
  review: "/application/review",
  declined: "/application/declined",
}

export function mockAuthForIdentifier(identifier: string): MockAuthResult | null {
  return accounts[identifier.trim().toLowerCase()] ?? null
}

export function pathForDestination(destination: AuthDestination): string {
  return destinationPath[destination]
}
