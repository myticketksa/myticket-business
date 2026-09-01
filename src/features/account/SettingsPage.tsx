import { type ReactNode, useState } from "react"
import {
  DesktopIcon,
  DeviceMobileIcon,
  PasswordIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react"
import { PageHead } from "@/components/biz/page-head"
import { UnderlineTab } from "@/components/biz/underline-tab"
import { AppButton } from "@/components/primitive/app-button"
import { AppSelect } from "@/components/primitive/app-select"
import { StatusBadge } from "@/components/primitive/status-badge"
import { TextInput } from "@/components/primitive/text-input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  settingsByRole,
  settingsSessions,
  type ChannelState,
  type PrefRow,
} from "@/mocks/settings"
import { useAppSelector } from "@/store/hooks"

type SettingsTab = "account" | "security" | "prefs"

export function SettingsPage() {
  const role = useAppSelector((state) => state.auth.user?.role) ?? "organizer"
  const dataset = settingsByRole[role]
  const [tab, setTab] = useState<SettingsTab>("account")
  const [prefsRole, setPrefsRole] = useState(role)
  const [prefs, setPrefs] = useState(dataset.prefRows)
  if (prefsRole !== role) {
    setPrefsRole(role)
    setPrefs(settingsByRole[role].prefRows)
  }

  function toggle(rowId: string, channel: "email" | "push" | "sms") {
    setPrefs((rows) =>
      rows.map((row) => {
        if (row.id !== rowId || row.locked || row[channel] === "na") {
          return row
        }
        return { ...row, [channel]: !row[channel] }
      }),
    )
  }

  function goTo(next: SettingsTab) {
    setTab(next)
    document.getElementById(`settings-${next}`)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="mx-auto flex w-full max-w-[1180px] flex-col gap-xl px-gutter pt-8 pb-[80px]">
      <PageHead eyebrow="Account" title="Settings" />

      <div className="flex gap-[28px] border-b border-border-default">
        <UnderlineTab
          label="Account"
          active={tab === "account"}
          onClick={() => {
            goTo("account")
          }}
        />
        <UnderlineTab
          label="Security"
          active={tab === "security"}
          onClick={() => {
            goTo("security")
          }}
        />
        <UnderlineTab
          label="Notification preferences"
          active={tab === "prefs"}
          onClick={() => {
            goTo("prefs")
          }}
        />
      </div>

      <section id="settings-account" className="flex flex-col gap-lg pt-xl">
          <div className="grid grid-cols-1 gap-base md:grid-cols-2">
            <TextInput
              id="full-name"
              label="Full name"
              key={`${role}-full-name`}
              defaultValue={dataset.account.fullName}
            />
            <TextInput
              id="display-name"
              label="Display name"
              key={`${role}-display-name`}
              defaultValue={dataset.account.displayName}
            />
          </div>
          <div className="grid grid-cols-1 gap-base md:grid-cols-2">
            <VerifiedField
              id="email"
              label="Email — changed via verification"
              value={dataset.account.email}
            />
            <VerifiedField
              id="phone"
              label={dataset.account.phoneLabel}
              value={dataset.account.phone}
            />
          </div>
          <div className="grid grid-cols-1 gap-base md:grid-cols-2">
            <AppSelect
              id="language"
              label="Interface language"
              value={dataset.account.language}
              options={[
                { value: "English", label: "English" },
                { value: "Arabic", label: "العربية" },
              ]}
            />
            <AppSelect
              id="appearance"
              label="Appearance"
              value={dataset.account.appearance}
              options={[{ value: "Light", label: "Light" }]}
            />
          </div>
      </section>

      <section id="settings-security" className="flex flex-col pt-xl">
          <SecurityRow
            icon={<PasswordIcon className="size-[21px]" />}
            title="Password"
            note="Last changed 4 months ago"
            trailing={
              <AppButton
                variant="secondary"
                size="m"
                className="border-border-default text-ink-primary hover:bg-surface-tint"
              >
                Change password
              </AppButton>
            }
          />
          <SecurityRow
            icon={<ShieldCheckIcon className="size-[21px]" />}
            title="Two-step verification"
            badge="On"
            note="Authenticator app · recovery codes saved Jan 2026"
            trailing={
              <div className="flex flex-wrap gap-2xs">
                <AppButton
                  variant="secondary"
                  size="m"
                  className="border-border-default text-ink-primary hover:bg-surface-tint"
                >
                  New recovery codes
                </AppButton>
                <AppButton variant="ghost" size="m" className="text-ink-muted">
                  Turn off
                </AppButton>
              </div>
            }
          />
          {settingsSessions.map((session) => (
            <SecurityRow
              key={session.id}
              icon={
                session.icon === "mobile" ? (
                  <DeviceMobileIcon className="size-[21px]" />
                ) : (
                  <DesktopIcon className="size-[21px]" />
                )
              }
              title={session.device}
              badge={session.current ? "This device" : undefined}
              note={session.meta}
              trailing={
                session.current ? undefined : (
                  <AppButton variant="ghost" size="m" className="text-ink-muted">
                    Sign out
                  </AppButton>
                )
              }
            />
          ))}
          <div className="pt-lg">
            <AppButton
              variant="secondary"
              size="m"
              className="border-status-danger text-status-danger hover:bg-status-danger-light"
            >
              Sign out everywhere
            </AppButton>
          </div>
      </section>

      <section id="settings-prefs" className="flex flex-col gap-xs pt-[32px]">
          <p className="text-[13px] leading-[1.45] text-ink-muted">
            Choose channels per subject. Security alerts always send everywhere.
          </p>
          <div className="overflow-hidden rounded-[14px] border border-border-default bg-surface-card">
            <div className="flex items-center bg-surface-canvas px-lg py-[13px] text-[11.5px] font-bold tracking-[0.69px] text-ink-faint uppercase">
              <p className="min-w-0 flex-1">Subject</p>
              <p className="w-[90px] text-center">Email</p>
              <p className="w-[90px] text-center">Push</p>
              <p className="w-[90px] text-center">SMS</p>
            </div>
            {prefs.map((row) => (
              <PrefRowView key={row.id} row={row} onToggle={toggle} />
            ))}
          </div>
        </section>
    </main>
  )
}

function VerifiedField({
  id,
  label,
  value,
}: {
  id: string
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-gap-md">
      <p className="text-body-s text-ink-body">{label}</p>
      <div className="flex items-center gap-2xs">
        <TextInput id={id} value={value} disabled className="flex-1" />
        <AppButton
          variant="secondary"
          size="m"
          className="shrink-0 border-border-default text-ink-primary hover:bg-surface-tint"
        >
          Change
        </AppButton>
      </div>
    </div>
  )
}

function SecurityRow({
  icon,
  title,
  badge,
  note,
  trailing,
}: {
  icon: ReactNode
  title: string
  badge?: string
  note: string
  trailing?: ReactNode
}) {
  return (
    <div className="flex items-center gap-sm border-b border-border-subtle py-base">
      <span className="text-ink-primary">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2xs">
          <p className="text-[14px] font-bold text-ink-primary">{title}</p>
          {badge ? <StatusBadge label={badge} /> : null}
        </div>
        <p className="text-[12.5px] font-medium text-ink-faint">{note}</p>
      </div>
      {trailing}
    </div>
  )
}

function PrefRowView({
  row,
  onToggle,
}: {
  row: PrefRow
  onToggle: (rowId: string, channel: "email" | "push" | "sms") => void
}) {
  return (
    <div className="flex items-center border-b border-border-subtle px-lg py-[13px] last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-bold text-ink-primary">{row.subject}</p>
        <p className="text-[12px] leading-[1.4] font-medium text-ink-faint">{row.note}</p>
      </div>
      <PrefCell
        state={row.email}
        locked={row.locked}
        label={`${row.subject} email`}
        onToggle={() => {
          onToggle(row.id, "email")
        }}
      />
      <PrefCell
        state={row.push}
        locked={row.locked}
        label={`${row.subject} push`}
        onToggle={() => {
          onToggle(row.id, "push")
        }}
      />
      <PrefCell
        state={row.sms}
        locked={row.locked}
        label={`${row.subject} SMS`}
        onToggle={() => {
          onToggle(row.id, "sms")
        }}
      />
    </div>
  )
}

function PrefCell({
  state,
  locked = false,
  label,
  onToggle,
}: {
  state: ChannelState
  locked?: boolean
  label: string
  onToggle: () => void
}) {
  return (
    <div className="flex w-[90px] items-center justify-center">
      {state === "na" ? (
        <span className="text-[13px] font-medium text-ink-disabled">—</span>
      ) : (
        <Checkbox
          aria-label={label}
          checked={state}
          disabled={locked}
          onCheckedChange={() => {
            onToggle()
          }}
          className="size-4 rounded-[3px] border-border-default data-checked:border-brand-primary data-checked:bg-brand-primary"
        />
      )}
    </div>
  )
}
