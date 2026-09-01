import {
  ArrowCounterClockwiseIcon,
  ChatCircleIcon,
  CheckCircleIcon,
  HourglassMediumIcon,
  LockSimpleIcon,
  TicketIcon,
} from "@phosphor-icons/react"
import { useNavigate } from "react-router"
import { PanelCard } from "@/components/biz/bar-list-row"
import { AppButton } from "@/components/primitive/app-button"
import { EntryAccountLinks, EntryHeader } from "@/layouts/EntryShell"
import {
  applicationReviewFootnote,
  applicationReviewLockNote,
  applicationReviewOutcomes,
  applicationReviewRows,
} from "@/mocks/application"
import { useAppDispatch } from "@/store/hooks"
import { signOut } from "@/store/slices/auth"
import { cn } from "@/lib/utils"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

const outcomeIcon = {
  approved: (
    <CheckCircleIcon className="size-5 text-status-success" weight="regular" />
  ),
  declined: (
    <ArrowCounterClockwiseIcon
      className="size-5 text-brand-primary"
      weight="regular"
    />
  ),
  meanwhile: (
    <TicketIcon className="size-5 text-brand-primary" weight="regular" />
  ),
}

export function ApplicationReviewPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen flex-col">
      <EntryHeader>
        <EntryAccountLinks />
      </EntryHeader>

      <div className="flex flex-1 flex-col items-center px-gutter pt-[56px] pb-[100px]">
        <div className="flex w-full max-w-[860px] flex-col gap-xl">
          <div className="flex flex-col items-center gap-base text-center">
            <span className="inline-flex size-16 items-center justify-center rounded-[32px] bg-surface-brand-wash text-brand-primary">
              <HourglassMediumIcon className="size-[30px]" />
            </span>
            <h1 className="text-[30px] leading-[1.18] font-extrabold text-ink-primary">
              Your organizer application is with our review team
            </h1>
            <p className="text-[14.5px] leading-[1.58] font-medium text-ink-muted">
              Submitted Thu 20 Aug · 14:12 · reference APP-40219. A person
              reviews every application — most are decided within 2 working
              days. We’ll email and text you the moment there’s an
              outcome.
            </p>
          </div>

          <div className="grid gap-lg md:grid-cols-3">
            {applicationReviewOutcomes.map((outcome) => (
              <div key={outcome.id} className="flex flex-col gap-[10px]">
                <span
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-[20px]",
                    outcome.tone === "success"
                      ? "bg-status-success-light"
                      : "bg-surface-brand-wash",
                  )}
                >
                  {outcomeIcon[outcome.id]}
                </span>
                <p className="text-[14.5px] font-bold text-ink-primary">
                  {outcome.title}
                </p>
                <p className="text-[13px] leading-[1.45] font-medium text-ink-muted">
                  {outcome.body}
                </p>
              </div>
            ))}
          </div>

          <PanelCard
            title="What we received from you"
            action={
              <span className="inline-flex items-center gap-[6px] rounded-[14px] bg-surface-brand-wash py-[5px] pr-xs pl-[10px]">
                <LockSimpleIcon
                  className="size-[14px] text-accent-amber"
                  weight="fill"
                />
                <span className="text-[12.5px] font-bold text-accent-amber">
                  Locked during review
                </span>
              </span>
            }
          >
            <div className="px-lg py-3xs">
              {applicationReviewRows.map((row) => (
                <div
                  key={row.label}
                  className="flex gap-base border-b border-border-subtle py-sm last:border-b-0"
                >
                  <p className="w-[200px] shrink-0 text-[13px] font-semibold text-ink-faint">
                    {row.label}
                  </p>
                  <p className="min-w-0 flex-1 text-[13.5px] leading-[1.5] font-medium text-ink-primary">
                    {row.value}
                    {row.arabic ? (
                      <span className="font-arabic font-bold">{row.arabic}</span>
                    ) : null}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-surface-canvas px-lg py-sm">
              <p className="text-[12.5px] leading-[1.5] font-medium text-ink-faint">
                {applicationReviewLockNote}
              </p>
            </div>
          </PanelCard>

          <div className="flex flex-wrap items-center gap-xs">
            <AppButton
              variant="secondary"
              size="m"
              className={secondaryClass}
              icon={<ChatCircleIcon className="size-[18px]" />}
            >
              Contact support
            </AppButton>
            <AppButton
              variant="ghost"
              size="m"
              className="h-[42px] text-ink-muted hover:bg-transparent"
              onClick={() => {
                dispatch(signOut())
                navigate("/auth", { replace: true })
              }}
            >
              Withdraw application
            </AppButton>
          </div>

          <p className="text-center text-[13px] leading-[1.5] font-medium text-ink-faint">
            {applicationReviewFootnote}
          </p>
        </div>
      </div>
    </div>
  )
}
