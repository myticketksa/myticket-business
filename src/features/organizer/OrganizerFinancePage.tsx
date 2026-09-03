import type { ReactNode } from "react"
import {
  BankIcon,
  ChatCircleIcon,
  CheckCircleIcon,
  ExportIcon,
  FileTextIcon,
  FileXIcon,
  HourglassIcon,
  IdentificationCardIcon,
} from "@phosphor-icons/react"
import { AlertBanner } from "@/components/biz/alert-banner"
import { PanelCard } from "@/components/biz/bar-list-row"
import { ClosedDropdown } from "@/components/biz/closed-dropdown"
import { DocRow } from "@/components/biz/doc-row"
import { KpiCard } from "@/components/biz/kpi-card"
import { ListFooter } from "@/components/biz/list-footer"
import { NoteCard } from "@/components/biz/note-card"
import { PageHead } from "@/components/biz/page-head"
import { ProgressBar } from "@/components/biz/progress-bar"
import { AppButton } from "@/components/primitive/app-button"
import { StatusBadge } from "@/components/primitive/status-badge"
import {
  complianceItems,
  financeEventRevenue,
  financeKpis,
  payoutRows,
  type FinanceKpi,
} from "@/mocks/organizer-finance"

const kpiIcon: Record<FinanceKpi["icon"], ReactNode> = {
  hourglass: <HourglassIcon className="size-5" weight="regular" />,
  check: <CheckCircleIcon className="size-5" weight="regular" />,
  chat: <ChatCircleIcon className="size-5" weight="regular" />,
}

const complianceIcon = {
  bank: <BankIcon className="size-4" weight="regular" />,
  "file-text": <FileTextIcon className="size-4" weight="regular" />,
  "file-x": <FileXIcon className="size-4" weight="regular" />,
  id: <IdentificationCardIcon className="size-4" weight="regular" />,
} as const

export function OrganizerFinancePage() {
  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-[22px] px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead
          eyebrow="Money"
          title="Finance & payouts"
          sub="Earnings accrue from completed sales and are paid out by MyTicket on schedule — this is not a spendable balance."
        />
        <div className="flex flex-wrap items-center gap-2xs">
          <ClosedDropdown label="Last 90 days" />
          <AppButton
            variant="secondary"
            size="m"
            icon={<ExportIcon className="size-[18px]" />}
            className="border-border-default text-ink-primary hover:bg-surface-tint"
          >
            Export statement
          </AppButton>
        </div>
      </div>

      <AlertBanner
        tone="danger"
        lead="Your next payout is held — 1 item missing"
        body="SAR 84,210.00 is ready but cannot be released until your Commercial Registration certificate is provided. Everything else is verified. Payouts resume automatically once it’s approved."
        ctaLabel="Upload document"
      />

      <div className="grid grid-cols-1 gap-base sm:grid-cols-2 xl:grid-cols-4">
        <article className="flex min-w-0 flex-col gap-2xs rounded-lg bg-surface-inverse p-[22px]">
          <div className="flex items-center justify-between gap-sm">
            <p className="text-[13px] font-semibold text-ink-inverse">
              Available for payout
            </p>
            <span className="rounded-badge bg-status-danger px-2xs py-[7px] text-[11px] font-extrabold text-ink-inverse">
              Held
            </span>
          </div>
          <p className="text-[30px] leading-none font-extrabold tracking-[-0.6px] text-ink-inverse">
            SAR 84,210.00
          </p>
          <p className="text-[12.5px] font-semibold text-brand-light">
            Releases when compliance is complete
          </p>
        </article>

        {financeKpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            kind="standard"
            label={kpi.label}
            value={kpi.value}
            note={kpi.note}
            icon={kpiIcon[kpi.icon]}
            className="max-w-none self-stretch"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-lg xl:grid-cols-[minmax(0,668px)_minmax(0,432px)]">
        <div className="flex flex-col gap-lg">
          <PanelCard title="Payout history" meta="paid to SNB ···· 4821">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="h-10 bg-surface-canvas text-[11.5px] font-bold tracking-[0.69px] text-ink-faint uppercase">
                    <th className="w-[100px] px-lg">Reference</th>
                    <th className="px-2xs">Sent to</th>
                    <th className="w-[120px] px-2xs text-right">Amount</th>
                    <th className="w-[110px] px-2xs">Status</th>
                    <th className="w-[90px] px-lg text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutRows.map((row) => (
                    <tr
                      key={row.reference}
                      className="h-[54px] border-b border-border-subtle"
                    >
                      <td className="px-lg text-[13.5px] font-semibold text-ink-primary">
                        {row.reference}
                      </td>
                      <td className="px-2xs text-[13px] font-medium text-ink-muted">
                        {row.sentTo}
                      </td>
                      <td className="px-2xs text-right text-[13.5px] font-bold text-ink-primary">
                        {row.amount}
                      </td>
                      <td className="px-2xs">
                        <StatusBadge label={row.status} tone={row.tone} />
                      </td>
                      <td className="px-lg text-right text-[13.5px] font-bold text-ink-primary">
                        {row.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ListFooter buttonLabel="Show 24 more" meta="Showing 5 of 38" />
          </PanelCard>

          <PanelCard title="Revenue by event" meta="last 90 days · net of fees">
            <ul>
              {financeEventRevenue.map((event) => (
                <li
                  key={event.name}
                  className="flex flex-col gap-sm border-b border-border-subtle px-base py-sm last:border-b-0 sm:flex-row sm:items-center sm:px-lg"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-[2px] sm:w-[240px] sm:shrink-0 sm:flex-none">
                    <p className="text-[13.5px] font-bold text-ink-primary">
                      {event.name}
                    </p>
                    <p className="text-[12px] font-medium text-ink-muted">
                      {event.meta}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <ProgressBar value={event.percent} size={10} />
                  </div>
                  <p className="w-auto shrink-0 text-left text-[13.5px] font-bold text-ink-primary sm:w-[130px] sm:text-right">
                    {event.amount}
                  </p>
                </li>
              ))}
            </ul>
          </PanelCard>
        </div>

        <div className="flex flex-col gap-lg">
          <PanelCard title="Compliance">
            <p className="px-lg pt-2xs text-[13px] text-ink-muted">
              Payouts release only when every item is verified.
            </p>
            <div className="flex flex-col">
              {complianceItems.map((item) => (
                <DocRow
                  key={item.id}
                  title={item.title}
                  note={item.note}
                  state={item.state}
                  icon={complianceIcon[item.icon]}
                />
              ))}
            </div>
            <div className="px-lg py-base">
              <AppButton size="m" className="h-[42px] w-full">
                Upload Commercial Registration
              </AppButton>
            </div>
          </PanelCard>

          <article className="flex flex-col gap-sm rounded-lg border border-border-default bg-surface-card px-[22px] py-lg">
            <div className="flex items-center gap-sm">
              <div className="flex size-[42px] shrink-0 items-center justify-center rounded-sm bg-surface-brand-wash text-brand-primary">
                <BankIcon className="size-5" weight="regular" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-bold text-ink-primary">
                  Saudi National Bank ···· 4821
                </p>
                <p className="text-[12.5px] font-medium text-ink-faint">
                  Riyadh Events Co. · SA44 2000 ···· ···· 4821
                </p>
              </div>
              <StatusBadge label="Verified" tone="SuccessTint" />
            </div>
            <p className="border-t border-border-subtle pt-sm text-[12px] leading-[1.5] font-medium text-ink-faint">
              Changing the account restarts verification, which pauses payouts
              until the new account is verified.{" "}
              <button
                type="button"
                className="font-semibold text-ink-primary underline-offset-2 hover:underline"
              >
                Change account
              </button>
            </p>
          </article>

          <NoteCard
            tone="warm"
            lead="How payouts work."
            body="Customers pay MyTicket; MyTicket retains the platform fee and pays the remainder to your verified account on the payout schedule. You cannot trigger, move, or accelerate a payout — but everything scheduled is listed above with its reason if delayed."
          />
        </div>
      </div>
    </main>
  )
}
