import { type FormEvent, useState } from "react"
import {
  DotsSixVerticalIcon,
  EyeIcon,
  GlobeIcon,
  PlusIcon,
  StarIcon,
  XIcon,
  XLogoIcon,
} from "@phosphor-icons/react"
import { ValidationError } from "yup"
import { AlertBanner } from "@/components/biz/alert-banner"
import { NoteCard } from "@/components/biz/note-card"
import { PageHead } from "@/components/biz/page-head"
import { PanelCard } from "@/components/biz/bar-list-row"
import { AppButton } from "@/components/primitive/app-button"
import { AppSelect } from "@/components/primitive/app-select"
import { AppTextarea } from "@/components/primitive/app-textarea"
import { Avatar } from "@/components/primitive/avatar"
import { RadioField } from "@/components/primitive/radio-field"
import { StatusBadge } from "@/components/primitive/status-badge"
import { TextInput } from "@/components/primitive/text-input"
import {
  profileCompany,
  profileDraft,
  profileFixed,
  profileLinks,
  profilePortfolio,
} from "@/mocks/organizer-profile"
import {
  publicProfileSchema,
  type PublicProfileValues,
} from "@/schemas/public-profile"

const regionOptions = [
  { value: "Central Region", label: "Central Region" },
  { value: "Western Region", label: "Western Region" },
  { value: "Eastern Region", label: "Eastern Region" },
]

const cityOptions = [
  { value: "Riyadh", label: "Riyadh" },
  { value: "Jeddah", label: "Jeddah" },
  { value: "Dammam", label: "Dammam" },
]

export function OrganizerProfilePage() {
  const [values, setValues] = useState<PublicProfileValues>(profileDraft)
  const [error, setError] = useState<string | undefined>()

  function patch<K extends keyof PublicProfileValues>(
    key: K,
    value: PublicProfileValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await publicProfileSchema.validate(values)
      setError(undefined)
    } catch (caught) {
      if (caught instanceof ValidationError) {
        setError(caught.message)
      }
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-[22px] px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead
          eyebrow="Account"
          title="Public profile"
          sub="What customers, talents and vendors see at myticket.sa/o/riyadh-events. Edits go to review; the approved version stays live meanwhile."
        />
        <div className="flex flex-wrap items-center gap-gap-md">
          <AppButton
            variant="secondary"
            size="m"
            icon={<EyeIcon className="size-[18px]" />}
            className="border-border-default text-ink-primary hover:bg-surface-tint"
          >
            Preview as public
          </AppButton>
          <AppButton size="m" type="submit" form="public-profile">
            Save & submit changes
          </AppButton>
        </div>
      </div>

      <AlertBanner
        tone="brand"
        lead="Your new biography is under review."
        body="The public still sees your previously approved profile — nothing has been taken down."
      />

      <form
        id="public-profile"
        className="grid grid-cols-1 items-start gap-lg xl:grid-cols-[minmax(0,668px)_minmax(0,432px)]"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col gap-lg">
          <section className="rounded-lg border border-border-default bg-surface-card p-xl">
            <div className="flex flex-col gap-lg sm:flex-row sm:items-start">
              <div className="flex flex-col items-center gap-2xs">
                <Avatar
                  initials="RE"
                  size={96}
                  shape="squircle"
                  className="rounded-[24px]"
                />
                <AppButton
                  variant="secondary"
                  size="s"
                  className="h-[38px] rounded-[16px] border-border-default text-ink-primary hover:bg-surface-tint"
                >
                  Change logo
                </AppButton>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-base">
                <div className="grid grid-cols-1 gap-base md:grid-cols-2">
                  <TextInput
                    id="display-name"
                    label="Display name"
                    value={values.displayName}
                    onChange={(event) => {
                      patch("displayName", event.target.value)
                    }}
                    error={error?.toLowerCase().includes("display") ? error : undefined}
                  />
                  <div className="flex flex-col gap-gap-md">
                    <p className="text-body-s text-ink-body">Type</p>
                    <RadioField
                      layout="row"
                      value={values.type}
                      options={[
                        { value: "company", label: "Company" },
                        { value: "individual", label: "Individual" },
                      ]}
                      onValueChange={(value) => {
                        patch("type", value as PublicProfileValues["type"])
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-gap-md">
                  <div className="flex items-center gap-2xs">
                    <label htmlFor="biography" className="text-body-s text-ink-body">
                      Biography
                    </label>
                    <StatusBadge label="Under review" />
                  </div>
                  <AppTextarea
                    id="biography"
                    value={values.biography}
                    onChange={(event) => {
                      patch("biography", event.target.value)
                    }}
                    error={error?.toLowerCase().includes("biography") ? error : undefined}
                  />
                  <p className="text-right text-[12px] font-medium text-ink-faint">
                    {values.biography.length} / 600
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-base md:grid-cols-2">
                  <TextInput
                    id="contact-email"
                    label="Contact email"
                    value={values.contactEmail}
                    onChange={(event) => {
                      patch("contactEmail", event.target.value)
                    }}
                    error={error?.toLowerCase().includes("email") ? error : undefined}
                  />
                  <TextInput
                    id="phone"
                    label="Phone"
                    value={values.phone}
                    onChange={(event) => {
                      patch("phone", event.target.value)
                    }}
                    error={error?.toLowerCase().includes("phone") ? error : undefined}
                  />
                </div>
              </div>
            </div>
          </section>

          <PanelCard
            title="Company details"
            sub="Shown on your public profile because you’re registered as a company."
          >
            <div className="flex flex-col gap-base px-lg pt-base pb-lg">
              <div className="grid grid-cols-1 gap-base md:grid-cols-2">
                <div className="flex flex-col gap-[7px]">
                  <p className="text-[13px] font-semibold text-ink-primary">
                    Registered company name
                  </p>
                  <p className="text-[13.5px] font-semibold text-ink-primary">
                    <span className="font-arabic font-bold">
                      {profileCompany.registeredAr}
                    </span>
                    <span> · {profileCompany.registeredEn}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-[7px]">
                  <p className="text-[13px] font-semibold text-ink-primary">
                    Responsible person
                  </p>
                  <p className="text-[13.5px] font-semibold text-ink-primary">
                    {profileCompany.responsible}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-base md:grid-cols-2">
                <AppSelect
                  id="region"
                  label="Region"
                  value={values.region}
                  options={regionOptions}
                  onValueChange={(value) => {
                    patch("region", value)
                  }}
                />
                <AppSelect
                  id="city"
                  label="City"
                  value={values.city}
                  options={cityOptions}
                  onValueChange={(value) => {
                    patch("city", value)
                  }}
                />
              </div>
            </div>
          </PanelCard>

          <PanelCard
            title="Portfolio events"
            action={
              <button
                type="button"
                className="text-[13px] font-semibold text-brand-primary"
              >
                + Add from archive
              </button>
            }
            sub="Past events you choose to showcase publicly."
          >
            <ul className="flex flex-col gap-2xs px-lg pt-base pb-lg">
              {profilePortfolio.map((event) => (
                <li
                  key={event.id}
                  className="flex items-center gap-2xs rounded-sm border border-border-default px-sm py-[11px]"
                >
                  <DotsSixVerticalIcon className="size-4 shrink-0 text-ink-faint" />
                  <p className="min-w-0 flex-1 truncate text-[13.5px] font-bold text-ink-primary">
                    {event.name}
                    <span className="font-medium text-ink-muted"> · {event.meta}</span>
                    <StarIcon
                      className="ml-3xs inline size-3 text-brand-primary"
                      weight="fill"
                    />
                  </p>
                  <button type="button" aria-label={`Remove ${event.name}`}>
                    <XIcon className="size-4 text-ink-faint" />
                  </button>
                </li>
              ))}
            </ul>
          </PanelCard>
        </div>

        <div className="flex flex-col gap-lg">
          <PanelCard
            title="Fixed at approval"
            sub="Set by MyTicket — shown for reference, not editable."
          >
            <dl className="flex flex-col gap-xs px-lg pt-xs pb-base">
              <FixedRow label="Organizer reference" value={profileFixed.reference} />
              <div className="flex items-center justify-between gap-sm">
                <dt className="text-[13.5px] font-medium text-ink-faint">Public profile</dt>
                <dd>
                  <a
                    href="https://myticket.sa/o/riyadh-events"
                    className="text-[13px] font-bold text-brand-primary"
                  >
                    {profileFixed.publicUrl}
                  </a>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-sm">
                <dt className="text-[13.5px] font-medium text-ink-faint">Average rating</dt>
                <dd className="inline-flex items-center gap-3xs text-[13.5px] font-bold text-ink-primary">
                  <StarIcon className="size-3 text-brand-primary" weight="fill" />
                  {profileFixed.rating}
                </dd>
              </div>
              <FixedRow label="Events run" value={profileFixed.eventsRun} />
              <div className="flex items-center justify-between gap-sm">
                <dt className="text-[13.5px] font-medium text-ink-faint">Account</dt>
                <dd>
                  <StatusBadge label={profileFixed.account} />
                </dd>
              </div>
            </dl>
          </PanelCard>

          <PanelCard title="Links">
            <div className="flex flex-col gap-2xs px-lg py-base">
              {profileLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex h-[46px] items-center justify-between rounded-sm border border-border-default px-sm"
                >
                  <span className="inline-flex items-center gap-2xs text-[13.5px] font-semibold text-ink-primary">
                    {link.kind === "globe" ? (
                      <GlobeIcon className="size-[17px]" />
                    ) : (
                      <XLogoIcon className="size-[17px]" />
                    )}
                    {link.label}
                  </span>
                  <button type="button" aria-label={`Remove ${link.label}`}>
                    <XIcon className="size-4 text-ink-faint" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="flex h-10 items-center justify-center gap-[6px] rounded-sm border-[1.5px] border-dashed border-border-default text-[13px] font-semibold text-ink-primary"
              >
                <PlusIcon className="size-[14px]" weight="bold" />
                Add link
              </button>
            </div>
          </PanelCard>

          <NoteCard
            tone="warm"
            lead="What happens when you save."
            body="Changed material goes to MyTicket for review. Until approved, the public keeps seeing your previously approved profile — your presence never goes dark."
          />
        </div>
      </form>
    </main>
  )
}

function FixedRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-sm">
      <dt className="text-[13.5px] font-medium text-ink-faint">{label}</dt>
      <dd className="text-[13.5px] font-bold text-ink-primary">{value}</dd>
    </div>
  )
}
