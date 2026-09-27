import { memo, useEffect, useRef, useState } from 'react'
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
}

/** `accessible`: the ticket type for guests with disabilities — its seats are the accessible ones. */
export interface TicketTypeOption {
  value: string
  label: string
  accessible?: boolean
}

export interface SeatGrid {
  rows: number
  cols: number
  cells: (GridCell | null)[][]
}

const MAX_ROWS = 100
const MAX_COLS = 100
const ZOOM = { small: 12, medium: 18, large: 24 } as const
type Zoom = keyof typeof ZOOM

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

export function emptyGrid(rows = 10, cols = 20): SeatGrid {
  return { rows, cols, cells: Array.from({ length: rows }, () => Array.from({ length: cols }, () => null)) }
}

function resize(grid: SeatGrid, rows: number, cols: number): SeatGrid {
  return {
    rows,
    cols,
    cells: Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => grid.cells[r]?.[c] ?? null)),
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
    let run: { type: string; start: number; count: number } | null = null

    const flush = () => {
      if (!run) return
      const block = blocks.get(run.type) ?? { ticketTypeId: Number(run.type), rows: [] }
      block.rows.push({ row, seatCount: run.count, startNumber: run.start })
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
        run = { type: cell.type, start: number, count: 0 }
      }
      run.count += 1
    })
    flush()
  })

  return Array.from(blocks.values())
}

type Paint = { kind: 'type'; type: string } | { kind: 'erase' }
type Shape = 'rect' | 'brush'
type Point = { r: number; c: number }

const Cell = memo(function Cell({
  r,
  c,
  color,
  accessible,
  highlighted,
  size,
  onDown,
  onEnter,
}: {
  r: number
  c: number
  color: string | null
  accessible: boolean
  highlighted: boolean
  size: number
  onDown: (r: number, c: number) => void
  onEnter: (r: number, c: number) => void
}) {
  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault()
        onDown(r, c)
      }}
      onMouseEnter={() => onEnter(r, c)}
      style={{ width: size + 4, height: size + 4 }}
      className={`relative flex shrink-0 cursor-crosshair items-center justify-center ${highlighted ? 'bg-orange-200' : ''}`}
    >
      {color ? (
        <>
          <SeatGlyph color={color} size={size} />
          {accessible && size >= ZOOM.medium && <span className="absolute -right-0.5 -top-1 text-[9px]">♿</span>}
        </>
      ) : (
        <span className="rounded-sm border border-dashed border-slate-300" style={{ width: size * 0.6, height: size * 0.6 }} />
      )}
    </div>
  )
})

export default function SeatGridEditor({
  grid,
  onChange,
  ticketTypeOptions,
}: {
  grid: SeatGrid
  onChange: (grid: SeatGrid) => void
  ticketTypeOptions: TicketTypeOption[]
}) {
  const { t } = useTranslation()
  const [paintWith, setPaintWith] = useState<Paint>({ kind: 'type', type: ticketTypeOptions[0]?.value ?? '' })
  const [shape, setShape] = useState<Shape>('rect')
  const [zoom, setZoom] = useState<Zoom>(grid.rows * grid.cols > 1500 ? 'small' : 'medium')
  const [drag, setDrag] = useState<{ from: Point; to: Point } | null>(null)
  const [rangeFrom, setRangeFrom] = useState(0)
  const [rangeTo, setRangeTo] = useState(0)
  const [sizeDraft, setSizeDraft] = useState({ rows: String(grid.rows), cols: String(grid.cols) })

  // Refs so the window-level mouseup (and memoised cells) see current values.
  const latest = useRef({ grid, onChange, paintWith, shape, drag })
  latest.current = { grid, onChange, paintWith, shape, drag }
  const brushing = useRef(false)

  const cellSize = ZOOM[zoom]
  const colorIndex = new Map(ticketTypeOptions.map((option, index) => [option.value, TYPE_COLORS[index % TYPE_COLORS.length]]))
  const accessibleTypes = new Set(ticketTypeOptions.filter((o) => o.accessible).map((o) => o.value))

  // Keep the chosen type valid as ticket types are added or removed.
  useEffect(() => {
    if (paintWith.kind === 'type' && !ticketTypeOptions.some((o) => o.value === paintWith.type) && ticketTypeOptions[0]) {
      setPaintWith({ kind: 'type', type: ticketTypeOptions[0].value })
    }
  }, [ticketTypeOptions, paintWith])

  useEffect(() => setSizeDraft({ rows: String(grid.rows), cols: String(grid.cols) }), [grid.rows, grid.cols])

  const canPaint = (p: Paint) => p.kind === 'erase' || Boolean(p.type)
  const valueFor = (p: Paint): GridCell | null => (p.kind === 'erase' ? null : { type: p.type })

  /** Applies the current paint to every cell `inside` accepts. */
  const applyWhere = (inside: (r: number, c: number) => boolean) => {
    const { grid: g, onChange: change, paintWith: p } = latest.current
    if (!canPaint(p)) return
    const value = valueFor(p)
    change({ ...g, cells: g.cells.map((row, r) => row.map((cell, c) => (inside(r, c) ? value : cell))) })
  }

  useEffect(() => {
    const finish = () => {
      brushing.current = false
      const current = latest.current.drag
      if (!current) return
      const [r1, r2] = [Math.min(current.from.r, current.to.r), Math.max(current.from.r, current.to.r)]
      const [c1, c2] = [Math.min(current.from.c, current.to.c), Math.max(current.from.c, current.to.c)]
      applyWhere((r, c) => r >= r1 && r <= r2 && c >= c1 && c <= c2)
      setDrag(null)
    }
    window.addEventListener('mouseup', finish)
    return () => window.removeEventListener('mouseup', finish)
    // applyWhere reads everything through `latest`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDown = useRef((r: number, c: number) => {
    if (latest.current.shape === 'rect') {
      setDrag({ from: { r, c }, to: { r, c } })
    } else {
      brushing.current = true
      applyWhere((rr, cc) => rr === r && cc === c)
    }
  }).current

  const onEnter = useRef((r: number, c: number) => {
    if (latest.current.shape === 'rect') {
      setDrag((d) => (d ? { ...d, to: { r, c } } : d))
    } else if (brushing.current) {
      applyWhere((rr, cc) => rr === r && cc === c)
    }
  }).current

  const inDrag = (r: number, c: number) =>
    drag !== null &&
    r >= Math.min(drag.from.r, drag.to.r) &&
    r <= Math.max(drag.from.r, drag.to.r) &&
    c >= Math.min(drag.from.c, drag.to.c) &&
    c <= Math.max(drag.from.c, drag.to.c)

  const commitSize = () => {
    const rows = Math.min(Math.max(Number(sizeDraft.rows) || 1, 1), MAX_ROWS)
    const cols = Math.min(Math.max(Number(sizeDraft.cols) || 1, 1), MAX_COLS)
    setRangeFrom((v) => Math.min(v, rows - 1))
    setRangeTo((v) => Math.min(v, rows - 1))
    onChange(resize(grid, rows, cols))
  }

  const counts = seatCountsByType(grid)
  const total = Array.from(counts.values()).reduce((sum, n) => sum + n, 0)
  const rowOptions = Array.from({ length: grid.rows }, (_, r) => rowLetter(r))

  const chip = (active: boolean) =>
    `flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
      active ? 'border-orange-500 bg-orange-50 text-slate-900' : 'border-slate-300 text-slate-700 hover:bg-slate-50'
    }`
  const smallButton = 'rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50'

  return (
    <div className="select-none space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-xs font-medium text-slate-700">
          {t('events.seatGrid.rows')}
          <input
            type="number"
            min={1}
            max={MAX_ROWS}
            value={sizeDraft.rows}
            onChange={(e) => setSizeDraft((s) => ({ ...s, rows: e.target.value }))}
            onBlur={commitSize}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), commitSize())}
            className="mt-1 block w-20 rounded-md border border-slate-300 px-3 py-1.5 text-sm"
          />
        </label>
        <label className="text-xs font-medium text-slate-700">
          {t('events.seatGrid.seatsPerRow')}
          <input
            type="number"
            min={1}
            max={MAX_COLS}
            value={sizeDraft.cols}
            onChange={(e) => setSizeDraft((s) => ({ ...s, cols: e.target.value }))}
            onBlur={commitSize}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), commitSize())}
            className="mt-1 block w-20 rounded-md border border-slate-300 px-3 py-1.5 text-sm"
          />
        </label>
        <span className="pb-2 text-xs text-slate-400">{t('events.seatGrid.maxSize', { rows: MAX_ROWS, cols: MAX_COLS })}</span>
        <div className="ms-auto flex items-center gap-1 pb-0.5">
          <span className="me-1 text-xs text-slate-500">{t('events.seatGrid.zoom')}</span>
          {(Object.keys(ZOOM) as Zoom[]).map((z) => (
            <button key={z} type="button" onClick={() => setZoom(z)} className={chip(zoom === z)}>
              {t(`events.seatGrid.zoom_${z}`)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-slate-700">{t('events.seatGrid.paintWith')}</p>
        <div className="flex flex-wrap gap-2">
          {ticketTypeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setPaintWith({ kind: 'type', type: option.value })}
              className={chip(paintWith.kind === 'type' && paintWith.type === option.value)}
            >
              <SeatGlyph color={colorIndex.get(option.value) ?? TYPE_COLORS[0]} size={16} />
              {option.label}
              {option.accessible && <span aria-hidden>♿</span>}
              <span className="text-slate-400">{counts.get(option.value) ?? 0}</span>
            </button>
          ))}
          <button type="button" onClick={() => setPaintWith({ kind: 'erase' })} className={chip(paintWith.kind === 'erase')}>
            <span className="inline-block h-3.5 w-3.5 rounded border border-dashed border-slate-400" />
            {t('events.seatGrid.aisleTool')}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-md bg-slate-50 p-2">
        <span className="text-xs text-slate-500">{t('events.seatGrid.drawAs')}</span>
        <button type="button" onClick={() => setShape('rect')} className={chip(shape === 'rect')}>
          ▭ {t('events.seatGrid.shapeRect')}
        </button>
        <button type="button" onClick={() => setShape('brush')} className={chip(shape === 'brush')}>
          ✎ {t('events.seatGrid.shapeBrush')}
        </button>
        <span className="mx-2 h-5 w-px bg-slate-200" />
        <span className="text-xs text-slate-500">{t('events.seatGrid.rowsFrom')}</span>
        <select value={rangeFrom} onChange={(e) => setRangeFrom(Number(e.target.value))} className="rounded-md border border-slate-300 px-2 py-1 text-xs">
          {rowOptions.map((label, r) => (
            <option key={r} value={r}>{label}</option>
          ))}
        </select>
        <span className="text-xs text-slate-500">{t('events.seatGrid.rowsTo')}</span>
        <select value={rangeTo} onChange={(e) => setRangeTo(Number(e.target.value))} className="rounded-md border border-slate-300 px-2 py-1 text-xs">
          {rowOptions.map((label, r) => (
            <option key={r} value={r}>{label}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => {
            const [a, b] = [Math.min(rangeFrom, rangeTo), Math.max(rangeFrom, rangeTo)]
            applyWhere((r) => r >= a && r <= b)
          }}
          className={smallButton}
        >
          {t('events.seatGrid.applyToRows')}
        </button>
        <span className="mx-2 h-5 w-px bg-slate-200" />
        <button type="button" onClick={() => applyWhere(() => true)} className={smallButton}>
          {t('events.seatGrid.fillAll')}
        </button>
        <button type="button" onClick={() => onChange(emptyGrid(grid.rows, grid.cols))} className={`${smallButton} text-red-600`}>
          {t('events.seatGrid.clearAll')}
        </button>
      </div>

      <p className="text-xs text-slate-500">{t('events.seatGrid.hint')}</p>

      <div className="max-h-[70vh] overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="mx-auto w-max">
          <div className="mx-auto mb-4 w-2/3 rounded-b-3xl bg-slate-800 py-1.5 text-center text-[11px] font-semibold uppercase tracking-widest text-white">
            {t('events.seatGrid.stage')}
          </div>

          <div className="flex items-center">
            <span className="w-8 shrink-0" />
            {Array.from({ length: grid.cols }, (_, c) => (
              <button
                key={c}
                type="button"
                onClick={() => applyWhere((_r, cc) => cc === c)}
                title={t('events.seatGrid.paintColumn')}
                style={{ width: cellSize + 4 }}
                className="shrink-0 text-center text-[9px] text-slate-400 hover:text-orange-600"
              >
                {c + 1}
              </button>
            ))}
          </div>

          {grid.cells.map((row, r) => (
            <div key={r} className="flex items-center">
              <button
                type="button"
                onClick={() => applyWhere((rr) => rr === r)}
                title={t('events.seatGrid.paintRow')}
                className="w-8 shrink-0 text-center text-[11px] font-semibold text-slate-500 hover:text-orange-600"
              >
                {rowLetter(r)}
              </button>
              {row.map((cell, c) => (
                <Cell
                  key={c}
                  r={r}
                  c={c}
                  color={cell ? colorIndex.get(cell.type) ?? '#94A3B8' : null}
                  accessible={cell ? accessibleTypes.has(cell.type) : false}
                  highlighted={inDrag(r, c)}
                  size={cellSize}
                  onDown={onDown}
                  onEnter={onEnter}
                />
              ))}
              <span className="w-8 shrink-0 text-center text-[11px] font-semibold text-slate-400">{rowLetter(r)}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500">{t('events.seatGrid.total', { count: total })}</p>
    </div>
  )
}
