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

/** `reserved`: kept off sale (family, guests…) — becomes a blocked seat once the map is saved. */
export interface GridCell {
  type: string
  reserved?: boolean
}

/** `accessible`: the ticket type for guests with disabilities — its seats are the accessible ones. */
export interface TicketTypeOption {
  value: string
  label: string
  accessible?: boolean
}

/**
 * `corridorRows` / `corridorCols`: grid lines that are walkways. They never
 * hold seats and don't use up a row letter.
 */
export interface SeatGrid {
  rows: number
  cols: number
  cells: (GridCell | null)[][]
  corridorRows: number[]
  corridorCols: number[]
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
  return {
    rows,
    cols,
    cells: Array.from({ length: rows }, () => Array.from({ length: cols }, () => null)),
    corridorRows: [],
    corridorCols: [],
  }
}

/** Grid lines needed for `seatLines` seat lines, counting the corridors that fall among them. */
function linesFor(seatLines: number, corridors: number[]): number {
  const set = new Set(corridors)
  let total = 0
  let seats = 0
  while (seats < seatLines) {
    if (!set.has(total)) seats += 1
    total += 1
  }
  return total
}

/** Resizes by seat rows and seats per row; corridors inside the new size stay. */
function resize(grid: SeatGrid, seatRows: number, seatCols: number): SeatGrid {
  const rows = linesFor(seatRows, grid.corridorRows)
  const cols = linesFor(seatCols, grid.corridorCols)
  return {
    rows,
    cols,
    cells: Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => grid.cells[r]?.[c] ?? null)),
    corridorRows: grid.corridorRows.filter((r) => r < rows),
    corridorCols: grid.corridorCols.filter((c) => c < cols),
  }
}

/** Inserts an empty walkway line at `index`, pushing everything after it along. */
function addCorridor(grid: SeatGrid, kind: 'row' | 'col', index: number): SeatGrid {
  const shift = (list: number[]) => [...list.map((i) => (i >= index ? i + 1 : i)), index]
  if (kind === 'row') {
    const cells = [...grid.cells]
    cells.splice(index, 0, Array.from({ length: grid.cols }, () => null))
    return { ...grid, rows: grid.rows + 1, cells, corridorRows: shift(grid.corridorRows) }
  }
  return {
    ...grid,
    cols: grid.cols + 1,
    cells: grid.cells.map((row) => {
      const next = [...row]
      next.splice(index, 0, null)
      return next
    }),
    corridorCols: shift(grid.corridorCols),
  }
}

/** Takes the walkway line out again, closing the gap. */
function removeCorridor(grid: SeatGrid, kind: 'row' | 'col', index: number): SeatGrid {
  const shift = (list: number[]) => list.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i))
  if (kind === 'row') {
    return {
      ...grid,
      rows: grid.rows - 1,
      cells: grid.cells.filter((_, r) => r !== index),
      corridorRows: shift(grid.corridorRows),
    }
  }
  return {
    ...grid,
    cols: grid.cols - 1,
    cells: grid.cells.map((row) => row.filter((_, c) => c !== index)),
    corridorCols: shift(grid.corridorCols),
  }
}

/** Row letter for each grid row, or null for a corridor — corridors don't use up a letter. */
export function rowLabels(grid: SeatGrid): (string | null)[] {
  const corridors = new Set(grid.corridorRows)
  let seatRow = 0
  return Array.from({ length: grid.rows }, (_, r) => (corridors.has(r) ? null : rowLetter(seatRow++)))
}

/** Column position for each grid column (1, 2, …), or null for a corridor. */
function columnNumbers(grid: SeatGrid): (number | null)[] {
  const corridors = new Set(grid.corridorCols)
  let seatCol = 0
  return Array.from({ length: grid.cols }, (_, c) => (corridors.has(c) ? null : ++seatCol))
}

/** Every seat with the row letter and number the server will give it. */
function numberedSeats(grid: SeatGrid) {
  const labels = rowLabels(grid)
  const seats: { r: number; c: number; row: string; number: number; cell: GridCell }[] = []
  grid.cells.forEach((cells, r) => {
    const row = labels[r]
    if (!row) return
    let number = 0
    cells.forEach((cell, c) => {
      if (!cell) return
      number += 1
      seats.push({ r, c, row, number, cell })
    })
  })
  return seats
}

/** Where the reserved seats will be once saved, to take them off sale then. */
export function reservedSeats(grid: SeatGrid): { row: string; number: number }[] {
  return numberedSeats(grid)
    .filter((seat) => seat.cell.reserved)
    .map(({ row, number }) => ({ row, number }))
}

export function seatCountsByType(grid: SeatGrid): Map<string, number> {
  const counts = new Map<string, number>()
  grid.cells.flat().forEach((cell) => {
    if (cell) counts.set(cell.type, (counts.get(cell.type) ?? 0) + 1)
  })
  return counts
}

/**
 * Seats are numbered left to right within each row, skipping gaps and
 * corridors, then grouped into the blocks the server takes: one per ticket
 * type, with a row entry for each unbroken run of that type.
 */
export function gridToBlocks(grid: SeatGrid): SeatBlock[] {
  const blocks = new Map<string, SeatBlock>()
  let run: { type: string; row: string; r: number; lastC: number; start: number; count: number } | null = null

  const flush = () => {
    if (!run) return
    const block = blocks.get(run.type) ?? { ticketTypeId: Number(run.type), rows: [] }
    block.rows.push({ row: run.row, seatCount: run.count, startNumber: run.start })
    blocks.set(run.type, block)
    run = null
  }

  numberedSeats(grid).forEach(({ r, c, row, number, cell }) => {
    if (!run || run.r !== r || run.lastC !== c - 1 || run.type !== cell.type) {
      flush()
      run = { type: cell.type, row, r, lastC: c, start: number, count: 0 }
    }
    run.lastC = c
    run.count += 1
  })
  flush()

  return Array.from(blocks.values())
}

type Paint = { kind: 'type'; type: string } | { kind: 'erase' } | { kind: 'reserve' } | { kind: 'unreserve' }
type Shape = 'rect' | 'brush'
type Point = { r: number; c: number }

const Cell = memo(function Cell({
  r,
  c,
  color,
  accessible,
  reserved,
  corridor,
  highlighted,
  size,
  onDown,
  onEnter,
}: {
  r: number
  c: number
  color: string | null
  accessible: boolean
  reserved: boolean
  corridor: boolean
  highlighted: boolean
  size: number
  onDown: (r: number, c: number) => void
  onEnter: (r: number, c: number) => void
}) {
  if (corridor) {
    return <div style={{ width: size + 4, height: size + 4 }} className="shrink-0 bg-sky-100" />
  }
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
          <span style={{ opacity: reserved ? 0.35 : 1 }}>
            <SeatGlyph color={color} size={size} />
          </span>
          {reserved && (
            <span className="absolute inset-0 flex items-center justify-center" style={{ fontSize: Math.max(size * 0.55, 8) }}>
              🔒
            </span>
          )}
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
  const seatRowCount = grid.rows - grid.corridorRows.length
  const seatColCount = grid.cols - grid.corridorCols.length
  const [sizeDraft, setSizeDraft] = useState({ rows: String(seatRowCount), cols: String(seatColCount) })
  const [corridorAfterCol, setCorridorAfterCol] = useState(0)
  const [corridorAfterRow, setCorridorAfterRow] = useState(0)

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

  useEffect(() => setSizeDraft({ rows: String(seatRowCount), cols: String(seatColCount) }), [seatRowCount, seatColCount])

  const canPaint = (p: Paint) => p.kind !== 'type' || Boolean(p.type)
  const paintCell = (p: Paint, cell: GridCell | null): GridCell | null => {
    switch (p.kind) {
      case 'erase':
        return null
      case 'type':
        return { type: p.type }
      // Reserving only marks seats that are already there.
      case 'reserve':
        return cell ? { ...cell, reserved: true } : null
      case 'unreserve':
        return cell ? { type: cell.type } : null
    }
  }

  /** Applies the current paint to every cell `inside` accepts; corridors are left alone. */
  const applyWhere = (inside: (r: number, c: number) => boolean) => {
    const { grid: g, onChange: change, paintWith: p } = latest.current
    if (!canPaint(p)) return
    const corridorRows = new Set(g.corridorRows)
    const corridorCols = new Set(g.corridorCols)
    change({
      ...g,
      cells: g.cells.map((row, r) =>
        row.map((cell, c) => (inside(r, c) && !corridorRows.has(r) && !corridorCols.has(c) ? paintCell(p, cell) : cell)),
      ),
    })
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
    const next = resize(grid, rows, cols)
    setRangeFrom((v) => Math.min(v, next.rows - 1))
    setRangeTo((v) => Math.min(v, next.rows - 1))
    onChange(next)
  }

  const counts = seatCountsByType(grid)
  const total = Array.from(counts.values()).reduce((sum, n) => sum + n, 0)
  const reservedCount = grid.cells.flat().filter((cell) => cell?.reserved).length
  const labels = rowLabels(grid)
  const colNumbers = columnNumbers(grid)
  const corridorRowSet = new Set(grid.corridorRows)
  const corridorColSet = new Set(grid.corridorCols)
  const rowOptions = labels.flatMap((label, r) => (label ? [{ r, label }] : []))
  const colOptions = colNumbers.flatMap((n, c) => (n !== null ? [{ c, n }] : []))

  // Corridors go between two seat lines, so the last row/column isn't offered.
  const corridorColChoices = colOptions.slice(0, -1)
  const corridorRowChoices = rowOptions.slice(0, -1)
  const addColCorridor = () => {
    const after = corridorColChoices[Math.min(corridorAfterCol, corridorColChoices.length - 1)]
    if (after) onChange(addCorridor(grid, 'col', after.c + 1))
  }
  const addRowCorridor = () => {
    const after = corridorRowChoices[Math.min(corridorAfterRow, corridorRowChoices.length - 1)]
    if (after) onChange(addCorridor(grid, 'row', after.r + 1))
  }
  // Describe a corridor by the seat line in front of it.
  const colCorridorLabel = (c: number) => colNumbers.slice(0, c).filter((n) => n !== null).pop() ?? 0
  const rowCorridorLabel = (r: number) => labels.slice(0, r).filter(Boolean).pop() ?? ''

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

      <div>
        <p className="mb-1.5 text-xs font-semibold text-slate-700">{t('events.seatGrid.reservedTitle')}</p>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => setPaintWith({ kind: 'reserve' })} className={chip(paintWith.kind === 'reserve')}>
            <span aria-hidden>🔒</span>
            {t('events.seatGrid.reserveTool')}
            <span className="text-slate-400">{reservedCount}</span>
          </button>
          <button type="button" onClick={() => setPaintWith({ kind: 'unreserve' })} className={chip(paintWith.kind === 'unreserve')}>
            {t('events.seatGrid.unreserveTool')}
          </button>
          <span className="text-xs text-slate-500">{t('events.seatGrid.reservedHint')}</span>
        </div>
      </div>

      <div className="rounded-md border border-sky-200 bg-sky-50/60 p-3">
        <p className="text-xs font-semibold text-slate-700">{t('events.seatGrid.corridorsTitle')}</p>
        <p className="mb-2 text-xs text-slate-500">{t('events.seatGrid.corridorsHint')}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-700">↕ {t('events.seatGrid.corridorAfterSeat')}</span>
            <select
              value={Math.min(corridorAfterCol, Math.max(corridorColChoices.length - 1, 0))}
              onChange={(e) => setCorridorAfterCol(Number(e.target.value))}
              disabled={corridorColChoices.length === 0}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs"
            >
              {corridorColChoices.map(({ n }, i) => (
                <option key={n} value={i}>{n}</option>
              ))}
            </select>
            <button type="button" onClick={addColCorridor} disabled={corridorColChoices.length === 0} className={smallButton}>
              {t('events.seatGrid.addCorridor')}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-700">↔ {t('events.seatGrid.corridorAfterRow')}</span>
            <select
              value={Math.min(corridorAfterRow, Math.max(corridorRowChoices.length - 1, 0))}
              onChange={(e) => setCorridorAfterRow(Number(e.target.value))}
              disabled={corridorRowChoices.length === 0}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs"
            >
              {corridorRowChoices.map(({ label }, i) => (
                <option key={label} value={i}>{label}</option>
              ))}
            </select>
            <button type="button" onClick={addRowCorridor} disabled={corridorRowChoices.length === 0} className={smallButton}>
              {t('events.seatGrid.addCorridor')}
            </button>
          </div>
        </div>
        {(grid.corridorCols.length > 0 || grid.corridorRows.length > 0) && (
          <div className="mt-2 flex flex-wrap gap-2">
            {[...grid.corridorCols].sort((a, b) => a - b).map((c) => (
              <span key={`c${c}`} className="flex items-center gap-1.5 rounded-full border border-sky-300 bg-white px-2.5 py-1 text-xs text-slate-700">
                ↕ {t('events.seatGrid.corridorAfterSeatChip', { seat: colCorridorLabel(c) })}
                <button type="button" onClick={() => onChange(removeCorridor(grid, 'col', c))} aria-label={t('events.seatGrid.removeCorridor')} className="text-slate-400 hover:text-red-600">
                  ✕
                </button>
              </span>
            ))}
            {[...grid.corridorRows].sort((a, b) => a - b).map((r) => (
              <span key={`r${r}`} className="flex items-center gap-1.5 rounded-full border border-sky-300 bg-white px-2.5 py-1 text-xs text-slate-700">
                ↔ {t('events.seatGrid.corridorAfterRowChip', { row: rowCorridorLabel(r) })}
                <button type="button" onClick={() => onChange(removeCorridor(grid, 'row', r))} aria-label={t('events.seatGrid.removeCorridor')} className="text-slate-400 hover:text-red-600">
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
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
          {rowOptions.map(({ r, label }) => (
            <option key={r} value={r}>{label}</option>
          ))}
        </select>
        <span className="text-xs text-slate-500">{t('events.seatGrid.rowsTo')}</span>
        <select value={rangeTo} onChange={(e) => setRangeTo(Number(e.target.value))} className="rounded-md border border-slate-300 px-2 py-1 text-xs">
          {rowOptions.map(({ r, label }) => (
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
        <button
          type="button"
          onClick={() => onChange({ ...grid, cells: grid.cells.map((row) => row.map(() => null)) })}
          className={`${smallButton} text-red-600`}
        >
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
            {colNumbers.map((n, c) =>
              n === null ? (
                <button
                  key={c}
                  type="button"
                  onClick={() => onChange(removeCorridor(grid, 'col', c))}
                  title={t('events.seatGrid.removeCorridor')}
                  style={{ width: cellSize + 4 }}
                  className="shrink-0 bg-sky-100 text-center text-[9px] text-sky-500 hover:text-red-600"
                >
                  ✕
                </button>
              ) : (
                <button
                  key={c}
                  type="button"
                  onClick={() => applyWhere((_r, cc) => cc === c)}
                  title={t('events.seatGrid.paintColumn')}
                  style={{ width: cellSize + 4 }}
                  className="shrink-0 text-center text-[9px] text-slate-400 hover:text-orange-600"
                >
                  {n}
                </button>
              ),
            )}
          </div>

          {grid.cells.map((row, r) =>
            corridorRowSet.has(r) ? (
              <div key={r} className="flex items-center">
                <button
                  type="button"
                  onClick={() => onChange(removeCorridor(grid, 'row', r))}
                  title={t('events.seatGrid.removeCorridor')}
                  className="w-8 shrink-0 text-center text-[11px] text-sky-500 hover:text-red-600"
                >
                  ✕
                </button>
                <div
                  style={{ width: grid.cols * (cellSize + 4), height: cellSize + 4 }}
                  className="flex shrink-0 items-center justify-center bg-sky-100 text-[10px] font-medium uppercase tracking-widest text-sky-600"
                >
                  {t('events.seatGrid.corridor')}
                </div>
                <span className="w-8 shrink-0" />
              </div>
            ) : (
              <div key={r} className="flex items-center">
                <button
                  type="button"
                  onClick={() => applyWhere((rr) => rr === r)}
                  title={t('events.seatGrid.paintRow')}
                  className="w-8 shrink-0 text-center text-[11px] font-semibold text-slate-500 hover:text-orange-600"
                >
                  {labels[r]}
                </button>
                {row.map((cell, c) => (
                  <Cell
                    key={c}
                    r={r}
                    c={c}
                    color={cell ? colorIndex.get(cell.type) ?? '#94A3B8' : null}
                    accessible={cell ? accessibleTypes.has(cell.type) : false}
                    reserved={Boolean(cell?.reserved)}
                    corridor={corridorColSet.has(c)}
                    highlighted={inDrag(r, c)}
                    size={cellSize}
                    onDown={onDown}
                    onEnter={onEnter}
                  />
                ))}
                <span className="w-8 shrink-0 text-center text-[11px] font-semibold text-slate-400">{labels[r]}</span>
              </div>
            ),
          )}
        </div>
      </div>
      <p className="text-xs text-slate-500">
        {t('events.seatGrid.total', { count: total })}
        {reservedCount > 0 && ` · ${t('events.seatGrid.reservedCount', { count: reservedCount })}`}
      </p>
    </div>
  )
}
