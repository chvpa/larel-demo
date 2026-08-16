import { useEffect, useState } from 'react'

/** Simulates network latency so boneyard skeletons are visible. Re-triggers when `key` changes. */
export function useFakeLoad(ms = 700, key: unknown = null) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), ms)
    return () => clearTimeout(t)
  }, [ms, key])
  return loading
}
