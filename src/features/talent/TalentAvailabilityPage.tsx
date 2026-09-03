import { useState } from "react"
import { ArrowElbowDownRightIcon, CircleIcon } from "@phosphor-icons/react"
import { DateChip } from "@/components/biz/date-chip"
import { PageHead } from "@/components/biz/page-head"
import { PanelCard } from "@/components/biz/bar-list-row"
import { AppButton } from "@/components/primitive/app-button"
import { StatusBadge } from "@/components/primitive/status-badge"
import {
  talentAvailabilityRules,
  talentConfirmedWork,
} from "@/mocks/talent-availability"
import { cn } from "@/lib/utils"

export function TalentAvailabilityPage() {
  const [available, setAvailable] = useState(true)

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
          <CircleIcon
            className={cn(
              "size-[22px]",
              available ? "text-status-success" : "text-ink-faint",
            )}
            weight="fill"
          />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
          <p
            className={cn(
              "text-[20px] font-extrabold",
              available ? "text-status-success" : "text-ink-faint",
            )}
          >
            {available ? "Available for work" : "Reserved"}
          </p>
          <p className="text-[13.5px] leading-[1.55] text-ink-muted">
            {available
              ? "You appear as available in marketplace results and on your public profile. Accepting any hire request switches you to Reserved automatically."
              : "You appear as reserved in marketplace results and on your public profile. Organizers can still view your profile and message you."}
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
            manual override — stays until you change it back
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-lg lg:flex-row lg:items-start">
        <PanelCard title="Confirmed upcoming work" meta="3 engagements">
          <ul>
            {talentConfirmedWork.map((item) => (
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
                <StatusBadge label="Accepted" />
              </li>
            ))}
          </ul>
          <p className="border-t border-border-subtle px-lg py-sm pb-base text-[12.5px] leading-[1.5] font-medium text-ink-muted">
            Confirmed dates don’t block you from staying Available — you
            decide per request whether a new date fits around them.
          </p>
        </PanelCard>

        <aside className="flex w-full flex-col gap-base rounded-lg bg-surface-canvas px-[22px] py-lg lg:max-w-[432px] lg:shrink-0">
          <h2 className="text-[17px] font-bold text-ink-primary">
            How automatic &amp; manual interact
          </h2>
          <ul className="flex flex-col gap-base">
            {talentAvailabilityRules.map((rule) => (
              <li key={rule} className="flex items-start gap-gap-md">
                <ArrowElbowDownRightIcon className="mt-3xs size-[15px] shrink-0 text-brand-primary" />
                <p className="text-[13px] leading-[1.55] text-ink-muted">
                  {rule}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  )
}
