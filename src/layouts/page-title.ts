import { navForRole } from "@/layouts/nav-config"
import type { BusinessRole } from "@/types/role"

export function pageCrumbForPath(pathname: string): string {
  if (pathname.startsWith("/app/marketplace/") && pathname !== "/app/marketplace") {
    return "Marketplace / Talents"
  }

  if (pathname.includes("/scan-history")) {
    return "Live door"
  }

  return "Business workspace"
}

export function pageTitleForPath(pathname: string, role: BusinessRole): string {
  const groups = navForRole(role)

  for (const group of groups) {
    for (const item of group.items) {
      if (item.path === pathname) {
        return item.label
      }
    }
  }

  if (pathname.startsWith("/app/marketplace/") && pathname !== "/app/marketplace") {
    return "Lina Hakim"
  }

  if (pathname.startsWith("/app/notifications")) {
    return "Notifications"
  }

  if (pathname.startsWith("/app/support/")) {
    return "Support"
  }

  if (pathname.includes("/edit")) {
    return "Edit event"
  }

  if (pathname.includes("/orders")) {
    return "Orders"
  }

  if (pathname.includes("/tickets")) {
    return "Tickets issued"
  }

  if (pathname.includes("/refunds")) {
    return "Refund requests"
  }

  if (pathname.includes("/notify")) {
    return "Notify holders"
  }

  if (pathname.includes("/seating")) {
    return "Seating"
  }

  if (pathname.includes("/scan-history")) {
    return "Scan history"
  }

  if (pathname.includes("/live-door")) {
    return "Live door"
  }

  return "Home"
}
