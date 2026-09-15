import { useEffect, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import logoWhite from '@/assets/logo-white.png'
import NavIcon from '@/components/NavIcon'
import { navItems } from '@/config/nav'
import { loggedOut } from '@/features/auth/authSlice'
import { useLogoutMutation } from '@/services/authApi'

const COLLAPSED_KEY = 'organizer.sidebarCollapsed'

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 rtl:-scale-x-100 ${
        collapsed ? 'rotate-180' : ''
      }`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className="shrink-0 rtl:-scale-x-100"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17l5-5-5-5M20 12H9M12 20H6a1 1 0 01-1-1V5a1 1 0 011-1h6"
      />
    </svg>
  )
}

export default function OrganizerLayout({ children }: { children: ReactNode }) {
  const { t, i18n } = useTranslation()
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [logout] = useLogoutMutation()
  const [mobileOpen, setMobileOpen] = useState(false)
  // Desktop-only: the drawer is always full width when it's open on a phone,
  // so every collapsed style below is behind `md:`. Remembered per browser so
  // the panel comes back the way it was left.
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(COLLAPSED_KEY) === '1')

  const setSidebarCollapsed = (next: boolean) => {
    setCollapsed(next)
    localStorage.setItem(COLLAPSED_KEY, next ? '1' : '0')
  }

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    try {
      await logout().unwrap()
    } catch {
      // best-effort: clear local session regardless
    }
    dispatch(loggedOut())
    navigate('/login', { replace: true })
  }

  const otherLanguage = i18n.language === 'ar' ? 'en' : 'ar'

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="fixed inset-x-0 top-0 z-30 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 active:scale-95"
        >
          <MenuIcon />
        </button>
        <span className="text-sm font-semibold text-slate-900">{t('app.name')}</span>
      </div>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="animate-fade-in-fast fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 start-0 z-50 flex w-64 flex-col bg-[#1e1e1e] text-white transition-[transform,width] duration-300 ease-out md:static md:z-auto md:translate-x-0 ${
          collapsed ? 'md:w-16' : 'md:w-60'
        } ${mobileOpen ? 'translate-x-0' : 'max-md:-translate-x-full max-md:rtl:translate-x-full'}`}
      >
        <div
          className={`flex items-center justify-between gap-3 border-b border-white/10 py-5 ps-5 pe-5 ${
            collapsed ? 'md:justify-center md:px-0' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <img src={logoWhite} alt="MyTicket" className="h-8 w-8 shrink-0" />
            <span
              className={`text-sm font-semibold tracking-wide whitespace-nowrap ${
                collapsed ? 'md:hidden' : ''
              }`}
            >
              {t('app.name')}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              title={collapsed ? t(item.labelKey) : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-150 ${
                  collapsed ? 'md:justify-center md:px-0' : ''
                } ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-sm shadow-orange-900/20'
                    : 'text-white/70 hover:translate-x-0.5 hover:bg-white/10 hover:text-white rtl:hover:-translate-x-0.5'
                }`
              }
            >
              <NavIcon name={item.icon} />
              <span className={`truncate ${collapsed ? 'md:hidden' : ''}`}>{t(item.labelKey)}</span>
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setSidebarCollapsed(!collapsed)}
          aria-expanded={!collapsed}
          aria-label={t(collapsed ? 'common.expandSidebar' : 'common.collapseSidebar')}
          title={t(collapsed ? 'common.expandSidebar' : 'common.collapseSidebar')}
          className={`mx-3 mb-2 hidden items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white md:flex ${
            collapsed ? 'md:justify-center md:px-0' : ''
          }`}
        >
          <CollapseIcon collapsed={collapsed} />
          <span className={collapsed ? 'md:hidden' : ''}>{t('common.collapseSidebar')}</span>
        </button>

        <div className={`border-t border-white/10 px-5 py-4 ${collapsed ? 'md:px-2' : ''}`}>
          <button
            type="button"
            onClick={() => i18n.changeLanguage(otherLanguage)}
            className={`mb-3 block text-sm text-white/70 transition-colors hover:text-white ${
              collapsed ? 'md:mx-auto md:mb-2' : ''
            }`}
          >
            <span className={collapsed ? 'md:hidden' : ''}>
              {t(`language.${otherLanguage === 'ar' ? 'arabic' : 'english'}`)}
            </span>
            <span className={collapsed ? 'hidden md:inline' : 'hidden'} aria-hidden="true">
              {otherLanguage === 'ar' ? 'ع' : 'EN'}
            </span>
          </button>
          <p className={`truncate text-xs text-white/60 ${collapsed ? 'md:hidden' : ''}`}>
            {user?.name ?? user?.email}
          </p>
          <button
            type="button"
            onClick={handleLogout}
            title={collapsed ? t('common.signOut') : undefined}
            className={`mt-2 flex items-center gap-2 text-sm text-orange-400 transition-colors hover:text-orange-300 ${
              collapsed ? 'md:mx-auto md:mt-0' : ''
            }`}
          >
            <span className={collapsed ? 'hidden md:inline' : 'hidden'}>
              <LogoutIcon />
            </span>
            <span className={collapsed ? 'md:hidden' : ''}>{t('common.signOut')}</span>
          </button>
        </div>
      </aside>

      {/* The pane is the query container the page breakpoints measure — see the
        * pane-* variants in index.css. Collapsing the sidebar widens it, and
        * the pages re-lay themselves out off the back of that. */}
      <main className="@container min-w-0 flex-1 overflow-x-hidden overflow-y-auto pt-14 md:pt-0">
        {children}
      </main>
    </div>
  )
}
