import { useState } from "react"
import { useNavigate } from "react-router"
import {
  BookmarkSimpleIcon,
  CheckIcon,
  ClockCounterClockwiseIcon,
  StarIcon,
} from "@phosphor-icons/react"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { FilterPill } from "@/components/biz/filter-pill"
import { HatchPlaceholder } from "@/components/biz/hatch-placeholder"
import { ListFooter } from "@/components/biz/list-footer"
import { PageHead } from "@/components/biz/page-head"
import { UnderlineTab } from "@/components/biz/underline-tab"
import { AppButton } from "@/components/primitive/app-button"
import { CheckboxField } from "@/components/primitive/checkbox-field"
import { SearchField } from "@/components/primitive/search-field"
import {
  marketplaceCategories,
  marketplaceLooseFilters,
  marketplaceTalents,
  marketplaceVendors,
  type MarketplaceRating,
  type MarketplaceTab,
  type MarketplaceTalent,
} from "@/mocks/marketplace"
import { cn } from "@/lib/utils"

const defaultCategories = new Set(["musicians", "djs"])
const defaultLoose = new Set(["available"])

export function OrganizerMarketplacePage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<MarketplaceTab>("talents")
  const [query, setQuery] = useState("")
  const [categories, setCategories] = useState(defaultCategories)
  const [loose, setLoose] = useState(defaultLoose)
  const [rating, setRating] = useState<MarketplaceRating>("4.5+")

  function toggleCategory(id: string) {
    setCategories((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function toggleLoose(id: string) {
    setLoose((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const directory = tab === "vendors" ? marketplaceVendors : marketplaceTalents
  const visible = directory.filter((item) => {
    if (!query) {
      return true
    }
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.specialty.toLowerCase().includes(query.toLowerCase())
    )
  })

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-lg px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead
          eyebrow="Hire"
          title="Marketplace"
          sub="Find performers and service providers without leaving your workspace. MyTicket hosts the introduction — contracts, pricing and payment stay between you and them."
        />
        <AppButton
          variant="secondary"
          size="m"
          icon={<BookmarkSimpleIcon className="size-[18px]" weight="fill" />}
          className="h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"
        >
          My shortlists · 2
        </AppButton>
      </div>

      <div className="flex gap-lg border-b border-border-default">
        <UnderlineTab
          label="Talents"
          active={tab === "talents"}
          onClick={() => {
            setTab("talents")
          }}
        />
        <UnderlineTab
          label="Vendors"
          active={tab === "vendors"}
          onClick={() => {
            setTab("vendors")
          }}
        />
      </div>

      <div className="flex flex-col gap-xl lg:flex-row lg:items-start">
        <aside className="flex w-full shrink-0 flex-col gap-md rounded-lg border border-border-default bg-surface-card p-lg lg:w-[268px]">
          <SearchField
            size="pill"
            placeholder="Search by name or keyword…"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
            }}
          />

          <div className="flex flex-col gap-2xs">
            <p className="text-[12.5px] font-bold text-ink-primary">Category</p>
            {marketplaceCategories.map((item) => (
              <CheckboxField
                key={item.id}
                id={`cat-${item.id}`}
                label={item.label}
                count={item.count}
                checked={categories.has(item.id)}
                onCheckedChange={() => {
                  toggleCategory(item.id)
                }}
              />
            ))}
          </div>

          <div className="flex flex-col gap-2xs">
            <p className="text-[12.5px] font-bold text-ink-primary">City</p>
            <ClosedDropdown label="Riyadh" />
          </div>

          <div className="flex flex-col gap-2xs">
            <p className="text-[12.5px] font-bold text-ink-primary">
              Minimum rating
            </p>
            <div className="flex flex-wrap gap-2xs">
              {(["4.5+", "4+", "Any"] as const).map((option) => (
                <FilterPill
                  key={option}
                  label={option}
                  size={36}
                  state={rating === option ? "active" : "idle"}
                  onClick={() => {
                    setRating(option)
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2xs">
            {marketplaceLooseFilters.map((item) => (
              <CheckboxField
                key={item.id}
                id={`loose-${item.id}`}
                label={item.label}
                checked={loose.has(item.id)}
                onCheckedChange={() => {
                  toggleLoose(item.id)
                }}
              />
            ))}
          </div>

          <AppButton
            variant="secondary"
            size="s"
            className="h-[38px] w-full border-border-default text-ink-primary hover:bg-surface-tint"
            onClick={() => {
              setCategories(new Set(defaultCategories))
              setLoose(new Set(defaultLoose))
              setRating("4.5+")
              setQuery("")
            }}
          >
            Clear all filters
          </AppButton>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-base">
          {tab === "talents" ? (
            <p className="text-[13px] font-medium text-ink-faint">
              86 talents match · sorted by rating
            </p>
          ) : (
            <p className="text-[13px] font-medium text-ink-faint">
              1 vendor match · sorted by rating
            </p>
          )}

          <div className="grid grid-cols-1 gap-md sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((talent) => (
              <MarketplaceCard
                key={talent.id}
                talent={talent}
                onContact={() => {
                  navigate("/app/hire-requests")
                }}
                onProfile={
                  talent.hasProfile
                    ? () => {
                        navigate(`/app/marketplace/${talent.id}`)
                      }
                    : undefined
                }
              />
            ))}
          </div>

          {tab === "talents" ? (
            <ListFooter buttonLabel="Show 24 more" meta="Showing 6 of 86" />
          ) : (
            <p className="text-[12.5px] font-medium text-ink-faint">
              Showing 1 of 1
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

function MarketplaceCard({
  talent,
  onContact,
  onProfile,
}: {
  talent: MarketplaceTalent
  onContact: () => void
  onProfile?: () => void
}) {
  const available = talent.availability === "Available"

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border-default bg-surface-card">
      <div className="relative h-[165px]">
        <HatchPlaceholder caption={talent.photoCaption} className="size-full" />
        <span
          className={cn(
            "absolute top-2.5 left-2.5 inline-flex items-center gap-3xs rounded-badge bg-surface-card px-2xs py-[3px] text-[11px] font-bold",
            available ? "text-status-success" : "text-ink-faint",
          )}
        >
          <span
            className={cn(
              "size-[7px] rounded-pill",
              available ? "bg-status-success" : "bg-ink-faint",
            )}
          />
          {talent.availability}
        </span>
        <button
          type="button"
          aria-pressed={talent.shortlisted}
          aria-label={
            talent.shortlisted ? "Remove from shortlist" : "Add to shortlist"
          }
          className="absolute top-2.5 right-2.5 inline-flex size-8 items-center justify-center rounded-[16px] bg-surface-card text-ink-primary"
        >
          <BookmarkSimpleIcon
            className="size-4"
            weight={talent.shortlisted ? "fill" : "regular"}
          />
        </button>
      </div>

      <div className="flex flex-col gap-2xs px-base pt-sm pb-base">
        <div className="flex items-center gap-[6px]">
          <h3 className="text-[15px] font-bold text-ink-primary">{talent.name}</h3>
          {talent.verified ? (
            <span className="inline-flex size-4 items-center justify-center rounded-[8px] bg-status-success text-ink-inverse">
              <CheckIcon className="size-2.5" weight="bold" />
            </span>
          ) : null}
        </div>
        <p className="text-[12.5px] font-medium text-ink-muted">{talent.specialty}</p>
        <div className="flex items-center justify-between">
          <p className="inline-flex items-center gap-3xs text-[12.5px] font-bold text-ink-primary">
            <StarIcon className="size-3 text-brand-primary" weight="fill" />
            {talent.rating}
            <span className="font-medium text-ink-faint">{talent.reviews}</span>
          </p>
          <p className="text-[12px] font-medium text-ink-faint">{talent.city}</p>
        </div>
        {talent.history ? (
          <p className="inline-flex items-center gap-[5px] rounded-[8px] bg-surface-brand-wash px-2xs py-3xs text-[11.5px] font-semibold text-accent-amber">
            <ClockCounterClockwiseIcon className="size-3" weight="regular" />
            {talent.history}
          </p>
        ) : null}
        {talent.response ? (
          <p className="text-[11.5px] leading-[1.4] font-medium text-ink-faint">
            {talent.response}
          </p>
        ) : null}
        <div className="flex gap-2xs">
          <AppButton size="s" className="h-[38px] flex-1" onClick={onContact}>
            Contact
          </AppButton>
          <AppButton
            variant="secondary"
            size="s"
            className="h-[38px] border-border-default text-ink-primary hover:bg-surface-tint"
            onClick={onProfile}
          >
            Profile
          </AppButton>
        </div>
      </div>
    </article>
  )
}
