import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { SeatBlock } from '@/types/seatMap'

// Same chair silhouette the mobile app draws, so a map looks the same here.
const SEAT_PATH =
  'M30.9366 226.653C28.6265 226.653 26.3208 226.622 24.0152 226.653C22.2557 226.685 20.8275 225.968 20.3127 224.352C19.7978 222.736 19.9859 221.017 21.7409 220.068C22.7974 219.504 22.887 218.662 22.878 217.641C22.8467 215.036 22.8198 212.43 22.878 209.824C22.9497 206.811 24.1629 205.647 27.1222 205.634C29.6518 205.634 32.1813 205.634 34.7332 205.634C38.1088 205.634 39.3087 206.758 39.3893 210.142C39.452 212.672 39.4296 215.206 39.3893 217.753C39.3893 218.783 39.5549 219.544 40.5757 220.148C42.0889 221.066 42.4694 222.629 41.9188 224.258C41.3681 225.888 40.0922 226.694 38.3148 226.671C35.8479 226.631 33.3945 226.653 30.9366 226.653Z'

export function SeatGlyph({ color, size = 22 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={(size * 21.6) / 23.2} viewBox="19.5 205.4 23.2 21.6" aria-hidden>
      <path d={SEAT_PATH} fill={color} />
    </svg>
  )
}

export const TYPE_COLORS = ['#E0451A', '#2563EB', '#16A34A', '#9333EA', '#D97706', '#DB2777', '#0891B2', '#65A30D']

export interface GridCell {
  type: string
  accessible: boolean
}

export interface SeatGrid {
  rows: number
  cols: number
  cells: (GridCell | null)[][]
}

const MAX_ROWS = 40
const MAX_COLS = 60

export function rowLetter(index: number): string {
  let label = ''
  let n = index + 1
  while (n > 0) {
    const rem = (n - 1) % 26
    label = String.fromCharCode(65 + rem) + label
    n = Math.floor((n - 1) / 26)
  }
  return label
}

export function emptyGrid(rows = 8, cols = 12): SeatGrid {
  return { rows, cols, cells: Array.from({ length: rows }, () => Array.from({ length: cols }, () => null)) }
}

function resize(grid: SeatGrid, rows: number, cols: number): SeatGrid {
  return {
    rows,
    cols,
    cells: Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => grid.cells[r]?.[c] ?? null),
    ),
  }
}

export function seatCountsByType(grid: SeatGrid): Map<string, number> {
  const counts = new Map<string, number>()
  grid.cells.flat().forEach((cell) => {
    if (cell) counts.set(cell.type, (counts.get(cell.type) ?? 0) + 1)
  })
  return counts
}

/**
 * Seats are numbered left to right within each row, skipping gaps (aisles),
 * then grouped into the blocks the server takes: one per ticket type, with a
 * row entry for each unbroken run of that type.
 */
export function gridToBlocks(grid: SeatGrid): SeatBlock[] {
  const blocks = new Map<string, SeatBlock>()

  grid.cells.forEach((cells, r) => {
    const row = rowLetter(r)
    let number = 0
    let run: { type: string; start: number; count: number; accessible: number[] } | null = null

    const flush = () => {
      if (!run) return
      const block = blocks.get(run.type) ?? { ticketTypeId: Number(run.type), rows: [] }
      block.rows.push({ row, seatCount: run.count, startNumber: run.start, accessibleNumbers: run.accessible })
      blocks.set(run.type, block)
      run = null
    }

    cells.forEach((cell) => {
      if (!cell) {
        flush()
        return
      }
      number += 1
      if (!run || run.type !== cell.type) {
        flush()
        run = { type: cell.type, start: number, count: 0, accessible: [] }
      }
      run.count += 1
      if (cell.accessible) run.accessible.push(number)
    })
    flush()
  })

  return Array.from(blocks.values())
}

type Tool = { kind: 'type'; type: string } | { kind: 'erase' } | { kind: 'accessible' }

export default function SeatGridEditor({
  grid,
  onChange,
  ticketTypeOptions,
}: {
  grid: SeatGrid
  onChange: (grid: SeatGrid) => void
  ticketTypeOptions: { value: string; label: string }[]
}) {
  const { t } = useTranslation()
  const [tool, setTool] = useState<Tool>({ kind: 'type', type: ticketTypeOptions[0]?.value ?? '' })
  const painting = useRef<{ accessible: boolean } | null>(null)

  const colorOf = (type: string) => {
    const index = ticketTypeOptions.findIndex((option) => option.value === type)
    return TYPE_COLORS[(index < 0 ? 0 : index) % TYPE_COLORS.length]
  }

  // Keep the chosen type valid as ticket types are added or removed.
  useEffect(() => {
    if (tool.kind === 'type' && !ticketTypeOptions.some((o) => o.value === tool.type) && ticketTypeOptions[0]) {
      setTool({ kind: 'type', type: ticketTypeOptions[0].value })
    }
  }, [ticketTypeOptions, tool])

  useEffect(() => {
    const stop = () => (painting.current = null)
    window.addEventListener('mouseup', stop)
    return () => window.removeEventListener('mouseup', stop)
  }, [])

  const apply = (cells: SeatGrid['cells'], r: number, c: number, accessibleTarget: boolean) => {
    const cell = cells[r][c]
    if (tool.kind === 'erase') cells[r][c] = null
    else if (tool.kind === 'type') cells[r][c] = { type: tool.type, accessible: cell?.accessible ?? false }
    else if (cell) cells[r][c] = { ...cell, accessible: accessibleTarget }
  }

  const paint = (r: number, c: number, accessibleTarget: boolean) => {
    if (tool.kind === 'type' && !tool.type) return
    const cells = grid.cells.map((row) => [...row])
    apply(cells, r, c, accessibleTarget)
    onChange({ ...grid, cells })
  }

  const paintRow = (r: number) => {
    const cells = grid.cells.map((row) => [...row])
    const target = tool.kind === 'accessible' ? !cells[r].every((cell) => !cell || cell.accessible) : false
    cells[r].forEach((_, c) => apply(cells, r, c, target))
    onChange({ ...grid, cells })
  }

  const startPaint = (r: number, c: number) => {
    // A wheelchair drag sets every seat it crosses the same way as the first.
    const target = tool.kind === 'accessible' ? !grid.cells[r][c]?.accessible : false
    painting.current = { accessible: target }
    paint(r, c, target)
  }

  const fillAll = () => {
    if (tool.kind !== 'type' || !tool.type) return
    onChange({
      ...grid,
      cells: grid.cells.map((row) => row.map((cell) => ({ type: tool.type, accessible: cell?.accessible ?? false }))),
    })
  }

  const counts = seatCountsByType(grid)
  const total = Array.from(counts.values()).reduce((sum, n) => sum + n, 0)
  const setSize = (rows: number, cols: number) =>
    onChange(resize(grid, Math.min(Math.max(rows, 1), MAX_ROWS), Math.min(Math.max(cols, 1), MAX_COLS)))

  const toolButton = (active: boolean) =>
    `flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
      active ? 'border-orange-500 bg-orange-50 text-slate-900' : 'border-slate-300 text-slate-700 hover:bg-slate-50'
    }`

  return (
    <div className="select-none">
      <div className="mb-4 flex flex-wrap items-end gap-4">
        <label className="text-xs font-medium text-slate-700">
          {t('events.seatGrid.rows')}
          <input
            type="number"
            min={1}
            max={MAX_ROWS}
            value={grid.rows}
            onChange={(e) => setSize(Number(e.target.value) || 1, grid.cols)}
            className="mt-1 block w-24 rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <label className="text-xs font-medium text-slate-700">
          {t('events.seatGrid.seatsPerRow')}
          <input
            type="number"
            min={1}
            max={MAX_COLS}
            value={grid.cols}
            onChange={(e) => setSize(grid.rows, Number(e.target.value) || 1)}
            className="mt-1 block w-24 rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>
        <button type="button" onClick={fillAll} className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
          {t('events.seatGrid.fillAll')}
        </button>
        <button
          type="button"
          onClick={() => onChange(emptyGrid(grid.rows, grid.cols))}
          className="rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          {t('events.seatGrid.clearAll')}
        </button>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {ticketTypeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setTool({ kind: 'type', type: option.value })}
            className={toolButton(tool.kind === 'type' && tool.type === option.value)}
          >
            <SeatGlyph color={colorOf(option.value)} size={16} />
            {option.label}
            <span className="text-slate-400">{counts.get(option.value) ?? 0}</span>
          </button>
        ))}
        <button type="button" onClick={() => setTool({ kind: 'accessible' })} className={toolButton(tool.kind === 'accessible')}>
          <span aria-hidden>♿</span>
          {t('events.seatGrid.accessibleTool')}
        </button>
        <button type="button" onClick={() => setTool({ kind: 'erase' })} className={toolButton(tool.kind === 'erase')}>
          <span className="inline-block h-3.5 w-3.5 rounded border border-dashed border-slate-400" />
          {t('events.seatGrid.aisleTool')}
        </button>
      </div>
      <p className="mb-3 text-xs text-slate-500">{t('events.seatGrid.hint')}</p>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="mx-auto w-max">
          <div className="mx-auto mb-5 w-2/3 rounded-b-3xl bg-slate-800 py-1.5 text-center text-[11px] font-semibold uppercase tracking-widest text-white">
            {t('events.seatGrid.stage')}
          </div>
          {grid.cells.map((row, r) => {
            let number = 0
            return (
              <div key={r} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => paintRow(r)}
                  title={t('events.seatGrid.paintRow')}
                  className="w-7 shrink-0 text-center text-[11px] font-semibold text-slate-500 hover:text-orange-600"
                >
                  {rowLetter(r)}
                </button>
                {row.map((cell, c) => {
                  if (cell) number += 1
                  return (
                    <button
                      key={c}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        startPaint(r, c)
                      }}
                      onMouseEnter={() => painting.current && paint(r, c, painting.current.accessible)}
                      className="relative flex h-8 w-7 flex-col items-center justify-center"
                      title={cell ? `${rowLetter(r)}-${number}` : ''}
                    >
                      {cell ? (
                        <>
                          <span className="text-[8px] leading-none text-slate-400">{number}</span>
                          <SeatGlyph color={colorOf(cell.type)} size={20} />
                          {cell.accessible && <span className="absolute -right-0.5 -top-0.5 text-[10px]">♿</span>}
                        </>
                      ) : (
                        <span className="h-4 w-4 rounded border border-dashed border-slate-300" />
                      )}
                    </button>
                  )
                })}
                <span className="w-7 shrink-0 text-center text-[11px] font-semibold text-slate-400">{rowLetter(r)}</span>
              </div>
            )
          })}
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-500">{t('events.seatGrid.total', { count: total })}</p>
    </div>
  )
}
