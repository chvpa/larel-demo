import { TrendingUp, TrendingDown, ShoppingCart, Receipt, Percent } from 'lucide-react'
import { Skeleton } from 'boneyard-js/react'
import { sales30d, customers } from '../../data/seeds'
import { useOrders, ORDER_STEPS } from '../../store/orders'
import { useFakeLoad } from '../../lib/useFakeLoad'
import { gs, gsCompact, fmtDate } from '../../lib/format'

function LineChart({ data }: { data: { date: string; total: number }[] }) {
  const W = 600
  const H = 160
  const max = Math.max(...data.map((d) => d.total))
  const pts = data.map((d, i) => [
    (i / (data.length - 1)) * W,
    H - (d.total / max) * (H - 16) - 4,
  ])
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${W},${H} L0,${H} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-40 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#26FE41" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#26FE41" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#chartFill)" />
      <path d={line} fill="none" stroke="#10c72a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

export function Sales() {
  const loading = useFakeLoad(650)
  const orders = useOrders((s) => s.orders)

  const revenue = sales30d.reduce((a, d) => a + d.total, 0)
  const orderCount = sales30d.reduce((a, d) => a + d.orders, 0)
  const avgTicket = Math.round(revenue / orderCount)
  const last7 = sales30d.slice(-7).reduce((a, d) => a + d.total, 0)
  const prev7 = sales30d.slice(-14, -7).reduce((a, d) => a + d.total, 0)
  const delta = Math.round(((last7 - prev7) / prev7) * 100)

  const KPIS = [
    { label: 'Ingresos (30 días)', value: gsCompact(revenue), icon: Receipt, trend: delta },
    { label: 'Pedidos', value: String(orderCount), icon: ShoppingCart, trend: 8 },
    { label: 'Ticket promedio', value: gs(avgTicket), icon: TrendingUp, trend: 3 },
    { label: 'Conversión', value: '3,4%', icon: Percent, trend: -1 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="headline text-2xl">Ventas</h1>

      <Skeleton name="admin-kpis" loading={loading}>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <k.icon size={18} className="text-zinc-400" />
                <span
                  className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    k.trend >= 0 ? 'bg-larel/15 text-larel-dark' : 'bg-red-50 text-red-500'
                  }`}
                >
                  {k.trend >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {Math.abs(k.trend)}%
                </span>
              </div>
              <p className="mt-2 truncate text-lg font-extrabold tracking-tight">{k.value}</p>
              <p className="text-[11px] font-semibold text-zinc-500">{k.label}</p>
            </div>
          ))}
        </div>
      </Skeleton>

      <Skeleton name="admin-chart" loading={loading}>
        <div className="rounded-2xl bg-white p-4 shadow-sm md:p-6">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h2 className="font-extrabold">Ingresos diarios</h2>
              <p className="text-xs text-zinc-500">Últimos 30 días</p>
            </div>
            <span className="rounded-full bg-larel/15 px-3 py-1 text-xs font-bold text-larel-dark">
              +{delta}% vs semana anterior
            </span>
          </div>
          <LineChart data={sales30d} />
          <div className="mt-1 flex justify-between text-[10px] text-zinc-400">
            <span>{fmtDate(sales30d[0].date)}</span>
            <span>{fmtDate(sales30d[14].date)}</span>
            <span>{fmtDate(sales30d[29].date)}</span>
          </div>
        </div>
      </Skeleton>

      <Skeleton name="admin-last-orders" loading={loading}>
        <div className="rounded-2xl bg-white shadow-sm">
          <h2 className="border-b border-zinc-100 px-4 py-3 font-extrabold">Últimos pedidos</h2>
          <ul className="divide-y divide-zinc-100">
            {orders.slice(0, 6).map((o, i) => (
              <li key={o.id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{o.id}</p>
                  <p className="truncate text-xs text-zinc-500">
                    {customers[i % customers.length].name} · {fmtDate(o.date)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    o.status === 'entregado' ? 'bg-zinc-100 text-zinc-600' : 'bg-larel/15 text-larel-dark'
                  }`}
                >
                  {ORDER_STEPS.find((s) => s.key === o.status)?.label}
                </span>
                <span className="w-28 text-right text-sm font-extrabold">{gs(o.total)}</span>
              </li>
            ))}
          </ul>
        </div>
      </Skeleton>
    </div>
  )
}
