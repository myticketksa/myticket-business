import { useMemo, useState } from "react"
import { ExportIcon, StarIcon } from "@phosphor-icons/react"
import { BarListRow, PanelCard } from "@/components/biz/bar-list-row"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { FilterPill } from "@/components/biz/filter-pill"
import { ListFooter } from "@/components/biz/list-footer"
import { NoteCard } from "@/components/biz/note-card"
import { PageHead } from "@/components/biz/page-head"
import { StarRating } from "@/components/biz/star-rating"
import { AppButton } from "@/components/primitive/app-button"
import { Avatar } from "@/components/primitive/avatar"
import { StatusBadge } from "@/components/primitive/status-badge"
import {
  reviewMonths,
  reviewsByRole,
  type ReviewFilterId,
  type ReviewItem,
} from "@/mocks/reviews"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/store/hooks"

export function OrganizerReviewsPage() {
  const role = useAppSelector((state) => state.auth.user?.role) ?? "organizer"
  const dataset = reviewsByRole[role]
  const [filterRole, setFilterRole] = useState(role)
  const [filter, setFilter] = useState<ReviewFilterId>("all")
  if (filterRole !== role) {
    setFilterRole(role)
    setFilter("all")
  }

  const visible = useMemo(() => {
    return dataset.items.filter((review) => {
      if (filter === "all") {
        return true
      }
      if (filter === "below") {
        return review.stars <= dataset.belowMax
      }
      return review.stars === Number(filter)
    })
  }, [dataset, filter])

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-xl px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead
          eyebrow={dataset.eyebrow}
          title="Ratings & reviews"
          sub={dataset.sub}
        />
        <div className="flex flex-wrap items-center gap-2xs">
          <ClosedDropdown label="All time" />
          <AppButton
            variant="secondary"
            size="m"
            icon={<ExportIcon className="size-[18px]" />}
            className="h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"
          >
            Export
          </AppButton>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-lg xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <div className="flex flex-col gap-lg">
          <article className="flex flex-col gap-sm rounded-lg border border-border-default bg-surface-card p-[22px]">
            <div
              className={cn(
                "flex gap-xs",
                dataset.showTrend
                  ? "flex-col"
                  : "items-center",
              )}
            >
              <p className="text-[44px] leading-none font-extrabold tracking-[-0.88px] text-ink-primary">
                {dataset.score}
              </p>
              <div className="flex flex-col gap-[4px]">
                <StarRating value={dataset.scoreStars} size={14} />
                <p className="text-[12px] font-medium text-ink-faint">
                  {dataset.countLine}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-gap-md border-t border-border-subtle pt-base">
              {dataset.distribution.map((row) => (
                <BarListRow
                  key={row.name}
                  layout="inline"
                  name={row.name}
                  value={row.value}
                  percent={row.percent}
                />
              ))}
            </div>
          </article>

          {dataset.showTrend ? (
            <PanelCard title="Rating over time">
              <div className="flex h-20 items-end gap-2xs px-lg pt-base">
                {reviewMonths.map((col) => (
                  <div
                    key={col.month}
                    className="flex min-w-0 flex-1 flex-col items-center justify-end gap-[6px]"
                  >
                    <span
                      className={cn(
                        "w-full rounded-t-xs rounded-b-[2px]",
                        col.peak ? "bg-brand-gradient" : "bg-accent-amber-light",
                      )}
                      style={{ height: col.height }}
                    />
                    <p className="text-[11px] font-semibold text-ink-faint">
                      {col.month}
                    </p>
                  </div>
                ))}
              </div>
              <p className="px-lg pt-xs pb-base text-[12.5px] leading-[1.5] font-medium text-ink-muted">
                Steady around 4.7 — the March dip traces to Spring Comedy Slam's
                sound issues.
              </p>
            </PanelCard>
          ) : null}

          {dataset.explainer.kind === "note" ? (
            <NoteCard
              tone="warm"
              lead={dataset.explainer.lead}
              body={dataset.explainer.body}
            />
          ) : (
            <p className="rounded-[16px] bg-surface-canvas px-[18px] py-base text-[12.5px] leading-[1.55] font-medium text-ink-muted">
              {dataset.explainer.body}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-lg">
          <div className="flex flex-wrap items-center gap-2xs">
            {dataset.filters.map((item) =>
              item.stars ? (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setFilter(item.id)
                  }}
                  className={cn(
                    "inline-flex h-9 items-center gap-3xs rounded-pill border px-sm text-[13.5px] font-medium",
                    filter === item.id
                      ? "border-transparent bg-brand-gradient text-ink-inverse"
                      : "border-border-default bg-surface-card text-ink-primary",
                  )}
                >
                  {item.label}
                  <StarIcon className="size-3" weight="fill" />
                  {item.suffix ? <span>{item.suffix}</span> : null}
                </button>
              ) : (
                <FilterPill
                  key={item.id}
                  label={item.label}
                  state={filter === item.id ? "active" : "idle"}
                  onClick={() => {
                    setFilter(item.id)
                  }}
                />
              ),
            )}
            <ClosedDropdown label={dataset.eventDropdown} />
          </div>

          <section className="overflow-hidden rounded-lg border border-border-default bg-surface-card">
            {visible.map((review) => (
              <ReviewRow key={review.id} review={review} />
            ))}
            <ListFooter buttonLabel="Show 24 more" meta={dataset.footerMeta} />
          </section>
        </div>
      </div>
    </main>
  )
}

function ReviewRow({ review }: { review: ReviewItem }) {
  return (
    <article
      className={cn(
        "flex flex-col gap-2xs border-b border-border-subtle px-lg py-base",
        review.reported && "bg-surface-canvas",
      )}
    >
      <div className="flex items-start justify-between gap-sm">
        <div className="flex items-center gap-2xs">
          <Avatar
            initials={review.initials}
            size={38}
            tone={review.reported ? "muted" : "brand"}
          />
          <div className="flex flex-col gap-[3px]">
            <div className="flex flex-wrap items-center gap-2xs">
              <p className="text-[13.5px] font-bold text-ink-primary">
                {review.author}
              </p>
              <StarRating value={review.stars} />
            </div>
            <p className="text-[12px] font-medium text-ink-faint">{review.meta}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2xs">
          {review.reported ? (
            <StatusBadge label="Report under assessment" />
          ) : null}
          <AppButton
            variant="secondary"
            size="m"
            className="h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"
          >
            {review.reported ? "View status" : "Report"}
          </AppButton>
        </div>
      </div>
      <p className="text-[13.5px] leading-[1.65] text-ink-muted">{review.body}</p>
    </article>
  )
}
