import { Provider } from "react-redux"
import type { ReactNode } from "react"
import { Toaster } from "@/components/ui/sonner"
import { store } from "@/store/store"

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  )
}
