import { useParams } from "react-router"
import { EventOpsChrome } from "@/features/organizer/EventOpsChrome"
import { LiveDoorBoard } from "@/features/organizer/live-door-board"

export function EventLiveDoorPage() {
  const { eventId = "jeddah-comedy" } = useParams()
  const isLive = eventId === "jeddah-comedy"

  return (
    <EventOpsChrome eventId={eventId} activeId="liveDoor" title="Live door">
      {isLive ? <LiveDoorBoard /> : null}
    </EventOpsChrome>
  )
}
