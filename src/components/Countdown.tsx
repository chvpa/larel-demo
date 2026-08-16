import { useEffect, useMemo, useState } from 'react'

export function Countdown({ hours = 26 }: { hours?: number }) {
  // ponytail: demo countdown — resets per session, real deadline comes from a backend
  const deadline = useMemo(() => Date.now() + hours * 3600_000, [hours])
  const [left, setLeft] = useState(deadline - Date.now())

  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, deadline - Date.now())), 1000)
    return () => clearInterval(t)
  }, [deadline])

  const total = Math.floor(left / 1000)
  const parts = [
    { v: Math.floor(total / 86400), l: 'días' },
    { v: Math.floor((total % 86400) / 3600), l: 'hs' },
    { v: Math.floor((total % 3600) / 60), l: 'min' },
    { v: total % 60, l: 'seg' },
  ]

  return (
    <div className="flex gap-2">
      {parts.map((p) => (
        <div key={p.l} className="w-18 rounded-2xl bg-white/10 px-3 py-3 text-center backdrop-blur">
          <div className="text-3xl font-extrabold tracking-tight text-larel tabular-nums">
            {String(p.v).padStart(2, '0')}
          </div>
          <div className="text-[11px] font-medium text-white/70">{p.l}</div>
        </div>
      ))}
    </div>
  )
}
