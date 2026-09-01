import { ShellCanvas } from "@/app/dev/ShellCanvas"
import { TalentAvailabilityPage } from "@/features/talent/TalentAvailabilityPage"
import { VendorAvailabilityPage } from "@/features/vendor/VendorAvailabilityPage"
import { useAppSelector } from "@/store/hooks"

export function AvailabilityRoute() {
  const role = useAppSelector((state) => state.auth.user?.role)

  if (role === "talent") {
    return <TalentAvailabilityPage />
  }

  if (role === "vendor") {
    return <VendorAvailabilityPage />
  }

  return <ShellCanvas />
}
