import { useState } from "react"
import { useNavigate } from "react-router"
import { SignOutIcon } from "@phosphor-icons/react"
import { FilterPill } from "@/components/biz/filter-pill"
import { AppButton } from "@/components/primitive/app-button"
import { Avatar } from "@/components/primitive/avatar"
import { StatusBadge } from "@/components/primitive/status-badge"
import { ScannerStatusBar } from "@/features/scanner/ScannerStatusBar"
import { scannerAssignedEvents } from "@/mocks/scanner"
import { cn } from "@/lib/utils"

export function ScannerEventsPage() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState(scannerAssignedEvents[0].id)
  const [gate, setGate] = useState(scannerAssignedEvents[0].gates[0])
  const selected = scannerAssignedEvents.find((event) => event.id === selectedId)

  return (
    <div className="flex min-h-screen flex-col bg-surface-canvas">
      <ScannerStatusBar time="21:19" />
      <div className="flex flex-1 flex-col gap-lg px-lg pt-xl pb-section">
        <div className="flex items-center gap-gap-md">
          <Avatar initials="Y" size={38} />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-bold text-ink-primary">Yousef</p>
            <p className="text-[12px] font-medium text-ink-faint">
              Riyadh Events Co. · scanner
            </p>
          </div>
          <button
            type="button"
            aria-label="Sign out"
            onClick={() => {
              navigate("/scanner")
            }}
          >
            <SignOutIcon className="size-[18px] text-ink-muted" />
          </button>
        </div>

        <div className="flex flex-col gap-2xs">
          <h1 className="text-[19px] font-extrabold text-ink-primary">
            Your assigned events
          </h1>
          <p className="text-[13px] font-medium text-ink-muted">
            Pick the event and gate you’re working.
          </p>
        </div>

        {scannerAssignedEvents.map((event) => {
          const isSelected = event.id === selectedId && event.live

          return (
            <article
              key={event.id}
              className={cn(
                "flex flex-col items-start gap-gap-md rounded-[16px] border p-base text-left",
                isSelected
                  ? "border-[1.5px] border-brand-primary bg-surface-card"
                  : "border-border-default bg-surface-card opacity-90",
              )}
            >
              <button
                type="button"
                disabled={!event.live}
                className="flex w-full items-center justify-between gap-sm text-left"
                onClick={() => {
                  setSelectedId(event.id)
                  if (event.gates[0]) {
                    setGate(event.gates[0])
                  }
                }}
              >
                <p
                  className={cn(
                    "font-bold text-ink-primary",
                    event.live ? "text-[15px]" : "text-[14px]",
                  )}
                >
                  {event.title}
                </p>
                {event.live ? <StatusBadge label="Live now" /> : null}
              </button>
              <p
                className={cn(
                  "text-[12.5px] font-medium",
                  event.live ? "text-ink-muted" : "text-ink-faint",
                )}
              >
                {event.detail}
              </p>
              {event.live ? (
                <div className="flex flex-wrap gap-2xs">
                  {event.gates.map((item) => (
                    <FilterPill
                      key={item}
                      label={item}
                      size={32}
                      state={gate === item ? "active" : "idle"}
                      onClick={() => {
                        setSelectedId(event.id)
                        setGate(item)
                      }}
                    />
                  ))}
                </div>
              ) : null}
            </article>
          )
        })}

        <AppButton
          size="l"
          className="w-full"
          disabled={!selected?.live}
          onClick={() => {
            navigate(`/scanner/scan?outcome=valid&gate=${encodeURIComponent(gate)}`)
          }}
        >
          Start scanning · {gate}
        </AppButton>
      </div>
    </div>
  )
}
