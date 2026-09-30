import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLocalized } from '@/lib/localized'
import ConfirmDialog from '@/components/ConfirmDialog'
import LoadingSpinner from '@/components/LoadingSpinner'
import PageHeader from '@/components/PageHeader'
import { useGetEventQuery } from '@/services/eventsApi'
import {
  useClearSeatMapMutation,
  useGenerateSeatMapMutation,
  useGetSeatMapQuery,
  useReserveNewSeats,
  useSetSeatsBlockedMutation,
} from '@/services/seatMapApi'
import type { EventSeat, SeatStatus } from '@/types/seatMap'
import { apiErrorMessage } from '@/lib/apiError'
import SeatGridEditor, { SeatGlyph, TYPE_COLORS, emptyGrid, gridToBlocks, reservedSeats, seatCountsByType, type SeatGrid } from '@/components/seatMap/SeatGridEditor'

const STATUS_COLORS: Record<SeatStatus, string> = {
  available: '#C2C2C2',
  held: '#F59E0B',
  reserved: '#3B82F6',
  sold: '#FF8C48',
  blocked: '#DC2626',
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
  const localized = useLocalized()
  const { id } = useParams<{ id: string }>()
  const eventId = Number(id)

  const { data: event, isLoading: isLoadingEvent } = useGetEventQuery(eventId)
  // Every date has the same layout but its own seats: look at one at a time.
  const [sessionId, setSessionId] = useState<number | undefined>(undefined)
  const { data: seats, isLoading: isLoadingSeats } = useGetSeatMapQuery({ eventId, sessionId })
  const [generate, { isLoading: isGenerating }] = useGenerateSeatMapMutation()
  const [clearMap, { isLoading: isClearing }] = useClearSeatMapMutation()

  const [grid, setGrid] = useState<SeatGrid>(() => emptyGrid())
  const [error, setError] = useState<string | null>(null)
  const [confirmingClear, setConfirmingClear] = useState(false)
  const [setSeatsBlocked, { isLoading: isBlocking }] = useSetSeatsBlockedMutation()
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [blockError, setBlockError] = useState<string | null>(null)
  const [colorBy, setColorBy] = useState<'type' | 'status'>('type')
  const reserveNewSeats = useReserveNewSeats()

  if (isLoadingEvent || !event) {
    return <LoadingSpinner size={160} />
  }

  const eventTitle = localized(event.title) || t('events.detail.fallbackTitle')

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
    if (seatCountsByType(grid).size === 0) {
      setError(t('events.form.seatMapIncomplete'))
      return
    }
    try {
      await generate({ eventId, blocks: gridToBlocks(grid) }).unwrap()
    } catch (err) {
      setError(apiErrorMessage(err, t, 'events.seating.generateError'))
      return
    }
    const toReserve = reservedSeats(grid)
    setGrid(emptyGrid())
    try {
      await reserveNewSeats(eventId, toReserve, event.sessions?.length ? event.sessions.map((s) => s.id) : undefined)
    } catch {
      setBlockError(t('events.seating.reserveAfterSaveError'))
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
  // Same colours as the editor, so a type looks the same when building and viewing.
  const typeColor = new Map(event.ticketTypes.map((tt, index) => [tt.id, TYPE_COLORS[index % TYPE_COLORS.length]]))
  const seatsPerType = new Map<number, number>()
  ;(seats ?? []).forEach((seat) => {
    if (seat.ticket_type) seatsPerType.set(seat.ticket_type.id, (seatsPerType.get(seat.ticket_type.id) ?? 0) + 1)
  })
  const seatColor = (seat: EventSeat) =>
    colorBy === 'type' ? typeColor.get(seat.ticket_type?.id ?? -1) ?? '#94A3B8' : STATUS_COLORS[seat.status]
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

        {!isLoadingSeats && seatCount === 0 && (event.ticketTypes.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-500">
            {t('events.seating.noTicketTypes')}
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-slate-800">{t('events.seating.builderTitle')}</h2>
            <SeatGridEditor
              grid={grid}
              onChange={setGrid}
              ticketTypeOptions={event.ticketTypes.map((tt) => ({ value: String(tt.id), label: `${tt.name} (${tt.price})`, accessible: tt.isSpecialNeeds }))}
            />

            <div className="mt-4 flex flex-wrap items-center gap-3">
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
        ))}

        {(isLoadingSeats || seatCount > 0) && (
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-sm font-semibold text-slate-800">
                {t('events.seating.previewTitle', { count: seatCount })}
              </h2>
              {(event.sessions?.length ?? 0) > 1 && (
                <label className="flex items-center gap-2 text-xs text-slate-600">
                  {t('events.seating.forDate')}
                  <select
                    value={sessionId ?? seats?.[0]?.sessionId ?? ''}
                    onChange={(e) => {
                      setSessionId(Number(e.target.value))
                      setSelected(new Set())
                    }}
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs"
                  >
                    {event.sessions!.map((session) => (
                      <option key={session.id} value={session.id}>
                        {new Date(session.startsAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
            {seatCount > 0 && (
              <div className="flex items-center gap-3">
              <div className="flex overflow-hidden rounded-md border border-slate-300 text-xs">
                {(['type', 'status'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setColorBy(mode)}
                    className={`px-3 py-1 ${colorBy === mode ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    {t(`events.seating.colorBy_${mode}`)}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setConfirmingClear(true)}
                className="text-xs font-medium text-red-600 hover:text-red-700"
              >
                {t('events.seating.clearMap')}
              </button>
              </div>
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
                        className={`relative flex h-9 w-7 flex-col items-center justify-center rounded ${isSelected ? 'bg-orange-100 outline outline-2 outline-orange-500' : ''} ${selectable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                      >
                        <span className="text-[8px] leading-none text-slate-400">{seat.number}</span>
                        <span style={{ opacity: colorBy === 'type' && seat.status !== 'available' ? 0.3 : 1 }}>
                          <SeatGlyph color={seatColor(seat)} size={20} />
                        </span>
                        {seat.isAccessible && <span className="absolute -right-0.5 -top-0.5 text-[10px]">♿</span>}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          ))}

          {seatCount > 0 && (
            <div className="mt-3 border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500">
                {t('events.seating.selectHint')}
                {(event.sessions?.length ?? 0) > 1 && ` ${t('events.seating.perDateHint')}`}
              </p>
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
              {colorBy === 'type' ? (
                <>
                  {event.ticketTypes.map((tt) => (
                    <div key={tt.id} className="flex items-center gap-1.5">
                      <SeatGlyph color={typeColor.get(tt.id) ?? '#94A3B8'} size={14} />
                      <span className="text-[11px] text-slate-600">
                        {tt.name} · {t('events.seating.seatCount', { count: seatsPerType.get(tt.id) ?? 0 })}
                      </span>
                    </div>
                  ))}
                  <span className="text-[11px] text-slate-400">{t('events.seating.fadedHint')}</span>
                </>
              ) : (
                (Object.keys(STATUS_COLORS) as SeatStatus[]).map((status) => (
                  <div key={status} className="flex items-center gap-1.5">
                    <SeatGlyph color={STATUS_COLORS[status]} size={14} />
                    <span className="text-[11px] text-slate-500">{t(`events.seating.status.${status}`)}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        )}
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
