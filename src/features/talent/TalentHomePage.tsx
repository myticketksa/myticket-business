import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CircleIcon,
  ClockIcon,
  EyeIcon,
  StarIcon,
} from "@phosphor-icons/react"
import { DateChip } from "@/components/biz/date-chip"
import { NoteCard } from "@/components/biz/note-card"
import { PageHead } from "@/components/biz/page-head"
import { PanelCard } from "@/components/biz/bar-list-row"
import { ProgressBar } from "@/components/biz/progress-bar"
import { StarRating } from "@/components/biz/star-rating"
import { AppButton } from "@/components/primitive/app-button"
import { Avatar } from "@/components/primitive/avatar"
import { StatusBadge } from "@/components/primitive/status-badge"
import { ToggleField } from "@/components/primitive/toggle-field"
import {
  talentHomeReviews,
  talentProfileStats,
  talentStrengthTasks,
  talentWaitingRequests,
  talentWorkItems,
  type TalentWaitingRequest,
} from "@/mocks/talent-home"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/store/hooks"

const waitToneClass: Record<TalentWaitingRequest["waitTone"], string> = {
  danger: "text-status-danger",
  brand: "text-accent-amber",
  muted: "text-ink-faint",
}

export function TalentHomePage() {
  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const [available, setAvailable] = useState(true)

  if (!user) {
    return null
  }

  const firstName = user.displayName.split(" ")[0]

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-xl px-gutter pt-8 pb-[80px]">
      <div className="flex flex-col gap-sm lg:flex-row lg:items-end lg:justify-between">
        <PageHead eyebrow="Saturday 22 August" title={`Good evening, ${firstName}`} />
        <div className="flex flex-wrap items-center gap-sm">
          <div className="flex items-center gap-2xs">
            <CircleIcon
              className={cn(
                "size-[14px]",
                available ? "text-status-success" : "text-ink-faint",
              )}
              weight="fill"
            />
            <p
              className={cn(
                "text-[13.5px] font-bold",
                available ? "text-status-success" : "text-ink-faint",
              )}
            >
              {available ? "Available for work" : "Reserved"}
            </p>
            <ToggleField
              id="talent-home-available"
              checked={available}
              onCheckedChange={setAvailable}
            />
          </div>
          <AppButton
            variant="secondary"
            size="m"
            className="border-border-default text-ink-primary hover:bg-surface-tint"
            icon={<EyeIcon className="size-[18px]" />}
            onClick={() => {
              navigate("/app/profile")
            }}
          >
            View public profile
          </AppButton>
        </div>
      </div>

      <div className="flex flex-col gap-lg xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-lg xl:max-w-[668px]">
          <section className="flex w-full flex-col overflow-hidden rounded-lg border border-border-default bg-surface-card">
            <header className="flex flex-wrap items-center justify-between gap-2xs border-b border-border-subtle px-lg py-base">
              <div className="flex items-center gap-2xs">
                <h2 className="text-[17px] font-bold text-ink-primary">
                  Waiting for your answer
                </h2>
                <span className="inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-[11px] bg-brand-strong px-3xs text-[12px] font-extrabold text-ink-inverse">
                  3
                </span>
              </div>
              <p className="text-[12.5px] font-medium text-ink-faint">
                quick answers win repeat work
              </p>
            </header>
            <ul>
              {talentWaitingRequests.map((request) => (
                <li
                  key={request.id}
                  className="flex items-center gap-sm border-b border-border-subtle px-lg py-sm"
                >
                  <Avatar initials={request.initials} size={44} />
                  <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                    <p className="flex flex-wrap items-center gap-[6px] text-[13.5px] font-bold text-ink-primary">
                      {request.name}
                      <span className="font-medium text-ink-faint">
                        · {request.meta}
                      </span>
                    </p>
                    <p className="truncate text-[12.5px] font-medium text-ink-muted">
                      {request.brief}
                    </p>
                    <p
                      className={cn(
                        "inline-flex items-center gap-[5px] text-[12px] font-semibold",
                        waitToneClass[request.waitTone],
                      )}
                    >
                      <ClockIcon className="size-3" />
                      {request.wait}
                    </p>
                  </div>
                  <AppButton
                    size="s"
                    className="h-[38px] shrink-0 px-md text-[13px] font-bold"
                    onClick={() => {
                      navigate(`/app/hire-requests?thread=${request.id}`)
                    }}
                  >
                    Respond
                  </AppButton>
                </li>
              ))}
            </ul>
            <div className="px-lg py-sm">
              <button
                type="button"
                className="inline-flex items-center gap-[6px] text-[13px] font-bold text-brand-link"
                onClick={() => {
                  navigate("/app/hire-requests")
                }}
              >
                All hire requests
                <ArrowRightIcon className="size-[13px]" weight="bold" />
              </button>
            </div>
          </section>

          <PanelCard title="Work in progress & confirmed">
            <ul>
              {talentWorkItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-sm border-b border-border-subtle px-lg py-sm last:border-b-0"
                >
                  <DateChip month={item.month} day={item.day} />
                  <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                    <p className="text-[14px] font-bold text-ink-primary">
                      {item.title}
                    </p>
                    <p className="text-[12.5px] font-medium text-ink-muted">
                      {item.meta}
                    </p>
                  </div>
                  <StatusBadge label={item.status} />
                </li>
              ))}
            </ul>
          </PanelCard>

          <PanelCard
            title="Recent reviews"
            action={
              <p className="inline-flex items-center gap-[6px] text-[13px] font-bold text-ink-primary">
                <StarIcon className="size-[13px] text-brand-primary" weight="fill" />
                4.9 (86 reviews)
              </p>
            }
          >
            <ul>
              {talentHomeReviews.map((review) => (
                <li
                  key={review.id}
                  className="flex flex-col gap-2xs border-b border-border-subtle px-lg py-base last:border-b-0"
                >
                  <div className="flex flex-wrap items-center gap-2xs">
                    <p className="text-[13.5px] font-bold text-ink-primary">
                      {review.author}
                    </p>
                    <StarRating value={review.stars} />
                    <p className="text-[12px] font-medium text-ink-faint">
                      · {review.when}
                    </p>
                  </div>
                  <p className="text-[13px] leading-[1.55] text-ink-muted">
                    {review.body}
                  </p>
                </li>
              ))}
            </ul>
          </PanelCard>
        </div>

        <div className="flex w-full flex-col gap-lg xl:w-[432px] xl:shrink-0">
          <PanelCard
            title="Profile strength"
            action={
              <p className="text-[15px] font-extrabold text-ink-primary">70%</p>
            }
          >
            <div className="px-lg pt-base">
              <ProgressBar value={70} size={8} />
            </div>
            <ul className="pt-2xs">
              {talentStrengthTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-gap-md px-lg py-[10px]"
                >
                  {task.done ? (
                    <CheckCircleIcon
                      className="size-[17px] shrink-0 text-status-success"
                      weight="fill"
                    />
                  ) : (
                    <CircleIcon className="size-[17px] shrink-0 text-ink-disabled" />
                  )}
                  <p
                    className={cn(
                      "min-w-0 flex-1 text-[13px] font-semibold",
                      task.done
                        ? "text-ink-faint line-through"
                        : "text-ink-primary",
                    )}
                  >
                    {task.label}
                  </p>
                  {task.gain ? (
                    <p className="shrink-0 text-[12.5px] font-bold text-accent-amber">
                      {task.gain}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3xs border-t border-border-subtle px-lg pt-sm pb-base">
              <p className="text-[12.5px] leading-[1.5] font-medium text-ink-muted">
                Profiles with video get 2.4× more enquiries.
              </p>
              <button
                type="button"
                className="self-start text-[12.5px] font-bold text-brand-link"
                onClick={() => {
                  navigate("/app/portfolio")
                }}
              >
                Open portfolio
              </button>
            </div>
          </PanelCard>

          <PanelCard title="Your public profile · 30 days">
            <div className="grid grid-cols-2 gap-base px-lg pt-md pb-lg">
              {talentProfileStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-3xs">
                  <p
                    className={cn(
                      "text-[22px] font-extrabold tracking-[-0.44px]",
                      stat.tone === "success"
                        ? "text-status-success"
                        : "text-ink-primary",
                    )}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[12.5px] font-medium text-ink-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </PanelCard>

          <NoteCard
            tone="warm"
            lead="Portfolio change under review"
            body="Your new showreel is being reviewed by MyTicket. Your previously approved portfolio stays publicly visible — nothing has been taken down."
          />
        </div>
      </div>
    </main>
  )
}
