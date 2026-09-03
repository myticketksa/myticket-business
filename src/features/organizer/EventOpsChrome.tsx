import type { ReactNode } from "react"
import { EventTabBar, type EventTabId } from "@/components/biz/event-tab-bar"
import { PageHead } from "@/components/biz/page-head"
import { eventOpsTabs } from "@/lib/event-tabs"
import { eventEditorValuesFor } from "@/mocks/event-editor"

interface EventOpsChromeProps {
  eventId: string
  activeId: EventTabId
  title: string
  action?: ReactNode
  children: ReactNode
}

export function EventOpsChrome({
  eventId,
  activeId,
  title,
  action,
  children,
}: EventOpsChromeProps) {
  const winter = eventId === "winter-nights"
  const eventTitle = eventEditorValuesFor(eventId).title || "Event"
  const eyebrow = winter ? `${eventTitle} · Thu 12 Nov` : eventTitle

  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-md px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <div className="flex flex-wrap items-end justify-between gap-sm">
        <PageHead eyebrow={eyebrow} title={title} />
        {action}
      </div>
      <EventTabBar
        activeId={activeId}
        showCounts={winter}
        tabs={eventOpsTabs(eventId, winter)}
      />
      {children}
    </main>
  )
}
