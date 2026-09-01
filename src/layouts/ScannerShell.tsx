import { Outlet } from "react-router"

export function ScannerShell() {
  return (
    <div className="flex min-h-screen justify-center bg-surface-inverse">
      <div className="flex min-h-screen w-[390px] flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
