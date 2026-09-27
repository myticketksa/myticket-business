import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ConfirmDialog from '@/components/ConfirmDialog'
import LoadingSpinner from '@/components/LoadingSpinner'
import PageHeader from '@/components/PageHeader'
import { useGetEventQuery } from '@/services/eventsApi'
import {
  useClearSeatMapMutation,
  useGenerateSeatMapMutation,
  useGetSeatMapQuery,
  useSetSeatsBlockedMutation,
} from '@/services/seatMapApi'
import type { EventSeat, SeatStatus } from '@/types/seatMap'
import { apiErrorMessage } from '@/lib/apiError'

interface RowDraft {
  row: string
  seatCount: string
  startNumber: string
  accessibleNumbers: string
}

interface BlockDraft {
  ticketTypeId: string
  section: string
  price: string
  rows: RowDraft[]
}

function emptyRow(): RowDraft {
  return { row: '', seatCount: '', startNumber: '1', accessibleNumbers: '' }
}

// "8, 24, 46" -> [8, 24, 46] — same free-text-list pattern as the rest of
// this form rather than a seat-by-seat picker, since a map is usually
// generated before any seat exists to click on.
function parseAccessibleNumbers(raw: string): number[] {
  return raw
    .split(',')
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isInteger(n) && n > 0)
}

function emptyBlock(): BlockDraft {
  return { ticketTypeId: '', section: '', price: '', rows: [emptyRow()] }
}

const STATUS_STYLES: Record<SeatStatus, string> = {
  available: 'bg-white border-slate-300 text-slate-700',
  held: 'bg-amber-100 border-amber-300 text-amber-800',
  reserved: 'bg-blue-100 border-blue-300 text-blue-800',
  sold: 'bg-slate-700 border-slate-700 text-white',
  blocked: 'bg-red-50 border-red-300 text-red-700 line-through',
}

function groupSeats(seats: EventSeat[]) {
  const bySection = new Map<string, Map<string, EventSeat[]>>()
  for (const seat of seats) {
    const section = seat.section ?? ''
    if (!bySection.has(section)) bySection.set(section, new Map())
    const byRow = bySection.get(section)!
    if (!byRow.has(seat.row)) byRow.set(seat.row, [])
    byRow.get(seat.row)!.push(seat)
  }
  return Array.from(bySection.entries()).map(([section, byRow]) => [
    section,
    Array.from(byRow.entries()).map(([row, list]) => [row, list.sort((a, b) => a.number - b.number)] as const),
  ] as const)
}

export default function EventSeatMapPage() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const eventId = Number(id)

  const { data: event, isLoading: isLoadingEvent } = useGetEventQuery(eventId)
  const { data: seats, isLoading: isLoadingSeats } = useGetSeatMapQuery(eventId)
  const [generate, { isLoading: isGenerating }] = useGenerateSeatMapMutation()
  const [clearMap, { isLoading: isClearing }] = useClearSeatMapMutation()

  const [blocks, setBlocks] = useState<BlockDraft[]>([emptyBlock()])
  const [error, setError] = useState<string | null>(null)
  const [confirmingClear, setConfirmingClear] = useState(false)
  const [setSeatsBlocked, { isLoading: isBlocking }] = useSetSeatsBlockedMutation()
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [blockError, setBlockError] = useState<string | null>(null)

  if (isLoadingEvent || !event) {
    return <LoadingSpinner size={160} />
  }

  const eventTitle = event.title.en || event.title.ar || t('events.detail.fallbackTitle')

  const updateBlock = (index: number, patch: Partial<BlockDraft>) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, ...patch } : b)))
  }
  const updateRow = (blockIndex: number, rowIndex: number, patch: Partial<RowDraft>) => {
    setBlocks((prev) =>
      prev.map((b, i) =>
        i === blockIndex ? { ...b, rows: b.rows.map((r, ri) => (ri === rowIndex ? { ...r, ...patch } : r)) } : b,
      ),
    )
  }

  // Only free or already-blocked seats can be picked; booked or held seats
  // aren't the organizer's to take off sale.
  const toggleSeat = (seat: EventSeat) => {
    if (seat.status !== 'available' && seat.status !== 'blocked') return
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(seat.id)) next.delete(seat.id)
      else next.add(seat.id)
      return next
    })
  }

  const selectedSeats = (seats ?? []).filter((seat) => selected.has(seat.id))
  const toBlock = selectedSeats.filter((seat) => seat.status === 'available').map((seat) => seat.id)
  const toUnblock = selectedSeats.filter((seat) => seat.status === 'blocked').map((seat) => seat.id)

  const handleSetBlocked = async (seatIds: number[], blocked: boolean) => {
    setBlockError(null)
    try {
      await setSeatsBlocked({ eventId, seatIds, blocked }).unwrap()
      setSelected(new Set())
    } catch (err) {
      setBlockError(apiErrorMessage(err, t, 'events.seating.blockError'))
    }
  }

  const handleGenerate = async () => {
    setError(null)
    if (blocks.some((b) => !b.ticketTypeId || b.rows.some((r) => !r.row || !r.seatCount))) {
      setError(t('events.seating.validationIncomplete'))
      return
    }
    try {
      await generate({
        eventId,
        blocks: blocks.map((b) => ({
          ticketTypeId: Number(b.ticketTypeId),
          section: b.section || undefined,
          price: b.price || undefined,
          rows: b.rows.map((r) => ({
            row: r.row,
            seatCount: Number(r.seatCount),
            startNumber: r.startNumber ? Number(r.startNumber) : undefined,
            accessibleNumbers: parseAccessibleNumbers(r.accessibleNumbers),
          })),
        })),
      }).unwrap()
      setBlocks([emptyBlock()])
    } catch (err) {
      setError(apiErrorMessage(err, t, 'events.seating.generateError'))
    }
  }

  const handleClear = async () => {
    setError(null)
    try {
      await clearMap(eventId).unwrap()
      setConfirmingClear(false)
    } catch (err) {
      setConfirmingClear(false)
      setError(apiErrorMessage(err, t, 'events.seating.clearError'))
    }
  }

  const groups = groupSeats(seats ?? [])
  const seatCount = seats?.length ?? 0

  return (
    <div>
      <PageHeader
        crumbs={[
          { label: t('common.dashboard'), path: '/' },
          { label: t('common.events'), path: '/events' },
          { label: eventTitle, path: `/events/${eventId}` },
          { label: t('events.seating.title') },
        ]}
        title={t('events.seating.title')}
      />

      <div className="animate-fade-in space-y-6 px-4 pb-12 pane-sm:px-8">
        {event.seatingType !== 'assigned' && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            {t('events.seating.notAssignedWarning')}
          </div>
        )}

        {event.ticketTypes.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-500">
            {t('events.seating.noTicketTypes')}
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-1 text-sm font-semibold text-slate-800">{t('events.seating.builderTitle')}</h2>
            <p className="mb-4 text-xs text-slate-500">{t('events.seating.builderHint')}</p>

            <div className="space-y-4">
              {blocks.map((block, bi) => (
                <div key={bi} className="rounded-lg border border-slate-200 p-4">
                  <div className="grid grid-cols-1 gap-3 pane-sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-700">
                        {t('events.seating.ticketType')}
                      </label>
                      <select
                        value={block.ticketTypeId}
                        onChange={(e) => updateBlock(bi, { ticketTypeId: e.target.value })}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      >
                        <option value="">{t('events.seating.selectTicketType')}</option>
                        {event.ticketTypes.map((tt) => (
                          <option key={tt.id} value={tt.id}>
                            {tt.name} ({tt.price})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-700">
                        {t('events.seating.section')}
                      </label>
                      <input
                        type="text"
                        value={block.section}
                        onChange={(e) => updateBlock(bi, { section: e.target.value })}
                        placeholder={t('events.seating.sectionPlaceholder')}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-700">
                        {t('events.seating.priceOverride')}
                      </label>
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
                          onClick={() =>
                            updateBlock(bi, { rows: block.rows.filter((_, i) => i !== ri) })
                          }
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
                    onClick={() => setBlocks((prev) => prev.filter((_, i) => i !== bi))}
                    disabled={blocks.length === 1}
                    className="mt-3 text-xs text-red-600 hover:text-red-700 disabled:opacity-40"
                  >
                    {t('events.seating.removeBlock')}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setBlocks((prev) => [...prev, emptyBlock()])}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {t('events.seating.addBlock')}
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="rounded-md bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {isGenerating ? t('events.seating.generating') : t('events.seating.generate')}
              </button>
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </div>
        )}

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">
              {t('events.seating.previewTitle', { count: seatCount })}
            </h2>
            {seatCount > 0 && (
              <button
                type="button"
                onClick={() => setConfirmingClear(true)}
                className="text-xs font-medium text-red-600 hover:text-red-700"
              >
                {t('events.seating.clearMap')}
              </button>
            )}
          </div>

          {isLoadingSeats && <LoadingSpinner size={80} />}

          {!isLoadingSeats && seatCount === 0 && (
            <p className="text-sm text-slate-500">{t('events.seating.empty')}</p>
          )}

          {groups.map(([section, rows]) => (
            <div key={section} className="mb-4">
              {section && <p className="mb-2 text-xs font-semibold text-slate-600">{section}</p>}
              {rows.map(([row, rowSeats]) => (
                <div key={row} className="mb-2 flex flex-wrap items-center gap-1.5">
                  <span className="w-6 shrink-0 text-[11px] text-slate-400">{row}</span>
                  {rowSeats.map((seat) => {
                    const selectable = seat.status === 'available' || seat.status === 'blocked'
                    const isSelected = selected.has(seat.id)
                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={!selectable}
                        onClick={() => toggleSeat(seat)}
                        title={`${seat.label ?? seat.number} · ${seat.ticket_type?.name ?? ''} · ${seat.price}${seat.isAccessible ? ` · ${t('events.seating.accessible')}` : ''}`}
                        className={`flex h-7 w-7 items-center justify-center rounded border text-[10px] font-medium ${STATUS_STYLES[seat.status]} ${seat.isAccessible ? 'ring-2 ring-blue-400' : ''} ${isSelected ? 'outline outline-2 outline-offset-1 outline-orange-500' : ''} ${selectable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                      >
                        {seat.number}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          ))}

          {seatCount > 0 && (
            <div className="mt-3 border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500">{t('events.seating.selectHint')}</p>
              {selected.size > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {toBlock.length > 0 && (
                    <button
                      type="button"
                      disabled={isBlocking}
                      onClick={() => handleSetBlocked(toBlock, true)}
                      className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                    >
                      {t('events.seating.blockSelected', { count: toBlock.length })}
                    </button>
                  )}
                  {toUnblock.length > 0 && (
                    <button
                      type="button"
                      disabled={isBlocking}
                      onClick={() => handleSetBlocked(toUnblock, false)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                      {t('events.seating.unblockSelected', { count: toUnblock.length })}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelected(new Set())}
                    className="text-xs text-slate-500 hover:text-slate-700"
                  >
                    {t('events.seating.clearSelection')}
                  </button>
                </div>
              )}
              {blockError && <p className="mt-2 text-xs text-red-600">{blockError}</p>}
            </div>
          )}

          {seatCount > 0 && (
            <div className="mt-3 flex flex-wrap gap-4 border-t border-slate-100 pt-3">
              {(Object.keys(STATUS_STYLES) as SeatStatus[]).map((status) => (
                <div key={status} className="flex items-center gap-1.5">
                  <span className={`h-3.5 w-3.5 rounded border ${STATUS_STYLES[status]}`} />
                  <span className="text-[11px] text-slate-500">{t(`events.seating.status.${status}`)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {confirmingClear && (
        <ConfirmDialog
          title={t('events.seating.clearMap')}
          message={t('events.seating.clearConfirm')}
          confirmLabel={t('common.delete')}
          isBusy={isClearing}
          onConfirm={handleClear}
          onCancel={() => setConfirmingClear(false)}
        />
      )}
    </div>
  )
}
