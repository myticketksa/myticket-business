import type { ReactNode } from "react"
import {
  CheckCircleIcon,
  ExportIcon,
  FileXIcon,
  HandCoinsIcon,
  HandshakeIcon,
  HourglassIcon,
  IdentificationCardIcon,
} from "@phosphor-icons/react"
import { PanelCard } from "@/components/biz/bar-list-row"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { DocRow } from "@/components/biz/doc-row"
import { KpiCard } from "@/components/biz/kpi-card"
import { ListFooter } from "@/components/biz/list-footer"
import { NoteCard } from "@/components/biz/note-card"
import { PageHead } from "@/components/biz/page-head"
import { AppButton } from "@/components/primitive/app-button"
import { StatusBadge } from "@/components/primitive/status-badge"
import {
  talentFinanceKpis,
  talentPaymentRows,
  talentTrackingSteps,
  type TalentFinanceKpiIcon,
} from "@/mocks/talent-finance"
import { cn } from "@/lib/utils"

const kpiIcon: Record<TalentFinanceKpiIcon, ReactNode> = {
  coins: <HandCoinsIcon className="size-5" />,
  hourglass: <HourglassIcon className="size-5" />,
  handshake: <HandshakeIcon className="size-5" />,
  check: <CheckCircleIcon className="size-5" />,
}

export function TalentFinancePage() {
  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-[22px] px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead
          eyebrow="Money"
          title="Payments"
          sub="MyTicket never moves money between you and organizers. You agree, invoice, and get paid directly — this page keeps a shared record of where each engagement stands."
        />
        <div className="flex flex-wrap items-center gap-2xs">
          <ClosedDropdown label="All engagements" />
          <AppButton
            variant="secondary"
            size="m"
            icon={<ExportIcon className="size-[18px]" />}
            className="border-border-default text-ink-primary hover:bg-surface-tint"
          >
            Export record
          </AppButton>
        </div>
      </div>

      <div className="flex flex-col gap-sm rounded-[16px] border border-border-default bg-surface-footer px-[22px] py-[18px] md:flex-row md:items-center">
        <HandCoinsIcon className="size-[22px] shrink-0 text-accent-amber" />
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <p className="text-[14.5px] font-bold text-status-danger-strong">
            Star Productions marked “Aramco Annual Dinner” as paid — SAR
            18,500.00
          </p>
          <p className="text-[13.5px] leading-[1.55] text-ink-muted">
            Confirm once the money reaches you. If it hasn’t arrived, say so —
            the engagement goes back to Awaiting payment and the organizer is
            notified.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-gap-md">
          <AppButton
            variant="secondary"
            size="m"
            className="border-border-default text-ink-primary hover:bg-surface-tint"
          >
            Not received
          </AppButton>
          <AppButton size="m">Confirm received</AppButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-base sm:grid-cols-2 xl:grid-cols-4">
        {talentFinanceKpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            kind={kpi.kind === "coloured" ? "coloured" : "standard"}
            label={kpi.label}
            value={kpi.value}
            note={kpi.note}
            icon={kpiIcon[kpi.icon]}
            className="max-w-none"
          />
        ))}
      </div>

      <div className="flex flex-col gap-lg xl:flex-row xl:items-start">
        <PanelCard
          title="Payment tracker"
          meta="amounts are self-reported · visible to both sides"
          className="min-w-0 flex-1"
        >
          <div className="hidden items-center gap-gap-md bg-surface-canvas px-lg py-[10px] text-[11.5px] font-bold tracking-[0.69px] text-ink-faint uppercase md:flex">
            <p className="min-w-0 flex-1">Engagement · Organizer</p>
            <p className="w-[110px] text-right">Agreed</p>
            <p className="w-[150px]">Status</p>
            <p className="w-[70px] text-right">Updated</p>
          </div>
          <ul>
            {talentPaymentRows.map((row) => (
              <li
                key={row.id}
                className={cn(
                  "flex flex-wrap items-center gap-gap-md border-b border-border-subtle px-lg py-sm md:flex-nowrap",
                  row.highlight && "bg-surface-tint",
                )}
              >
                <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                  <p className="text-[13.5px] font-bold text-ink-primary">
                    {row.title}
                  </p>
                  <p className="text-[12.5px] font-medium text-ink-muted">
                    {row.organizer}
                  </p>
                </div>
                <p
                  className={cn(
                    "w-[110px] text-right text-[13.5px] font-bold",
                    row.amountTone === "action"
                      ? "text-accent-amber"
                      : "text-ink-primary",
                  )}
                >
                  {row.amount}
                </p>
                <div className="w-[150px]">
                  <StatusBadge label={row.status} />
                </div>
                <p className="w-[70px] text-right text-[13px] font-semibold text-ink-muted">
                  {row.updated}
                </p>
              </li>
            ))}
          </ul>
          <ListFooter
            buttonLabel="Show completed engagements"
            meta="Showing 5 active · 17 completed since 2024"
          />
        </PanelCard>

        <div className="flex w-full flex-col gap-lg xl:w-[432px] xl:shrink-0">
          <PanelCard title="How tracking works" sub="A shared record — not a payment system.">
            <ol>
              {talentTrackingSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex items-start gap-xs px-lg py-sm"
                >
                  <span className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-[13px] bg-surface-brand-wash text-[12.5px] font-extrabold text-accent-amber">
                    {index + 1}
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                    <p className="text-[13.5px] font-bold text-ink-primary">
                      {step.title}
                    </p>
                    <p className="text-[12.5px] leading-[1.5] text-ink-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </PanelCard>

          <PanelCard
            title="Verification documents"
            sub="Keeps your Verified badge and marketplace listing active — unrelated to payments."
          >
            <div className="flex flex-col">
              <DocRow
                title="National ID"
                note="Verified Jan 2026"
                state="verified"
                icon={<IdentificationCardIcon className="size-4" />}
              />
              <DocRow
                title="Freelance Work Document"
                note="Missing — hides your Verified badge in the marketplace"
                state="missing"
                icon={<FileXIcon className="size-4" />}
              />
            </div>
            <div className="px-lg py-base">
              <AppButton size="m" className="h-[42px] w-full">
                Upload Freelance Work Document
              </AppButton>
            </div>
          </PanelCard>

          <NoteCard
            tone="warm"
            lead="Where MyTicket handles money — and where it doesn’t."
            body="Guests pay MyTicket for tickets, and MyTicket pays organizers. Your fee is agreed and settled directly between you and the organizer — MyTicket never collects, holds, or transfers it. Disagreements about payment are resolved between the two of you; Support can only help with the record shown here."
          />
        </div>
      </div>
    </main>
  )
}
