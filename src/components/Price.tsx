import { gs, pct } from '../lib/format'

export function Price({ price, compareAt, size = 'md' }: { price: number; compareAt?: number; size?: 'sm' | 'md' | 'lg' }) {
  const cls = { sm: 'text-sm', md: 'text-base', lg: 'text-2xl' }[size]
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className={`${cls} font-bold tracking-tight`}>{gs(price)}</span>
      {compareAt && (
        <>
          <span className="text-xs text-zinc-400 line-through">{gs(compareAt)}</span>
          <span className="rounded-full bg-larel px-1.5 py-0.5 text-[10px] font-bold text-ink">
            -{pct(price, compareAt)}%
          </span>
        </>
      )}
    </div>
  )
}
