import {
  CalendarCheckIcon,
  MapPinIcon,
  MapPinPlusIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react"
import { HatchPlaceholder } from "@/components/biz/hatch-placeholder"
import { PageHead } from "@/components/biz/page-head"
import { AppButton } from "@/components/primitive/app-button"
import {
  organizerVenues,
  organizerVenuesAddTile,
  organizerVenuesSub,
  type OrganizerVenue,
} from "@/mocks/organizer-venues"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

const dangerClass =
  "h-[42px] border-status-danger text-status-danger hover:bg-status-danger-light"

export function OrganizerVenuesPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-lg px-gutter pt-8 pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead eyebrow="Operate" title="Venues" sub={organizerVenuesSub} />
        <AppButton
          size="m"
          className="h-[42px]"
          icon={<MapPinPlusIcon className="size-[18px]" />}
        >
          Add venue
        </AppButton>
      </div>

      <section className="grid grid-cols-1 gap-md md:grid-cols-2 xl:grid-cols-3">
        {organizerVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
        <button
          type="button"
          className="flex min-h-[300px] flex-col items-center justify-center gap-xs rounded-lg border-[1.5px] border-dashed border-border-default p-xl text-center"
        >
          <span className="inline-flex size-[46px] items-center justify-center rounded-[23px] bg-surface-brand-wash text-brand-primary">
            <MapPinPlusIcon className="size-[22px]" />
          </span>
          <p className="text-[14px] font-bold text-ink-primary">
            {organizerVenuesAddTile.title}
          </p>
          <p className="max-w-[312px] text-[12.5px] font-medium leading-[1.45] text-ink-muted">
            {organizerVenuesAddTile.body}
          </p>
        </button>
      </section>
    </main>
  )
}

function VenueCard({ venue }: { venue: OrganizerVenue }) {
  return (
    <article className="flex flex-col overflow-clip rounded-lg border border-border-default bg-surface-card">
      <div className="relative h-[145px]">
        <HatchPlaceholder
          caption={venue.mapCaption}
          className="h-[130px] w-full rounded-[14px]"
        />
        <span className="absolute top-[10px] left-[10px] rounded-[10px] bg-surface-card px-2xs py-[3px] text-[11px] font-bold text-ink-primary">
          {venue.region}
        </span>
        <span className="absolute top-[115px] left-[14px] flex size-[30px] items-center justify-center rounded-[15px] border-[3px] border-white bg-brand-gradient">
          <MapPinIcon className="size-[15px] text-ink-inverse" weight="fill" />
        </span>
      </div>
      <div className="flex flex-col gap-gap-md px-md pt-[22px] pb-md">
        <h2 className="text-[15.5px] font-bold text-ink-primary">{venue.name}</h2>
        <p className="text-[12.5px] font-medium text-ink-muted">{venue.address}</p>
        <div className="flex items-center gap-sm text-[12px] font-semibold text-ink-muted">
          <span className="inline-flex items-center gap-[5px]">
            <UsersThreeIcon className="size-[14px]" />
            {venue.capacity}
          </span>
          <span className="inline-flex items-center gap-[5px]">
            <CalendarCheckIcon className="size-[14px]" />
            {venue.eventsHeld}
          </span>
        </div>
        <div className="flex flex-wrap gap-gap-sm">
          {venue.facilities.map((facility) => (
            <span
              key={facility}
              className="rounded-[9px] border border-border-default bg-surface-canvas px-[9px] py-[4px] text-[11.5px] font-semibold text-ink-muted"
            >
              {facility}
            </span>
          ))}
        </div>
        <div className="flex items-start gap-2xs border-t border-border-subtle pt-sm">
          <AppButton variant="secondary" size="m" className={secondaryClass}>
            Edit
          </AppButton>
          {venue.canDelete ? (
            <AppButton variant="secondary" size="m" className={dangerClass}>
              Delete
            </AppButton>
          ) : (
            <div className="flex flex-col gap-gap-sm">
              <span className="inline-flex h-10 cursor-not-allowed items-center rounded-[20px] bg-surface-sold px-lg text-[14px] font-semibold text-ink-disabled">
                Delete
              </span>
              {venue.deleteBlockedReason ? (
                <p className="max-w-[200px] text-[11.5px] font-semibold leading-normal text-accent-amber">
                  {venue.deleteBlockedReason}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
