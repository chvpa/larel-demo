import { NavLink, useLocation } from 'react-router-dom'
import { House, LayoutGrid, Search, ShoppingBag, User } from 'lucide-react'
import { useCartCount } from '../store/cart'
import { useUi } from '../store/ui'

export function BottomNav() {
  const count = useCartCount()
  const { setCartOpen, setSearchOpen } = useUi()
  const { pathname } = useLocation()

  const base = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold'
  const cls = ({ isActive }: { isActive: boolean }) =>
    `${base} ${isActive ? 'text-ink' : 'text-zinc-400'}`

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-100 bg-white/95 pb-safe backdrop-blur-lg md:hidden">
      <div className="flex">
        <NavLink to="/" end className={cls}>
          <House size={21} strokeWidth={pathname === '/' ? 2.4 : 2} />
          Inicio
        </NavLink>
        <NavLink to="/productos" className={cls}>
          <LayoutGrid size={21} strokeWidth={pathname.startsWith('/productos') || pathname.startsWith('/c/') ? 2.4 : 2} />
          Tienda
        </NavLink>
        <button onClick={() => setSearchOpen(true)} className={`${base} text-zinc-400`}>
          <Search size={21} />
          Buscar
        </button>
        <button onClick={() => setCartOpen(true)} className={`${base} relative text-zinc-400`}>
          <span className="relative">
            <ShoppingBag size={21} />
            {count > 0 && (
              <span className="absolute -right-2 -top-1.5 grid size-4 place-items-center rounded-full bg-larel text-[9px] font-extrabold text-ink">
                {count}
              </span>
            )}
          </span>
          Carrito
        </button>
        <NavLink to="/cuenta" className={cls}>
          <User size={21} strokeWidth={pathname.startsWith('/cuenta') ? 2.4 : 2} />
          Cuenta
        </NavLink>
      </div>
    </nav>
  )
}
