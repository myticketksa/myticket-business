import { useState } from "react"
import { useNavigate } from "react-router"
import { ChatCircleIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { NoteCard } from "@/components/biz/note-card"
import { PanelCard } from "@/components/biz/bar-list-row"
import { AppButton } from "@/components/primitive/app-button"
import { StatusBadge } from "@/components/primitive/status-badge"
import { EntryAccountLinks, EntryHeader } from "@/layouts/EntryShell"
import {
  applicationDeclinedFootnote,
  applicationDeclinedNote,
  applicationDeclinedReason,
} from "@/mocks/application"
import { useAppDispatch } from "@/store/hooks"
import { signOut } from "@/store/slices/auth"
import { cn } from "@/lib/utils"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

export function ApplicationDeclinedPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [crFixed, setCrFixed] = useState(false)
  const [personFixed, setPersonFixed] = useState(false)
  const canResubmit = crFixed && personFixed

  return (
    <div className="flex min-h-screen flex-col">
      <EntryHeader>
        <EntryAccountLinks />
      </EntryHeader>

      <div className="flex flex-1 flex-col items-center px-gutter pt-[56px] pb-[100px]">
        <div className="flex w-full max-w-[860px] flex-col gap-xl">
          <p className="text-[12px] font-bold tracking-[0.96px] text-brand-link uppercase">
            Organizer application · APP-40219 · reviewed Fri 21 Aug
          </p>
          <h1 className="text-[28px] leading-[1.16] font-extrabold tracking-[-0.84px] text-ink-primary">
            Not approved yet — here’s exactly what to fix
          </h1>

          <section className="flex flex-col gap-xs rounded-lg border border-status-danger-border bg-status-danger-light px-[22px] py-lg">
            <div className="flex items-center gap-[10px]">
              <WarningCircleIcon
                className="size-6 text-status-danger-strong"
                weight="fill"
              />
              <p className="text-[16px] font-extrabold text-status-danger-strong">
                The reviewer’s reason
              </p>
            </div>
            <p className="text-[14.5px] leading-[1.65] font-medium text-ink-primary">
              {applicationDeclinedReason}
            </p>
            <div className="flex flex-wrap gap-2xs">
              <StatusBadge label="Fix: Commercial Registration" />
              <StatusBadge label="Fix: Responsible person" />
            </div>
          </section>

          <NoteCard
            tone="warm"
            lead={applicationDeclinedNote.lead}
            body={applicationDeclinedNote.body}
          />

          <PanelCard
            title="Your application — now editable"
            action={<StatusBadge label="Unlocked" />}
          >
            <div className="flex flex-col gap-[10px] px-lg py-3xs">
              <div className="flex items-center gap-base border-b border-border-subtle px-xs py-sm">
                <p className="w-[200px] shrink-0 text-[13px] font-semibold text-ink-faint">
                  Company name
                </p>
                <p className="min-w-0 flex-1 text-[13.5px] font-medium text-ink-primary">
                  Riyadh Events Co. ·{" "}
                  <span className="font-arabic font-bold">
                    شركة فعاليات الرياض
                  </span>
                </p>
                <AppButton
                  variant="secondary"
                  size="m"
                  className={secondaryClass}
                >
                  Edit
                </AppButton>
              </div>

              <FlaggedRow
                label="Commercial Registration"
                value="CR-1010-2026.pdf · expired March 2026"
                action="Replace"
                flagged={!crFixed}
                onFix={() => {
                  setCrFixed(true)
                }}
              />

              <FlaggedRow
                label="Responsible person"
                value="Reem Al-Otaibi — doesn’t match the CR"
                action="Update"
                flagged={!personFixed}
                onFix={() => {
                  setPersonFixed(true)
                }}
              />

              <div className="flex items-center gap-base px-xs py-sm">
                <p className="w-[200px] shrink-0 text-[13px] font-semibold text-ink-faint">
                  Everything else
                </p>
                <p className="min-w-0 flex-1 text-[13px] leading-[1.48] font-medium text-ink-faint">
                  Description, region, contact and remaining documents were fine
                  — no changes needed.
                </p>
              </div>
            </div>
          </PanelCard>

          <div className="flex flex-wrap items-start gap-xs">
            {canResubmit ? (
              <AppButton
                size="m"
                onClick={() => {
                  navigate("/application/review", { replace: true })
                }}
              >
                Resubmit application
              </AppButton>
            ) : (
              <span className="inline-flex h-10 items-center rounded-[20px] bg-surface-sold px-lg text-[14px] font-semibold text-ink-disabled">
                Resubmit application
              </span>
            )}
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
              Withdraw
            </AppButton>
          </div>

          <p className="text-center text-[13px] leading-[1.5] font-medium text-ink-faint">
            {applicationDeclinedFootnote}
          </p>
        </div>
      </div>
    </div>
  )
}

function FlaggedRow({
  label,
  value,
  action,
  flagged,
  onFix,
}: {
  label: string
  value: string
  action: string
  flagged: boolean
  onFix: () => void
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-base border-b border-border-subtle px-xs py-sm",
        flagged && "rounded-badge bg-status-danger-light",
      )}
    >
      <div className="flex w-[200px] shrink-0 items-center gap-[6px]">
        {flagged ? (
          <WarningCircleIcon
            className="size-[15px] text-status-danger-strong"
            weight="fill"
          />
        ) : null}
        <p
          className={cn(
            "text-[13px] font-semibold",
            flagged ? "text-status-danger-strong" : "text-ink-faint",
          )}
        >
          {label}
        </p>
      </div>
      <p
        className={cn(
          "min-w-0 flex-1 text-[13.5px] font-medium",
          flagged ? "text-status-danger-strong" : "text-ink-primary",
        )}
      >
        {value}
      </p>
      {flagged ? (
        <AppButton variant="primary" size="s" className="h-9" onClick={onFix}>
          {action}
        </AppButton>
      ) : null}
    </div>
  )
}
