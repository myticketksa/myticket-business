import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router"
import {
  EyeIcon,
  InstagramLogoIcon,
  PlusIcon,
  StarIcon,
  XIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react"
import { ValidationError } from "yup"
import { HatchPlaceholder } from "@/components/biz/hatch-placeholder"
import { NoteCard } from "@/components/biz/note-card"
import { PageHead } from "@/components/biz/page-head"
import { PanelCard } from "@/components/biz/bar-list-row"
import { AppButton } from "@/components/primitive/app-button"
import { AppSelect } from "@/components/primitive/app-select"
import { AppTextarea } from "@/components/primitive/app-textarea"
import { StatusBadge } from "@/components/primitive/status-badge"
import { TextInput } from "@/components/primitive/text-input"
import { ToggleField } from "@/components/primitive/toggle-field"
import {
  talentProfileBiography,
  talentProfileCategories,
  talentProfileFixed,
  talentProfileLinks,
} from "@/mocks/talent-profile"
import {
  talentProfileSchema,
  type TalentProfileValues,
} from "@/schemas/talent-profile"

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

export function TalentProfilePage() {
  const navigate = useNavigate()
  const [values, setValues] = useState<TalentProfileValues>({
    stageName: "Lina Hakim",
    biography: talentProfileBiography,
    region: "Central Region",
    city: "Riyadh",
    travels: true,
    showCity: true,
  })
  const [categories, setCategories] = useState(talentProfileCategories)
  const [links, setLinks] = useState(talentProfileLinks)
  const [error, setError] = useState<string | undefined>()

  function patch<K extends keyof TalentProfileValues>(
    key: K,
    value: TalentProfileValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await talentProfileSchema.validate(values)
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
          eyebrow="Presence"
          title="Profile"
          sub="What organizers and the public see at myticket.sa/t/lina-hakim. Edits go to review; the approved version stays live meanwhile."
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
          <AppButton size="m" type="submit" form="talent-profile">
            Save &amp; submit changes
          </AppButton>
        </div>
      </div>

      <form
        id="talent-profile"
        className="grid grid-cols-1 items-start gap-lg xl:grid-cols-[minmax(0,668px)_minmax(0,432px)]"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col gap-lg">
          <section className="rounded-lg border border-border-default bg-surface-card p-xl">
            <div className="flex flex-col gap-lg sm:flex-row sm:items-start">
              <div className="flex flex-col items-center gap-gap-md">
                <HatchPlaceholder
                  caption="photo"
                  className="size-24 rounded-[24px]"
                />
                <AppButton
                  variant="secondary"
                  size="s"
                  className="h-[38px] border-border-default text-ink-primary hover:bg-surface-tint"
                >
                  Change photo
                </AppButton>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-base">
                <div className="grid grid-cols-1 gap-base md:grid-cols-2">
                  <TextInput
                    id="stage-name"
                    label="Stage name"
                    value={values.stageName}
                    onChange={(event) => {
                      patch("stageName", event.target.value)
                    }}
                    error={error?.toLowerCase().includes("stage") ? error : undefined}
                  />
                  <div className="flex flex-col gap-[7px]">
                    <p className="text-[13px] font-semibold text-ink-primary">
                      Willing to travel
                    </p>
                    <ToggleField
                      id="travels"
                      label="Kingdom-wide"
                      checked={values.travels}
                      onCheckedChange={(checked) => {
                        patch("travels", checked)
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label htmlFor="biography" className="text-[13px] font-semibold text-ink-primary">
                    Biography
                  </label>
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
              </div>
            </div>
          </section>

          <PanelCard title="Performance categories" sub="Organizers filter the marketplace by these.">
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
              <button
                type="button"
                className="inline-flex items-center gap-[6px] rounded-pill border-[1.5px] border-dashed border-border-strong px-sm py-[9px] text-[13px] font-bold text-accent-amber"
              >
                <PlusIcon className="size-[13px]" weight="bold" />
                Add category
              </button>
            </div>
          </PanelCard>

          <PanelCard title="Location & links">
            <div className="flex flex-col gap-base px-xl pt-base pb-xl">
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
              <div className="flex items-center justify-between gap-sm">
                <p className="text-[13px] font-medium text-ink-primary">
                  Show my city publicly — off shows only your region
                </p>
                <ToggleField
                  id="show-city"
                  checked={values.showCity}
                  onCheckedChange={(checked) => {
                    patch("showCity", checked)
                  }}
                />
              </div>
              {links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between rounded-sm border border-border-default px-sm py-[11px]"
                >
                  <span className="inline-flex items-center gap-2xs text-[13.5px] font-semibold text-ink-primary">
                    {link.network === "instagram" ? (
                      <InstagramLogoIcon className="size-4" />
                    ) : (
                      <YoutubeLogoIcon className="size-4" />
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
            </div>
          </PanelCard>
        </div>

        <div className="flex flex-col gap-lg">
          <PanelCard
            title="Fixed at approval"
            sub="Set by MyTicket — shown for reference, not editable."
          >
            <dl className="flex flex-col px-lg pb-base">
              {talentProfileFixed.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-sm py-[9px]"
                >
                  <dt className="text-[13px] font-medium text-ink-faint">{row.label}</dt>
                  <dd className="text-right text-[13.5px] font-bold text-ink-primary">
                    {row.rating ? (
                      <span className="inline-flex items-center gap-3xs">
                        <StarIcon className="size-[13px] text-brand-primary" weight="fill" />
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
                <dt className="text-[13px] font-medium text-ink-faint">Account</dt>
                <dd>
                  <StatusBadge label="Active" />
                </dd>
              </div>
            </dl>
          </PanelCard>

          <PanelCard title="Portfolio">
            <div className="flex flex-col gap-xs px-lg pt-sm pb-lg">
              <p className="text-[13px] leading-[1.55] text-ink-muted">
                Your portfolio is editable after approval — changes go to review
                while the approved version stays public.
              </p>
              <AppButton
                variant="secondary"
                size="m"
                className="w-fit border-border-default text-ink-primary hover:bg-surface-tint"
                onClick={() => {
                  navigate("/app/portfolio")
                }}
              >
                Manage portfolio · 4 items
              </AppButton>
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
