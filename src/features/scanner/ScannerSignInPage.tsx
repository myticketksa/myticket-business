import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router"
import { DeviceMobileSlashIcon } from "@phosphor-icons/react"
import { ValidationError } from "yup"
import { AppButton } from "@/components/primitive/app-button"
import { TextInput } from "@/components/primitive/text-input"
import { ScannerStatusBar } from "@/features/scanner/ScannerStatusBar"
import { signInSchema } from "@/schemas/sign-in"

export function ScannerSignInPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("yousef.gates@riyadhevents.sa")
  const [password, setPassword] = useState("password")
  const [error, setError] = useState<string | undefined>()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await signInSchema.validate({ identifier: email, password })
      setError(undefined)
      navigate("/scanner/events")
    } catch (caught) {
      if (caught instanceof ValidationError) {
        setError(caught.message)
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-canvas">
      <ScannerStatusBar time="21:18" />
      <form
        className="flex flex-1 flex-col gap-lg px-lg pt-xl pb-section"
        onSubmit={handleSubmit}
        noValidate
      >
        <img
          src="/brand/myticket-logo.png"
          alt="MyTicket"
          className="h-10 w-[73px] object-contain object-left"
        />
        <div className="flex flex-col gap-2xs">
          <h1 className="text-[22px] font-extrabold text-ink-primary">
            Scanner sign in
          </h1>
          <p className="text-[13px] font-medium text-ink-muted">
            Use the details your organizer emailed you.
          </p>
        </div>

        <TextInput
          id="scanner-email"
          label="Email"
          autoComplete="username"
          value={email}
          error={error?.toLowerCase().includes("email") ? error : undefined}
          onChange={(event) => {
            setEmail(event.target.value)
          }}
        />
        <TextInput
          id="scanner-password"
          type="password"
          label="Password"
          autoComplete="current-password"
          value={password}
          error={error?.toLowerCase().includes("password") ? error : undefined}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
        />

        <AppButton type="submit" size="l" className="w-full">
          Sign in
        </AppButton>

        <div className="flex flex-col gap-2xs rounded-md border-[1.5px] border-status-danger-border bg-status-danger-light p-base">
          <div className="flex items-center gap-2xs">
            <DeviceMobileSlashIcon className="size-5 text-status-danger-strong" />
            <p className="text-[13.5px] font-extrabold text-status-danger-strong">
              This device isn’t registered.
            </p>
          </div>
          <p className="text-[12.5px] leading-[1.48] font-medium text-ink-muted">
            Ask your organizer to approve it from Scanners → Devices. You
            can’t scan until then.
          </p>
        </div>

        <p className="text-center text-[11.5px] font-medium text-ink-faint">
          Scanning only — no tickets, no buyer details.
        </p>
      </form>
    </div>
  )
}
