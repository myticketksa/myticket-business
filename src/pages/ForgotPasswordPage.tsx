import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import loginBg from '@/assets/login-bg.png'
import logoWhite from '@/assets/logo-white.png'
import { apiErrorMessage } from '@/lib/apiError'
import { useForgotPasswordMutation, useResetPasswordMutation } from '@/services/authApi'

/**
 * Two steps in one page rather than two routes — request a code, then use it.
 * Mirrors the OTP flow the backend actually has (ForgotPasswordRequest /
 * ResetPasswordRequest): email in, a code by email, code + new password out.
 */
export default function ForgotPasswordPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [step, setStep] = useState<'request' | 'reset'>('request')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [forgotPassword, { isLoading: isRequesting }] = useForgotPasswordMutation()
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation()

  const onRequestCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await forgotPassword({ email }).unwrap()
      setStep('reset')
    } catch (err) {
      setError(apiErrorMessage(err, t, 'auth.forgotPasswordError'))
    }
  }

  const onResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password !== passwordConfirmation) {
      setError(t('auth.passwordMismatch'))
      return
    }
    try {
      await resetPassword({ email, code, password, password_confirmation: passwordConfirmation }).unwrap()
      navigate('/login', { replace: true })
    } catch (err) {
      setError(apiErrorMessage(err, t, 'auth.resetPasswordError'))
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="relative flex min-h-screen w-full items-center justify-center bg-black/50">
        <div className="animate-slide-up w-full max-w-sm px-6 py-12 text-center sm:px-8">
          <img
            src={logoWhite}
            alt="MyTicket"
            className="mx-auto mb-8 h-[60px] w-[60px] drop-shadow-lg"
          />

          {step === 'request' ? (
            <form onSubmit={onRequestCode} noValidate className="space-y-4 text-start">
              <p className="text-center text-sm text-white/80">{t('auth.forgotPasswordHint')}</p>
              <div>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t('auth.identifierPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border-2 border-transparent bg-white/90 px-5 py-3 text-sm text-black placeholder-orange-400 shadow-sm focus:border-orange-400 focus:bg-white focus:outline-none"
                />
              </div>

              {error && <p className="text-sm text-orange-300">{error}</p>}

              <button
                type="submit"
                disabled={isRequesting}
                className="w-full border-2 border-orange-400 bg-orange-400 px-5 py-2.5 text-lg text-white shadow-lg shadow-orange-900/30 transition-all hover:bg-transparent hover:text-orange-400 active:scale-[0.98] disabled:opacity-50"
              >
                {isRequesting ? t('auth.sendingCode') : t('auth.sendCode')}
              </button>
            </form>
          ) : (
            <form onSubmit={onResetPassword} noValidate className="space-y-4 text-start">
              <p className="text-center text-sm text-white/80">
                {t('auth.resetPasswordHint', { email })}
              </p>
              <div>
                <input
                  id="code"
                  type="text"
                  required
                  placeholder={t('auth.codePlaceholder')}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full rounded-md border-2 border-transparent bg-white/90 px-5 py-3 text-sm text-black placeholder-orange-400 shadow-sm focus:border-orange-400 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <input
                  id="new-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder={t('auth.newPasswordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border-2 border-transparent bg-white/90 px-5 py-3 text-sm text-black placeholder-orange-400 shadow-sm focus:border-orange-400 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full rounded-md border-2 border-transparent bg-white/90 px-5 py-3 text-sm text-black placeholder-orange-400 shadow-sm focus:border-orange-400 focus:bg-white focus:outline-none"
                />
              </div>

              {error && <p className="text-sm text-orange-300">{error}</p>}

              <button
                type="submit"
                disabled={isResetting}
                className="w-full border-2 border-orange-400 bg-orange-400 px-5 py-2.5 text-lg text-white shadow-lg shadow-orange-900/30 transition-all hover:bg-transparent hover:text-orange-400 active:scale-[0.98] disabled:opacity-50"
              >
                {isResetting ? t('auth.resettingPassword') : t('auth.resetPassword')}
              </button>
            </form>
          )}

          <Link
            to="/login"
            className="mt-4 inline-block text-sm text-white transition-colors hover:text-orange-400"
          >
            {t('auth.backToLogin')}
          </Link>
        </div>
      </div>
    </div>
  )
}
