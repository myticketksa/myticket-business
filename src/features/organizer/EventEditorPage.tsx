import { useState } from "react"
import { useParams } from "react-router"
import { CircleIcon, CopySimpleIcon, EyeIcon } from "@phosphor-icons/react"
import { AreaRailItem } from "@/components/biz/area-rail-item"
import { EventTabBar } from "@/components/biz/event-tab-bar"
import { PageHead } from "@/components/biz/page-head"
import { PanelCard } from "@/components/biz/bar-list-row"
import { ProgressBar } from "@/components/biz/progress-bar"
import { AppButton } from "@/components/primitive/app-button"
import { StatusBadge } from "@/components/primitive/status-badge"
import { EditorAreas } from "@/features/organizer/event-editor-areas"
import { eventOpsTabs } from "@/lib/event-tabs"
import {
  editorAreas,
  editorEventRef,
  editorHeadMeta,
  editorMissingNote,
  editorReadiness,
  eventEditorValuesFor,
} from "@/mocks/event-editor"
import type { EventEditorValues } from "@/schemas/event-editor"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

const dangerClass =
  "h-[42px] border-status-danger text-status-danger hover:bg-status-danger-light"

function scrollToArea(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function EventEditorPage() {
  const { eventId = "new" } = useParams()
  const [values, setValues] = useState<EventEditorValues>(() =>
    eventEditorValuesFor(eventId),
  )
  const winter = eventId === "winter-nights"

  function patch<K extends keyof EventEditorValues>(
    key: K,
    value: EventEditorValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-[22px] px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <div className="flex flex-wrap items-start justify-between gap-sm">
        <PageHead
          eyebrow={`Editing event · ${editorEventRef}`}
          title={values.title || "Edit event"}
          sub={editorHeadMeta}
          badge={<StatusBadge label="Draft" />}
        />
        <div className="flex flex-wrap items-start gap-gap-md">
          <AppButton
            variant="ghost"
            size="m"
            className="h-[42px] text-ink-muted"
            icon={<CopySimpleIcon className="size-[18px]" />}
          >
            Duplicate
          </AppButton>
          <AppButton
            variant="secondary"
            size="m"
            className={secondaryClass}
            icon={<EyeIcon className="size-[18px]" />}
          >
            Preview public page
          </AppButton>
          <div className="flex flex-col items-end gap-[6px]">
            <span className="inline-flex h-10 cursor-not-allowed items-center rounded-[20px] bg-surface-skeleton px-lg text-[14px] font-semibold text-ink-placeholder">
              Submit for review
            </span>
            <p className="text-[11.5px] font-semibold text-accent-amber">
              {editorMissingNote}
            </p>
          </div>
        </div>
      </div>

      <EventTabBar
        activeId="edit"
        showCounts={winter}
        tabs={eventOpsTabs(eventId, winter)}
      />

      <div className="grid grid-cols-1 items-start gap-[22px] xl:grid-cols-[292px_minmax(0,1fr)]">
        <aside className="flex flex-col gap-sm xl:sticky xl:top-xl">
          <nav
            className="overflow-hidden rounded-md border border-border-default bg-surface-card px-[6px] py-2xs"
            aria-label="Event areas"
          >
            <div className="flex flex-col gap-[4px]">
              {editorAreas.map((area) => (
                <AreaRailItem
                  key={area.id}
                  label={area.label}
                  state={area.state}
                  number={area.number}
                  count={area.count}
                  onClick={() => {
                    scrollToArea(area.id)
                  }}
                />
              ))}
            </div>
          </nav>

          <PanelCard
            title={editorReadiness.title}
            action={
              <p className="text-[13px] font-semibold text-accent-amber">
                {editorReadiness.meta}
              </p>
            }
          >
            <div className="flex flex-col gap-sm px-lg py-md">
              <ProgressBar value={editorReadiness.percent} size={8} />
              <ul className="flex flex-col gap-sm">
                {editorReadiness.blockers.map((blocker) => (
                  <li
                    key={blocker}
                    className="flex items-center gap-2xs text-[12.5px] font-medium text-ink-muted"
                  >
                    <CircleIcon
                      className="size-[13px] shrink-0 text-status-danger"
                      weight="regular"
                    />
                    {blocker}
                  </li>
                ))}
              </ul>
              <p className="border-t border-border-subtle pt-sm text-[12px] font-medium leading-normal text-ink-faint">
                {editorReadiness.footnote}
              </p>
            </div>
          </PanelCard>

          <AppButton variant="secondary" size="m" className={dangerClass}>
            Delete draft
          </AppButton>
        </aside>

        <EditorAreas eventId={eventId} values={values} onPatch={patch} />
      </div>
    </main>
  )
}
