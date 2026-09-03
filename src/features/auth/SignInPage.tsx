import { type FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router"
import { ValidationError } from "yup"
import {
  ArrowRightIcon,
  CheckCircleIcon,
  HourglassMediumIcon,
  ProhibitIcon,
  ShieldCheckIcon,
  UserIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { AppButton } from "@/components/primitive/app-button"
import { TextInput } from "@/components/primitive/text-input"
import { EntryHeader } from "@/layouts/EntryShell"
import {
  mockAuthForIdentifier,
  pathForDestination,
} from "@/mocks/auth-accounts"
import {
  signInRoutes,
  signInRoutesIntro,
  type SignInRouteCard,
} from "@/mocks/sign-in-routes"
import { signInSchema } from "@/schemas/sign-in"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/store/hooks"
import { setUser } from "@/store/slices/auth"

interface FieldErrors {
  identifier?: string
  password?: string
}

const tileClass: Record<SignInRouteCard["tone"], string> = {
  success: "bg-status-success-light text-status-success",
  muted: "bg-surface-skeleton text-ink-muted",
  brand: "bg-surface-brand-wash text-brand-primary",
  danger: "bg-status-danger-light text-status-danger",
}

function RouteIcon({ tone, id }: { tone: SignInRouteCard["tone"]; id: string }) {
  const className = "size-[18px]"
  if (id === "approved") {
    return <CheckCircleIcon className={className} weight="fill" />
  }
  if (id === "2fa") {
    return <ShieldCheckIcon className={className} />
  }
  if (id === "review") {
    return <HourglassMediumIcon className={className} />
  }
  if (id === "declined") {
    return <WarningCircleIcon className={className} weight="fill" />
  }
  if (id === "no-role") {
    return <UserIcon className={className} />
  }
  if (id === "suspended") {
    return <ProhibitIcon className={className} weight="fill" />
  }
  return <CheckCircleIcon className={cn(className, tileClass[tone])} />
}

export function SignInPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState("team@riyadhevents.sa")
  const [password, setPassword] = useState("••••••••")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    setSubmitting(true)

    try {
      const values = await signInSchema.validate(
        { identifier, password },
        { abortEarly: false },
      )
      setErrors({})

      const account = mockAuthForIdentifier(values.identifier)
      if (!account) {
        setFormError("No mock account matches that email or phone.")
        return
      }

      if (account.user) {
        dispatch(setUser(account.user))
      }

      navigate(pathForDestination(account.destination), { replace: true })
    } catch (error) {
      if (error instanceof ValidationError) {
        const next: FieldErrors = {}
        for (const inner of error.inner) {
          if (inner.path === "identifier" || inner.path === "password") {
            next[inner.path] = inner.message
          }
        }
        setErrors(next)
        return
      }
      setFormError("Sign in could not continue.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <EntryHeader>
        <a
          href="https://myticket.sa"
          className="inline-flex max-w-[55%] items-center gap-[6px] truncate text-[12px] font-semibold text-ink-muted sm:max-w-none sm:text-[13.5px]"
        >
          <span className="truncate sm:hidden">Main website</span>
          <span className="hidden sm:inline">
            Looking for tickets? Go to the main website
          </span>
          <ArrowRightIcon className="size-[15px] shrink-0" weight="bold" />
        </a>
      </EntryHeader>

      <div className="flex flex-1 flex-col items-center px-base sm:px-gutter pt-10 sm:pt-[64px] pb-[60px] sm:pb-[100px]">
        <div className="flex w-full max-w-[1040px] flex-col items-start gap-xl lg:flex-row lg:gap-[64px]">
          <form
            className="flex w-full max-w-[420px] shrink-0 flex-col gap-md rounded-2xl border border-border-default bg-surface-card p-base sm:p-8"
            onSubmit={handleSubmit}
            noValidate
          >
            <h1 className="text-[26px] leading-[1.18] font-extrabold text-ink-primary">
              Sign in to your workspace
            </h1>
            <p className="text-[13.5px] leading-[1.5] font-medium text-ink-muted">
              For organizers, talents and vendors. Your customer account on the
              main website is separate.
            </p>

            <TextInput
              id="sign-in-identifier"
              name="identifier"
              label="Email or phone number"
              autoComplete="username"
              value={identifier}
              error={errors.identifier}
              onChange={(event) => {
                setIdentifier(event.target.value)
              }}
            />

            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center justify-between gap-sm">
                <label
                  htmlFor="sign-in-password"
                  className="text-[13px] font-semibold text-ink-primary"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-[12.5px] font-semibold text-brand-primary"
                >
                  Forgot password?
                </button>
              </div>
              <TextInput
                id="sign-in-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                error={errors.password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
            </div>

            {formError ? (
              <p className="text-[12.5px] font-medium text-status-danger" role="alert">
                {formError}
              </p>
            ) : null}

            <AppButton
              type="submit"
              size="l"
              className="w-full"
              loading={submitting}
            >
              Sign in
            </AppButton>

            <p className="text-[12.5px] leading-[1.5] font-medium text-ink-faint">
              Don’t have a business account? Apply as an organizer, talent or
              vendor on the main website.
            </p>
          </form>

          <div className="flex min-w-0 flex-1 flex-col gap-xl">
            <p className="text-[12px] font-bold tracking-[0.96px] text-brand-link uppercase">
              {signInRoutesIntro.eyebrow}
            </p>
            <h2 className="text-[21px] leading-[1.22] font-extrabold text-ink-primary">
              {signInRoutesIntro.title}
            </h2>
            {signInRoutes.map((route) => (
              <div key={route.id} className="flex items-start gap-sm">
                <span
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-[18px]",
                    tileClass[route.tone],
                  )}
                >
                  <RouteIcon tone={route.tone} id={route.id} />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                  <p className="text-[14px] font-bold text-ink-primary">
                    {route.title}
                  </p>
                  <p className="text-[13px] leading-[1.45] font-medium text-ink-muted">
                    {route.body}
                  </p>
                  {route.link ? (
                    <Link
                      to={route.link.href}
                      className="inline-flex items-center gap-[4px] text-[12.5px] font-semibold text-brand-primary"
                    >
                      View
                      <ArrowRightIcon className="size-3" weight="bold" />
                      {route.link.label}
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
