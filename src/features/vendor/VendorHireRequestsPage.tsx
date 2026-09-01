import { useMemo, useState } from "react"
import { useSearchParams } from "react-router"
import {
  DownloadSimpleIcon,
  FilePdfIcon,
  InfoIcon,
  PaperclipIcon,
  StarIcon,
  XCircleIcon,
} from "@phosphor-icons/react"
import { FilterPill } from "@/components/biz/filter-pill"
import { AppButton } from "@/components/primitive/app-button"
import { Avatar } from "@/components/primitive/avatar"
import { StatusBadge } from "@/components/primitive/status-badge"
import {
  vendorDeclinedConversation,
  vendorHireAdvisory,
  vendorHireFilterPills,
  vendorHireFootnote,
  vendorHireThreads,
  vendorWinterConversation,
  type VendorHireFilterId,
  type VendorHireMessage,
  type VendorHireThread,
} from "@/mocks/vendor-hire"
import { cn } from "@/lib/utils"

function filterForThread(threadId: string | null): VendorHireFilterId {
  const match = vendorHireThreads.find((thread) => thread.id === threadId)
  if (!match) {
    return "awaiting"
  }
  return match.filter === "declined" ? "all" : match.filter
}

export function VendorHireRequestsPage() {
  const [searchParams] = useSearchParams()
  const requestedId = searchParams.get("thread")
  const [filter, setFilter] = useState<VendorHireFilterId>(() =>
    filterForThread(requestedId),
  )
  const [activeId, setActiveId] = useState(requestedId ?? "riyadh-winter")
  const [draft, setDraft] = useState("")

  const threads = useMemo(
    () =>
      vendorHireThreads.filter((thread) =>
        filter === "all" ? true : thread.filter === filter,
      ),
    [filter],
  )

  const active = threads.find((thread) => thread.id === activeId) ?? threads[0]
  const isWinter = active?.id === "riyadh-winter"
  const isDeclined = active?.filter === "declined"
  const isAwaiting = active?.filter === "awaiting"

  return (
    <div className="flex min-h-full flex-col lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-b border-border-default bg-surface-card lg:h-full lg:w-[380px] lg:border-r lg:border-b-0">
        <div className="flex flex-col gap-xs px-lg pt-md pb-xs">
          <h1 className="text-[20px] font-extrabold tracking-[-0.4px] text-ink-primary">
            Hire requests
          </h1>
          <div className="flex flex-wrap gap-2xs">
            {vendorHireFilterPills.map((pill) => (
              <FilterPill
                key={pill.id}
                label={pill.label}
                size={32}
                state={filter === pill.id ? "active" : "idle"}
                onClick={() => {
                  setFilter(pill.id)
                }}
              />
            ))}
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {threads.map((thread) => (
            <HireThreadRow
              key={thread.id}
              thread={thread}
              selected={thread.id === active?.id}
              onSelect={() => {
                setActiveId(thread.id)
              }}
            />
          ))}
        </ul>
      </aside>

      {active ? (
        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex flex-wrap items-start justify-between gap-sm border-b border-border-default bg-surface-card px-[26px] py-base">
            <div className="flex items-center gap-xs">
              <Avatar initials={active.initials} size={42} />
              <div className="flex flex-col gap-3xs">
                <div className="flex flex-wrap items-center gap-2xs">
                  <h2 className="text-[15.5px] font-extrabold text-ink-primary">
                    {active.name}
                  </h2>
                  <StatusBadge label={active.status} />
                </div>
                <p className="inline-flex flex-wrap items-center gap-3xs text-[12.5px] font-medium text-ink-muted">
                  {active.ratingLine.startsWith("4.") ? (
                    <StarIcon className="size-3 text-brand-primary" weight="fill" />
                  ) : null}
                  {active.ratingLine}
                  <span className="font-bold text-ink-primary">
                    {active.eventLine}
                  </span>
                </p>
              </div>
            </div>
            {isAwaiting ? (
              <div className="flex flex-wrap gap-gap-md">
                <AppButton
                  variant="secondary"
                  size="m"
                  className="border-status-danger text-status-danger hover:bg-status-danger-light"
                >
                  Decline
                </AppButton>
                <AppButton size="m">Accept request</AppButton>
              </div>
            ) : null}
          </header>

          {isAwaiting ? (
            <div className="flex items-start gap-2xs border-b border-border-default bg-surface-footer px-[26px] py-[10px]">
              <InfoIcon className="mt-3xs size-[15px] shrink-0 text-accent-amber" />
              <p className="text-[12.5px] leading-[1.5] font-medium text-ink-muted">
                {vendorHireAdvisory}
              </p>
            </div>
          ) : null}

          {isDeclined ? (
            <div className="flex items-start gap-2xs border-b border-border-default bg-status-danger-light px-[26px] py-[10px]">
              <XCircleIcon
                className="mt-3xs size-[15px] shrink-0 text-status-danger"
                weight="fill"
              />
              <p className="text-[12.5px] leading-[1.5] font-medium text-ink-muted">
                You declined this request on 20 Jul. Reason given: fully booked
                that week.
              </p>
            </div>
          ) : null}

          <div className="flex min-h-[320px] flex-1 flex-col gap-base overflow-y-auto px-[26px] py-xl">
            {isWinter ? (
              <ThreadMessages
                dateLabel="THU 20 AUG"
                messages={vendorWinterConversation}
              />
            ) : isDeclined ? (
              <ThreadMessages
                dateLabel="20 JUL"
                messages={vendorDeclinedConversation}
              />
            ) : (
              <p className="text-[13px] font-medium text-ink-faint">
                {active.preview}
              </p>
            )}
          </div>

          {isDeclined ? (
            <div className="border-t border-border-default bg-surface-card">
              <p className="px-[26px] pt-base text-center text-[13px] font-semibold text-ink-faint">
                This conversation is closed.
              </p>
              <p className="px-[26px] pt-2xs pb-xs text-[12px] font-medium text-ink-faint">
                {vendorHireFootnote}
              </p>
            </div>
          ) : (
            <div className="border-t border-border-default bg-surface-card">
              <form
                className="flex items-center gap-xs px-[26px] pt-base"
                onSubmit={(event) => {
                  event.preventDefault()
                }}
              >
                <button
                  type="button"
                  aria-label="Attach"
                  className="inline-flex size-11 items-center justify-center rounded-pill border-[1.5px] border-border-default"
                >
                  <PaperclipIcon className="size-[18px] text-ink-muted" />
                </button>
                <input
                  value={draft}
                  onChange={(event) => {
                    setDraft(event.target.value)
                  }}
                  placeholder="Write a reply…"
                  className="h-[46px] min-w-0 flex-1 rounded-pill border-[1.5px] border-border-default px-md text-[13.5px] font-semibold text-ink-primary placeholder:text-ink-faint focus:border-brand-primary focus:outline-none"
                />
                <AppButton size="m" type="submit" className="h-[46px] px-lg">
                  Send
                </AppButton>
              </form>
              <p className="px-[26px] pt-2xs pb-xs text-[12px] font-medium text-ink-faint">
                {vendorHireFootnote}
              </p>
            </div>
          )}
        </section>
      ) : null}
    </div>
  )
}

function ThreadMessages({
  dateLabel,
  messages,
}: {
  dateLabel: string
  messages: VendorHireMessage[]
}) {
  return (
    <>
      <p className="text-center text-[11.5px] font-bold tracking-[0.69px] text-ink-faint uppercase">
        {dateLabel}
      </p>
      {messages.map((message) => (
        <ThreadBubble key={message.id} message={message} />
      ))}
    </>
  )
}

function ThreadBubble({ message }: { message: VendorHireMessage }) {
  const outgoing = message.from === "you"

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-[6px]",
        outgoing ? "items-end" : "items-start",
      )}
    >
      <div
        className={cn(
          "w-full max-w-[320px] px-sm py-xs",
          outgoing
            ? "rounded-tl-[16px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[4px] bg-surface-inverse"
            : "rounded-tl-[16px] rounded-tr-[16px] rounded-br-[4px] rounded-bl-[16px] border border-border-default bg-surface-card",
        )}
      >
        {message.body ? (
          <p
            className={cn(
              "text-[13.5px] leading-[1.45]",
              outgoing ? "text-ink-inverse" : "text-ink-primary",
            )}
          >
            {message.body}
          </p>
        ) : null}
        {message.attachment ? (
          <div className="flex items-center gap-gap-md">
            <span className="inline-flex size-9 items-center justify-center rounded-badge bg-surface-canvas text-ink-primary">
              <FilePdfIcon className="size-[18px]" />
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "truncate text-[13px] font-bold",
                  outgoing ? "text-ink-inverse" : "text-ink-primary",
                )}
              >
                {message.attachment.name}
              </p>
              <p
                className={cn(
                  "text-[11.5px]",
                  outgoing ? "text-ink-inverse/65" : "text-ink-faint",
                )}
              >
                {message.attachment.size}
              </p>
            </div>
            {outgoing ? null : (
              <DownloadSimpleIcon className="size-4 shrink-0 text-ink-muted" />
            )}
          </div>
        ) : null}
      </div>
      <p className="text-[11.5px] text-ink-faint">{message.caption}</p>
    </div>
  )
}

function HireThreadRow({
  thread,
  selected,
  onSelect,
}: {
  thread: VendorHireThread
  selected: boolean
  onSelect: () => void
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "flex w-full items-stretch border-b border-border-subtle text-left",
          selected ? "bg-surface-brand-wash" : "bg-surface-card",
        )}
      >
        <span
          className={cn(
            "w-[3px] shrink-0",
            selected ? "bg-brand-primary" : "bg-transparent",
          )}
        />
        <span className="flex min-w-0 flex-1 items-center gap-xs py-[15px] pr-lg pl-[17px]">
          <Avatar initials={thread.initials} size={42} />
          <span className="flex min-w-0 flex-1 flex-col gap-3xs">
            <span className="flex items-center justify-between gap-2xs">
              <span className="truncate text-[13.5px] font-bold text-ink-primary">
                {thread.name}
              </span>
              <span className="shrink-0 text-[11.5px] font-medium text-ink-faint">
                {thread.time}
              </span>
            </span>
            <span className="truncate text-[12.5px] font-medium text-ink-muted">
              {thread.preview}
            </span>
            <StatusBadge label={thread.status} />
          </span>
        </span>
      </button>
    </li>
  )
}
