import { ArrowRightIcon, CheckIcon, ConfettiIcon } from "@phosphor-icons/react"
import { Navigate, useNavigate } from "react-router"
import { NoteCard } from "@/components/biz/note-card"
import { AppButton } from "@/components/primitive/app-button"
import { EntryHeader } from "@/layouts/EntryShell"
import {
  organizerWelcome,
  talentWelcome,
  vendorWelcome,
  welcomeNote,
  type WelcomeCopy,
  type WelcomeTask,
} from "@/mocks/welcome-tasks"
import { useAppSelector } from "@/store/hooks"
import type { BusinessRole } from "@/types/role"

const welcomeByRole: Record<BusinessRole, WelcomeCopy> = {
  organizer: organizerWelcome,
  talent: talentWelcome,
  vendor: vendorWelcome,
}

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

export function WelcomePage() {
  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  const copy = welcomeByRole[user.role]

  function goWorkspace() {
    navigate("/app", { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <EntryHeader>
        <button
          type="button"
          className="inline-flex max-w-[55%] items-center gap-[6px] text-[12px] font-semibold text-ink-muted sm:max-w-none sm:text-[13.5px]"
          onClick={goWorkspace}
        >
          <span className="truncate sm:hidden">Skip — workspace</span>
          <span className="hidden sm:inline">Skip for now — go to my workspace</span>
          <ArrowRightIcon className="size-[15px] shrink-0" weight="bold" />
        </button>
      </EntryHeader>

      <div className="flex flex-1 flex-col items-center px-base sm:px-gutter pt-10 sm:pt-[56px] pb-[60px] sm:pb-[100px]">
        <div className="flex w-full max-w-[860px] flex-col gap-xl">
          <div className="flex flex-col items-center gap-lg text-center">
            <span className="inline-flex size-[68px] items-center justify-center rounded-[34px] bg-brand-gradient text-ink-inverse shadow-[0px_8px_24px_0px_rgba(242,92,43,0.35)]">
              <ConfettiIcon className="size-8" />
            </span>
            <h1 className="text-[24px] leading-[1.12] font-extrabold text-ink-primary sm:text-[32px]">
              You’re approved, {user.displayName}
            </h1>
            <p className="max-w-[860px] text-[15px] leading-[1.55] font-medium text-ink-muted">
              Your {copy.workspaceKind} is open. Your public profile is live at{" "}
              {copy.profilePath}
              <br />
              {copy.subLine}
            </p>
          </div>

          <section className="overflow-hidden rounded-lg border border-border-default bg-surface-card">
            {copy.tasks.map((task, index) => (
              <WelcomeTaskRow key={task.id} task={task} step={index + 1} />
            ))}
          </section>

          <NoteCard tone="warm" lead={welcomeNote.lead} body={welcomeNote.body} />

          <div className="flex flex-col items-center gap-xs">
            <AppButton size="l" onClick={goWorkspace}>
              Open my workspace
            </AppButton>
            <a
              href={`https://${copy.profilePath}`}
              className="text-[13.5px] font-semibold text-brand-primary"
            >
              View my public profile as the public sees it
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function WelcomeTaskRow({
  task,
  step,
}: {
  task: WelcomeTask
  step: number
}) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-sm border-t border-border-subtle px-base py-lg first:border-t-0 sm:flex-row sm:items-center sm:gap-base sm:px-xl">
      <div className="flex items-center gap-sm sm:gap-base">
        {task.done ? (
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[20px] bg-status-success-light text-status-success">
            <CheckIcon className="size-5" weight="bold" />
          </span>
        ) : (
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[20px] bg-surface-brand-wash text-[15px] font-extrabold text-brand-primary">
            {step}
          </span>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <p className="text-[15px] font-bold text-ink-primary">{task.title}</p>
          <p className="text-[13px] leading-[1.45] font-medium text-ink-muted">
            {task.body}
          </p>
        </div>
      </div>
      <AppButton
        variant={task.done ? "secondary" : "primary"}
        size={task.done ? "m" : "s"}
        className={task.done ? secondaryClass : "h-9 w-full sm:w-auto shrink-0"}
        onClick={() => {
          navigate(task.href)
        }}
      >
        {task.action}
      </AppButton>
    </div>
  )
}
