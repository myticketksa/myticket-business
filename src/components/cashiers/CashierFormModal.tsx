import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { useCreateCashierMutation, useUpdateCashierMutation } from '@/services/cashierApi'
import type { Cashier } from '@/types/cashier'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import FieldError from '@/components/FieldError'
import { useInlineValidation } from '@/hooks/useInlineValidation'
import { apiErrorMessage } from '@/lib/apiError'

export default function CashierFormModal({
  cashier,
  onClose,
}: {
  cashier: Cashier | null
  onClose: () => void
}) {
  const { t } = useTranslation()
  const { errors, validate, clearError } = useInlineValidation()
  useEscapeKey(onClose)
  const isEdit = Boolean(cashier)
  const [name, setName] = useState(cashier?.name ?? '')
  const [email, setEmail] = useState(cashier?.email ?? '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const [createCashier, { isLoading: isCreating }] = useCreateCashierMutation()
  const [updateCashier, { isLoading: isUpdating }] = useUpdateCashierMutation()
  const isSaving = isCreating || isUpdating

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate(e.currentTarget)) return
    setError(null)
    try {
      if (isEdit && cashier) {
        await updateCashier({
          id: cashier.id,
          values: { name, email, password: password || undefined },
        }).unwrap()
      } else {
        await createCashier({ name, email, password }).unwrap()
      }
      onClose()
    } catch (err) {
      setError(apiErrorMessage(err, t, 'cashiers.form.errorGeneric'))
    }
  }

  const inputClass =
    'w-full rounded-md border border-slate-300 px-3 py-2 text-sm transition-colors focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100'

  return createPortal(
    <div
      onClick={onClose}
      className="animate-fade-in-fast fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        onInput={(e) => clearError((e.target as HTMLElement).id)}
        onClick={(e) => e.stopPropagation()}
        className="animate-scale-in max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
      >
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          {isEdit ? t('cashiers.form.editTitle') : t('cashiers.form.addTitle')}
        </h2>

        <div className="space-y-3">
          <div>
            <label htmlFor="cashier-name" className="mb-1 block text-sm font-medium text-slate-700">
              {t('cashiers.form.name')}
            </label>
            <input
              id="cashier-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            <FieldError message={errors['cashier-name']} />
          </div>
          <div>
            <label htmlFor="cashier-email" className="mb-1 block text-sm font-medium text-slate-700">
              {t('cashiers.form.email')}
            </label>
            <input
              id="cashier-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
            <FieldError message={errors['cashier-email']} />
          </div>
          <div>
            <label htmlFor="cashier-password" className="mb-1 block text-sm font-medium text-slate-700">
              {isEdit ? t('cashiers.form.passwordOptional') : t('cashiers.form.password')}
            </label>
            <input
              id="cashier-password"
              type="password"
              required={!isEdit}
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
            <FieldError message={errors['cashier-password']} />
          </div>
        </div>

        {error && <p className="animate-fade-in-fast mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
          >
            {t('common.cancel')}
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-md bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-50"
          >
            {isSaving ? t('events.form.saving') : t('common.confirm')}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  )
}
