import { useState } from 'react'
import { Plus, Ticket, Trash2, X } from 'lucide-react'
import { Skeleton } from 'boneyard-js/react'
import { useAdmin } from '../../store/admin'
import { useFakeLoad } from '../../lib/useFakeLoad'
import { gs } from '../../lib/format'
import type { Coupon } from '../../data/coupons'

const EMPTY: Coupon = { code: '', type: 'percent', value: 10, active: true, uses: 0, description: '' }

export function Promos() {
  const { coupons, toggleCoupon, saveCoupon, deleteCoupon } = useAdmin()
  const loading = useFakeLoad(550)
  const [editing, setEditing] = useState<Coupon | null>(null)
  const isNew = editing !== null && !coupons.some((c) => c.code === editing.code)

  const input = 'h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm focus:border-ink focus:outline-none'

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="headline text-2xl">Promociones</h1>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-bold text-white active:scale-95"
        >
          <Plus size={16} className="text-larel" /> Nuevo cupón
        </button>
      </div>

      <Skeleton name="admin-promos" loading={loading}>
        <ul className="space-y-2.5">
          {coupons.map((c) => (
            <li key={c.code} className={`rounded-2xl bg-white p-4 shadow-sm ${!c.active ? 'opacity-60' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-larel/15">
                  <Ticket size={18} className="text-larel-dark" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm font-extrabold tracking-wider">{c.code}</p>
                  <p className="truncate text-xs text-zinc-500">{c.description}</p>
                </div>
                {/* toggle */}
                <button
                  aria-label={c.active ? 'Desactivar' : 'Activar'}
                  onClick={() => toggleCoupon(c.code)}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${c.active ? 'bg-larel' : 'bg-zinc-200'}`}
                >
                  <span
                    className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${c.active ? 'translate-x-5' : 'translate-x-0.5'}`}
                  />
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-zinc-100 pt-2.5 text-xs">
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-bold">
                  {c.type === 'percent' ? `-${c.value}%` : 'Envío gratis'}
                </span>
                {c.minSubtotal && (
                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-semibold text-zinc-600">
                    mín. {gs(c.minSubtotal)}
                  </span>
                )}
                <span className="ml-auto text-zinc-500">{c.uses} usos</span>
                <button onClick={() => setEditing({ ...c })} className="font-bold underline">
                  Editar
                </button>
                <button aria-label="Eliminar" onClick={() => deleteCoupon(c.code)} className="text-zinc-400 hover:text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Skeleton>

      <p className="text-xs text-zinc-400">
        💡 Los cupones activos se pueden usar en el carrito de la tienda. Probá crear uno y aplicarlo.
      </p>

      {/* edit/create sheet */}
      {editing && (
        <div className="fixed inset-0 z-50">
          <div className="anim-fade-in absolute inset-0 bg-black/50" onClick={() => setEditing(null)} />
          <div className="anim-slide-up absolute inset-x-0 bottom-0 mx-auto max-h-[85dvh] max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 pb-safe md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:rounded-3xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="headline text-lg">{isNew ? 'Nuevo cupón' : `Editar ${editing.code}`}</h2>
              <button aria-label="Cerrar" onClick={() => setEditing(null)} className="grid size-10 place-items-center rounded-full bg-zinc-100">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-zinc-500">Código</label>
                <input
                  className={`${input} font-mono uppercase`}
                  value={editing.code}
                  disabled={!isNew}
                  onChange={(e) => setEditing({ ...editing, code: e.target.value.toUpperCase().replace(/\s/g, '') })}
                  placeholder="EJ: VERANO25"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-zinc-500">Tipo</label>
                <div className="flex gap-2">
                  {(['percent', 'shipping'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setEditing({ ...editing, type: t })}
                      className={`flex-1 rounded-xl border py-2.5 text-sm font-bold transition ${
                        editing.type === t ? 'border-ink bg-ink text-white' : 'border-zinc-200'
                      }`}
                    >
                      {t === 'percent' ? '% Descuento' : 'Envío gratis'}
                    </button>
                  ))}
                </div>
              </div>
              {editing.type === 'percent' && (
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-zinc-500">Porcentaje (%)</label>
                  <input
                    type="number"
                    min={1}
                    max={90}
                    className={input}
                    value={editing.value}
                    onChange={(e) => setEditing({ ...editing, value: Number(e.target.value) })}
                  />
                </div>
              )}
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-zinc-500">Compra mínima (Gs. — opcional)</label>
                <input
                  type="number"
                  className={input}
                  value={editing.minSubtotal ?? ''}
                  onChange={(e) =>
                    setEditing({ ...editing, minSubtotal: e.target.value ? Number(e.target.value) : undefined })
                  }
                  placeholder="Sin mínimo"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-zinc-500">Descripción</label>
                <input
                  className={input}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  placeholder="Ej: 25% OFF de verano"
                />
              </div>
              <button
                disabled={!editing.code || (editing.type === 'percent' && !editing.value)}
                onClick={() => {
                  saveCoupon(editing)
                  setEditing(null)
                }}
                className="mt-2 w-full rounded-full bg-ink py-4 font-bold text-white transition active:scale-[0.98] disabled:opacity-40"
              >
                Guardar cupón
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
