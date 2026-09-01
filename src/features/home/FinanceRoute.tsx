import { ShellCanvas } from "@/app/dev/ShellCanvas"
import { OrganizerFinancePage } from "@/features/organizer/OrganizerFinancePage"
import { TalentFinancePage } from "@/features/talent/TalentFinancePage"
import { VendorFinancePage } from "@/features/vendor/VendorFinancePage"
import { useAppSelector } from "@/store/hooks"

export function FinanceRoute() {
  const role = useAppSelector((state) => state.auth.user?.role)

  if (role === "organizer") {
    return <OrganizerFinancePage />
  }

  if (role === "talent") {
    return <TalentFinancePage />
  }

  if (role === "vendor") {
    return <VendorFinancePage />
  }

  return <ShellCanvas />
}
