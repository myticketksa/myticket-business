import { useMemo, useState } from "react"
import {
  ClockIcon,
  FilePdfIcon,
  InfoIcon,
  PaperclipIcon,
  StarIcon,
} from "@phosphor-icons/react"
import { FilterPill } from "@/components/biz/filter-pill"
import { AppButton } from "@/components/primitive/app-button"
import { Avatar } from "@/components/primitive/avatar"
import { StatusBadge } from "@/components/primitive/status-badge"
import {
  hireFilterPills,
  hireThreads,
  khalidConversation,
  type HireFilterId,
  type HireThread,
} from "@/mocks/hire-requests"
import { cn } from "@/lib/utils"

export function OrganizerHireRequestsPage() {
  const [filter, setFilter] = useState<HireFilterId>("all")
  const [activeId, setActiveId] = useState("dj-khalid-noor")
  const [draft, setDraft] = useState("")

  const threads = useMemo(
    () =>
      hireThreads.filter((thread) =>
        filter === "all" ? true : thread.filter === filter,
      ),
    [filter],
  )

  const active = threads.find((thread) => thread.id === activeId) ?? threads[0]
  const showKhalidThread = active?.id === "dj-khalid-noor"

  return (
    <div className="flex min-h-full flex-col lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-b border-border-default bg-surface-card lg:h-full lg:w-[380px] lg:border-r lg:border-b-0">
        <div className="flex flex-col gap-xs px-lg pt-md pb-xs">
          <h1 className="text-[20px] font-extrabold tracking-[-0.4px] text-ink-primary">
            Hire requests
          </h1>
          <div className="flex flex-wrap gap-2xs">
            {hireFilterPills.map((pill) => (
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
                  <StatusBadge
                    label={
                      showKhalidThread
                        ? khalidConversation.headerStatus
                        : active.status
                    }
                  />
                </div>
                {showKhalidThread ? (
                  <>
                    <p className="inline-flex items-center gap-3xs text-[12.5px] font-medium text-ink-muted">
                      <StarIcon className="size-3 text-brand-primary" weight="fill" />
                      {khalidConversation.ratingLine}
                    </p>
                    <p className="text-[12.5px] font-bold text-ink-primary">
                      {khalidConversation.eventLine}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
            {showKhalidThread ? (
              <div className="flex flex-wrap gap-2xs">
                <AppButton
                  variant="secondary"
                  size="m"
                  className="h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"
                >
                  Attach to event
                </AppButton>
                <AppButton
                  variant="secondary"
                  size="m"
                  className="h-[42px] border-status-danger text-status-danger hover:bg-status-danger-light"
                >
                  Cancel request
                </AppButton>
              </div>
            ) : null}
          </header>

          {showKhalidThread ? (
            <div className="flex items-start gap-2xs border-b border-border-default bg-surface-footer px-[26px] py-2xs">
              <InfoIcon className="mt-3xs size-[15px] shrink-0 text-accent-amber" />
              <p className="text-[12.5px] leading-[1.5] font-medium text-ink-muted">
                {khalidConversation.explainer}
              </p>
            </div>
          ) : null}

          <div className="flex min-h-[320px] flex-1 flex-col gap-base overflow-y-auto px-[26px] py-xl">
            {showKhalidThread ? (
              <>
                <p className="text-center text-[11.5px] font-bold tracking-[0.69px] text-ink-faint uppercase">
                  {khalidConversation.dateLabel}
                </p>
                {khalidConversation.messages.map((message) => (
                  <div key={message.id} className="flex flex-col items-end gap-[6px]">
                    <div className="w-full max-w-[320px] rounded-tl-[16px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[4px] bg-surface-inverse px-sm py-xs">
                      <p className="text-[13.5px] leading-[1.45] text-ink-inverse">
                        {message.body}
                      </p>
                    </div>
                    <p className="text-[11.5px] text-ink-faint">{message.caption}</p>
                  </div>
                ))}
                <div className="flex flex-col items-end gap-[6px]">
                  <div className="w-full max-w-[320px] rounded-tl-[16px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[4px] bg-surface-inverse px-sm py-xs">
                    <div className="flex items-center gap-2xs">
                      <span className="inline-flex size-9 items-center justify-center rounded-badge bg-surface-canvas text-ink-primary">
                        <FilePdfIcon className="size-[18px]" />
                      </span>
                      <div>
                        <p className="text-[13px] font-bold text-ink-inverse">
                          {khalidConversation.attachment.name}
                        </p>
                        <p className="text-[11.5px] text-ink-inverse/65">
                          {khalidConversation.attachment.size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11.5px] text-ink-faint">
                    {khalidConversation.attachment.caption}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2xs">
                  <p className="inline-flex items-center gap-[6px] rounded-sm border border-border-default bg-surface-canvas px-xs py-[6px] text-[12px] font-semibold text-ink-faint">
                    <ClockIcon className="size-3" />
                    No response for 4 days
                  </p>
                  <AppButton
                    variant="secondary"
                    size="s"
                    className="border-border-default text-ink-primary hover:bg-surface-tint"
                  >
                    Send a follow-up nudge
                  </AppButton>
                  <p className="text-center text-[12px] font-medium text-ink-faint">
                    or find another DJ — cancelling this request is polite and
                    instant
                  </p>
                </div>
              </>
            ) : (
              <p className="text-[13px] font-medium text-ink-faint">
                {active.preview}
              </p>
            )}
          </div>

          {showKhalidThread ? (
            <form
              className="flex items-center gap-xs border-t border-border-default bg-surface-card px-[26px] pt-base pb-lg"
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
                placeholder="Write a message…"
                className="h-[46px] min-w-0 flex-1 rounded-pill border-[1.5px] border-border-default px-md text-[13.5px] font-semibold text-ink-primary placeholder:text-ink-faint focus:border-brand-primary focus:outline-none"
              />
              <AppButton size="m" type="submit">
                Send
              </AppButton>
            </form>
          ) : null}
        </section>
      ) : null}
    </div>
  )
}

function HireThreadRow({
  thread,
  selected,
  onSelect,
}: {
  thread: HireThread
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
                {thread.name} · {thread.craft}
              </span>
              <span className="shrink-0 text-[11.5px] font-medium text-ink-faint">
                {thread.time}
              </span>
            </span>
            <span className="truncate text-[12.5px] font-medium text-ink-muted">
              {thread.preview}
            </span>
            <span className="inline-flex items-center gap-[6px]">
              <StatusBadge label={thread.status} />
              {thread.unread ? (
                <span className="size-2 rounded-pill bg-status-danger" />
              ) : null}
            </span>
          </span>
        </span>
      </button>
    </li>
  )
}
