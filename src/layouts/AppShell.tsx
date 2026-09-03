import { Outlet, useLocation } from "react-router"
import { Sidebar } from "@/components/biz/sidebar"
import { Topbar } from "@/components/biz/topbar"
import { pageCrumbForPath, pageTitleForPath } from "@/layouts/page-title"
import { SidebarProvider } from "@/layouts/sidebar-context"
import { useAppSelector } from "@/store/hooks"
import { DevRoleSwitcher } from "@/app/dev/DevRoleSwitcher"

export function AppShell() {
  const user = useAppSelector((state) => state.auth.user)
  const { pathname } = useLocation()
  const current = user ? pageTitleForPath(pathname, user.role) : "Home"
  const crumb = pageCrumbForPath(pathname)
  const seating = pathname.includes("/seating")

  return (
    <SidebarProvider>
      <div className="flex h-dvh flex-col overflow-hidden bg-surface-canvas">
        {import.meta.env.DEV ? <DevRoleSwitcher /> : null}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2xs focus:rounded-sm focus:bg-surface-card focus:px-base focus:py-xs focus:text-body-s focus:text-ink-primary"
        >
          Skip to main content
        </a>
        <div className="flex min-h-0 flex-1">
          {seating ? null : <Sidebar />}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            {seating ? null : <Topbar crumb={crumb} current={current} />}
            <div
              id="main-content"
              tabIndex={-1}
              className={
                seating
                  ? "flex min-h-0 flex-1 flex-col overflow-hidden"
                  : "min-h-0 flex-1 overflow-auto"
              }
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
