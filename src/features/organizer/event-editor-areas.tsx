import type { ReactNode } from "react"
import { useNavigate } from "react-router"
import {
  CalendarBlankIcon,
  CalendarXIcon,
  CaretDownIcon,
  CheckIcon,
  DotsSixVerticalIcon,
  GlobeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PencilSimpleIcon,
  PlusIcon,
  XIcon,
} from "@phosphor-icons/react"
import { HatchPlaceholder } from "@/components/biz/hatch-placeholder"
import { AppButton } from "@/components/primitive/app-button"
import { AppSelect } from "@/components/primitive/app-select"
import { AppTextarea } from "@/components/primitive/app-textarea"
import { Avatar } from "@/components/primitive/avatar"
import { CheckboxField } from "@/components/primitive/checkbox-field"
import { RadioField } from "@/components/primitive/radio-field"
import { TextInput } from "@/components/primitive/text-input"
import { ToggleField } from "@/components/primitive/toggle-field"
import { cn } from "@/lib/utils"
import {
  additionalImageCaptions,
  editorLineupTalents,
  editorLineupVendors,
  editorPublicPreviewMeta,
  editorRefundPreview,
  editorReviewChecks,
  editorSubmitNote,
  editorTicketTypes,
  editorTimezoneNote,
  editorVenue,
  eventEditorCategoryOptions,
  eventEditorGates,
} from "@/mocks/event-editor"
import type { EventEditorValues } from "@/schemas/event-editor"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

const fieldClass =
  "h-11 rounded-sm border-border-default bg-surface-card px-sm text-[14px] text-ink-primary placeholder:text-ink-placeholder focus-visible:border-[1.5px] focus-visible:border-brand-primary focus-visible:ring-0"

interface AreaCardProps {
  id: string
  title: string
  sub: string
  action?: ReactNode
  accent?: boolean
  children: ReactNode
}

function AreaCard({ id, title, sub, action, accent, children }: AreaCardProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-xl overflow-hidden rounded-lg border bg-surface-card",
        accent ? "border-[1.5px] border-brand-primary" : "border-border-default",
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-sm border-b border-border-subtle px-xl py-md">
        <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <h2 className="text-[17px] font-bold text-ink-primary">{title}</h2>
          <p className="text-[12.5px] font-normal text-ink-faint">{sub}</p>
        </div>
        {action}
      </header>
      {children}
    </section>
  )
}

function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3xs text-[13px]">
      <span className="font-semibold text-ink-primary">{label}</span>
      {hint ? <span className="font-medium text-ink-faint">{hint}</span> : null}
    </div>
  )
}

interface EditorAreasProps {
  eventId: string
  values: EventEditorValues
  onPatch: <K extends keyof EventEditorValues>(
    key: K,
    value: EventEditorValues[K],
  ) => void
}

export function EditorAreas({ eventId, values, onPatch }: EditorAreasProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-lg">
      <AreaCard
        id="area-basics"
        title="Area 1 · Basics"
        sub="Title, description, category and imagery — how this event is listed and read."
      >
        <div className="flex flex-col gap-md px-xl py-lg">
          <div className="flex flex-col gap-[7px]">
            <FieldLabel label="Title" />
            <TextInput
              id="event-title"
              value={values.title}
              onChange={(event) => {
                onPatch("title", event.target.value)
              }}
            />
          </div>
          <div className="flex flex-col gap-[7px]">
            <FieldLabel
              label="Short summary"
              hint="— used wherever this event is listed briefly"
            />
            <TextInput
              id="event-summary"
              value={values.shortSummary}
              onChange={(event) => {
                onPatch("shortSummary", event.target.value)
              }}
            />
          </div>
          <div className="flex flex-col gap-[7px]">
            <FieldLabel label="Full description" />
            <AppTextarea
              id="event-description"
              value={values.description}
              onChange={(event) => {
                onPatch("description", event.target.value)
              }}
            />
          </div>
          <div className="grid grid-cols-1 gap-base md:grid-cols-2">
            <div className="flex flex-col gap-[7px]">
              <FieldLabel label="Category" />
              <AppSelect
                id="event-category"
                placeholder="Select"
                value={values.category || undefined}
                options={eventEditorCategoryOptions}
                onValueChange={(value) => {
                  onPatch("category", value)
                }}
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <FieldLabel label="Promotional video link" hint="— optional" />
              <TextInput
                id="event-promo"
                value={values.promoVideo}
                onChange={(event) => {
                  onPatch("promoVideo", event.target.value)
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[7px]">
            <FieldLabel label="Cover image" />
            <div className="flex items-center gap-sm">
              <HatchPlaceholder
                caption="cover"
                className="h-[88px] w-[140px] overflow-hidden rounded-sm"
              />
              <AppButton
                variant="secondary"
                size="s"
                className="h-[38px] border-border-default text-ink-primary"
              >
                Replace
              </AppButton>
            </div>
          </div>
          <div className="flex flex-col gap-[7px]">
            <FieldLabel label="Additional images" />
            <div className="flex flex-wrap gap-gap-md">
              {additionalImageCaptions.map((caption) => (
                <HatchPlaceholder
                  key={caption}
                  caption={caption}
                  className="h-[72px] w-[96px] overflow-hidden rounded-[10px]"
                />
              ))}
              <button
                type="button"
                aria-label="Add image"
                className="flex h-[72px] w-[96px] items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-border-default text-brand-primary"
              >
                <PlusIcon className="size-[17px]" weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </AreaCard>

      <AreaCard
        id="area-schedule"
        title="Area 2 · When it happens"
        sub="Start, end, repetition and the timezone customers will see."
      >
        <div className="flex flex-col gap-md px-xl py-lg">
          <div className="grid grid-cols-1 gap-base md:grid-cols-2">
            <IconField
              id="event-starts"
              label="Starts"
              icon={<CalendarBlankIcon className="size-4 text-brand-primary" />}
              value={values.starts}
              onChange={(value) => {
                onPatch("starts", value)
              }}
            />
            <IconField
              id="event-ends"
              label="Ends"
              icon={<CalendarBlankIcon className="size-4 text-brand-primary" />}
              value={values.ends}
              onChange={(value) => {
                onPatch("ends", value)
              }}
            />
          </div>
          <fieldset className="flex flex-col gap-[9px]">
            <FieldLabel label="Repetition" />
            <RadioField
              value={values.repetition}
              onValueChange={(value) => {
                onPatch("repetition", value)
              }}
              options={[
                { value: "one-time", label: "One-time event" },
                { value: "pattern", label: "Repeats on a pattern" },
              ]}
            />
          </fieldset>
          <div className="flex items-center gap-gap-md rounded-md border border-border-default bg-surface-brand-wash px-base py-sm">
            <GlobeIcon className="size-[17px] shrink-0 text-brand-primary" />
            <p className="text-[12.5px] font-medium leading-[1.5] text-ink-muted">
              {editorTimezoneNote.before}
              <span className="font-bold text-ink-primary">
                {editorTimezoneNote.strong}
              </span>
              {editorTimezoneNote.after}
            </p>
          </div>
        </div>
      </AreaCard>

      <AreaCard
        id="area-venue"
        title="Area 3 · Where it happens"
        sub="Chosen from your saved venues, or entered directly for this event."
        action={
          <AppButton
            variant="secondary"
            size="s"
            className="h-[38px] border-border-default text-ink-primary"
          >
            Choose a saved venue
          </AppButton>
        }
      >
        <div className="flex items-center gap-lg px-xl py-lg">
          <div className="relative flex h-[88px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-sm">
            <HatchPlaceholder className="absolute inset-0" />
            <MapPinIcon className="relative size-5 text-ink-muted" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
            <p className="text-[15px] font-bold text-ink-primary">{editorVenue.name}</p>
            <p className="text-[13px] text-ink-muted">{editorVenue.address}</p>
            <p className="text-[12.5px] text-ink-faint">{editorVenue.facts}</p>
          </div>
          <button type="button" className="shrink-0 text-[13px] font-semibold text-brand-primary">
            Edit venue details
          </button>
        </div>
      </AreaCard>

      <AreaCard
        id="area-tickets"
        title="Area 4 · Tickets"
        sub="What exists, what it costs, and when it’s on sale. Public price range shows automatically: SAR 180 – 850."
        action={
          <AppButton
            size="s"
            className="h-9"
            icon={<PlusIcon className="size-[18px]" weight="bold" />}
          >
            Add ticket type
          </AppButton>
        }
      >
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="flex items-center gap-gap-md border-b border-border-subtle bg-surface-canvas px-xl py-[10px] text-[11.5px] font-bold tracking-[0.345px] text-ink-faint uppercase">
              <div className="w-6 shrink-0" />
              <p className="min-w-0 flex-1">Ticket type</p>
              <SortCol className="w-[100px]" label="Price" />
              <SortCol className="w-[96px]" label="Quantity" />
              <SortCol className="w-16" label="Sold" />
              <SortCol className="w-[100px]" label="Revenue" />
              <p className="w-[70px] shrink-0">On sale</p>
              <div className="w-7 shrink-0" />
            </div>
            {editorTicketTypes.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "flex items-center gap-gap-md border-b border-border-subtle px-xl py-xs",
                  tier.error && "bg-status-danger-light",
                )}
              >
                <DotsSixVerticalIcon className="size-4 w-6 shrink-0 text-ink-faint" />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-bold text-ink-primary">{tier.name}</p>
                  <p
                    className={cn(
                      "text-[12px] font-medium",
                      tier.error ? "text-status-danger" : "text-ink-muted",
                    )}
                  >
                    {tier.desc}
                  </p>
                </div>
                <p className="w-[100px] shrink-0 text-right text-[13.5px] font-semibold text-ink-primary">
                  {tier.price}
                </p>
                <p
                  className={cn(
                    "w-[96px] shrink-0 text-right text-[13.5px]",
                    tier.error
                      ? "font-bold text-status-danger"
                      : "font-semibold text-ink-primary",
                  )}
                >
                  {tier.quantity}
                </p>
                <p className="w-16 shrink-0 text-right text-[13.5px] font-semibold text-ink-muted">
                  {tier.sold}
                </p>
                <p className="w-[100px] shrink-0 text-right text-[13.5px] font-bold text-ink-primary">
                  {tier.revenue}
                </p>
                <div className="flex w-[70px] shrink-0 justify-center">
                  <ToggleField
                    id={`tier-${tier.name}`}
                    checked={tier.onSale}
                    onCheckedChange={() => undefined}
                  />
                </div>
                <button
                  type="button"
                  aria-label={`Edit ${tier.name}`}
                  className="flex w-7 shrink-0 justify-center text-ink-muted"
                >
                  <PencilSimpleIcon className="size-[15px]" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-lg border-t border-border-subtle px-xl py-base md:grid-cols-3">
          <IconField
            id="sales-open"
            label="Sales open"
            icon={<CalendarBlankIcon className="size-4 text-brand-primary" />}
            value="Thu 1 Oct · 10:00"
          />
          <div className="flex flex-col gap-[7px]">
            <FieldLabel label="Sales close" />
            <div className="relative">
              <CalendarXIcon className="pointer-events-none absolute top-1/2 left-sm size-4 -translate-y-1/2 text-status-danger" />
              <input
                id="sales-close"
                readOnly
                value="Choose an end date…"
                className={cn(
                  fieldClass,
                  "w-full border-[1.5px] border-status-danger bg-status-danger-light pl-10 text-status-danger",
                )}
              />
            </div>
            <p className="text-[12px] font-semibold text-status-danger">
              Required — must be before the event starts.
            </p>
          </div>
          <div className="flex flex-col gap-[7px]">
            <FieldLabel label="Max tickets per buyer" />
            <TextInput id="max-tickets" defaultValue="8" />
          </div>
        </div>
      </AreaCard>

      <AreaCard
        id="area-seating"
        title="Area 5 · Seating"
        sub="Sections layout · 3 named areas · 2,400 seats generated"
        action={
          <div className="flex flex-wrap gap-gap-md">
            <AppButton
              variant="secondary"
              size="m"
              className={secondaryClass}
              onClick={() => {
                navigate(`/app/events/${eventId}/seating`)
              }}
            >
              Open seat builder
            </AppButton>
            <AppButton variant="secondary" size="m" className={secondaryClass}>
              Preview as customer
            </AppButton>
          </div>
        }
      >
        <div className="flex flex-col gap-lg px-xl py-md lg:flex-row lg:items-center">
          <div className="flex min-w-0 flex-1 flex-wrap gap-xl">
            <SeatStat value="2,400" caption="total seats" />
            <SeatStat value="2,186" caption="assigned" tone="success" />
            <SeatStat value="214" caption="unassigned" tone="alert" />
            <SeatStat value="0" caption="sold" />
            <SeatStat value="0" caption="held" />
          </div>
          <p className="w-full rounded-md bg-surface-canvas px-base py-sm text-[12.5px] font-medium leading-[1.45] text-ink-muted lg:w-[320px]">
            Nothing sold yet — the layout can still be regenerated or restructured
            freely. Once a single seat sells or is held in a checkout, structural
            changes lock.
          </p>
        </div>
      </AreaCard>

      <AreaCard
        id="area-refunds"
        title="Area 6 · Refund policy"
        sub="Published word for word on the public event page, in checkout, and on every ticket."
      >
        <div className="grid grid-cols-1 gap-xl px-xl py-lg lg:grid-cols-2">
          <div className="flex flex-col gap-sm">
            <RadioField
              value={values.refunds}
              onValueChange={(value) => {
                onPatch("refunds", value)
              }}
              options={[
                {
                  value: "cutoff",
                  label: "Refunds permitted until a cut-off",
                },
                { value: "none", label: "No refunds for this event" },
              ]}
            />
            <div className="flex flex-col gap-[7px]">
              <FieldLabel label="Cut-off before event start" />
              <button
                type="button"
                className="inline-flex h-11 w-[220px] items-center justify-between rounded-sm border border-border-default bg-surface-card px-sm text-[14px] font-medium text-ink-primary"
              >
                72 hours
                <CaretDownIcon className="size-[14px] text-ink-muted" />
              </button>
            </div>
            <CheckboxField
              id="event-platform-fee"
              label="Platform fee is refundable"
              checked={values.platformFeeRefundable}
              onCheckedChange={(checked) => {
                onPatch("platformFeeRefundable", checked)
              }}
            />
          </div>
          <aside className="flex flex-col gap-gap-md rounded-md border border-border-default bg-surface-footer px-md py-base">
            <p className="text-[12px] font-bold tracking-[0.6px] text-accent-amber uppercase">
              {editorRefundPreview.kicker}
            </p>
            <p className="text-[13.5px] font-medium leading-[1.6] text-ink-primary">
              {editorRefundPreview.body}
            </p>
            <p className="text-[12px] font-medium leading-[1.45] text-ink-faint">
              {editorRefundPreview.footnote}
            </p>
          </aside>
        </div>
      </AreaCard>

      <AreaCard
        id="area-lineup"
        title="Area 7 · Lineup"
        sub="Talents and vendors attached to this event, searched from the marketplace without leaving it."
      >
        <div className="flex flex-col gap-lg px-xl py-lg">
          <LineupGroup label="Talents" people={editorLineupTalents} />
          <LineupGroup label="Vendors" people={editorLineupVendors} />
          <div className="flex h-[46px] items-center gap-gap-md rounded-md border-[1.5px] border-dashed border-border-default px-base">
            <MagnifyingGlassIcon className="size-4 shrink-0 text-ink-faint" />
            <p className="min-w-0 flex-1 text-[13.5px] text-ink-faint">
              Search the marketplace to add a talent or vendor…
            </p>
            <button
              type="button"
              className="shrink-0 text-[13px] font-semibold text-brand-primary"
              onClick={() => {
                navigate("/app/marketplace")
              }}
            >
              Open marketplace
            </button>
          </div>
        </div>
      </AreaCard>

      <AreaCard
        id="area-entry"
        title="Area 8 · Entry"
        sub="How tickets are scanned, what holders are told, and which gates are in use."
      >
        <div className="flex flex-col gap-md px-xl py-lg">
          <fieldset className="flex flex-col gap-[9px]">
            <FieldLabel label="Scanning" />
            <RadioField
              value={values.scanning}
              onValueChange={(value) => {
                onPatch("scanning", value)
              }}
              options={[
                {
                  value: "single",
                  label: "Single entry — a ticket scans once",
                },
                {
                  value: "multiple",
                  label: "Multiple entry — re-entry allowed (multi-day events)",
                },
              ]}
            />
          </fieldset>
          <div className="flex flex-col gap-[7px]">
            <FieldLabel
              label="Entry instructions"
              hint="— shown to ticket holders"
            />
            <AppTextarea
              id="event-entry"
              value={values.entryInstructions}
              onChange={(event) => {
                onPatch("entryInstructions", event.target.value)
              }}
            />
          </div>
          <div className="flex flex-col gap-[9px]">
            <FieldLabel label="Gates in use" />
            <div className="flex flex-wrap gap-2xs">
              {eventEditorGates.map((gate) => (
                <span
                  key={gate}
                  className="inline-flex h-9 items-center gap-2xs rounded-pill border border-border-default bg-surface-card px-sm text-[12.5px] font-semibold text-ink-primary"
                >
                  {gate}
                  <XIcon className="size-3 text-ink-faint" />
                </span>
              ))}
              <button
                type="button"
                className="inline-flex h-9 items-center gap-[6px] rounded-pill border-[1.5px] border-dashed border-border-default px-sm text-[12.5px] font-semibold text-brand-primary"
              >
                <PlusIcon className="size-[13px]" weight="bold" />
                Add gate
              </button>
            </div>
          </div>
        </div>
      </AreaCard>

      <AreaCard
        id="area-review"
        title="Area 9 · Review & submit"
        sub="Everything still missing, a preview of the public page, and the means of submitting for review."
        accent
      >
        <div className="flex flex-col gap-xl px-xl py-lg lg:flex-row">
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-ink-primary">Area by area</p>
            <div className="mt-gap-md">
              {editorReviewChecks.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-gap-md border-b border-border-subtle px-3xs py-[9px]"
                >
                  <span
                    className={cn(
                      "inline-flex size-[18px] shrink-0 items-center justify-center rounded-[9px]",
                      item.done ? "bg-status-success text-ink-inverse" : "bg-surface-skeleton",
                    )}
                  >
                    {item.done ? (
                      <CheckIcon className="size-[11px]" weight="bold" />
                    ) : null}
                  </span>
                  <p className="min-w-0 flex-1 text-[13.5px] font-semibold text-ink-primary">
                    {item.label}
                  </p>
                  {item.note ? (
                    <p className="shrink-0 text-[12.5px] font-semibold text-accent-amber">
                      {item.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-base flex flex-wrap items-center gap-xs">
              <span className="inline-flex h-[46px] items-center rounded-[23px] bg-surface-skeleton px-[22px] text-[14px] font-semibold text-ink-placeholder">
                Submit for review
              </span>
              <p className="min-w-0 flex-1 text-[12.5px] font-medium leading-[1.5] text-ink-faint">
                {editorSubmitNote}
              </p>
            </div>
          </div>
          <article className="w-full overflow-hidden rounded-md border border-border-default bg-surface-card lg:w-[300px]">
            <HatchPlaceholder
              caption="public page preview"
              className="h-[188px] w-full"
            />
            <div className="flex flex-col gap-[2px] px-sm py-xs">
              <p className="text-[13px] font-bold text-ink-primary">{values.title}</p>
              <p className="text-[11.5px] text-ink-muted">{editorPublicPreviewMeta}</p>
            </div>
          </article>
        </div>
      </AreaCard>
    </div>
  )
}

function SortCol({ className, label }: { className: string; label: string }) {
  return (
    <p className={`flex shrink-0 items-center justify-end gap-[3px] ${className}`}>
      {label}
      <CaretDownIcon className="size-2.5" />
    </p>
  )
}

function IconField({
  id,
  label,
  icon,
  value,
  onChange,
}: {
  id: string
  label: string
  icon: ReactNode
  value: string
  onChange?: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-[7px]">
      <FieldLabel label={label} />
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-sm -translate-y-1/2">
          {icon}
        </span>
        <input
          id={id}
          value={value}
          onChange={
            onChange
              ? (event) => {
                  onChange(event.target.value)
                }
              : undefined
          }
          readOnly={!onChange}
          className={cn(fieldClass, "w-full pl-10")}
        />
      </div>
    </div>
  )
}

function SeatStat({
  value,
  caption,
  tone,
}: {
  value: string
  caption: string
  tone?: "ink" | "success" | "alert"
}) {
  const resolved = tone ?? "ink"
  return (
    <div className="flex flex-col gap-[2px]">
      <p
        className={cn(
          "text-[20px] font-extrabold tracking-[-0.4px]",
          resolved === "success" && "text-status-success",
          resolved === "alert" && "text-accent-amber",
          resolved === "ink" && "text-ink-primary",
        )}
      >
        {value}
      </p>
      <p className="text-[12px] font-medium text-ink-faint">{caption}</p>
    </div>
  )
}

function LineupGroup({
  label,
  people,
}: {
  label: string
  people: { initials: string; name: string; role: string; billing: string }[]
}) {
  return (
    <div>
      <p className="text-[12px] font-bold tracking-[0.72px] text-ink-faint uppercase">
        {label}
      </p>
      {people.map((person) => (
        <div
          key={person.name}
          className="flex flex-wrap items-center gap-xs border-b border-border-subtle py-[10px]"
        >
          <Avatar initials={person.initials} size={38} />
          <div className="w-[170px] shrink-0">
            <p className="text-[14px] font-bold text-ink-primary">{person.name}</p>
            <p className="text-[11.5px] text-ink-faint">{person.role}</p>
          </div>
          <input
            readOnly
            value={person.billing}
            className="h-[38px] min-w-[160px] flex-1 rounded-sm border border-border-default px-[13px] text-[13px] text-ink-primary"
          />
          <CheckboxField
            id={`public-${person.initials}`}
            label="Show publicly"
            checked
          />
          <button type="button" aria-label={`Remove ${person.name}`} className="text-ink-faint">
            <XIcon className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
