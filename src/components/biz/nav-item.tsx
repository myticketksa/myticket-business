import { NavLink, useLocation } from "react-router"
import { NavCount } from "@/components/biz/nav-count"
import { NavIcon } from "@/components/biz/nav-icon"
import type { NavItemConfig } from "@/layouts/nav-config"
import { cn } from "@/lib/utils"

interface NavItemProps {
  item: NavItemConfig
}

export function NavItem({ item }: NavItemProps) {
  const { pathname } = useLocation()
  const relatedActive =
    item.path === "/app/live-door" && pathname.includes("/scan-history")

  return (
    <NavLink
      to={item.path}
      end={item.path === "/app"}
      className={({ isActive }) =>
        cn(
          "flex h-10 items-center gap-[11px] rounded-sm px-xs text-[14px]",
          isActive || relatedActive
            ? "bg-surface-brand-wash font-bold text-accent-amber"
            : "font-semibold text-ink-primary hover:bg-surface-tint",
        )
      }
    >
      {({ isActive }) => {
        const active = isActive || relatedActive

        return (
          <>
            {item.icon ? (
              <NavIcon
                name={item.icon}
                active={active}
                className="size-[19px] shrink-0"
              />
            ) : (
              <span className="size-[19px] shrink-0" />
            )}
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {item.count && !active ? (
              <NavCount count={item.count} tone={item.countTone} />
            ) : null}
          </>
        )
      }}
    </NavLink>
  )
}
