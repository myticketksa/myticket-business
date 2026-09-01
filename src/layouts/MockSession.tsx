import { useEffect, type ReactNode } from "react"
import { mockUsers } from "@/mocks/users"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setUser } from "@/store/slices/auth"

interface MockSessionProps {
  children: ReactNode
}

export function MockSession({ children }: MockSessionProps) {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    if (!user) {
      dispatch(setUser(mockUsers.organizer))
    }
  }, [dispatch, user])

  return children
}
