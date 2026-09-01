import { LiveDoorBoard, LiveDoorHead } from "@/features/organizer/live-door-board"

export function OrganizerLiveDoorPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-lg px-gutter pt-8 pb-[80px]">
      <LiveDoorHead />
      <LiveDoorBoard />
    </main>
  )
}
