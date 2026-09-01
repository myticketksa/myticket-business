import { type FormEvent, useState } from "react"
import {
  EyeIcon,
  FileTextIcon,
  GlobeIcon,
  HourglassMediumIcon,
  InstagramLogoIcon,
  PlusIcon,
  StarIcon,
  XIcon,
} from "@phosphor-icons/react"
import { ValidationError } from "yup"
import { DocRow } from "@/components/biz/doc-row"
import { NoteCard } from "@/components/biz/note-card"
import { PageHead } from "@/components/biz/page-head"
import { PanelCard } from "@/components/biz/bar-list-row"
import { AppButton } from "@/components/primitive/app-button"
import { AppSelect } from "@/components/primitive/app-select"
import { AppTextarea } from "@/components/primitive/app-textarea"
import { Avatar } from "@/components/primitive/avatar"
import { StatusBadge } from "@/components/primitive/status-badge"
import { TextInput } from "@/components/primitive/text-input"
import {
  vendorProfileBiography,
  vendorProfileCategories,
  vendorProfileFixed,
  vendorProfileLinks,
  vendorProfilePendingCategory,
} from "@/mocks/vendor-profile"
import {
  vendorProfileSchema,
  type VendorProfileValues,
} from "@/schemas/vendor-profile"

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

const coverageOptions = [
  { value: "Central Region + Qassim", label: "Central Region + Qassim" },
  { value: "Western Region", label: "Western Region" },
  { value: "Kingdom-wide", label: "Kingdom-wide" },
]

export function VendorProfilePage() {
  const [values, setValues] = useState<VendorProfileValues>({
    businessName: "Layla Catering",
    contactEmail: "hello@laylacatering.sa",
    biography: vendorProfileBiography,
    region: "Central Region",
    city: "Riyadh",
    coverage: "Central Region + Qassim",
  })
  const [categories, setCategories] = useState(vendorProfileCategories)
  const [links, setLinks] = useState(vendorProfileLinks)
  const [error, setError] = useState<string | undefined>()

  function patch<K extends keyof VendorProfileValues>(
    key: K,
    value: VendorProfileValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await vendorProfileSchema.validate(values)
      setError(undefined)
    } catch (caught) {
      if (caught instanceof ValidationError) {
        setError(caught.message)
      }
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-[22px] px-gutter pt-8 pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead
          eyebrow="Presence"
          title="Business profile"
          sub="Edits go to MyTicket for review; your approved profile stays public until the new version is approved."
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
          <AppButton size="m" type="submit" form="vendor-profile">
            Save &amp; submit changes
          </AppButton>
        </div>
      </div>

      <form
        id="vendor-profile"
        className="grid grid-cols-1 items-start gap-lg xl:grid-cols-[minmax(0,668px)_minmax(0,432px)]"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col gap-lg">
          <section className="rounded-lg border border-border-default bg-surface-card p-xl">
            <div className="flex flex-col gap-lg sm:flex-row sm:items-start">
              <div className="flex flex-col items-center gap-gap-md">
                <Avatar initials="LC" size={96} shape="squircle" />
                <AppButton
                  variant="secondary"
                  size="s"
                  className="h-[38px] border-border-default text-ink-primary hover:bg-surface-tint"
                >
                  Change logo
                </AppButton>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-base">
                <div className="grid grid-cols-1 gap-base md:grid-cols-2">
                  <TextInput
                    id="business-name"
                    label="Business name"
                    value={values.businessName}
                    onChange={(event) => {
                      patch("businessName", event.target.value)
                    }}
                    error={
                      error?.toLowerCase().includes("business")
                        ? error
                        : undefined
                    }
                  />
                  <TextInput
                    id="contact-email"
                    label="Contact email"
                    value={values.contactEmail}
                    onChange={(event) => {
                      patch("contactEmail", event.target.value)
                    }}
                    error={
                      error?.toLowerCase().includes("email") ? error : undefined
                    }
                  />
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label
                    htmlFor="biography"
                    className="text-[13px] font-semibold text-ink-primary"
                  >
                    Biography
                  </label>
                  <AppTextarea
                    id="biography"
                    value={values.biography}
                    onChange={(event) => {
                      patch("biography", event.target.value)
                    }}
                    error={
                      error?.toLowerCase().includes("biography")
                        ? error
                        : undefined
                    }
                  />
                  <p className="text-right text-[12px] font-medium text-ink-faint">
                    {values.biography.length} / 600
                  </p>
                </div>
              </div>
            </div>
          </section>

          <PanelCard
            title="Service categories"
            action={
              <AppButton
                variant="secondary"
                size="m"
                className="border-border-default text-ink-primary hover:bg-surface-tint"
                icon={<PlusIcon className="size-4" weight="bold" />}
              >
                Propose custom category
              </AppButton>
            }
            sub="Organizers filter the marketplace by these. Custom categories need a name in English and Arabic and MyTicket's approval."
          >
            <div className="flex flex-wrap items-center gap-gap-md px-xl pt-base pb-lg">
              {categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-2xs rounded-pill bg-brand-gradient px-sm py-[9px] text-[13.5px] font-bold text-ink-inverse"
                >
                  {category}
                  <button
                    type="button"
                    aria-label={`Remove ${category}`}
                    onClick={() => {
                      setCategories((current) =>
                        current.filter((item) => item !== category),
                      )
                    }}
                  >
                    <XIcon className="size-[14px]" weight="bold" />
                  </button>
                </span>
              ))}
              <span className="inline-flex items-center gap-2xs rounded-pill border-[1.5px] border-dashed border-border-strong bg-surface-brand-wash px-sm py-[9px] text-[13px] font-bold text-brand-link">
                <HourglassMediumIcon className="size-[14px]" />
                {vendorProfilePendingCategory.en} ·{" "}
                <span className="font-arabic">
                  {vendorProfilePendingCategory.ar}
                </span>
              </span>
            </div>
          </PanelCard>

          <PanelCard
            title="Location & coverage"
            sub="Where you’re based and how far you’ll work. Organizers outside your coverage won’t see you as available."
          >
            <div className="flex flex-col gap-base px-xl pt-base pb-xl">
              <div className="grid grid-cols-1 gap-base md:grid-cols-3">
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
                <AppSelect
                  id="coverage"
                  label="Coverage area"
                  value={values.coverage}
                  options={coverageOptions}
                  onValueChange={(value) => {
                    patch("coverage", value)
                  }}
                />
              </div>
            </div>
          </PanelCard>

          <PanelCard title="Links">
            <div className="flex flex-col gap-gap-md px-xl pt-base pb-lg">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between rounded-sm border border-border-default px-sm py-[11px]"
                >
                  <span className="inline-flex items-center gap-2xs text-[13.5px] font-semibold text-ink-primary">
                    {link.network === "instagram" ? (
                      <InstagramLogoIcon className="size-4" />
                    ) : (
                      <GlobeIcon className="size-4" />
                    )}
                    {link.label}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${link.label}`}
                    onClick={() => {
                      setLinks((current) =>
                        current.filter((item) => item.id !== link.id),
                      )
                    }}
                  >
                    <XIcon className="size-4 text-ink-faint" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="inline-flex h-[42px] items-center justify-center gap-[6px] rounded-sm border-[1.5px] border-dashed border-border-default text-[13px] font-semibold text-ink-faint"
              >
                <PlusIcon className="size-[13px]" weight="bold" />
                Add link
              </button>
            </div>
          </PanelCard>

          <PanelCard
            title="Credentials"
            sub="Documents behind your Verified badge."
          >
            <div className="flex flex-col">
              <DocRow
                title="Commercial Registration"
                note="Verified · expires Jun 2027"
                state="verified"
                icon={<FileTextIcon className="size-4" />}
              />
              <DocRow
                title="Food safety certificate"
                note="Expires 11 Sep — renew before it lapses"
                state="expiringQuiet"
                icon={<FileTextIcon className="size-4" />}
              />
              <DocRow
                title="Municipal license 2026"
                note="Uploaded Thu · with MyTicket for review"
                state="review"
                icon={<FileTextIcon className="size-4" />}
              />
            </div>
            <div className="px-lg pb-lg">
              <button
                type="button"
                className="inline-flex h-[46px] w-full items-center justify-center gap-[6px] rounded-sm border-[1.5px] border-dashed border-border-default text-[13px] font-semibold text-ink-faint"
              >
                <PlusIcon className="size-[15px]" weight="bold" />
                Upload document
              </button>
            </div>
          </PanelCard>
        </div>

        <div className="flex flex-col gap-lg">
          <PanelCard
            title="Fixed at approval"
            sub="Set by MyTicket — shown for reference, not editable."
          >
            <dl className="flex flex-col px-lg pb-base">
              {vendorProfileFixed.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-sm py-[9px]"
                >
                  <dt className="text-[13px] font-medium text-ink-faint">
                    {row.label}
                  </dt>
                  <dd className="text-right text-[13.5px] font-bold text-ink-primary">
                    {row.rating ? (
                      <span className="inline-flex items-center gap-3xs">
                        <StarIcon
                          className="size-[13px] text-brand-primary"
                          weight="fill"
                        />
                        {row.value}
                      </span>
                    ) : row.href ? (
                      <span className="text-[12.5px] font-semibold text-brand-link">
                        {row.value}
                      </span>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
              <div className="flex items-center justify-between gap-sm py-[9px]">
                <dt className="text-[13px] font-medium text-ink-faint">
                  Account
                </dt>
                <dd>
                  <StatusBadge label="Active" />
                </dd>
              </div>
            </dl>
          </PanelCard>

          <NoteCard
            tone="warm"
            lead="What happens when you save."
            body="Changed material goes to MyTicket for review. Until it’s approved, organizers and the public keep seeing your previously approved profile — your presence never goes dark during a review."
          />
        </div>
      </form>
    </main>
  )
}
