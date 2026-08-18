import { useState } from 'react'
import { Plus, X, ShoppingBag } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../store/cart'
import { useUi } from '../store/ui'
import { gs } from '../lib/format'
import { Img } from './Img'

const SLOTS = 3
const BUNDLE_OFF = 15

type Pick = { id: string; size: string }

export function BundleBuilder() {
  const [picked, setPicked] = useState<Pick[]>([])
  const [choosing, setChoosing] = useState<string | null>(null) // product awaiting a size
  const add = useCart((s) => s.add)
  const setCartOpen = useUi((s) => s.setCartOpen)

  const pool = products.filter((p) => p.category === 'accesorios').slice(0, 8)
  const chosen = picked.map((pick) => ({ ...pick, product: products.find((p) => p.id === pick.id)! }))
  const subtotal = chosen.reduce((a, c) => a + c.product.price, 0)
  const discount = picked.length === SLOTS ? Math.round((subtotal * BUNDLE_OFF) / 100) : 0
  const choosingProduct = choosing ? products.find((p) => p.id === choosing)! : null

  const onCardClick = (id: string) => {
    const already = picked.find((p) => p.id === id)
    if (already) {
      setPicked((cur) => cur.filter((p) => p.id !== id))
      return
    }
    if (picked.length >= SLOTS) return
    const product = products.find((p) => p.id === id)!
    // one-size products go straight in; the rest ask for a size first
    if (product.sizes.length === 1) setPicked((cur) => [...cur, { id, size: product.sizes[0] }])
    else setChoosing(id)
  }

  const confirmSize = (size: string) => {
    setPicked((cur) => [...cur, { id: choosing!, size }])
    setChoosing(null)
  }

  const addBundle = () => {
    chosen.forEach((c) => add(c.id, c.size))
    setPicked([])
    setCartOpen(true)
  }

  return (
    <section className="mx-auto mt-14 max-w-6xl px-4">
      <div className="text-center">
        <h2 className="headline text-2xl md:text-4xl">Armá tu combo</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Elegí 3 productos y llevate <b className="text-ink">{BUNDLE_OFF}% OFF</b> en los tres
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_300px]">
        {/* pool */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {pool.map((p) => {
            const on = picked.some((x) => x.id === p.id)
            const full = picked.length >= SLOTS && !on
            return (
              <button
                key={p.id}
                onClick={() => onCardClick(p.id)}
                disabled={full}
                className={`group relative overflow-hidden rounded-2xl border-2 text-left transition ${
                  on ? 'border-ink' : 'border-transparent'
                } ${full ? 'opacity-40' : ''}`}
              >
                <Img src={p.images[0]} alt={p.name} className="aspect-[3/4] w-full bg-white object-contain" />
                <span
                  className={`absolute right-2 top-2 grid size-7 place-items-center rounded-full transition ${
                    on ? 'bg-ink text-larel' : 'bg-white/90 text-ink'
                  }`}
                >
                  {on ? <X size={14} /> : <Plus size={14} />}
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-6">
                  <span className="block truncate text-[11px] font-semibold text-white">{p.name}</span>
                  <span className="block text-[11px] text-white/70">
                    {gs(p.price)}
                    {on && ` · Talle ${picked.find((x) => x.id === p.id)!.size}`}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* slots panel */}
        <aside className="rounded-2xl bg-zinc-100 p-4">
          <p className="font-bold tracking-tight">Tu combo</p>
          <p className="mb-3 text-xs text-zinc-500">
            {picked.length} de {SLOTS} productos
          </p>

          <div className="space-y-2">
            {Array.from({ length: SLOTS }).map((_, i) => {
              const c = chosen[i]
              return c ? (
                <div key={i} className="flex items-center gap-2 rounded-xl bg-white p-2">
                  <Img src={c.product.images[0]} alt={c.product.name} className="size-11 rounded-lg bg-white object-contain" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold">{c.product.name}</p>
                    <p className="text-xs text-zinc-500">
                      Talle {c.size} · {gs(c.product.price)}
                    </p>
                  </div>
                  <button
                    aria-label="Quitar"
                    onClick={() => setPicked((cur) => cur.filter((x) => x.id !== c.id))}
                    className="text-zinc-400 hover:text-red-500"
                  >
                    <X size={15} />
                  </button>
                </div>
              ) : (
                <div
                  key={i}
                  className="grid h-[60px] place-items-center rounded-xl border-2 border-dashed border-zinc-300 text-xs text-zinc-400"
                >
                  Slot {i + 1} libre
                </div>
              )
            })}
          </div>

          <div className="mt-4 space-y-1 border-t border-zinc-200 pt-3 text-sm">
            <div className="flex justify-between text-zinc-600">
              <span>Subtotal</span>
              <span>{gs(subtotal)}</span>
            </div>
            <div className="flex justify-between font-semibold text-larel-dark">
              <span>Combo -{BUNDLE_OFF}%</span>
              <span>-{gs(discount)}</span>
            </div>
            <div className="flex justify-between pt-1 font-bold">
              <span>Total</span>
              <span>{gs(subtotal - discount)}</span>
            </div>
          </div>

          <button
            disabled={picked.length < SLOTS}
            onClick={addBundle}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-semibold text-white transition active:scale-[0.98] disabled:opacity-40"
          >
            <ShoppingBag size={16} className="text-larel" />
            {picked.length < SLOTS ? `Elegí ${SLOTS - picked.length} más` : 'Agregar combo'}
          </button>
        </aside>
      </div>

      {/* size picker for the product being added */}
      {choosingProduct && (
        <div className="fixed inset-0 z-50">
          <div className="anim-fade-in absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setChoosing(null)} />
          <div className="anim-slide-up absolute inset-x-0 bottom-0 mx-auto max-w-md rounded-t-3xl bg-white p-5 [padding-bottom:calc(env(safe-area-inset-bottom)+1.25rem)] md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:rounded-3xl">
            <div className="drawer-title mb-4 flex items-center gap-3">
              <Img
                src={choosingProduct.images[0]}
                alt={choosingProduct.name}
                className="size-14 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold tracking-tight">{choosingProduct.name}</p>
                <p className="text-sm text-zinc-500">Elegí tu talle</p>
              </div>
              <button
                aria-label="Cerrar"
                onClick={() => setChoosing(null)}
                className="grid size-9 shrink-0 place-items-center rounded-full bg-zinc-100"
              >
                <X size={17} />
              </button>
            </div>
            <div className="drawer-body grid grid-cols-4 gap-2">
              {choosingProduct.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => confirmSize(s)}
                  className="h-12 rounded-xl border border-zinc-200 text-sm font-semibold transition hover:border-ink active:scale-95"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
