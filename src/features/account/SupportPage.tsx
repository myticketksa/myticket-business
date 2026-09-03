import { type FormEvent, type ReactNode, useMemo, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import {
  ArrowCounterClockwiseIcon,
  BugIcon,
  CalendarXIcon,
  FileTextIcon,
  HourglassMediumIcon,
  ImagesIcon,
  LockKeyIcon,
  PaperclipIcon,
  TagIcon,
} from "@phosphor-icons/react"
import { ValidationError } from "yup"
import { PageHead } from "@/components/biz/page-head"
import { PanelCard } from "@/components/biz/bar-list-row"
import { AppButton } from "@/components/primitive/app-button"
import { AppSelect } from "@/components/primitive/app-select"
import { AppTextarea } from "@/components/primitive/app-textarea"
import { SearchField } from "@/components/primitive/search-field"
import { StatusBadge } from "@/components/primitive/status-badge"
import {
  supportCaseSchema,
  type SupportCaseValues,
} from "@/schemas/support-case"
import {
  supportByRole,
  type SupportCase,
  type SupportCaseIcon,
} from "@/mocks/support"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/store/hooks"

const caseIcon: Record<SupportCaseIcon, ReactNode> = {
  lock: <LockKeyIcon className="size-[18px]" />,
  calendar: <CalendarXIcon className="size-[18px]" />,
  refund: <ArrowCounterClockwiseIcon className="size-[18px]" />,
  bug: <BugIcon className="size-[18px]" />,
  images: <ImagesIcon className="size-[18px]" />,
  hourglass: <HourglassMediumIcon className="size-[18px]" />,
  tag: <TagIcon className="size-[18px]" />,
}

const pageSub =
  "Business-account support — applications, payouts, event reviews, compliance and technical problems."

export function SupportPage() {
  const role = useAppSelector((state) => state.auth.user?.role) ?? "organizer"
  const dataset = supportByRole[role]
  const [formRole, setFormRole] = useState(role)
  const [values, setValues] = useState<SupportCaseValues>({
    topic: dataset.defaultTopic,
    related: dataset.defaultRelated,
    description: "",
  })
  const [query, setQuery] = useState("")
  const [error, setError] = useState<string | undefined>()

  if (formRole !== role) {
    setFormRole(role)
    setValues({
      topic: supportByRole[role].defaultTopic,
      related: supportByRole[role].defaultRelated,
      description: "",
    })
    setQuery("")
    setError(undefined)
  }

  const cases = useMemo(
    () => filterCases(dataset.cases, query),
    [dataset.cases, query],
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await supportCaseSchema.validate(values)
      setError(undefined)
    } catch (caught) {
      if (caught instanceof ValidationError) {
        setError(caught.message)
      }
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-[1180px] flex-col gap-xl px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <PageHead eyebrow="Account" title="Support" sub={pageSub} />
      <div className="grid grid-cols-1 items-start gap-lg xl:grid-cols-[minmax(0,473px)_minmax(0,615px)]">
        <PanelCard
          title="Raise a case"
          sub="We reply within one working day; payout and live-event issues are prioritised."
        >
          <form
            className="flex flex-col gap-base px-lg pt-base pb-lg"
            onSubmit={handleSubmit}
            noValidate
          >
            <AppSelect
              id="topic"
              label="What's it about?"
              value={values.topic}
              options={dataset.topics}
              onValueChange={(value) => {
                setValues((current) => ({ ...current, topic: value }))
              }}
            />
            <AppSelect
              id="related"
              label="Related to — optional"
              value={values.related}
              options={dataset.related}
              onValueChange={(value) => {
                setValues((current) => ({ ...current, related: value }))
              }}
            />
            <AppTextarea
              id="describe"
              label="Describe it"
              placeholder="Tell us what happened and what you expected…"
              value={values.description}
              error={error}
              onChange={(event) => {
                setValues((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }}
            />
            <div className="flex flex-wrap items-center gap-xs">
              <AppButton size="l" type="submit">
                Submit case
              </AppButton>
              <AppButton
                variant="secondary"
                size="m"
                icon={<PaperclipIcon className="size-[18px]" />}
                className="h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"
              >
                Attach
              </AppButton>
            </div>
          </form>
        </PanelCard>

        <CaseList cases={cases} query={query} onQueryChange={setQuery} />
      </div>
    </main>
  )
}

export function SupportCasePage() {
  const navigate = useNavigate()
  const role = useAppSelector((state) => state.auth.user?.role) ?? "organizer"
  const dataset = supportByRole[role]
  const { caseId } = useParams()
  const [query, setQuery] = useState("")
  const [draft, setDraft] = useState("")
  const [sessionRole, setSessionRole] = useState(role)

  if (sessionRole !== role) {
    setSessionRole(role)
    setQuery("")
    setDraft("")
  }

  const cases = useMemo(
    () => filterCases(dataset.cases, query),
    [dataset.cases, query],
  )

  const active =
    dataset.cases.find((item) => item.id === caseId) ?? dataset.cases[0]
  const messages = dataset.threads[active.id] ?? []
  const headerIcon = active.headerIcon ?? active.icon

  return (
    <main className="mx-auto flex w-full max-w-[1180px] flex-col gap-xl px-base sm:px-gutter pt-6 sm:pt-8 pb-[60px] sm:pb-[80px]">
      <PageHead eyebrow="Account" title="Support" sub={pageSub} />
      <div className="grid grid-cols-1 items-start gap-lg xl:grid-cols-[minmax(0,473px)_minmax(0,615px)]">
        <CaseList
          cases={cases}
          query={query}
          onQueryChange={setQuery}
          activeId={active.id}
          threadView
        />

        <section className="flex flex-col overflow-hidden rounded-lg border border-border-default bg-surface-card">
          <header className="flex flex-wrap items-center gap-sm border-b border-border-subtle px-base py-base sm:px-lg">
            <span
              className={cn(
                "flex size-[38px] shrink-0 items-center justify-center rounded-sm",
                active.tileTone === "info"
                  ? "bg-status-info-light text-status-info"
                  : "bg-surface-brand-wash text-brand-primary",
              )}
            >
              {caseIcon[headerIcon]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-ink-primary">
                {active.threadTitle}
              </p>
              <p className="text-[12px] font-medium text-ink-faint">
                {active.caseId} · {active.topic} · opened {active.opened}
              </p>
            </div>
            <StatusBadge label={active.status} tone={active.tone} />
            <AppButton
              variant="secondary"
              size="m"
              className="h-[42px] border-border-default text-ink-primary hover:bg-surface-tint"
              onClick={() => {
                if (active.status !== "Closed") {
                  navigate("/app/support")
                }
              }}
            >
              {active.status === "Closed" ? "Reopen case" : "Close case"}
            </AppButton>
          </header>

          <div className="flex flex-col gap-sm bg-surface-canvas p-lg">
            <p className="self-center rounded-sm border border-border-default bg-surface-card px-xs py-[5px] text-[11.5px] font-semibold text-ink-faint">
              Case opened · {active.opened}
            </p>
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.from === "you" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "flex max-w-[420px] flex-col gap-[5px]",
                    message.from === "you" ? "items-end" : "items-start",
                  )}
                >
                  <div
                    className={cn(
                      "px-base py-[13px] text-[13.5px] leading-[1.55]",
                      message.from === "you"
                        ? "rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-[4px] bg-brand-gradient text-ink-inverse"
                        : "rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-[4px] border border-border-default bg-surface-card text-ink-primary",
                    )}
                  >
                    <p>{message.body}</p>
                    {message.attachment ? (
                      <div className="mt-2xs flex items-center gap-2xs">
                        <span className="inline-flex size-7 items-center justify-center rounded-[8px] bg-surface-brand-wash text-brand-primary">
                          <FileTextIcon className="size-[14px]" />
                        </span>
                        <p className="text-[12px] font-medium text-ink-muted">
                          {message.attachment.name} · {message.attachment.size}
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <p className="text-[11.5px] font-medium text-ink-faint">
                    {message.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="flex flex-wrap items-center gap-2xs border-t border-border-subtle px-base py-base sm:flex-nowrap sm:px-lg"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <button
              type="button"
              aria-label="Attach"
              className="inline-flex size-11 items-center justify-center rounded-pill border-[1.5px] border-border-default"
            >
              <PaperclipIcon className="size-4 text-ink-muted" />
            </button>
            <input
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value)
              }}
              placeholder="Write a reply…"
              className="h-11 min-w-0 flex-1 rounded-pill border border-border-default bg-surface-canvas px-base text-[13.5px] font-medium text-ink-primary placeholder:text-ink-faint focus:border-brand-primary focus:outline-none"
            />
            <AppButton size="m" type="submit">
              Send
            </AppButton>
          </form>
        </section>
      </div>
    </main>
  )
}

function filterCases(cases: SupportCase[], query: string) {
  if (!query) {
    return cases
  }
  const needle = query.toLowerCase()
  return cases.filter((item) => item.title.toLowerCase().includes(needle))
}

function CaseList({
  cases,
  query,
  onQueryChange,
  activeId,
  threadView = false,
}: {
  cases: SupportCase[]
  query: string
  onQueryChange: (value: string) => void
  activeId?: string
  threadView?: boolean
}) {
  return (
    <PanelCard
      title="Your cases"
      action={
        <div className="w-full min-w-0 sm:w-[190px]">
          <SearchField
            size="pill"
            placeholder="Search history…"
            value={query}
            onChange={(event) => {
              onQueryChange(event.target.value)
            }}
            className="w-full"
          />
        </div>
      }
    >
      <ul>
        {cases.map((item) => {
          const title =
            threadView && item.threadListTitle ? item.threadListTitle : item.title
          const snippet =
            threadView && item.threadSnippet ? item.threadSnippet : item.snippet
          const updated =
            threadView && item.threadUpdated ? item.threadUpdated : item.updated

          return (
            <li key={item.id}>
              <Link
                to={`/app/support/${item.id}`}
                className={cn(
                  "flex items-start gap-sm border-b border-border-subtle px-lg py-sm last:border-b-0",
                  activeId === item.id && "bg-surface-brand-wash",
                )}
              >
                <span
                  className={cn(
                    "flex size-[38px] shrink-0 items-center justify-center rounded-sm",
                    item.tileTone === "info"
                      ? "bg-status-info-light text-status-info"
                      : "bg-surface-brand-wash text-brand-primary",
                  )}
                >
                  {caseIcon[item.icon]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-[6px]">
                    <p className="truncate text-[14px] font-bold text-ink-primary">
                      {title}
                    </p>
                    <p className="text-[12.5px] font-medium text-ink-faint">
                      · {item.caseId}
                    </p>
                  </div>
                  <p className="text-[12.5px] leading-[1.45] font-medium text-ink-muted">
                    {snippet}
                  </p>
                  <p className="text-[11.5px] font-medium text-ink-faint">
                    {updated}
                  </p>
                </div>
                <StatusBadge label={item.status} tone={item.tone} />
              </Link>
            </li>
          )
        })}
      </ul>
      <p className="border-t border-border-subtle px-lg py-sm text-[12px] font-medium text-ink-faint">
        Closed cases can be reopened within 30 days by adding a message.
      </p>
    </PanelCard>
  )
}
