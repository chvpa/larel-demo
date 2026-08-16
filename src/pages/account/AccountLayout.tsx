import { NavLink, Outlet } from 'react-router-dom'
import { Package, Heart, Settings, SlidersHorizontal, LayoutDashboard } from 'lucide-react'
import { demoUser } from '../../data/seeds'

const LINKS = [
  { to: '/cuenta', end: true, icon: LayoutDashboard, label: 'Resumen' },
  { to: '/cuenta/pedidos', icon: Package, label: 'Mis pedidos' },
  { to: '/cuenta/deseos', icon: Heart, label: 'Lista de deseos' },
  { to: '/cuenta/preferencias', icon: SlidersHorizontal, label: 'Preferencias' },
  { to: '/cuenta/configuracion', icon: Settings, label: 'Configuración' },
]

export function AccountLayout() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-full bg-larel text-lg font-extrabold text-ink">
          {demoUser.name[0]}
        </div>
        <div>
          <h1 className="headline text-xl">Hola, {demoUser.name.split(' ')[0]} 👋</h1>
          <p className="text-xs text-zinc-500">{demoUser.email}</p>
        </div>
      </div>

      {/* tabs mobile / sidebar desktop */}
      <div className="mt-5 gap-10 md:grid md:grid-cols-[220px_1fr]">
        <nav className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-col md:gap-1 md:px-0">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition md:rounded-xl ${
                  isActive ? 'bg-ink text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 md:bg-transparent'
                }`
              }
            >
              <l.icon size={16} />
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 min-w-0 md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
