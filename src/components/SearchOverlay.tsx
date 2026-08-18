import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, TrendingUp } from 'lucide-react'
import { useUi } from '../store/ui'
import { products } from '../data/products'
import { gs } from '../lib/format'
import { Img } from './Img'

const TRENDING = ['Botines', 'Air Force', 'Albirroja', 'Mochila', 'Buzo']

export function SearchOverlay() {
  const open = useUi((s) => s.searchOpen)
  const setOpen = useUi((s) => s.setSearchOpen)
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQ('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  if (!open) return null

  const norm = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  const query = norm(q.trim())
  const results = query
    ? products.filter((p) => norm(`${p.name} ${p.brand} ${p.category}`).includes(query)).slice(0, 8)
    : []

  return (
    <div className="anim-fade-in fixed inset-0 z-50 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-2xl flex-col">
        <div className="drawer-title flex items-center gap-2 border-b border-zinc-100 px-4 py-3">
          <div className="flex h-11 flex-1 items-center gap-2 rounded-full bg-zinc-100 px-4">
            <Search size={18} className="text-zinc-400" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscá productos, marcas..."
              className="w-full bg-transparent text-[16px] focus:outline-none"
            />
          </div>
          <button
            aria-label="Cerrar búsqueda"
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center rounded-full hover:bg-zinc-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="drawer-body flex-1 overflow-y-auto px-4 py-4">
          {!query && (
            <>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-zinc-500">
                <TrendingUp size={14} /> Tendencias
              </p>
              <div className="flex flex-wrap gap-2">
                {TRENDING.map((t) => (
                  <button
                    key={t}
                    onClick={() => setQ(t)}
                    className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold transition hover:border-ink"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          )}

          {query && results.length === 0 && (
            <p className="py-10 text-center text-sm text-zinc-500">
              No encontramos resultados para “{q}” 😕
            </p>
          )}

          <ul className="divide-y divide-zinc-100">
            {results.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/p/${p.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-3"
                >
                  <Img src={p.images[0]} alt={p.name} className="size-14 rounded-xl bg-white object-contain" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-zinc-500">{p.brand}</p>
                  </div>
                  <span className="text-sm font-bold">{gs(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
