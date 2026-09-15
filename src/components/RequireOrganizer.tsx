import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'

export default function RequireOrganizer({ children }: { children: ReactNode }) {
  const user = useAppSelector((state) => state.auth.user)

  if (!user || user.role !== 'organizer') {
    return <Navigate to="/login" replace />
  }

  return children
}
