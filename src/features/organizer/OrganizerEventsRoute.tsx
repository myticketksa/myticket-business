import { ShellCanvas } from "@/app/dev/ShellCanvas"
import { OrganizerEventsPage } from "@/features/organizer/OrganizerEventsPage"
import { useAppSelector } from "@/store/hooks"

export function OrganizerEventsRoute() {
  const role = useAppSelector((state) => state.auth.user?.role)

  if (role === "organizer") {
    return <OrganizerEventsPage />
  }

  return <ShellCanvas />
}
