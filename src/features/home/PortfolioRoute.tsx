import { ShellCanvas } from "@/app/dev/ShellCanvas"
import { TalentPortfolioPage } from "@/features/talent/TalentPortfolioPage"
import { useAppSelector } from "@/store/hooks"

export function PortfolioRoute() {
  const role = useAppSelector((state) => state.auth.user?.role)

  if (role === "talent") {
    return <TalentPortfolioPage />
  }

  return <ShellCanvas />
}
