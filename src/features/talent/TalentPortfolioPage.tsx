import {
  DotsSixVerticalIcon,
  EyeIcon,
  PlayIcon,
  PlusIcon,
} from "@phosphor-icons/react"
import { AlertBanner } from "@/components/biz/alert-banner"
import { HatchPlaceholder } from "@/components/biz/hatch-placeholder"
import { PageHead } from "@/components/biz/page-head"
import { AppButton } from "@/components/primitive/app-button"
import { StatusBadge } from "@/components/primitive/status-badge"
import {
  talentPortfolioItems,
  type TalentPortfolioItem,
} from "@/mocks/talent-portfolio"
import { cn } from "@/lib/utils"

export function TalentPortfolioPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-[22px] px-gutter pt-8 pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead
          eyebrow="Presence"
          title="Portfolio"
          sub="What organizers see when deciding to hire you. Drag to reorder — the lead item opens your public profile."
        />
        <div className="flex flex-wrap items-center gap-2xs">
          <AppButton
            variant="secondary"
            size="m"
            icon={<EyeIcon className="size-[18px]" />}
            className="border-border-default text-ink-primary hover:bg-surface-tint"
          >
            Preview as public
          </AppButton>
          <AppButton size="m" icon={<PlusIcon className="size-[18px]" weight="bold" />}>
            Add item
          </AppButton>
        </div>
      </div>

      <AlertBanner
        tone="brand"
        lead="1 change under review."
        body="Your new showreel was submitted Thu and is being reviewed by MyTicket. Your previously approved portfolio stays publicly visible until the change is approved — nothing has been taken down."
      />

      <ul className="grid grid-cols-1 gap-md sm:grid-cols-2 xl:grid-cols-4">
        {talentPortfolioItems.map((item) => (
          <li key={item.id}>
            <PortfolioCard item={item} />
          </li>
        ))}
        <li>
          <button
            type="button"
            className="flex h-full min-h-[341px] w-full flex-col items-center justify-center gap-gap-md rounded-[16px] border-[1.5px] border-dashed border-border-strong px-lg py-xl"
          >
            <span className="inline-flex size-[46px] items-center justify-center rounded-pill bg-surface-brand-wash text-brand-primary">
              <PlusIcon className="size-5" weight="bold" />
            </span>
            <p className="text-[14px] font-bold text-ink-primary">
              Add a portfolio item
            </p>
            <p className="max-w-[218px] text-center text-[12.5px] leading-[1.5] font-medium text-ink-muted">
              Images, video, audio or credentials. Strong portfolios lead with a
              live-performance video.
            </p>
          </button>
        </li>
      </ul>

      <article className="rounded-lg border border-border-default bg-surface-card px-[22px] py-lg">
        <p className="text-[13.5px] leading-[1.55] text-ink-muted">
          <span className="font-bold text-ink-primary">How review works: </span>
          every added or replaced item goes to MyTicket for review before it
          appears publicly. Approved items stay live while their replacements are
          reviewed. Declined items show the reviewer’s reason and can be
          replaced and resubmitted — declines are routine, not final.
        </p>
      </article>
    </main>
  )
}

function PortfolioCard({ item }: { item: TalentPortfolioItem }) {
  const declined = item.status === "Declined"

  return (
    <article
      className={cn(
        "flex h-full flex-col gap-gap-md overflow-hidden rounded-[16px] border px-xs pt-xs pb-sm",
        item.lead
          ? "border-[1.5px] border-brand-primary bg-surface-card"
          : declined
            ? "border-status-danger-border bg-status-danger-light"
            : "border-border-default bg-surface-card",
      )}
    >
      <div className="relative">
        <HatchPlaceholder
          caption={item.mediaCaption}
          className={cn(
            "h-[183px] w-full rounded-[14px]",
            declined && "opacity-70",
          )}
        />
        {item.lead ? (
          <span className="absolute top-2xs left-2xs rounded-badge bg-brand-gradient px-[10px] py-3xs text-[11px] font-extrabold text-ink-inverse">
            Lead item
          </span>
        ) : null}
        {item.kind === "video" ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex size-[46px] items-center justify-center rounded-pill bg-surface-inverse text-ink-inverse">
              <PlayIcon className="size-5" weight="fill" />
            </span>
          </span>
        ) : null}
        {item.kind === "audio" ? (
          <span className="absolute inset-x-2xs bottom-2xs flex h-[26px] items-center gap-2xs rounded-[13px] bg-surface-inverse px-[10px]">
            <PlayIcon className="size-3 text-ink-inverse" weight="fill" />
            <span className="h-[3px] min-w-0 flex-1 overflow-hidden rounded-[2px] bg-surface-card">
              <span className="block h-full w-[65px] rounded-[2px] bg-brand-light" />
            </span>
            <span className="text-[10.5px] font-bold text-ink-inverse">
              {item.duration}
            </span>
          </span>
        ) : null}
        {item.status !== "Declined" ? (
          <DotsSixVerticalIcon className="absolute top-2xs right-2xs size-4 text-ink-faint" />
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-[6px] px-3xs">
        <p className="text-[13.5px] font-bold text-ink-primary">{item.title}</p>
        <StatusBadge label={item.status} />
      </div>
      {item.caption ? (
        <p className="px-3xs text-[12px] font-medium text-ink-muted">{item.caption}</p>
      ) : null}
      {item.note ? (
        <p className="px-3xs text-[11.5px] leading-[1.45] font-medium text-ink-faint">
          {item.note}
        </p>
      ) : null}
      {item.reason ? (
        <p className="px-3xs text-[12px] leading-[1.5] font-semibold text-status-danger-strong">
          {item.reason}
        </p>
      ) : null}

      {item.status === "Under review" ? null : declined ? (
        <div className="mt-auto flex flex-wrap gap-2xs px-3xs">
          <AppButton size="m" className="h-[42px]">
            Replace &amp; resubmit
          </AppButton>
          <AppButton variant="ghost" size="m" className="h-[42px] text-ink-muted">
            Remove
          </AppButton>
        </div>
      ) : (
        <div className="mt-auto flex gap-2xs px-3xs">
          <AppButton
            variant="secondary"
            size="m"
            className="h-[42px] flex-1 border-border-default text-ink-primary hover:bg-surface-tint"
          >
            Replace
          </AppButton>
          <AppButton variant="ghost" size="m" className="h-[42px] flex-1 text-ink-muted">
            Remove
          </AppButton>
        </div>
      )}
    </article>
  )
}
