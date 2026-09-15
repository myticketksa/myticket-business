import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Crumb {
  label: string
  path?: string
}

export default function PageHeader({
  crumbs,
  title,
  action,
}: {
  crumbs: Crumb[]
  title: string
  action?: ReactNode
}) {
  return (
    <div className="animate-fade-in mb-6 flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-5 pane-sm:flex-row pane-sm:items-center pane-sm:justify-between pane-sm:px-8 pane-sm:py-6">
      <div>
        <nav className="mb-1 text-xs text-slate-400">
          {crumbs.map((crumb, index) => (
            <span key={crumb.label}>
              {index > 0 && <span className="mx-1">/</span>}
              {crumb.path ? (
                <Link to={crumb.path} className="transition-colors hover:text-orange-500">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-xl font-semibold text-slate-900 pane-sm:text-2xl">{title}</h1>
      </div>
      {action}
    </div>
  )
}
