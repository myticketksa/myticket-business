import type { ReactNode } from "react"

interface TableColumn {
  key: string
  label: string
}

interface TableCardProps {
  search?: ReactNode
  filters?: ReactNode
  dropdowns?: ReactNode
  exportAction?: ReactNode
  columns: TableColumn[]
  children: ReactNode
}

export function TableCard({
  search,
  filters,
  dropdowns,
  exportAction,
  columns,
  children,
}: TableCardProps) {
  return (
    <section className="flex w-full max-w-[1120px] flex-col gap-sm rounded-lg border border-border-default bg-surface-card p-lg">
      <div className="flex flex-wrap items-center gap-sm">
        <div className="min-w-[240px] flex-1">{search}</div>
        {exportAction}
      </div>
      {filters ? <div className="flex flex-wrap gap-2xs">{filters}</div> : null}
      {dropdowns ? <div className="flex flex-wrap gap-2xs">{dropdowns}</div> : null}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border-subtle">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="py-2xs pr-sm text-[11.5px] font-bold text-ink-muted"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </section>
  )
}

interface TableRowProps {
  cells: ReactNode[]
}

export function TableRow({ cells }: TableRowProps) {
  return (
    <tr className="border-b border-border-subtle">
      {cells.map((cell, index) => (
        <td key={index} className="py-sm pr-sm text-body-xs text-ink-body">
          {cell}
        </td>
      ))}
    </tr>
  )
}
