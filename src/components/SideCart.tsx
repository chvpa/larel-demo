import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { X, Minus, Plus, Trash2, Ticket, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart, totals } from '../store/cart'
import { useUi } from '../store/ui'
import { getProduct, products } from '../data/products'
import { gs } from '../lib/format'
import { FREE_SHIPPING_MIN } from '../data/coupons'
import { Img } from './Img'

export function SideCart() {
  const open = useUi((s) => s.cartOpen)
  const setOpen = useUi((s) => s.setCartOpen)
  const { items, coupon, couponError, setQty, remove, applyCoupon, removeCoupon, add } = useCart()
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState(false)
  const navigate = useNavigate()

  if (!open) return null

  const t = totals(items, coupon)
  const missingForFree = FREE_SHIPPING_MIN - (t.subtotal - t.discount)
  const recos = products.filter((p) => !items.some((i) => i.productId === p.id) && p.compareAt).slice(0, 3)

  const submitCoupon = () => {
    if (!code.trim()) return
    const ok = applyCoupon(code)
    setApplied(ok)
    if (ok) setCode('')
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="anim-fade-in absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setOpen(false)} />

      {/* recommendations live OUTSIDE the drawer, to its left (desktop only) */}
      {items.length > 0 && recos.length > 0 && (
        <aside className="anim-fade-in absolute right-[28.5rem] top-1/2 hidden w-60 -translate-y-1/2 rounded-3xl bg-black/60 p-3 backdrop-blur-sm lg:block">
          <p className="mb-2 px-1 text-xs font-semibold text-white">También te puede gustar</p>
          <div className="space-y-2">
            {recos.map((p) => (
              <div key={p.id} className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-lg">
                <Img src={p.images[0]} alt={p.name} className="size-14 shrink-0 rounded-xl bg-white object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold">{p.name}</p>
                  <p className="text-xs font-bold">{gs(p.price)}</p>
                  <button
                    onClick={() => add(p.id, p.sizes[0])}
                    className="mt-1 text-[11px] font-semibold text-larel-dark underline underline-offset-2"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      <aside className="anim-slide-in-right absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
          <h2 className="drawer-title headline text-lg">
            Tu carrito{' '}
            {items.length > 0 && <span className="text-zinc-400">({items.reduce((a, i) => a + i.qty, 0)})</span>}
          </h2>
          <button
            aria-label="Cerrar"
            onClick={() => setOpen(false)}
            className="grid size-10 place-items-center rounded-full hover:bg-zinc-100"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-zinc-100">
              <ShoppingBag size={26} className="text-zinc-400" />
            </div>
            <div>
              <p className="font-bold">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-zinc-500">Las mejores marcas te están esperando.</p>
            </div>
            <button
              onClick={() => {
                setOpen(false)
                navigate('/productos')
              }}
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition active:scale-95"
            >
              Ir a la tienda
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-body flex-1 overflow-y-auto">
              <div className="border-b border-zinc-100 px-4 py-3">
                {t.freeShipping ? (
                  <p className="text-sm font-semibold text-larel-dark">🎉 ¡Tenés envío gratis!</p>
                ) : (
                  <>
                    <p className="text-xs text-zinc-600">
                      Te faltan <b>{gs(missingForFree)}</b> para el envío gratis
                    </p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="h-full rounded-full bg-larel transition-all"
                        style={{ width: `${Math.min(100, ((t.subtotal - t.discount) / FREE_SHIPPING_MIN) * 100)}%` }}
                      />
                    </div>
                  </>
                )}
              </div>

              <ul className="divide-y divide-zinc-100 px-4">
                {items.map((i) => {
                  const p = getProduct(i.productId)
                  if (!p) return null
                  return (
                    <li key={`${i.productId}-${i.size}`} className="flex gap-3 py-3">
                      <Link to={`/p/${p.id}`} onClick={() => setOpen(false)} className="shrink-0">
                        <Img src={p.images[0]} alt={p.name} className="size-20 rounded-xl bg-white object-contain" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{p.name}</p>
                        <p className="text-xs text-zinc-500">
                          {p.brand} · Talle {i.size}
                        </p>
                        <p className="mt-0.5 text-sm font-bold">{gs(p.price)}</p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex items-center rounded-full border border-zinc-200">
                            <button
                              aria-label="Restar"
                              onClick={() => setQty(i.productId, i.size, i.qty - 1)}
                              className="grid size-8 place-items-center"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                            <button
                              aria-label="Sumar"
                              onClick={() => setQty(i.productId, i.size, i.qty + 1)}
                              className="grid size-8 place-items-center"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            aria-label="Quitar"
                            onClick={() => remove(i.productId, i.size)}
                            className="grid size-8 place-items-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-red-500"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="border-t border-zinc-100 px-4 py-3 pb-safe-4">
              {coupon ? (
                <div className="mb-2 flex items-center justify-between rounded-xl bg-larel/15 px-3 py-2">
                  <p className="flex items-center gap-2 text-sm font-semibold text-larel-dark">
                    <Ticket size={16} /> {coupon.code}
                    {coupon.type === 'percent' ? ` · -${coupon.value}%` : ' · Envío gratis'}
                  </p>
                  <button onClick={removeCoupon} className="text-xs font-semibold text-zinc-500 underline">
                    Quitar
                  </button>
                </div>
              ) : (
                <div className="mb-2">
                  <div className="flex gap-2">
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && submitCoupon()}
                      placeholder="Cupón de descuento (ej: LAREL10)"
                      className="h-11 flex-1 rounded-full border border-zinc-200 px-4 text-sm uppercase placeholder:normal-case focus:border-ink focus:outline-none"
                    />
                    <button
                      onClick={submitCoupon}
                      className="h-11 rounded-full bg-zinc-100 px-4 text-sm font-semibold transition active:scale-95"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponError && !applied && (
                    <p className="mt-1 px-1 text-xs font-semibold text-red-500">{couponError}</p>
                  )}
                </div>
              )}

              <div className="space-y-1 py-1 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span>{gs(t.subtotal)}</span>
                </div>
                {t.discount > 0 && (
                  <div className="flex justify-between font-semibold text-larel-dark">
                    <span>Descuento</span>
                    <span>-{gs(t.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>Envío</span>
                  <span>{t.shipping === 0 ? 'Gratis' : gs(t.shipping)}</span>
                </div>
                <div className="flex justify-between pt-1 text-base font-extrabold">
                  <span>Total</span>
                  <span>{gs(t.total)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setOpen(false)
                  navigate('/checkout')
                }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 font-semibold text-white transition active:scale-[0.98]"
              >
                Finalizar compra <ArrowRight size={18} className="text-larel" />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
