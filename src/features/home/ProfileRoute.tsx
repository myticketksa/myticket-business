import { ShellCanvas } from "@/app/dev/ShellCanvas"
import { OrganizerProfilePage } from "@/features/organizer/OrganizerProfilePage"
import { TalentProfilePage } from "@/features/talent/TalentProfilePage"
import { VendorProfilePage } from "@/features/vendor/VendorProfilePage"
import { useAppSelector } from "@/store/hooks"

export function ProfileRoute() {
  const role = useAppSelector((state) => state.auth.user?.role)

  if (role === "organizer") {
    return <OrganizerProfilePage />
  }

  if (role === "talent") {
    return <TalentProfilePage />
  }

  if (role === "vendor") {
    return <VendorProfilePage />
  }

  return <ShellCanvas />
}
