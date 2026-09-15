import { useEffect } from 'react'

/** Closes an overlay on Escape. Every modal in the panel calls this, so the
 *  key works the same everywhere rather than only where someone remembered. */
export function useEscapeKey(onEscape: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onEscape])
}
