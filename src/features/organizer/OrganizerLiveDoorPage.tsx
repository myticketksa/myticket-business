import { LiveDoorBoard, LiveDoorHead } from "@/features/organizer/live-door-board"

export function OrganizerLiveDoorPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1192px] flex-col gap-lg px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <LiveDoorHead />
      <LiveDoorBoard />
    </main>
  )
}
