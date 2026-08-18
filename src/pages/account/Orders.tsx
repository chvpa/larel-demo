import { Link } from 'react-router-dom'
import { Skeleton } from 'boneyard-js/react'
import { useOrders, ORDER_STEPS, type Order } from '../../store/orders'
import { useFakeLoad } from '../../lib/useFakeLoad'
import { gs, fmtDate } from '../../lib/format'
import { Img } from '../../components/Img'

const STATUS_STYLE: Record<Order['status'], string> = {
  confirmado: 'bg-blue-100 text-blue-700',
  preparando: 'bg-amber-100 text-amber-700',
  en_camino: 'bg-larel/20 text-larel-dark',
  entregado: 'bg-zinc-100 text-zinc-600',
}

function OrderCard({ order }: { order: Order }) {
  const stepIdx = ORDER_STEPS.findIndex((s) => s.key === order.status)
  const inProgress = order.status !== 'entregado'

  return (
    <div className="rounded-2xl border border-zinc-100 p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="font-extrabold">{order.id}</p>
          <p className="text-xs text-zinc-500">{fmtDate(order.date)}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLE[order.status]}`}>
          {ORDER_STEPS[stepIdx].label}
        </span>
      </div>

      {/* progress timeline for in-progress orders */}
      {inProgress && (
        <div className="mt-4 flex items-center">
          {ORDER_STEPS.map((s, i) => (
            <div key={s.key} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`size-3 rounded-full ${i <= stepIdx ? 'bg-larel' : 'bg-zinc-200'}`} />
                <span className={`mt-1 w-14 text-center text-[9px] font-bold uppercase leading-tight ${i <= stepIdx ? 'text-ink' : 'text-zinc-400'}`}>
                  {s.label}
                </span>
              </div>
              {i < ORDER_STEPS.length - 1 && (
                <div className={`mx-1 mb-4 h-0.5 flex-1 rounded ${i < stepIdx ? 'bg-larel' : 'bg-zinc-200'}`} />
              )}
            </div>
          ))}
        </div>
      )}

      <ul className="mt-4 space-y-2.5">
        {order.items.map((it, i) => (
          <li key={i} className="flex items-center gap-3">
            <Link to={`/p/${it.productId}`}>
              <Img src={it.image} alt={it.name} className="size-12 rounded-xl bg-white object-contain" />
            </Link>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{it.name}</p>
              <p className="text-xs text-zinc-500">Talle {it.size} · x{it.qty}</p>
            </div>
            <span className="text-sm font-bold">{gs(it.price * it.qty)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between gap-4 border-t border-zinc-100 pt-3 text-sm">
        <span className="text-zinc-500">{order.delivery}</span>
        <span className="shrink-0 font-extrabold">{gs(order.total)}</span>
      </div>
    </div>
  )
}

export function Orders() {
  const orders = useOrders((s) => s.orders)
  const loading = useFakeLoad(600)
  const inProgress = orders.filter((o) => o.status !== 'entregado')
  const past = orders.filter((o) => o.status === 'entregado')

  return (
    <Skeleton name="account-orders" loading={loading}>
      <div className="space-y-8">
        {inProgress.length > 0 && (
          <section>
            <h2 className="headline mb-3 text-lg">Pedidos en curso</h2>
            <div className="space-y-3">
              {inProgress.map((o) => (
                <OrderCard key={o.id} order={o} />
              ))}
            </div>
          </section>
        )}
        <section>
          <h2 className="headline mb-3 text-lg">Últimos pedidos</h2>
          {past.length === 0 ? (
            <p className="text-sm text-zinc-500">Todavía no tenés pedidos entregados.</p>
          ) : (
            <div className="space-y-3">
              {past.map((o) => (
                <OrderCard key={o.id} order={o} />
              ))}
            </div>
          )}
        </section>
      </div>
    </Skeleton>
  )
}
