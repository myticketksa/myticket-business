import { useMemo, useRef, useState } from "react"
import {
  CaretDownIcon,
  DeviceMobileIcon,
  DeviceMobileSlashIcon,
  DotsThreeIcon,
  PlusIcon,
  WarningIcon,
} from "@phosphor-icons/react"
import { AlertBanner } from "@/components/biz/alert-banner"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { PageHead } from "@/components/biz/page-head"
import { PanelCard } from "@/components/biz/bar-list-row"
import { AppButton } from "@/components/primitive/app-button"
import { AppSelect } from "@/components/primitive/app-select"
import { Avatar } from "@/components/primitive/avatar"
import { SearchField } from "@/components/primitive/search-field"
import { StatusBadge } from "@/components/primitive/status-badge"
import { TextInput } from "@/components/primitive/text-input"
import { cn } from "@/lib/utils"
import {
  organizerScanners,
  scannersAssignEventOptions,
  scannersBanner,
  scannersHowItWorks,
  scannersPageSub,
  type OrganizerScanner,
} from "@/mocks/organizer-scanners"

export function OrganizerScannersPage() {
  const [query, setQuery] = useState("")
  const createRef = useRef<HTMLDivElement>(null)

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) {
      return organizerScanners
    }
    return organizerScanners.filter(
      (row) =>
        row.name.toLowerCase().includes(needle) ||
        row.email.toLowerCase().includes(needle),
    )
  }, [query])

  function scrollToCreate() {
    createRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-lg px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead
          eyebrow="Door operations"
          title="Scanners"
          sub={scannersPageSub}
        />
        <AppButton
          size="m"
          className="h-[42px]"
          icon={<PlusIcon className="size-[18px]" weight="bold" />}
          onClick={scrollToCreate}
        >
          Create scanner
        </AppButton>
      </div>

      <AlertBanner
        tone="danger"
        lead={scannersBanner.lead}
        body={scannersBanner.body}
        ctaLabel="Assign scanners now"
        onCtaClick={scrollToCreate}
      />

      <section className="overflow-hidden rounded-lg border border-border-default bg-surface-card">
        <div className="flex flex-wrap items-center justify-between gap-gap-md border-b border-border-subtle px-lg py-base">
          <div className="flex flex-wrap items-center gap-[10px]">
            <div className="w-full sm:w-[240px]">
              <SearchField
                size="pill"
                placeholder="Search scanners…"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                }}
              />
            </div>
            <ClosedDropdown label="All events" />
          </div>
          <p className="text-[12.5px] font-medium text-ink-faint">
            4 scanners · 3 active
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1100px]">
            <div className="flex h-10 items-center gap-[14px] bg-surface-canvas px-lg text-[11.5px] font-bold tracking-[0.69px] text-ink-faint uppercase">
              <p className="w-[230px] shrink-0">Scanner</p>
              <p className="w-[200px] shrink-0">Assigned to</p>
              <p className="w-[165px] shrink-0">Device</p>
              <p className="flex w-[120px] shrink-0 items-center gap-[4px]">
                Total scans
                <CaretDownIcon className="size-2.5" />
              </p>
              <p className="flex w-[110px] shrink-0 items-center gap-[4px]">
                Last active
                <CaretDownIcon className="size-2.5" />
              </p>
              <p className="w-[130px] shrink-0">Status</p>
              <p className="w-[44px] shrink-0" />
            </div>
            {rows.map((row) => (
              <ScannerRow key={row.id} row={row} />
            ))}
          </div>
        </div>
      </section>

      <div
        ref={createRef}
        id="create-scanner"
        className="grid grid-cols-1 items-start gap-lg xl:grid-cols-2"
      >
        <PanelCard title="Create a scanner">
          <form
            className="flex flex-col gap-base px-xl py-[22px]"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <p className="text-[13px] leading-[1.5] font-normal text-ink-muted">
              They’ll receive sign-in details by email. A password is generated
              unless you set one.
            </p>
            <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
              <TextInput id="scanner-full-name" label="Full name" placeholder="e.g. Yousef Al-Harbi" />
              <TextInput id="scanner-email" label="Email" placeholder="name@email.com" />
              <TextInput
                id="scanner-gate"
                label="Gate label — optional"
                placeholder="e.g. Gate B"
              />
              <AppSelect
                id="scanner-event"
                label="Assign to event — optional"
                value="winter-nights"
                options={scannersAssignEventOptions}
              />
            </div>
            <AppButton type="submit" size="l" className="self-start">
              Create & email sign-in details
            </AppButton>
          </form>
        </PanelCard>

        <div className="flex flex-col gap-xs rounded-lg bg-surface-canvas px-xl py-[22px]">
          <p className="text-[17px] font-bold leading-normal text-ink-primary">
            How scanner accounts work
          </p>
          {scannersHowItWorks.map((line) => (
            <div
              key={line}
              className="flex items-start gap-2xs text-[13.5px] text-ink-muted"
            >
              <p className="shrink-0 font-bold leading-normal">·</p>
              <p className="min-w-0 flex-1 leading-[1.55] font-normal">{line}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

function ScannerRow({ row }: { row: OrganizerScanner }) {
  return (
    <article
      className={cn(
        "flex min-h-[62px] items-center gap-[14px] border-b border-border-subtle px-lg py-xs",
        row.wash && "bg-status-danger-light",
      )}
    >
      <div className="flex w-[230px] shrink-0 items-center gap-[10px]">
        <Avatar initials={row.initials} size={38} tone={row.avatarTone} />
        <div className="flex min-w-0 flex-1 flex-col gap-px">
          <div className="flex flex-wrap items-center gap-[6px]">
            <p className="text-[13.5px] font-bold text-ink-primary">{row.name}</p>
            {row.gate ? (
              <span className="inline-flex h-7 items-center rounded-[9px] border border-border-default bg-surface-canvas px-[7px] text-[11px] font-bold text-ink-muted">
                {row.gate}
              </span>
            ) : null}
          </div>
          <p className="truncate text-[12px] font-normal text-ink-faint">
            {row.email}
          </p>
        </div>
      </div>
      <p className="w-[200px] shrink-0 text-[13px] font-normal text-ink-primary">
        {row.assignedEvent}
      </p>
      <div className="flex w-[165px] shrink-0 items-center gap-[6px]">
        {row.deviceKind === "registered" ? (
          <DeviceMobileIcon className="size-[14px] shrink-0 text-status-success" />
        ) : row.deviceKind === "none" ? (
          <DeviceMobileSlashIcon className="size-[14px] shrink-0 text-status-danger" />
        ) : (
          <WarningIcon
            className="size-[14px] shrink-0 text-accent-amber"
            weight="fill"
          />
        )}
        <p
          className={cn(
            "text-[13px] font-semibold",
            row.deviceKind === "registered" && "text-status-success",
            row.deviceKind === "none" && "text-status-danger",
            row.deviceKind === "never" && "text-accent-amber",
          )}
        >
          {row.device}
        </p>
      </div>
      <p className="w-[120px] shrink-0 text-[13.5px] font-bold text-ink-primary">
        {row.scans}
      </p>
      <p
        className={cn(
          "w-[110px] shrink-0 text-[13px] font-medium",
          row.lastActiveTone === "success"
            ? "text-status-success"
            : "text-ink-faint",
        )}
      >
        {row.lastActive}
      </p>
      <div className="w-[130px] shrink-0">
        <StatusBadge label={row.status} tone={row.statusTone} />
      </div>
      <div className="flex w-[44px] shrink-0 items-center justify-center">
        <span className="inline-flex size-[34px] items-center justify-center rounded-[17px]">
          <DotsThreeIcon className="size-[18px] text-ink-muted" />
        </span>
      </div>
    </article>
  )
}
