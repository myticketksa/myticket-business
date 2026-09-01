import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router"
import { ValidationError } from "yup"
import { ArrowSquareOutIcon } from "@phosphor-icons/react"
import { PageHead } from "@/components/biz/page-head"
import { AppButton } from "@/components/primitive/app-button"
import { TextInput } from "@/components/primitive/text-input"
import {
  mockAuthForIdentifier,
  pathForDestination,
} from "@/mocks/auth-accounts"
import { signInSchema } from "@/schemas/sign-in"
import { useAppDispatch } from "@/store/hooks"
import { setUser } from "@/store/slices/auth"

interface FieldErrors {
  identifier?: string
  password?: string
}

export function SignInPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState("team@riyadhevents.sa")
  const [password, setPassword] = useState("")
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
    <div className="flex w-full max-w-[460px] flex-col gap-lg">
      <form
        className="flex flex-col gap-lg rounded-lg border border-border-default bg-surface-card p-xl"
        onSubmit={handleSubmit}
        noValidate
      >
        <PageHead eyebrow="MyTicket" title="Sign in" />

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

        <div className="flex flex-col gap-2xs">
          <TextInput
            id="sign-in-password"
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            value={password}
            error={errors.password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
          <button
            type="button"
            className="self-start text-link-m text-brand-link"
          >
            Forgot password?
          </button>
        </div>

        {formError ? (
          <p className="text-body-xs text-status-danger" role="alert">
            {formError}
          </p>
        ) : null}

        <AppButton type="submit" size="l" className="w-full" loading={submitting}>
          Sign in
        </AppButton>

        <p className="text-body-s text-ink-muted">
          Don’t have an account?{" "}
          <button type="button" className="text-link-m text-brand-link">
            Apply
          </button>
        </p>
      </form>

      <a
        href="https://myticket.sa"
        className="inline-flex items-center justify-center gap-2xs text-link-m text-brand-link"
      >
        Main website
        <ArrowSquareOutIcon className="size-4" />
      </a>
    </div>
  )
}
