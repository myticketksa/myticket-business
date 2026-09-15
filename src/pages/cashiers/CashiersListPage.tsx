import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CashierFormModal from '@/components/cashiers/CashierFormModal'
import ConfirmDialog from '@/components/ConfirmDialog'
import PageHeader from '@/components/PageHeader'
import SearchInput from '@/components/SearchInput'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useDeleteCashierMutation, useGetCashiersQuery } from '@/services/cashierApi'
import type { Cashier } from '@/types/cashier'

export default function CashiersListPage() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const search = useDebouncedValue(searchInput)
  useEffect(() => setPage(1), [search])
  const { data, isLoading, isFetching } = useGetCashiersQuery({ page, search: search || undefined })
  const [deleteCashier, { isLoading: isDeleting }] = useDeleteCashierMutation()
  const [editing, setEditing] = useState<Cashier | null>(null)
  const [creating, setCreating] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<Cashier | null>(null)

  const handleDelete = async () => {
    if (!pendingDelete) return
    await deleteCashier(pendingDelete.id).unwrap()
    setPendingDelete(null)
  }

  return (
    <div>
      <PageHeader
        crumbs={[{ label: t('common.dashboard'), path: '/' }, { label: t('common.cashiers') }]}
        title={t('cashiers.pageTitle')}
        action={
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="rounded-md bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
          >
            {t('cashiers.addCashier')}
          </button>
        }
      />

      <div className="animate-fade-in px-4 pb-8 pane-sm:px-8">
        <div className="mb-4">
          <SearchInput value={searchInput} onChange={setSearchInput} />
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-start text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                <th className="px-4 py-3 font-medium">{t('cashiers.colName')}</th>
                <th className="px-4 py-3 font-medium">{t('cashiers.colEmail')}</th>
                <th className="px-4 py-3 font-medium">{t('cashiers.colCreated')}</th>
                <th className="px-4 py-3 font-medium">{t('events.list.colActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading &&
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={4} className="px-4 py-4">
                      <div className="h-4 animate-pulse rounded bg-slate-100" />
                    </td>
                  </tr>
                ))}

              {!isLoading && (data?.data?.length ?? 0) === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-slate-500">
                    {t('cashiers.noCashiers')}
                  </td>
                </tr>
              )}

              {data?.data.map((cashier) => (
                <tr key={cashier.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{cashier.name}</td>
                  <td className="px-4 py-3 text-slate-600">{cashier.email}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(cashier.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3 text-xs font-medium">
                      <button
                        type="button"
                        onClick={() => setEditing(cashier)}
                        className="text-orange-600 transition-colors hover:text-orange-700"
                      >
                        {t('common.edit')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(cashier)}
                        className="text-red-600 transition-colors hover:text-red-700"
                      >
                        {t('common.delete')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {data && data.pagination.totalPages > 1 && (
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 pane-sm:flex-row pane-sm:items-center pane-sm:justify-between">
            <span>
              {t('events.list.pageInfo', {
                current: data.pagination.currentPage,
                total: data.pagination.totalPages,
                count: data.pagination.total,
              })}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-md border border-slate-300 px-3 py-1.5 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                {t('common.previous')}
              </button>
              <button
                type="button"
                disabled={page >= data.pagination.totalPages || isFetching}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-md border border-slate-300 px-3 py-1.5 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                {t('common.next')}
              </button>
            </div>
          </div>
        )}
      </div>

      {(creating || editing) && (
        <CashierFormModal
          cashier={editing}
          onClose={() => {
            setCreating(false)
            setEditing(null)
          }}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title={t('cashiers.deleteTitle')}
          message={t('cashiers.deleteMessage', { name: pendingDelete.name })}
          confirmLabel={t('common.delete')}
          isBusy={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  )
}
