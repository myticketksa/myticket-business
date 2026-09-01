import { Outlet } from "react-router"

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-canvas px-gutter py-xl">
      <Outlet />
    </div>
  )
}
