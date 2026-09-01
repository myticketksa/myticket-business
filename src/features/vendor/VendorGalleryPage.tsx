import {
  DotsSixVerticalIcon,
  EyeIcon,
  FileTextIcon,
  PlayIcon,
  PlusIcon,
} from "@phosphor-icons/react"
import { useNavigate } from "react-router"
import { HatchPlaceholder } from "@/components/biz/hatch-placeholder"
import { PageHead } from "@/components/biz/page-head"
import { AppButton } from "@/components/primitive/app-button"
import { StatusBadge } from "@/components/primitive/status-badge"
import {
  vendorGalleryItems,
  type VendorGalleryItem,
} from "@/mocks/vendor-gallery"
import { cn } from "@/lib/utils"

export function VendorGalleryPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-[22px] px-gutter pt-8 pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead
          eyebrow="Presence"
          title="Gallery"
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

      <ul className="grid grid-cols-1 gap-md sm:grid-cols-2 xl:grid-cols-4">
        {vendorGalleryItems.map((item) => (
          <li key={item.id}>
            <GalleryCard item={item} />
          </li>
        ))}
        <li>
          <button
            type="button"
            className="flex h-full min-h-[260px] w-full flex-col items-center justify-center gap-gap-md rounded-[16px] border-[1.5px] border-dashed border-border-strong px-lg py-xl"
          >
            <span className="inline-flex size-[46px] items-center justify-center rounded-pill bg-surface-brand-wash text-brand-primary">
              <PlusIcon className="size-5" weight="bold" />
            </span>
            <p className="text-[14px] font-bold text-ink-primary">
              Add a gallery item
            </p>
            <p className="max-w-[218px] text-center text-[12.5px] leading-[1.5] font-medium text-ink-muted">
              Photos of real service, a walkthrough video, or credentials.
              Galleries that show scale (covers/day) win more enquiries.
            </p>
          </button>
        </li>
      </ul>

      <article className="rounded-lg border border-border-default bg-surface-card px-[22px] py-lg">
        <p className="text-[13.5px] leading-[1.55] text-ink-muted">
          <span className="font-bold text-ink-primary">How review works: </span>
          every added or replaced item goes to MyTicket for review before
          appearing publicly. Approved items stay live while replacements are
          reviewed. Declined items show the reviewer’s reason and can be
          replaced and resubmitted.
        </p>
      </article>
    </main>
  )
}

function GalleryCard({ item }: { item: VendorGalleryItem }) {
  const navigate = useNavigate()
  const declined = item.status === "Declined"
  const expiring = item.status.startsWith("Expiring")
  const showHandle = !declined && item.kind !== "document"

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
        {item.kind === "document" ? (
          <div className="flex h-[183px] w-full flex-col items-center justify-center gap-2xs rounded-[14px] bg-surface-canvas">
            <FileTextIcon className="size-[30px] text-ink-muted" />
            <p className="px-2xs text-center text-[11px] font-bold text-ink-muted">
              {item.mediaCaption}
            </p>
          </div>
        ) : (
          <HatchPlaceholder
            caption={item.mediaCaption}
            className={cn(
              "h-[183px] w-full rounded-[14px]",
              declined && "opacity-70",
            )}
          />
        )}
        {item.lead ? (
          <span className="absolute top-2xs left-2xs rounded-badge bg-brand-gradient px-[10px] py-3xs text-[11px] font-extrabold text-ink-inverse">
            Lead item
          </span>
        ) : null}
        {item.kind === "video" && !declined ? (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex size-[46px] items-center justify-center rounded-pill bg-surface-inverse text-ink-inverse">
              <PlayIcon className="size-5" weight="fill" />
            </span>
          </span>
        ) : null}
        {showHandle ? (
          <DotsSixVerticalIcon className="absolute top-2xs right-2xs size-4 text-ink-faint" />
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-[6px] px-3xs">
        <p className="text-[13.5px] font-bold text-ink-primary">{item.title}</p>
        <StatusBadge label={item.status} />
      </div>
      {item.caption ? (
        <p className="px-3xs text-[12px] font-medium text-ink-muted">
          {item.caption}
        </p>
      ) : null}
      {item.reason ? (
        <p className="px-3xs text-[12px] leading-[1.5] font-semibold text-status-danger-strong">
          {item.reason}
        </p>
      ) : null}
      {item.note ? (
        <p className="px-3xs text-[11.5px] leading-[1.45] font-medium text-ink-faint">
          {item.note}
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
      ) : expiring ? (
        <div className="mt-auto flex flex-wrap items-center gap-2xs px-3xs">
          <AppButton size="m" className="h-[42px] flex-1">
            Replace
          </AppButton>
          <AppButton
            variant="ghost"
            size="m"
            className="h-[42px] flex-1 text-ink-muted"
            onClick={() => {
              navigate("/app/profile")
            }}
          >
            All credentials
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
