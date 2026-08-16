import { NavLink, Outlet, Link } from 'react-router-dom'
import { ChartLine, Users, Boxes, Ticket, ArrowLeft } from 'lucide-react'

const LINKS = [
  { to: '/admin', end: true, icon: ChartLine, label: 'Ventas' },
  { to: '/admin/clientes', icon: Users, label: 'Clientes' },
  { to: '/admin/stock', icon: Boxes, label: 'Stock' },
  { to: '/admin/promos', icon: Ticket, label: 'Promos' },
]

export function AdminLayout() {
  return (
    <div className="min-h-dvh bg-zinc-50">
      {/* admin header */}
      <header className="sticky top-0 z-40 bg-ink text-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          <img src="/larel-icon.svg" alt="" className="size-8 rounded-lg" />
          <div className="mr-auto">
            <p className="headline text-sm leading-none">Panel Larel</p>
            <p className="text-[10px] text-white/50">Administración · demo</p>
          </div>
          {/* desktop nav */}
          <nav className="hidden gap-1 md:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive ? 'bg-larel text-ink' : 'text-white/70 hover:text-white'
                  }`
                }
              >
                <l.icon size={15} />
                {l.label}
              </NavLink>
            ))}
          </nav>
          <Link to="/" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 hover:text-white">
            <ArrowLeft size={13} /> Tienda
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-10">
        <Outlet />
      </main>

      {/* mobile tabs */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white pb-safe md:hidden">
        <div className="flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold ${
                  isActive ? 'text-ink' : 'text-zinc-400'
                }`
              }
            >
              <l.icon size={20} />
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
