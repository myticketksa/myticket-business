import { Navigate, useNavigate, useParams } from "react-router"
import {
  ArrowUpRightIcon,
  BookmarkSimpleIcon,
  CalendarPlusIcon,
  CheckIcon,
  CircleIcon,
  EyeSlashIcon,
  PlayIcon,
  StarIcon,
} from "@phosphor-icons/react"
import { PanelCard } from "@/components/biz/bar-list-row"
import { HatchPlaceholder } from "@/components/biz/hatch-placeholder"
import { AppButton } from "@/components/primitive/app-button"

const portfolio = [
  { caption: "showreel video", play: true },
  { caption: "Mawazine set photo", play: false },
  { caption: "Taqasim audio", play: true },
  { caption: "gala performance", play: false },
  { caption: "press feature", play: false },
  { caption: "ensemble photo", play: false },
]

const glance = [
  { label: "Categories", value: "Oud · Traditional · Fusion" },
  { label: "Based in", value: "Riyadh" },
  { label: "Travels", value: "Kingdom-wide" },
  { label: "On MyTicket since", value: "2024" },
  { label: "Links", value: "Instagram · YouTube" },
]

const appearing = [
  { title: "Winter Nights: Amr Diab Live", meta: "12 Nov · your event" },
  { title: "Corniche Nights Festival", meta: "3–5 Dec · Jeddah Season" },
]

export function MarketplaceProfilePage() {
  const navigate = useNavigate()
  const { profileId } = useParams()

  if (profileId !== "lina-hakim") {
    return <Navigate to="/app/marketplace" replace />
  }

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-lg px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <article className="flex flex-col gap-xl rounded-lg border border-border-default bg-surface-card p-xl md:flex-row">
        <HatchPlaceholder
          caption="talent photo"
          className="size-[128px] shrink-0 rounded-[24px]"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-2xs">
          <div className="flex flex-wrap items-center gap-2xs">
            <h1 className="text-[26px] font-extrabold tracking-[-0.78px] text-ink-primary">
              Lina Hakim
            </h1>
            <span className="inline-flex items-center gap-[5px] rounded-badge bg-status-success-light px-[9px] py-3xs text-[11.5px] font-bold text-status-success">
              <CheckIcon className="size-3" weight="bold" />
              Verified
            </span>
            <span className="inline-flex items-center gap-[5px] rounded-badge bg-status-success-light px-[9px] py-3xs text-[11.5px] font-bold text-status-success">
              <CircleIcon className="size-3" weight="fill" />
              Available
            </span>
          </div>
          <p className="text-[13.5px] font-medium text-ink-muted">
            Oud soloist · Traditional & fusion · Riyadh · travels Kingdom-wide
          </p>
          <p className="inline-flex flex-wrap items-center gap-[6px] text-[13px] font-bold text-ink-primary">
            <StarIcon className="size-3.5 text-brand-primary" weight="fill" />
            4.9 (86 reviews)
            <span className="font-medium text-ink-muted">
              · 41 engagements completed on MyTicket
            </span>
          </p>
          <p className="text-[13.5px] leading-[1.55] text-ink-muted">
            Classically trained oud performer blending traditional maqamat with
            contemporary arrangements. Solo sets, duo with percussion, or full
            ensemble for galas, festivals and cultural evenings.
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col items-stretch gap-2xs md:w-[220px] md:items-end">
          <AppButton
            size="m"
            className="h-[42px]"
            onClick={() => {
              navigate("/app/hire-requests")
            }}
          >
            Contact Lina
          </AppButton>
          <AppButton
            variant="secondary"
            size="m"
            icon={<CalendarPlusIcon className="size-4" />}
            className="h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"
          >
            Attach to event
          </AppButton>
          <AppButton
            variant="secondary"
            size="m"
            icon={<BookmarkSimpleIcon className="size-4" weight="fill" />}
            className="h-[42px] border-border-default text-brand-primary hover:bg-surface-tint"
          >
            Shortlisted
          </AppButton>
          <a
            href="https://myticket.sa"
            className="inline-flex items-center gap-3xs text-[12.5px] font-semibold text-brand-primary"
          >
            View public profile
            <ArrowUpRightIcon className="size-3" />
          </a>
        </div>
      </article>

      <div className="grid grid-cols-1 gap-base xl:grid-cols-3">
        <IntelTile
          title="Responds to 96% of requests"
          body="usually within 6 hours — top 5% of talents"
        />
        <IntelTile
          title="You've worked together twice"
          body="Autumn Jazz Evening (5/5 both ways) · Eid Family Festival"
        />
        <IntelTile
          title="Attached to 1 of your events"
          body="Winter Nights lineup · doors-open set, accepted"
        />
      </div>

      <div className="grid grid-cols-1 gap-lg xl:grid-cols-[minmax(0,668px)_minmax(0,432px)]">
        <PanelCard title="Portfolio">
          <div className="flex flex-wrap gap-xs px-lg pt-lg">
            {portfolio.map((item) => (
              <div
                key={item.caption}
                className="relative h-[138px] w-[201px] overflow-hidden rounded-sm"
              >
                <HatchPlaceholder caption={item.caption} className="size-full" />
                {item.play ? (
                  <span className="absolute top-1/2 left-1/2 inline-flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill bg-surface-inverse text-ink-inverse">
                    <PlayIcon className="size-3.5" weight="fill" />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <div className="border-t border-border-subtle px-lg pt-base">
            <h3 className="text-[14px] font-bold text-ink-primary">
              Recent reviews from organizers
            </h3>
          </div>
          <div className="flex flex-col gap-xs px-lg pt-xs pb-lg">
            <Review
              author="Riyadh Events Co. (you)"
              when="· 2 weeks ago"
              body="Flawless — arrived early, read the room, encore demanded. Booked again for Winter Nights."
            />
            <Review
              author="Star Productions"
              when="· 1 month ago"
              body="Professional from first message to final bow. Exactly the calibre our corporate clients expect."
            />
          </div>
        </PanelCard>

        <div className="flex flex-col gap-lg">
          <PanelCard title="At a glance">
            <dl className="flex flex-col gap-xs px-lg py-md">
              {glance.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-sm text-[13px]"
                >
                  <dt className="font-medium text-ink-faint">{row.label}</dt>
                  <dd className="max-w-[220px] text-right font-bold text-ink-primary">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </PanelCard>

          <PanelCard title="Appearing at">
            <ul>
              {appearing.map((event) => (
                <li
                  key={event.title}
                  className="border-b border-border-subtle px-lg py-sm last:border-b-0"
                >
                  <p className="text-[13.5px] font-bold text-ink-primary">
                    {event.title}
                  </p>
                  <p className="text-[12px] font-medium text-ink-faint">
                    {event.meta}
                  </p>
                </li>
              ))}
            </ul>
          </PanelCard>

          <p className="rounded-md bg-surface-canvas px-md py-base text-[12.5px] leading-[1.5] font-medium text-ink-muted">
            MyTicket hosts the introduction and records outcomes. Contracts,
            pricing and payment happen directly between you and Lina, outside
            MyTicket.
          </p>
        </div>
      </div>
    </main>
  )
}

function IntelTile({ title, body }: { title: string; body: string }) {
  return (
    <aside className="flex flex-col gap-[6px] rounded-md bg-surface-brand-wash px-md py-base">
      <p className="inline-flex items-center gap-[6px] text-[10.5px] font-bold tracking-[0.63px] text-accent-amber uppercase">
        <EyeSlashIcon className="size-3" weight="regular" />
        Only you see this
      </p>
      <p className="text-[14px] font-bold text-ink-primary">{title}</p>
      <p className="text-[12.5px] leading-[1.45] font-medium text-ink-muted">
        {body}
      </p>
    </aside>
  )
}

function Review({
  author,
  when,
  body,
}: {
  author: string
  when: string
  body: string
}) {
  return (
    <div className="flex flex-col gap-3xs">
      <div className="flex flex-wrap items-center gap-2xs">
        <p className="text-[13px] font-bold text-ink-primary">{author}</p>
        <span className="inline-flex gap-[2px] text-brand-primary">
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon key={index} className="size-2.5" weight="fill" />
          ))}
        </span>
        <p className="text-[12px] font-medium text-ink-faint">{when}</p>
      </div>
      <p className="text-[12.5px] leading-[1.45] font-medium text-ink-muted">
        {body}
      </p>
    </div>
  )
}
