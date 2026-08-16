import { Link } from 'react-router-dom'
import { Package, Heart, Ticket, ChevronRight } from 'lucide-react'
import { useOrders, ORDER_STEPS } from '../../store/orders'
import { useWishlist } from '../../store/wishlist'
import { gs, fmtDate } from '../../lib/format'
import { getProduct } from '../../data/products'
import { Img } from '../../components/Img'

export function Overview() {
  const orders = useOrders((s) => s.orders)
  const wishlist = useWishlist((s) => s.ids)
  const active = orders.find((o) => o.status !== 'entregado')

  return (
    <div className="space-y-6">
      {/* quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <Link to="/cuenta/pedidos" className="rounded-2xl bg-zinc-50 p-4 text-center">
          <Package size={20} className="mx-auto text-larel-dark" />
          <p className="mt-1 text-xl font-extrabold">{orders.length}</p>
          <p className="text-[11px] font-semibold text-zinc-500">Pedidos</p>
        </Link>
        <Link to="/cuenta/deseos" className="rounded-2xl bg-zinc-50 p-4 text-center">
          <Heart size={20} className="mx-auto text-red-500" />
          <p className="mt-1 text-xl font-extrabold">{wishlist.length}</p>
          <p className="text-[11px] font-semibold text-zinc-500">Favoritos</p>
        </Link>
        <div className="rounded-2xl bg-zinc-50 p-4 text-center">
          <Ticket size={20} className="mx-auto text-amber-500" />
          <p className="mt-1 text-xl font-extrabold">2</p>
          <p className="text-[11px] font-semibold text-zinc-500">Cupones</p>
        </div>
      </div>

      {/* active order */}
      {active && (
        <Link to="/cuenta/pedidos" className="block rounded-2xl bg-ink p-4 text-white">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-larel">Pedido en curso</p>
            <ChevronRight size={16} className="text-larel" />
          </div>
          <div className="mt-2 flex items-center gap-3">
            <Img src={active.items[0].image} alt="" className="size-14 rounded-xl object-cover" />
            <div className="flex-1">
              <p className="font-bold">{active.id}</p>
              <p className="text-xs text-white/60">
                {fmtDate(active.date)} · {gs(active.total)}
              </p>
            </div>
            <span className="rounded-full bg-larel px-3 py-1 text-xs font-extrabold text-ink">
              {ORDER_STEPS.find((s) => s.key === active.status)?.label}
            </span>
          </div>
        </Link>
      )}

      {/* cupones disponibles */}
      <div>
        <h2 className="headline mb-3 text-lg">Tus cupones</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { code: 'LAREL10', desc: '10% OFF en toda la tienda' },
            { code: 'ENVIOGRATIS', desc: 'Envío gratis sin mínimo' },
          ].map((c) => (
            <div key={c.code} className="flex items-center gap-3 rounded-2xl border border-dashed border-larel-dark/40 bg-larel/5 p-4">
              <Ticket size={22} className="shrink-0 text-larel-dark" />
              <div>
                <p className="font-mono font-extrabold tracking-wider">{c.code}</p>
                <p className="text-xs text-zinc-500">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* wishlist preview */}
      {wishlist.length > 0 && (
        <div>
          <h2 className="headline mb-3 text-lg">De tu lista de deseos</h2>
          <div className="no-scrollbar flex gap-3 overflow-x-auto">
            {wishlist.slice(0, 4).map((id) => {
              const p = getProduct(id)
              if (!p) return null
              return (
                <Link key={id} to={`/p/${id}`} className="w-32 shrink-0">
                  <Img src={p.images[0]} alt={p.name} className="aspect-square w-full rounded-xl object-cover" />
                  <p className="mt-1 truncate text-xs font-semibold">{p.name}</p>
                  <p className="text-xs font-bold">{gs(p.price)}</p>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
