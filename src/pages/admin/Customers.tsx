import { useState } from 'react'
import { Search } from 'lucide-react'
import { Skeleton } from 'boneyard-js/react'
import { customers } from '../../data/seeds'
import { useFakeLoad } from '../../lib/useFakeLoad'
import { gs, fmtDate } from '../../lib/format'

export function Customers() {
  const [q, setQ] = useState('')
  const loading = useFakeLoad(600)
  const list = customers.filter((c) => `${c.name} ${c.email} ${c.city}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="headline text-2xl">Clientes</h1>
        <div className="flex h-10 w-full items-center gap-2 rounded-full bg-white px-4 shadow-sm sm:w-72">
          <Search size={16} className="text-zinc-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar cliente..."
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>

      <Skeleton name="admin-customers" loading={loading}>
        {/* mobile cards */}
        <ul className="space-y-2.5 md:hidden">
          {list.map((c) => (
            <li key={c.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-full bg-larel/20 text-sm font-extrabold text-larel-dark">
                  {c.name.split(' ').map((w) => w[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{c.name}</p>
                  <p className="truncate text-xs text-zinc-500">{c.city} · {c.phone}</p>
                </div>
              </div>
              <div className="mt-3 flex justify-between border-t border-zinc-100 pt-2.5 text-xs">
                <span className="text-zinc-500">{c.orders} pedidos</span>
                <span className="font-extrabold">{gs(c.spent)}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* desktop table */}
        <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-100 text-left text-xs uppercase tracking-wide text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-bold">Cliente</th>
                <th className="px-4 py-3 font-bold">Ciudad</th>
                <th className="px-4 py-3 font-bold">Cliente desde</th>
                <th className="px-4 py-3 text-right font-bold">Pedidos</th>
                <th className="px-4 py-3 text-right font-bold">Total gastado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {list.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <p className="font-bold">{c.name}</p>
                    <p className="text-xs text-zinc-500">{c.email}</p>
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{c.city}</td>
                  <td className="px-4 py-3 text-zinc-600">{fmtDate(c.since)}</td>
                  <td className="px-4 py-3 text-right font-semibold">{c.orders}</td>
                  <td className="px-4 py-3 text-right font-extrabold">{gs(c.spent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {list.length === 0 && <p className="py-10 text-center text-sm text-zinc-500">Sin resultados para “{q}”</p>}
      </Skeleton>
    </div>
  )
}
