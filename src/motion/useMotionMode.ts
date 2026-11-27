import { useEffect, useState } from 'react'

export type MotionMode = 'pinned' | 'static'

const QUERY = '(min-width: 900px) and (prefers-reduced-motion: no-preference)'

/** Pinned scroll sequences only run on wide screens without reduced-motion. Everything else is static. */
export function useMotionMode(): MotionMode {
  const [mode, setMode] = useState<MotionMode>(() =>
    typeof window !== 'undefined' && window.matchMedia(QUERY).matches ? 'pinned' : 'static',
  )
  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = () => setMode(mql.matches ? 'pinned' : 'static')
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return mode
}
