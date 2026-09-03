import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { CaretUpDownIcon, XIcon } from "@phosphor-icons/react"
import { NavItem } from "@/components/biz/nav-item"
import { Avatar } from "@/components/primitive/avatar"
import { navForRole } from "@/layouts/nav-config"
import { useSidebar } from "@/layouts/sidebar-context"
import { mockUsers } from "@/mocks/users"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setUser } from "@/store/slices/auth"
import type { AuthUser } from "@/types/user"

const switcherAccounts: AuthUser[] = [
  mockUsers.organizer,
  mockUsers.talent,
  mockUsers.vendor,
]

export function Sidebar() {
  const user = useAppSelector((state) => state.auth.user)
  const { open, setOpen } = useSidebar()

  if (!user) {
    return null
  }

  const groups = navForRole(user.role)

  return (
    <>
      {/* Mobile backdrop */}
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={cn(
          "flex h-full w-[248px] shrink-0 flex-col border-r border-border-default bg-surface-card",
          // Mobile: fixed drawer
          "fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
      <div className="flex items-center gap-gap-md border-b border-border-subtle px-lg pb-base pt-lg">
        <img
          src="/brand/myticket-logo.png"
          alt="MyTicket"
          className="h-[30px] w-[54.75px] object-contain object-left"
        />
        <span className="rounded-[8px] bg-surface-inverse px-2xs py-[3px] text-[11px] font-extrabold tracking-[0.77px] text-brand-light uppercase">
          Business
        </span>
        <button
          type="button"
          className="ml-auto inline-flex size-8 items-center justify-center rounded-sm text-ink-muted lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <XIcon className="size-5" />
        </button>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col gap-[2px] overflow-y-auto px-xs py-[10px]">
        {groups.map((group, groupIndex) => (
          <section
            key={group.heading || `ungrouped-${groupIndex}`}
            className="flex flex-col gap-[2px]"
          >
            {group.heading ? (
              <p className="px-xs pt-sm pb-[5px] text-tag-s tracking-[0.88px] text-ink-placeholder uppercase">
                {group.heading}
              </p>
            ) : null}
            {group.items.map((item) => (
              <NavItem
                key={`${group.heading || "root"}-${item.label}`}
                item={item}
              />
            ))}
          </section>
        ))}
      </nav>

      <SidebarAccount user={user} />
    </aside>
    </>
  )
}

function SidebarAccount({ user }: { user: AuthUser }) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    function handlePointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handlePointer)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handlePointer)
      document.removeEventListener("keydown", handleKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative shrink-0">
      {open ? (
        <div
          role="listbox"
          aria-label="Switch account"
          className="absolute inset-x-0 bottom-full z-20 overflow-hidden border border-b-0 border-border-subtle bg-surface-card shadow-dropdown"
        >
          {switcherAccounts.map((account) => {
            const selected = account.role === user.role

            return (
              <button
                key={account.id}
                type="button"
                role="option"
                aria-selected={selected}
                className={cn(
                  "flex w-full items-center gap-gap-md px-base py-sm text-left",
                  selected
                    ? "bg-surface-brand-wash"
                    : "hover:bg-surface-tint",
                )}
                onClick={() => {
                  dispatch(setUser(account))
                  setOpen(false)
                  void navigate("/app")
                }}
              >
                <AccountIdentity user={account} />
              </button>
            )
          })}
        </div>
      ) : null}

      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full items-center gap-gap-md border-t border-border-subtle px-base py-sm text-left"
        onClick={() => {
          setOpen((current) => !current)
        }}
      >
        <AccountIdentity user={user} />
        <CaretUpDownIcon className="size-[15px] shrink-0 text-ink-faint" />
      </button>
    </div>
  )
}

function AccountIdentity({ user }: { user: AuthUser }) {
  return (
    <>
      <Avatar initials={user.initials} size={38} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13.5px] font-bold leading-normal text-ink-primary">
          {user.displayName}
        </span>
        <span className="block truncate text-[12px] font-normal leading-normal text-ink-faint">
          {user.roleLabel} · {user.reference}
        </span>
      </span>
    </>
  )
}
