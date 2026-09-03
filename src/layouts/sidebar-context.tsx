import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { useLocation } from "react-router"

interface SidebarState {
  open: boolean
  setOpen: (value: boolean) => void
  toggle: () => void
}

const SidebarContext = createContext<SidebarState>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
})

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close drawer on navigation
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const toggle = useCallback(() => setOpen((prev) => !prev), [])

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}
