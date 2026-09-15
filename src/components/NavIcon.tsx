import type { NavIconName } from '@/config/nav'

// One stroke path set per sidebar entry. These only really earn their keep in
// the collapsed rail, where the label is gone and the icon is the whole
// affordance — but they show in the expanded sidebar too so the two states
// read as the same list rather than two different menus.
const paths: Record<NavIconName, string[]> = {
  dashboard: ['M4 4h6v7H4z', 'M14 4h6v4h-6z', 'M14 12h6v8h-6z', 'M4 15h6v5H4z'],
  events: ['M4 6h16v14H4z', 'M4 10h16', 'M9 3v4', 'M15 3v4'],
  cashiers: ['M3 6h18v12H3z', 'M3 10h18', 'M7 14h4'],
  reports: ['M4 20h16', 'M7 20v-7', 'M12 20V6', 'M17 20v-10'],
  payout: ['M3 7h18v10H3z', 'M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z', 'M6.5 12h.01', 'M17.5 12h.01'],
}

export default function NavIcon({ name }: { name: NavIconName }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
