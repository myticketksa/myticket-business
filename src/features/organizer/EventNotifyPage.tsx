import { type FormEvent, useState } from "react"
import { useParams } from "react-router"
import { ValidationError } from "yup"
import { AlertBanner } from "@/components/biz/alert-banner"
import { PanelCard } from "@/components/biz/bar-list-row"
import { FilterPill } from "@/components/biz/filter-pill"
import { EventOpsChrome } from "@/features/organizer/EventOpsChrome"
import { AppButton } from "@/components/primitive/app-button"
import { AppTextarea } from "@/components/primitive/app-textarea"
import { CheckboxField } from "@/components/primitive/checkbox-field"
import { StatusBadge } from "@/components/primitive/status-badge"
import {
  notifyAudienceCopy,
  notifyCancellationBanner,
  notifyDraftMessage,
  notifyKinds,
  notifySendLabel,
  notifySentFooter,
  previousNotifications,
  type PreviousNotification,
} from "@/mocks/event-notify"
import {
  notifyHoldersSchema,
  type NotifyHoldersValues,
  type NotifyKind,
} from "@/schemas/notify-holders"

const secondaryClass =
  "h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"

const MESSAGE_LIMIT = 500

export function EventNotifyPage() {
  const { eventId = "winter-nights" } = useParams()
  const [values, setValues] = useState<NotifyHoldersValues>({
    kind: "schedule",
    message: notifyDraftMessage,
    push: true,
    email: true,
    sms: false,
  })
  const [error, setError] = useState<string | undefined>()

  function setKind(kind: NotifyKind) {
    setValues((current) => ({
      ...current,
      kind,
      ...(kind === "cancellation"
        ? { push: true, email: true, sms: true }
        : {}),
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await notifyHoldersSchema.validate(values)
      setError(undefined)
    } catch (caught) {
      if (caught instanceof ValidationError) {
        setError(caught.message)
      }
    }
  }

  const cancelling = values.kind === "cancellation"

  return (
    <EventOpsChrome
      eventId={eventId}
      activeId="notify"
      title="Notify ticket holders"
    >
      <div className="flex w-full flex-col items-start gap-lg xl:flex-row">
        <PanelCard className="min-w-0 w-full xl:w-[630px] xl:shrink-0" title="New message">
          <form
            className="flex flex-col gap-base p-xl"
            onSubmit={handleSubmit}
            noValidate
          >
            <p className="text-[13.5px] font-medium leading-[1.5] text-ink-muted">
              {notifyAudienceCopy}
            </p>

            <div className="flex flex-col gap-2xs">
              <p className="text-[13px] font-semibold text-ink-primary">
                What kind of message is this?
              </p>
              <div className="flex flex-wrap gap-2xs">
                {notifyKinds.map((pill) => {
                  const selected = values.kind === pill.id
                  const cancellation = pill.id === "cancellation"

                  return (
                    <FilterPill
                      key={pill.id}
                      label={pill.label}
                      size={38}
                      state={selected && !cancellation ? "active" : "idle"}
                      className={
                        cancellation
                          ? selected
                            ? "border-transparent bg-status-danger text-ink-inverse"
                            : "border-status-danger-border text-status-danger"
                          : undefined
                      }
                      onClick={() => {
                        setKind(pill.id)
                      }}
                    />
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2xs">
              <label
                htmlFor="notify-message"
                className="text-[13px] font-semibold text-ink-primary"
              >
                Message
              </label>
              <AppTextarea
                id="notify-message"
                value={values.message}
                maxLength={MESSAGE_LIMIT}
                error={error}
                onChange={(event) => {
                  setValues((current) => ({
                    ...current,
                    message: event.target.value,
                  }))
                }}
              />
              <p className="text-right text-[12px] font-medium text-ink-faint">
                {values.message.length} / {MESSAGE_LIMIT}
              </p>
            </div>

            <div className="flex flex-col gap-2xs">
              <p className="text-[13px] font-semibold text-ink-primary">
                Send through
              </p>
              <CheckboxField
                id="notify-push"
                label="Push notification"
                checked={values.push}
                disabled={cancelling}
                onCheckedChange={(checked) => {
                  setValues((current) => ({ ...current, push: checked }))
                }}
              />
              <CheckboxField
                id="notify-email"
                label="Email"
                checked={values.email}
                disabled={cancelling}
                onCheckedChange={(checked) => {
                  setValues((current) => ({ ...current, email: checked }))
                }}
              />
              <div className="flex flex-wrap items-center gap-2xs">
                <CheckboxField
                  id="notify-sms"
                  label="SMS"
                  checked={values.sms}
                  disabled={cancelling}
                  onCheckedChange={(checked) => {
                    setValues((current) => ({ ...current, sms: checked }))
                  }}
                />
                <p className="text-[12.5px] font-medium text-ink-faint">
                  — for urgent changes only
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-xs">
              <AppButton
                type="button"
                variant="secondary"
                size="m"
                className={secondaryClass}
              >
                Preview
              </AppButton>
              <AppButton type="submit" size="m" className="h-[42px]">
                {notifySendLabel}
              </AppButton>
            </div>

            <AlertBanner
              tone="danger"
              lead={notifyCancellationBanner.lead}
              body={notifyCancellationBanner.body}
            />
          </form>
        </PanelCard>

        <PanelCard
          className="w-full xl:w-[470px] xl:shrink-0"
          title="Previously sent"
        >
          <div>
            {previousNotifications.map((item) => (
              <SentRow key={item.id} item={item} />
            ))}
          </div>
          <p className="border-t border-border-subtle px-lg py-sm text-[12.5px] font-medium leading-[1.5] text-ink-faint">
            {notifySentFooter}
          </p>
        </PanelCard>
      </div>
    </EventOpsChrome>
  )
}

function SentRow({ item }: { item: PreviousNotification }) {
  return (
    <article className="flex flex-col gap-2xs border-b border-border-subtle px-lg py-base last:border-b-0">
      <div className="flex items-center justify-between gap-sm">
        <StatusBadge label={item.kind} />
        <p className="text-[12px] font-medium text-ink-faint">{item.sent}</p>
      </div>
      <p className="text-[13px] leading-[1.45] text-ink-primary">{item.body}</p>
      <p className="text-[12px] font-medium leading-[1.4] text-ink-faint">
        {item.stats}
      </p>
    </article>
  )
}
