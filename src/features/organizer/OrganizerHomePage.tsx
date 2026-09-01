import { useNavigate } from "react-router"
import {
  ArrowCounterClockwiseIcon,
  BankIcon,
  CalendarBlankIcon,
  ChatCircleIcon,
  CoinsIcon,
  HandshakeIcon,
  HourglassMediumIcon,
  LockSimpleIcon,
  PlusIcon,
  QrCodeIcon,
  StarIcon,
  TicketIcon,
  UsersThreeIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { DateChip } from "@/components/biz/date-chip"
import { LiveDot } from "@/components/biz/live-dot"
import { NoteCard } from "@/components/biz/note-card"
import { PageHead } from "@/components/biz/page-head"
import { PanelCard } from "@/components/biz/bar-list-row"
import { ProgressBar } from "@/components/biz/progress-bar"
import { KpiCard } from "@/components/biz/kpi-card"
import { AppButton } from "@/components/primitive/app-button"
import { StatusBadge } from "@/components/primitive/status-badge"
import {
  organizerAttentionItems,
  organizerHomeActivity,
  organizerHomeEvents,
  organizerHomeKpis,
  organizerLiveEvent,
  organizerRefundsNote,
  organizerWeekBars,
  type OrganizerActivityItem,
  type OrganizerAttentionItem,
} from "@/mocks/organizer-home"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/store/hooks"
import type { ReactNode } from "react"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

const kpiIcon: Record<(typeof organizerHomeKpis)[number]["icon"], ReactNode> = {
  ticket: <TicketIcon className="size-[19px]" />,
  coins: <CoinsIcon className="size-[19px]" />,
  bank: <BankIcon className="size-[19px]" />,
  calendar: <CalendarBlankIcon className="size-[19px]" />,
}

const attentionIcon: Record<OrganizerAttentionItem["icon"], ReactNode> = {
  warning: <WarningCircleIcon className="size-[19px]" />,
  lock: <LockSimpleIcon className="size-[19px]" weight="fill" />,
  qr: <QrCodeIcon className="size-[19px]" />,
  hourglass: <HourglassMediumIcon className="size-[19px]" />,
  chat: <ChatCircleIcon className="size-[19px]" />,
}

const attentionToneClass: Record<OrganizerAttentionItem["tone"], string> = {
  danger: "bg-status-danger-light text-status-danger",
  brand: "bg-surface-brand-wash text-brand-primary",
  canvas: "bg-surface-canvas text-ink-muted",
}

const activityIcon: Record<OrganizerActivityItem["icon"], ReactNode> = {
  ticket: <TicketIcon className="size-4" />,
  qr: <QrCodeIcon className="size-4" />,
  handshake: <HandshakeIcon className="size-4" />,
  star: <StarIcon className="size-4" weight="fill" />,
  refund: <ArrowCounterClockwiseIcon className="size-4" />,
}

const activityToneClass: Record<OrganizerActivityItem["tone"], string> = {
  success: "bg-status-success-light text-status-success",
  brand: "bg-surface-brand-wash text-brand-primary",
  info: "bg-status-info-light text-status-info",
}

export function OrganizerHomePage() {
  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()

  if (!user) {
    return null
  }

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-xl px-gutter pt-8 pb-[80px]">
      <div className="flex flex-col gap-sm lg:flex-row lg:items-end lg:justify-between">
        <PageHead
          eyebrow="Saturday 22 August · Riyadh"
          title={`Good evening, ${user.displayName}`}
        />
        <div className="flex flex-wrap items-center gap-gap-md">
          <AppButton
            variant="secondary"
            size="m"
            className={secondaryClass}
            icon={<UsersThreeIcon className="size-[18px]" />}
            onClick={() => {
              navigate("/app/marketplace")
            }}
          >
            Find talent
          </AppButton>
          <AppButton
            variant="secondary"
            size="m"
            className={secondaryClass}
            icon={<QrCodeIcon className="size-[18px]" />}
            onClick={() => {
              navigate("/app/scanners")
            }}
          >
            Scanners
          </AppButton>
          <AppButton
            size="m"
            className="h-[42px]"
            icon={<PlusIcon className="size-[18px]" weight="bold" />}
            onClick={() => {
              navigate("/app/events/new/edit")
            }}
          >
            Create event
          </AppButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-base sm:grid-cols-2 xl:grid-cols-4">
        {organizerHomeKpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            trendTone={kpi.trendTone}
            note={kpi.note}
            icon={kpiIcon[kpi.icon]}
            showTrendIcon={kpi.showTrendIcon}
            className="max-w-none"
          />
        ))}
      </div>

      <div className="flex flex-col gap-lg xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-lg xl:max-w-[668px]">
          <section className="flex w-full flex-col overflow-hidden rounded-lg border border-border-default bg-surface-card">
            <header className="flex flex-wrap items-center justify-between gap-2xs border-b border-border-subtle px-lg py-base">
              <div className="flex items-center gap-2xs">
                <h2 className="text-[17px] font-bold text-ink-primary">
                  Needs your attention
                </h2>
                <span className="inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-[11px] bg-brand-strong px-3xs text-[12px] font-extrabold text-ink-inverse">
                  5
                </span>
              </div>
              <p className="text-[12.5px] font-medium text-ink-faint">
                ranked by consequence
              </p>
            </header>
            <ul>
              {organizerAttentionItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-base border-b border-border-subtle px-lg py-base last:border-b-0"
                >
                  <span
                    className={cn(
                      "inline-flex size-[38px] shrink-0 items-center justify-center rounded-sm",
                      attentionToneClass[item.tone],
                    )}
                  >
                    {attentionIcon[item.icon]}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                    <p className="text-[14px] font-bold text-ink-primary">
                      {item.title}
                    </p>
                    <p className="text-[12.5px] leading-[1.45] text-ink-muted">
                      {item.body}
                    </p>
                  </div>
                  <p className="shrink-0 text-[12px] text-ink-faint">{item.meta}</p>
                  <AppButton
                    variant="secondary"
                    size="s"
                    className="h-9 border-border-default text-ink-primary hover:bg-surface-tint"
                    onClick={() => {
                      navigate(item.href)
                    }}
                  >
                    {item.action}
                  </AppButton>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex w-full flex-col overflow-hidden rounded-lg border border-border-default bg-surface-card">
            <header className="flex items-center justify-between border-b border-border-subtle px-lg py-base">
              <h2 className="text-[17px] font-bold text-ink-primary">
                Happening now & soon
              </h2>
              <button
                type="button"
                className="text-[13px] font-bold text-brand-link"
                onClick={() => {
                  navigate("/app/events")
                }}
              >
                All events
              </button>
            </header>

            <div className="flex flex-col gap-[6px] bg-surface-inverse px-lg py-md sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-wrap items-center gap-2xs">
                  <LiveDot surface="dark" />
                  <p className="text-[15px] font-bold text-surface-canvas">
                    {organizerLiveEvent.title}
                  </p>
                  <StatusBadge label="Live now" />
                </div>
                <p className="text-[12.5px] font-medium text-surface-canvas">
                  {organizerLiveEvent.detail}
                </p>
              </div>
              <div className="flex w-full flex-col items-start gap-[6px] sm:w-[200px] sm:items-end">
                <p className="text-surface-canvas">
                  <span className="text-[22px] font-extrabold">
                    {organizerLiveEvent.scanned}
                  </span>{" "}
                  <span className="text-[13px] font-semibold">
                    {organizerLiveEvent.capacity}
                  </span>
                </p>
                <p className="text-[12.5px]">
                  <span className="font-semibold text-surface-canvas">
                    {organizerLiveEvent.scannedNote}{" "}
                  </span>
                  <button
                    type="button"
                    className="font-bold text-brand-light"
                    onClick={() => {
                      navigate(organizerLiveEvent.href)
                    }}
                  >
                    watch live door
                  </button>
                </p>
                <ProgressBar
                  value={organizerLiveEvent.percent}
                  size={7}
                  surface="dark"
                />
              </div>
            </div>

            <ul>
              {organizerHomeEvents.map((event) => (
                <li
                  key={event.id}
                  className="flex items-center gap-sm border-b border-border-subtle px-lg py-sm last:border-b-0"
                >
                  <DateChip month={event.month} day={event.day} />
                  <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                    <p className="text-[14px] font-bold text-ink-primary">
                      {event.title}
                    </p>
                    <p className="text-[12.5px] font-medium text-ink-muted">
                      {event.detail}
                    </p>
                  </div>
                  <StatusBadge label={event.status} />
                  <div className="hidden w-[130px] shrink-0 flex-col items-end gap-3xs sm:flex">
                    <p className="w-full text-right text-[13.5px] font-bold text-ink-primary">
                      {event.sold}
                    </p>
                    <ProgressBar value={event.percent} size={5} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex w-full flex-col gap-lg xl:w-[432px]">
          <PanelCard
            title="Sales this week"
            action={<ClosedDropdown label="7 days" />}
          >
            <div className="flex flex-col gap-2xs px-lg pt-base pb-3xs">
              <div className="flex h-[110px] items-end gap-2xs">
                {organizerWeekBars.map((bar) => (
                  <div
                    key={bar.day}
                    className={cn(
                      "min-w-px flex-1 rounded-t-xs rounded-b-[3px]",
                      bar.peak ? "bg-brand-gradient" : "bg-border-strong",
                    )}
                    style={{ height: bar.height }}
                  />
                ))}
              </div>
              <div className="flex gap-2xs text-center text-[11px] font-semibold text-ink-faint">
                {organizerWeekBars.map((bar) => (
                  <p key={bar.day} className="min-w-px flex-1">
                    {bar.day}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border-subtle px-lg py-xs">
              <p className="text-[12.5px] font-semibold text-ink-primary">
                1,912 tickets · SAR 286,410.00
              </p>
              <button
                type="button"
                className="text-[12.5px] font-bold text-brand-link"
                onClick={() => {
                  navigate("/app/sales")
                }}
              >
                Sales report
              </button>
            </div>
          </PanelCard>

          <PanelCard
            title="Recent activity"
            action={
              <button
                type="button"
                className="text-[13px] font-bold text-brand-link"
                onClick={() => {
                  navigate("/app/notifications")
                }}
              >
                All
              </button>
            }
          >
            <ul>
              {organizerHomeActivity.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-xs border-b border-border-subtle px-lg py-[13px] last:border-b-0"
                >
                  <span
                    className={cn(
                      "inline-flex size-8 shrink-0 items-center justify-center rounded-badge",
                      activityToneClass[item.tone],
                    )}
                  >
                    {activityIcon[item.icon]}
                  </span>
                  {item.icon === "star" ? (
                    <p className="flex min-w-0 flex-1 flex-wrap items-center gap-[4px] text-[13px] font-medium text-ink-primary">
                      New 5
                      <StarIcon
                        className="size-3 text-accent-amber"
                        weight="fill"
                      />
                      review on Autumn Jazz Evening
                    </p>
                  ) : (
                    <p className="min-w-0 flex-1 text-[13px] leading-[1.4] font-medium text-ink-primary">
                      {item.body}
                    </p>
                  )}
                  <p className="shrink-0 text-[12px] font-medium text-ink-faint">
                    {item.time}
                  </p>
                </li>
              ))}
            </ul>
          </PanelCard>

          <div className="flex flex-col gap-2xs">
            <NoteCard
              tone="warm"
              showIcon
              lead={organizerRefundsNote.lead}
              body={organizerRefundsNote.body}
            />
            <button
              type="button"
              className="self-start text-[13.5px] font-bold text-brand-link"
              onClick={() => {
                navigate("/app/events/winter-nights/refunds")
              }}
            >
              View requests
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
