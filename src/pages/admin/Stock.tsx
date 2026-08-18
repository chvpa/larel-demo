import { useState } from 'react'
import { Search, Minus, Plus, TriangleAlert } from 'lucide-react'
import { Skeleton } from 'boneyard-js/react'
import { products } from '../../data/products'
import { useAdmin } from '../../store/admin'
import { useFakeLoad } from '../../lib/useFakeLoad'
import { gs } from '../../lib/format'
import { Img } from '../../components/Img'

const LOW = 3 // el stock real del CSV va de 1 a 15 unidades por SKU

export function Stock() {
  const [q, setQ] = useState('')
  const [onlyLow, setOnlyLow] = useState(false)
  const stock = useAdmin((s) => s.stock)
  const setStock = useAdmin((s) => s.setStock)
  const loading = useFakeLoad(600)

  const list = products.filter((p) => {
    const qty = stock[p.id] ?? p.stock
    if (onlyLow && qty > LOW) return false
    return `${p.name} ${p.brand}`.toLowerCase().includes(q.toLowerCase())
  })

  const lowCount = products.filter((p) => (stock[p.id] ?? p.stock) <= LOW).length

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="headline text-2xl">Stock</h1>
        <div className="flex w-full gap-2 sm:w-auto">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-full bg-white px-4 shadow-sm sm:w-64">
            <Search size={16} className="text-zinc-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar producto..."
              className="w-full bg-transparent text-sm focus:outline-none"
            />
          </div>
          <button
            onClick={() => setOnlyLow(!onlyLow)}
            className={`flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-bold shadow-sm transition ${
              onlyLow ? 'bg-amber-500 text-white' : 'bg-white text-amber-600'
            }`}
          >
            <TriangleAlert size={14} /> Stock bajo ({lowCount})
          </button>
        </div>
      </div>

      <Skeleton name="admin-stock" loading={loading}>
        <ul className="space-y-2.5">
          {list.map((p) => {
            const qty = stock[p.id] ?? p.stock
            return (
              <li key={p.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                <Img src={p.images[0]} alt={p.name} className="size-14 shrink-0 rounded-xl bg-white object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{p.name}</p>
                  <p className="text-xs text-zinc-500">
                    {p.brand} · {gs(p.price)}
                  </p>
                  {qty === 0 ? (
                    <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-red-600">
                      Sin stock
                    </span>
                  ) : qty <= LOW ? (
                    <span className="mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-amber-700">
                      Stock bajo
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    aria-label="Restar stock"
                    onClick={() => setStock(p.id, qty - 1)}
                    className="grid size-9 place-items-center rounded-full bg-zinc-100 active:scale-90"
                  >
                    <Minus size={14} />
                  </button>
                  <span className={`w-10 text-center font-extrabold tabular-nums ${qty <= LOW ? 'text-amber-600' : ''}`}>
                    {qty}
                  </span>
                  <button
                    aria-label="Sumar stock"
                    onClick={() => setStock(p.id, qty + 1)}
                    className="grid size-9 place-items-center rounded-full bg-zinc-100 active:scale-90"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
        {list.length === 0 && <p className="py-10 text-center text-sm text-zinc-500">Sin resultados</p>}
      </Skeleton>
    </div>
  )
}
