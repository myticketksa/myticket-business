import type { ReactNode } from "react"
import { Outlet, useNavigate } from "react-router"
import { useAppDispatch } from "@/store/hooks"
import { signOut } from "@/store/slices/auth"

export function EntryShell() {
  return (
    <div className="min-h-screen bg-surface-canvas">
      <Outlet />
    </div>
  )
}

interface EntryHeaderProps {
  children?: ReactNode
}

export function EntryHeader({ children }: EntryHeaderProps) {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-border-default bg-surface-card px-gutter xl:px-[160px]">
      <div className="flex items-center gap-gap-md">
        <img
          src="/brand/myticket-logo.png"
          alt="MyTicket"
          className="h-10 w-[73px] object-contain object-left"
        />
        <span className="rounded-[8px] bg-surface-inverse px-2xs py-[3px] text-[11px] font-extrabold tracking-[0.77px] text-brand-light uppercase">
          BUSINESS
        </span>
      </div>
      {children}
    </header>
  )
}

export function EntryAccountLinks() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-xl text-[13.5px] font-semibold text-ink-muted">
      <a href="https://myticket.sa">Use MyTicket as a customer</a>
      <button
        type="button"
        onClick={() => {
          dispatch(signOut())
          navigate("/auth", { replace: true })
        }}
      >
        Sign out
      </button>
    </div>
  )
}
