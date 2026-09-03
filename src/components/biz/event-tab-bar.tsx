import { NavLink } from "react-router"
import { cn } from "@/lib/utils"

export type EventTabId =
  | "edit"
  | "orders"
  | "tickets"
  | "refunds"
  | "notify"
  | "liveDoor"

export interface EventTab {
  id: EventTabId
  label: string
  path: string
  count?: string
}

const defaultTabs: EventTab[] = [
  { id: "edit", label: "Edit event", path: "edit" },
  { id: "orders", label: "Orders", path: "orders" },
  { id: "tickets", label: "Tickets issued", path: "tickets" },
  { id: "refunds", label: "Refund requests", path: "refunds" },
  { id: "notify", label: "Notify holders", path: "notify" },
  { id: "liveDoor", label: "Live door", path: "live-door" },
]

interface EventTabBarProps {
  tabs?: EventTab[]
  showCounts?: boolean
  activeId?: EventTabId
}

export function EventTabBar({
  tabs = defaultTabs,
  showCounts = true,
  activeId,
}: EventTabBarProps) {
  return (
    <nav className="-mx-base overflow-x-auto px-base sm:mx-0 sm:px-0">
      <div className="flex min-w-max gap-sm sm:gap-lg border-b border-border-default">
      {tabs.map((tab) => (
        <NavLink
          key={tab.id}
          to={tab.path}
          className={({ isActive }) =>
            cn(
              "-mb-px border-b-2 pb-2xs text-action-s",
              (activeId ? tab.id === activeId : isActive)
                ? "border-brand-primary text-brand-link"
                : "border-transparent text-ink-muted",
            )
          }
        >
          {tab.label}
          {showCounts && tab.count ? (
            <span className="text-ink-faint"> · {tab.count}</span>
          ) : null}
        </NavLink>
      ))}
      </div>
    </nav>
  )
}
