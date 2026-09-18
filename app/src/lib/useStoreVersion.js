import { useEffect, useState } from 'react'

// Bumps a counter whenever any progress store (attempts/mastery/revision)
// changes, so components reading from localStorage re-render.
export function useStoreVersion() {
  const [version, setVersion] = useState(0)
  useEffect(() => {
    const handler = () => setVersion((v) => v + 1)
    window.addEventListener('gatecse:store-changed', handler)
    return () => window.removeEventListener('gatecse:store-changed', handler)
  }, [])
  return version
}
