import { useMemo, useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowCounterClockwiseIcon,
  ChatCircleIcon,
  ClockIcon,
  FileTextIcon,
  GearSixIcon,
  ImagesIcon,
  LockKeyIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  StarIcon,
  TagIcon,
  TicketIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { FilterPill } from "@/components/biz/filter-pill"
import { NotificationRow } from "@/components/biz/notification-row"
import { AppButton } from "@/components/primitive/app-button"
import {
  notificationFilterBase,
  notificationsByRole,
  type NotificationFilterId,
  type NotificationIcon,
  type NotificationItem,
} from "@/mocks/notifications"
import { useAppSelector } from "@/store/hooks"
import type { ReactNode } from "react"

const icons: Record<NotificationIcon, ReactNode> = {
  warning: <WarningCircleIcon className="size-[18px]" />,
  qr: <QrCodeIcon className="size-[18px]" />,
  ticket: <TicketIcon className="size-[18px]" />,
  lock: <LockKeyIcon className="size-[18px]" />,
  chat: <ChatCircleIcon className="size-[18px]" />,
  refund: <ArrowCounterClockwiseIcon className="size-[18px]" />,
  star: <StarIcon className="size-[18px]" weight="fill" />,
  shield: <ShieldCheckIcon className="size-[18px]" />,
  clock: <ClockIcon className="size-[18px]" />,
  images: <ImagesIcon className="size-[18px]" />,
  file: <FileTextIcon className="size-[18px]" />,
  tag: <TagIcon className="size-[18px]" />,
}

export function NotificationsPage() {
  const navigate = useNavigate()
  const role = useAppSelector((state) => state.auth.user?.role) ?? "organizer"
  const dataset = notificationsByRole[role]
  const [filter, setFilter] = useState<NotificationFilterId>("all")
  const [readIds, setReadIds] = useState<Set<string>>(new Set())
  const [sessionRole, setSessionRole] = useState(role)
  if (sessionRole !== role) {
    setSessionRole(role)
    setFilter("all")
    setReadIds(new Set())
  }

  const filters = notificationFilterBase.map((pill) =>
    pill.id === "action" ? { ...pill, label: dataset.actionLabel } : pill,
  )

  const groups = useMemo(
    () =>
      dataset.groups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => matchesFilter(item, filter)),
        }))
        .filter((group) => group.items.length > 0),
    [dataset, filter],
  )

  const unreadCount = dataset.groups
    .flatMap((group) => group.items)
    .filter((item) => item.unread && !readIds.has(item.id)).length

  return (
    <main className="mx-auto flex w-full max-w-[1080px] flex-col gap-xl px-gutter pt-8 pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <header className="flex flex-col gap-3xs">
          <p className="text-[12px] font-bold tracking-[0.96px] text-brand-link uppercase">
            Account
          </p>
          <h1 className="text-[28px] leading-8 font-extrabold tracking-[-0.84px] text-ink-primary">
            Notifications
            <span className="text-[15px] font-bold text-brand-strong">
              {` · ${unreadCount} unread`}
            </span>
          </h1>
        </header>
        <div className="flex flex-wrap items-center gap-2xs">
          <AppButton
            variant="secondary"
            size="m"
            className="h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"
            onClick={() => {
              setReadIds(
                new Set(
                  dataset.groups.flatMap((group) =>
                    group.items.map((item) => item.id),
                  ),
                ),
              )
            }}
          >
            Mark all read
          </AppButton>
          <AppButton
            variant="secondary"
            size="m"
            icon={<GearSixIcon className="size-[18px]" />}
            className="h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"
            onClick={() => {
              navigate("/app/settings")
            }}
          >
            Preferences
          </AppButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-gap-md">
        {filters.map((pill) => (
          <FilterPill
            key={pill.id}
            label={pill.label}
            state={filter === pill.id ? "active" : "idle"}
            onClick={() => {
              setFilter(pill.id)
            }}
          />
        ))}
      </div>

      {groups.map((group) => (
        <section
          key={group.label}
          className="overflow-hidden rounded-lg border border-border-default bg-surface-card"
        >
          <header className="bg-surface-canvas px-lg py-xs">
            <p className="text-[11.5px] font-bold tracking-[0.69px] text-ink-faint uppercase">
              {group.label}
            </p>
          </header>
          <div className="divide-y divide-border-subtle">
            {group.items.map((item) => (
              <NotificationRow
                key={item.id}
                title={item.title}
                body={item.body}
                time={item.time}
                unread={item.unread && !readIds.has(item.id)}
                state={item.actionNeeded ? "actionNeeded" : "read"}
                icon={icons[item.icon]}
                tileTone={item.tileTone}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

function matchesFilter(item: NotificationItem, filter: NotificationFilterId) {
  if (filter === "all") {
    return true
  }
  if (filter === "action") {
    return item.actionNeeded
  }
  return item.category === filter
}
