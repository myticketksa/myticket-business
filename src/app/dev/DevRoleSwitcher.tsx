import { mockUsers } from "@/mocks/users"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setUser } from "@/store/slices/auth"
import type { BusinessRole } from "@/types/role"

const roles: BusinessRole[] = ["organizer", "talent", "vendor"]

export function DevRoleSwitcher() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  return (
    <div className="flex items-center gap-sm border-b border-border-default bg-surface-card px-gutter py-3xs">
      <p className="text-eyebrow text-brand-link">Dev role</p>
      {roles.map((role) => (
        <button
          key={role}
          type="button"
          className="text-action-xs text-brand-link"
          aria-pressed={user?.role === role}
          onClick={() => {
            dispatch(setUser(mockUsers[role]))
          }}
        >
          {role}
        </button>
      ))}
    </div>
  )
}
