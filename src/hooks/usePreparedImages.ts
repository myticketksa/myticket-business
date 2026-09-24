import { useCallback, useRef, useState } from 'react'
import { shrinkImage, shrinkImages } from '@/lib/uploads'

/**
 * Shrinking a photo takes a second or two, so it can't happen while the file
 * is being picked. Picking a file only records it; the form runs it through
 * here on submit instead, where the submit waits for the result.
 * `isPreparingImages` is for disabling the save button while that happens.
 */
export function usePreparedImages() {
  const [isPreparingImages, setIsPreparingImages] = useState(false)
  const pending = useRef(0)

  const track = useCallback(async <T>(work: Promise<T>): Promise<T> => {
    pending.current += 1
    setIsPreparingImages(true)
    try {
      return await work
    } finally {
      pending.current -= 1
      if (pending.current === 0) setIsPreparingImages(false)
    }
  }, [])

  const prepareImage = useCallback(
    (file: File | undefined | null) => track(shrinkImage(file)),
    [track],
  )

  const prepareImages = useCallback((files: File[]) => track(shrinkImages(files)), [track])

  return { isPreparingImages, prepareImage, prepareImages }
}
