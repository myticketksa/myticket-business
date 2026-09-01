import { ShellCanvas } from "@/app/dev/ShellCanvas"
import { OrganizerHireRequestsPage } from "@/features/organizer/OrganizerHireRequestsPage"
import { TalentHireRequestsPage } from "@/features/talent/TalentHireRequestsPage"
import { VendorHireRequestsPage } from "@/features/vendor/VendorHireRequestsPage"
import { useAppSelector } from "@/store/hooks"

export function HireRequestsRoute() {
  const role = useAppSelector((state) => state.auth.user?.role)

  if (role === "organizer") {
    return <OrganizerHireRequestsPage />
  }

  if (role === "talent") {
    return <TalentHireRequestsPage />
  }

  if (role === "vendor") {
    return <VendorHireRequestsPage />
  }

  return <ShellCanvas />
}
