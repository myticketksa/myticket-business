import {
  ArrowSquareOutIcon,
  BellIcon,
  CheckCircleIcon,
  ListIcon,
  PlusIcon,
} from "@phosphor-icons/react"
import { Link, useLocation } from "react-router"
import { AppButton } from "@/components/primitive/app-button"
import { Avatar } from "@/components/primitive/avatar"
import { CountBadge } from "@/components/primitive/count-badge"
import { useSidebar } from "@/layouts/sidebar-context"
import { useAppSelector } from "@/store/hooks"
import type { BusinessRole } from "@/types/role"

export type TopbarKind =
  | "base"
  | "mainWebsite"
  | "editorMeta"
  | "hireRequests"
  | "hireInbox"

interface TopbarProps {
  crumb?: string
  current?: string
  kind?: TopbarKind
}

function resolveKind(
  pathname: string,
  role?: BusinessRole,
  kind?: TopbarKind,
): TopbarKind {
  if (kind) {
    return kind
  }

  if (pathname.startsWith("/app/hire-requests")) {
    return role === "talent" ? "hireInbox" : "hireRequests"
  }

  if (pathname.includes("/edit")) {
    return "editorMeta"
  }

  if (
    pathname === "/app" ||
    pathname === "/app/events" ||
    (pathname === "/app/finance" && role === "organizer")
  ) {
    return "mainWebsite"
  }

  return "base"
}

export function Topbar({
  crumb = "Business workspace",
  current = "Home",
  kind,
}: TopbarProps) {
  const user = useAppSelector((state) => state.auth.user)
  const { pathname } = useLocation()
  const { toggle } = useSidebar()
  const resolvedKind = resolveKind(pathname, user?.role, kind)
  const hideBell = pathname.startsWith("/app/notifications")
  const showArabic =
    resolvedKind !== "hireRequests" && resolvedKind !== "hireInbox"

  if (!user) {
    return null
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border-default bg-surface-canvas/92 px-base lg:px-[36px] backdrop-blur-[14px]">
      <button
        type="button"
        className="mr-xs inline-flex size-9 items-center justify-center rounded-sm text-ink-primary lg:hidden"
        aria-label="Open menu"
        onClick={toggle}
      >
        <ListIcon className="size-5" weight="bold" />
      </button>

      <p className="min-w-0 flex-1 truncate text-[13.5px] leading-normal font-normal text-ink-faint max-lg:hidden">
        <span>{crumb}</span>
        <span> / </span>
        <span className="font-semibold text-ink-primary">{current}</span>
      </p>

      {/* Mobile: show page title */}
      <p className="min-w-0 flex-1 truncate text-[15px] font-bold text-ink-primary lg:hidden">
        {current}
      </p>

      <div className="flex shrink-0 items-center gap-xs">
        {resolvedKind === "mainWebsite" ? (
          <a
            href="https://myticket.sa"
            className="hidden items-center gap-[6px] text-[13px] font-semibold text-ink-muted sm:inline-flex"
          >
            Main website
            <ArrowSquareOutIcon className="size-[15px]" />
          </a>
        ) : null}

        {resolvedKind === "editorMeta" ? (
          <p className="hidden items-center gap-2xs text-[13px] font-medium text-ink-muted sm:inline-flex">
            <CheckCircleIcon className="size-4 text-status-success" weight="fill" />
            Draft saved just now
          </p>
        ) : null}

        {resolvedKind === "hireRequests" ? (
          <AppButton size="s" icon={<PlusIcon className="size-4" weight="bold" />}>
            New request
          </AppButton>
        ) : null}

        {showArabic ? (
          <span className="font-arabic hidden rounded-[17px] border-[1.5px] border-border-default bg-surface-card px-xs py-[4px] text-[12.5px] font-bold text-ink-muted sm:inline-flex">
            العربية
          </span>
        ) : null}

        {hideBell ? null : (
          <Link
            to="/app/notifications"
            aria-label="Notifications"
            className="relative inline-flex size-9 items-center justify-center rounded-[18px] border-[1.5px] border-border-default bg-surface-card text-ink-primary"
          >
            <BellIcon className="size-[19px]" />
            <span className="absolute -top-[5.5px] left-[21.5px]">
              <CountBadge count={user.bellCount} />
            </span>
          </Link>
        )}

        <Avatar initials={user.initials} size={34} />
      </div>
    </header>
  )
}
