export type NavIconName = 'dashboard' | 'events' | 'cashiers' | 'reports' | 'payout'

export interface NavItem {
  labelKey: string
  path: string
  // Top-level entries always carry one — it is all you get to go on once the
  // sidebar is collapsed to a rail.
  icon: NavIconName
}

export const navItems: NavItem[] = [
  { labelKey: 'common.dashboard', path: '/', icon: 'dashboard' },
  { labelKey: 'common.events', path: '/events', icon: 'events' },
  { labelKey: 'common.cashiers', path: '/cashiers', icon: 'cashiers' },
  { labelKey: 'common.payout', path: '/payout', icon: 'payout' },
  { labelKey: 'common.reports', path: '/reports', icon: 'reports' },
]
