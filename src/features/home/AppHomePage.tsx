import { ShellCanvas } from "@/app/dev/ShellCanvas"
import { OrganizerHomePage } from "@/features/organizer/OrganizerHomePage"
import { TalentHomePage } from "@/features/talent/TalentHomePage"
import { VendorHomePage } from "@/features/vendor/VendorHomePage"
import { useAppSelector } from "@/store/hooks"

export function AppHomePage() {
  const role = useAppSelector((state) => state.auth.user?.role)

  if (role === "organizer") {
    return <OrganizerHomePage />
  }

  if (role === "talent") {
    return <TalentHomePage />
  }

  if (role === "vendor") {
    return <VendorHomePage />
  }

  return <ShellCanvas />
}
