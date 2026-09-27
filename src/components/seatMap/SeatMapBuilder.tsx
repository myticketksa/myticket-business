import { useTranslation } from 'react-i18next'
import type { SeatBlock } from '@/types/seatMap'

export interface RowDraft {
  row: string
  seatCount: string
  startNumber: string
  accessibleNumbers: string
}

export interface BlockDraft {
  ticketTypeId: string
  section: string
  price: string
  rows: RowDraft[]
}

export function emptyRow(): RowDraft {
  return { row: '', seatCount: '', startNumber: '1', accessibleNumbers: '' }
}

export function emptyBlock(): BlockDraft {
  return { ticketTypeId: '', section: '', price: '', rows: [emptyRow()] }
}

// "8, 24, 46" -> [8, 24, 46]
function parseAccessibleNumbers(raw: string): number[] {
  return raw
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isInteger(n) && n > 0)
}

export function isSeatMapComplete(blocks: BlockDraft[]): boolean {
  return blocks.length > 0 && blocks.every((b) => b.ticketTypeId !== '' && b.rows.every((r) => r.row && r.seatCount))
}

/** `ticketTypeId` in each block is whatever the options' values are (an id, or a form index). */
export function toSeatBlocks(blocks: BlockDraft[]): SeatBlock[] {
  return blocks.map((b) => ({
    ticketTypeId: Number(b.ticketTypeId),
    section: b.section || undefined,
    price: b.price || undefined,
    rows: b.rows.map((r) => ({
      row: r.row,
      seatCount: Number(r.seatCount),
      startNumber: r.startNumber ? Number(r.startNumber) : undefined,
      accessibleNumbers: parseAccessibleNumbers(r.accessibleNumbers),
    })),
  }))
}

export default function SeatMapBuilder({
  blocks,
  onChange,
  ticketTypeOptions,
}: {
  blocks: BlockDraft[]
  onChange: (blocks: BlockDraft[]) => void
  ticketTypeOptions: { value: string; label: string }[]
}) {
  const { t } = useTranslation()

  const updateBlock = (index: number, patch: Partial<BlockDraft>) =>
    onChange(blocks.map((b, i) => (i === index ? { ...b, ...patch } : b)))
  const updateRow = (blockIndex: number, rowIndex: number, patch: Partial<RowDraft>) =>
    onChange(
      blocks.map((b, i) =>
        i === blockIndex ? { ...b, rows: b.rows.map((r, ri) => (ri === rowIndex ? { ...r, ...patch } : r)) } : b,
      ),
    )

  return (
    <div>
      <div className="space-y-4">
        {blocks.map((block, bi) => (
          <div key={bi} className="rounded-lg border border-slate-200 p-4">
            <div className="grid grid-cols-1 gap-3 pane-sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">{t('events.seating.ticketType')}</label>
                <select
                  value={block.ticketTypeId}
                  onChange={(e) => updateBlock(bi, { ticketTypeId: e.target.value })}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="">{t('events.seating.selectTicketType')}</option>
                  {ticketTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">{t('events.seating.section')}</label>
                <input
                  type="text"
                  value={block.section}
                  onChange={(e) => updateBlock(bi, { section: e.target.value })}
                  placeholder={t('events.seating.sectionPlaceholder')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-700">{t('events.seating.priceOverride')}</label>
                <input
                  type="text"
                  value={block.price}
                  onChange={(e) => updateBlock(bi, { price: e.target.value })}
                  placeholder={t('events.seating.priceOverridePlaceholder')}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {block.rows.map((row, ri) => (
                <div key={ri} className="grid grid-cols-1 gap-2 pane-sm:grid-cols-[1fr_1fr_1fr_1.4fr_auto]">
                  <input
                    type="text"
                    value={row.row}
                    onChange={(e) => updateRow(bi, ri, { row: e.target.value })}
                    placeholder={t('events.seating.rowPlaceholder')}
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={row.seatCount}
                    onChange={(e) => updateRow(bi, ri, { seatCount: e.target.value })}
                    placeholder={t('events.seating.seatCountPlaceholder')}
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    min={1}
                    value={row.startNumber}
                    onChange={(e) => updateRow(bi, ri, { startNumber: e.target.value })}
                    placeholder={t('events.seating.startNumberPlaceholder')}
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={row.accessibleNumbers}
                    onChange={(e) => updateRow(bi, ri, { accessibleNumbers: e.target.value })}
                    placeholder={t('events.seating.accessibleNumbersPlaceholder')}
                    title={t('events.seating.accessibleNumbersHint')}
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => updateBlock(bi, { rows: block.rows.filter((_, i) => i !== ri) })}
                    disabled={block.rows.length === 1}
                    className="rounded-md border border-slate-300 px-3 py-2 text-xs text-red-600 hover:bg-red-50 disabled:opacity-40"
                  >
                    {t('common.remove')}
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => updateBlock(bi, { rows: [...block.rows, emptyRow()] })}
                className="text-xs font-medium text-orange-600 hover:text-orange-700"
              >
                {t('events.seating.addRow')}
              </button>
            </div>

            <button
              type="button"
              onClick={() => onChange(blocks.filter((_, i) => i !== bi))}
              disabled={blocks.length === 1}
              className="mt-3 text-xs text-red-600 hover:text-red-700 disabled:opacity-40"
            >
              {t('events.seating.removeBlock')}
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...blocks, emptyBlock()])}
        className="mt-4 rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        {t('events.seating.addBlock')}
      </button>
    </div>
  )
}
