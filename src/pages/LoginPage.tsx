import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import loginBg from '@/assets/login-bg.png'
import logoWhite from '@/assets/logo-white.png'
import { sessionEstablished } from '@/features/auth/authSlice'
import { buildLoginSchema, type LoginFormValues } from '@/schemas/login.schema'
import { useLoginMutation } from '@/services/authApi'

export default function LoginPage() {
  const { t, i18n } = useTranslation()
  const otherLanguage = i18n.language === 'ar' ? 'en' : 'ar'
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const [formError, setFormError] = useState<string | null>(null)

  const loginSchema = useMemo(() => buildLoginSchema(t), [t])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null)
    try {
      const result = await login(values).unwrap()
      if (result.user.role !== 'organizer') {
        setFormError(t('auth.notAdmin'))
        return
      }
      dispatch(
        sessionEstablished({
          user: result.user,
          accessToken: result.access_token,
        }),
      )
      navigate('/', { replace: true })
    } catch {
      setFormError(t('auth.invalidCredentials'))
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-black bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="relative flex min-h-screen w-full items-center justify-center bg-black/50">
        <button
          type="button"
          onClick={() => i18n.changeLanguage(otherLanguage)}
          className="absolute top-4 end-4 text-sm text-white/80 transition-colors hover:text-white"
        >
          {t(`language.${otherLanguage === 'ar' ? 'arabic' : 'english'}`)}
        </button>
        <div className="animate-slide-up w-full max-w-sm px-6 py-12 text-center sm:px-8">
          <img
            src={logoWhite}
            alt="MyTicket"
            className="mx-auto mb-8 h-[60px] w-[60px] drop-shadow-lg"
          />

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 text-start">
            <div>
              <input
                id="identifier"
                type="text"
                autoComplete="username"
                placeholder={t('auth.identifierPlaceholder')}
                className="w-full rounded-md border-2 border-transparent bg-white/90 px-5 py-3 text-sm text-black placeholder-orange-400 shadow-sm focus:border-orange-400 focus:bg-white focus:outline-none"
                {...register('identifier')}
              />
              {errors.identifier && (
                <p className="mt-1 text-sm text-orange-300">{errors.identifier.message}</p>
              )}
            </div>

            <div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder={t('auth.passwordPlaceholder')}
                className="w-full rounded-md border-2 border-transparent bg-white/90 px-5 py-3 text-sm text-black placeholder-orange-400 shadow-sm focus:border-orange-400 focus:bg-white focus:outline-none"
                {...register('password')}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-orange-300">{errors.password.message}</p>
              )}
            </div>

            {formError && <p className="text-sm text-orange-300">{formError}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full border-2 border-orange-400 bg-orange-400 px-5 py-2.5 text-lg text-white shadow-lg shadow-orange-900/30 transition-all hover:bg-transparent hover:text-orange-400 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? t('auth.signingIn') : t('auth.signIn')}
            </button>

            <a
              href="#"
              className="inline-block pt-2 text-sm text-white transition-colors hover:text-orange-400"
            >
              {t('auth.forgotPassword')}
            </a>
          </form>
        </div>
      </div>
    </div>
  )
}
