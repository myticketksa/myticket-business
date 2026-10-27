import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const GALLERY_MAX = 10

/**
 * The event's pictures (27 Oct 2026): the cover, then up to ten more, like
 * an experience's gallery. Saved photos can be moved and removed; new ones
 * are added after them. Files are shrunk on save, not here.
 */
export default function EventPhotos({
  coverUrl,
  coverFile,
  onCover,
  coverError,
  kept,
  onKept,
  added,
  onAdded,
}: {
  coverUrl?: string | null
  coverFile?: File
  onCover: (file: File | undefined) => void
  coverError?: string
  kept: string[]
  onKept: (urls: string[]) => void
  added: File[]
  onAdded: (files: File[]) => void
}) {
  const { t } = useTranslation()
  const addedUrls = useMemo(() => added.map((file) => URL.createObjectURL(file)), [added])
  const coverPreview = useMemo(() => (coverFile ? URL.createObjectURL(coverFile) : null), [coverFile])
  useEffect(() => () => addedUrls.forEach((url) => URL.revokeObjectURL(url)), [addedUrls])
  useEffect(() => () => { if (coverPreview) URL.revokeObjectURL(coverPreview) }, [coverPreview])

  const room = GALLERY_MAX - kept.length - added.length
  const move = (index: number, by: number) => {
    const next = [...kept]
    const to = index + by
    if (to < 0 || to >= next.length) return
    ;[next[index], next[to]] = [next[to], next[index]]
    onKept(next)
  }
  const tile = 'relative h-24 w-36 overflow-hidden rounded-md border border-slate-200 bg-slate-100'
  const chip = 'rounded bg-black/60 px-1.5 text-xs text-white hover:bg-black/80'

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">{t('events.photos.cover')}</p>
        <div className="flex flex-wrap items-end gap-3">
          {(coverPreview || coverUrl) && (
            <div className={tile}>
              <img src={coverPreview ?? coverUrl ?? ''} alt="" className="h-full w-full object-cover" />
            </div>
          )}
          <label className="cursor-pointer rounded-md border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-600 hover:border-orange-400">
            {coverPreview || coverUrl ? t('events.photos.replaceCover') : t('events.photos.chooseCover')}
            <input type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => onCover(e.target.files?.[0])} />
          </label>
        </div>
        {coverError && <p className="mt-1 text-sm text-red-600">{coverError}</p>}
      </div>

      <div>
        <p className="mb-1 text-sm font-medium text-slate-700">
          {t('events.photos.gallery')} <span className="font-normal text-slate-400">({kept.length + added.length}/{GALLERY_MAX})</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {kept.map((url, index) => (
            <div key={url} className={tile}>
              <img src={url} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-x-1 top-1 flex justify-between">
                <span className="flex gap-1">
                  <button type="button" aria-label={t('events.photos.moveEarlier')} onClick={() => move(index, -1)} className={chip}>
                    ‹
                  </button>
                  <button type="button" aria-label={t('events.photos.moveLater')} onClick={() => move(index, 1)} className={chip}>
                    ›
                  </button>
                </span>
                <button type="button" aria-label={t('events.photos.remove')} onClick={() => onKept(kept.filter((_, i) => i !== index))} className={chip}>
                  ×
                </button>
              </div>
            </div>
          ))}
          {addedUrls.map((url, index) => (
            <div key={url} className={tile}>
              <img src={url} alt="" className="h-full w-full object-cover" />
              <span className="absolute bottom-1 start-1 rounded bg-orange-500 px-1.5 text-[10px] text-white">{t('events.photos.new')}</span>
              <button
                type="button"
                aria-label={t('events.photos.remove')}
                onClick={() => onAdded(added.filter((_, i) => i !== index))}
                className={`absolute end-1 top-1 ${chip}`}
              >
                ×
              </button>
            </div>
          ))}
          {room > 0 && (
            <label className="flex h-24 w-36 cursor-pointer items-center justify-center rounded-md border border-dashed border-slate-300 text-sm text-slate-500 hover:border-orange-400">
              {t('events.photos.add')}
              <input
                type="file"
                multiple
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  onAdded([...added, ...Array.from(e.target.files ?? [])].slice(0, GALLERY_MAX - kept.length))
                  e.target.value = ''
                }}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  )
}
