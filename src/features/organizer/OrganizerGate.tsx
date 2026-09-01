import type { ReactNode } from "react"
import { ShellCanvas } from "@/app/dev/ShellCanvas"
import { useAppSelector } from "@/store/hooks"

interface OrganizerGateProps {
  children: ReactNode
}

export function OrganizerGate({ children }: OrganizerGateProps) {
  const role = useAppSelector((state) => state.auth.user?.role)

  if (role === "organizer") {
    return children
  }

  return <ShellCanvas />
}
