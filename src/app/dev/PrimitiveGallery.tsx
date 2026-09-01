import { useState } from "react"
import {
  AppButton,
  AppDivider,
  AppModal,
  AppPagination,
  AppSelect,
  AppSkeleton,
  AppTextarea,
  Avatar,
  CheckboxField,
  CountBadge,
  FilterChip,
  RadioField,
  SearchField,
  StatusBadge,
  TextInput,
  ToggleField,
} from "@/components/primitive"
import { notifyError, notifyNeutral, notifySuccess } from "@/lib/toast"

export function PrimitiveGallery() {
  const [modalOpen, setModalOpen] = useState(false)
  const [shown, setShown] = useState(24)

  return (
    <main className="mx-auto flex max-w-[1192px] flex-col gap-lg px-gutter py-xl">
      <header className="flex flex-col gap-2xs">
        <p className="text-eyebrow text-brand-link">Dev only</p>
        <h1 className="text-display-s text-ink-primary">P0 primitives</h1>
        <p className="text-body-s text-ink-muted">
          Spec-backed wrappers. Not a product screen. Figma MCP was unavailable;
          measurements come from the locked design-system spec.
        </p>
      </header>

      <section className="flex flex-wrap items-center gap-sm">
        <AppButton variant="primary">Primary</AppButton>
        <AppButton variant="secondary">Secondary</AppButton>
        <AppButton variant="ghost">Ghost</AppButton>
        <AppButton variant="destructive">Destructive</AppButton>
        <AppButton loading>Loading</AppButton>
      </section>

      <TextInput id="dev-email" label="Email or phone number" placeholder="team@example.sa" />
      <AppTextarea id="dev-bio" label="Biography" placeholder="Short description" />
      <AppSelect
        id="dev-region"
        label="Region"
        placeholder="Select"
        options={[{ value: "central", label: "Central Region" }]}
      />
      <SearchField placeholder="Search your events…" />
      <CheckboxField id="dev-check" label="Platform fee is refundable" />
      <RadioField
        options={[
          { value: "one", label: "One-time event" },
          { value: "repeat", label: "Repeats on a pattern" },
        ]}
      />
      <ToggleField id="dev-toggle" label="Available for work" />

      <div className="flex flex-wrap gap-2xs">
        <StatusBadge label="On sale" />
        <StatusBadge label="Live now" />
        <StatusBadge label="Declined" />
        <StatusBadge label="Draft" />
        <CountBadge count="7" />
        <FilterChip label="All" count="12" state="selected" />
        <FilterChip label="On sale" count="3" />
        <Avatar initials="RE" size={52} />
      </div>

      <AppDivider />
      <AppSkeleton type="line" />
      <AppPagination
        shown={shown}
        total={168}
        onShowMore={() => {
          setShown((current) => Math.min(current + 24, 168))
        }}
      />

      <div className="flex flex-wrap gap-sm">
        <AppButton
          variant="secondary"
          onClick={() => {
            notifySuccess("Saved to favourites", "We'll nudge you before it sells out.")
          }}
        >
          Success toast
        </AppButton>
        <AppButton
          variant="secondary"
          onClick={() => {
            notifyError(
              "Payment didn't go through",
              "Your card was declined. Try another method — your seats are held for 6:40 more.",
            )
          }}
        >
          Error toast
        </AppButton>
        <AppButton
          variant="ghost"
          onClick={() => {
            notifyNeutral("Neutral toast")
          }}
        >
          Neutral toast
        </AppButton>
        <AppButton variant="secondary" onClick={() => setModalOpen(true)}>
          Open modal
        </AppButton>
      </div>

      <AppModal
        open={modalOpen}
        title="Leave this waitlist?"
        body="Confirmation text"
        onOpenChange={setModalOpen}
      />
    </main>
  )
}
