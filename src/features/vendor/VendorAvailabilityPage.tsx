import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowElbowDownRightIcon,
  CircleDashedIcon,
  CircleIcon,
} from "@phosphor-icons/react"
import { DateChip } from "@/components/biz/date-chip"
import { PageHead } from "@/components/biz/page-head"
import { PanelCard } from "@/components/biz/bar-list-row"
import { AppButton } from "@/components/primitive/app-button"
import { StatusBadge } from "@/components/primitive/status-badge"
import {
  vendorAvailabilityRules,
  vendorConfirmedWork,
} from "@/mocks/vendor-availability"
import { cn } from "@/lib/utils"

export function VendorAvailabilityPage() {
  const navigate = useNavigate()
  const [available, setAvailable] = useState(false)

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-[22px] px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <PageHead
        eyebrow="Work"
        title="Availability"
        sub="What organizers see in the marketplace next to your name, right now."
      />

      <section className="flex flex-col gap-lg rounded-lg border border-border-default bg-surface-card px-[28px] py-[26px] md:flex-row md:items-center">
        <span
          className={cn(
            "inline-flex size-16 shrink-0 items-center justify-center rounded-lg",
            available ? "bg-status-success-light" : "bg-surface-sold",
          )}
        >
          {available ? (
            <CircleIcon className="size-[22px] text-status-success" weight="fill" />
          ) : (
            <CircleDashedIcon className="size-[22px] text-ink-faint" />
          )}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
          <div className="flex flex-wrap items-center gap-2xs">
            <p
              className={cn(
                "text-[20px] font-extrabold",
                available ? "text-status-success" : "text-ink-primary",
              )}
            >
              {available ? "Available for work" : "Reserved"}
            </p>
            {available ? null : (
              <span className="rounded-badge bg-surface-sold px-2xs py-[7px] text-[11px] font-bold text-ink-muted">
                set automatically
              </span>
            )}
          </div>
          <p className="text-[13.5px] leading-[1.55] text-ink-muted">
            {available
              ? "You appear as available in marketplace results and on your public profile. Accepting any hire request switches you to Reserved automatically."
              : "Because you accepted Corniche Nights Festival · 3–5 Dec. Organizers can still view your profile and message you, but you’re shown as reserved in marketplace results."}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-[6px]">
          <AppButton
            variant="secondary"
            size="m"
            className="border-border-default text-ink-primary hover:bg-surface-tint"
            onClick={() => {
              setAvailable((current) => !current)
            }}
          >
            {available ? "Switch to Reserved" : "Switch to Available"}
          </AppButton>
          <p className="text-right text-[12px] font-medium text-ink-faint">
            {available
              ? "manual override — stays until you change it back"
              : "manual override — see how it interacts below"}
          </p>
        </div>
      </section>

      {available ? (
        <div className="flex flex-col gap-lg lg:flex-row lg:items-start">
          <ConfirmedWorkCard showAvailableNote />
          <AvailabilityRules />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-lg lg:flex-row lg:items-start">
            <PanelCard title="What reserved you">
              <div className="flex items-center gap-sm px-lg py-base">
                <DateChip month="Dec" day="3" />
                <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                  <p className="text-[14px] font-bold text-ink-primary">
                    Corniche Nights Festival · 3 days
                  </p>
                  <p className="text-[12.5px] font-medium text-ink-muted">
                    Jeddah Season · accepted 14 Aug · catering for 3,500/day
                  </p>
                </div>
                <AppButton
                  variant="secondary"
                  size="s"
                  className="h-[38px] shrink-0 border-border-default px-sm text-[12.5px] font-bold text-ink-primary hover:bg-surface-tint"
                  onClick={() => {
                    navigate("/app/hire-requests?thread=jeddah-corniche")
                  }}
                >
                  Open engagement
                </AppButton>
              </div>
              <p className="border-t border-border-subtle px-lg py-sm pb-base text-[12.5px] leading-[1.5] font-medium text-ink-muted">
                When Jeddah Season (or you) marks this work complete, your status
                returns to Available automatically and you’ll be asked to
                review the organizer.
              </p>
            </PanelCard>
            <AvailabilityRules />
          </div>
          <ConfirmedWorkCard />
        </>
      )}
    </main>
  )
}

function ConfirmedWorkCard({ showAvailableNote = false }: { showAvailableNote?: boolean }) {
  return (
    <PanelCard title="Confirmed upcoming work" meta="3 engagements">
      <ul>
        {vendorConfirmedWork.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-sm border-b border-border-subtle px-lg py-sm last:border-b-0"
          >
            <DateChip month={item.month} day={item.day} />
            <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
              <p className="text-[14px] font-bold text-ink-primary">
                {item.title}
              </p>
              <p className="text-[12.5px] font-medium text-ink-muted">
                {item.meta}
              </p>
            </div>
            <StatusBadge label={item.status} />
          </li>
        ))}
      </ul>
      {showAvailableNote ? (
        <p className="border-t border-border-subtle px-lg py-sm pb-base text-[12.5px] leading-[1.5] font-medium text-ink-muted">
          Confirmed dates don’t block you from staying Available — you
          decide per request whether a new date fits around them.
        </p>
      ) : null}
    </PanelCard>
  )
}

function AvailabilityRules() {
  return (
    <aside className="flex w-full flex-col gap-base rounded-lg bg-surface-canvas px-[22px] py-lg lg:max-w-[432px] lg:shrink-0">
      <h2 className="text-[17px] font-bold text-ink-primary">
        How automatic &amp; manual interact
      </h2>
      <ul className="flex flex-col gap-base">
        {vendorAvailabilityRules.map((rule) => (
          <li key={rule} className="flex items-start gap-gap-md">
            <ArrowElbowDownRightIcon className="mt-3xs size-[15px] shrink-0 text-brand-primary" />
            <p className="text-[13px] leading-[1.55] text-ink-muted">{rule}</p>
          </li>
        ))}
      </ul>
    </aside>
  )
}
