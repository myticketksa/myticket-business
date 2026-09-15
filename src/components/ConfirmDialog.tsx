import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { useEscapeKey } from '@/hooks/useEscapeKey'

export default function ConfirmDialog({
  title,
  message,
  confirmLabel,
  isBusy,
  onConfirm,
  onCancel,
}: {
  title: string
  message: string
  confirmLabel?: string
  isBusy?: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  const { t } = useTranslation()
  useEscapeKey(onCancel)

  return createPortal(
    <div
      onClick={onCancel}
      className="animate-fade-in-fast fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-scale-in w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl"
      >
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
          >
            {t('common.cancel')}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isBusy}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-700 active:scale-[0.98] disabled:opacity-50"
          >
            {isBusy ? t('common.deleting') : (confirmLabel ?? t('common.confirm'))}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
