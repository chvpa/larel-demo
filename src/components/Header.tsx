import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Search, Heart, ShoppingBag, User } from 'lucide-react'
import { useCartCount } from '../store/cart'
import { useUi } from '../store/ui'
import { categories } from '../data/products'

export function Header() {
  const count = useCartCount()
  const { setCartOpen, setSearchOpen } = useUi()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  // Transparent over the hero/cover; solid once the user scrolls past it
  const overlays = pathname === '/' || pathname.startsWith('/c/') || pathname === '/productos'

  useEffect(() => {
    // Hysteresis so the swap doesn't flicker around the threshold
    const onScroll = () =>
      setScrolled((cur) => (cur ? window.scrollY > 60 : window.scrollY > 110))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const transparent = overlays && !scrolled
  const fg = transparent ? 'text-white' : 'text-ink'

  return (
    <header className="enter-header sticky top-0 z-40" style={{ '--enter-delay': '900ms' } as React.CSSProperties}>
      {/* La línea inferior va como inset shadow, no como border: un border suma
          su alto al header y el -mt-16 de hero/cover deja de encajar por 1px. */}
      <div
        className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out ${
          transparent
            ? 'bg-white/0 backdrop-blur-0'
            : 'bg-white/90 shadow-[inset_0_-1px_0_#f4f4f5] backdrop-blur-lg'
        }`}
      >
        <div className={`mx-auto flex h-16 max-w-6xl items-center px-4 transition-colors duration-500 ${fg}`}>
          <Link to="/" className="flex w-32 items-center md:w-40" aria-label="Larel — inicio">
            <img
              src="/larel-logo-black.svg"
              alt="Larel"
              className="h-7 w-auto transition-[filter] duration-500"
              style={{ filter: transparent ? 'brightness(0) invert(1)' : 'none' }}
            />
          </Link>

          {/* centered nav */}
          <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
            {categories
              .filter((c) => c.slug !== 'todos')
              .map((c) => (
                <NavLink
                  key={c.slug}
                  to={`/c/${c.slug}`}
                  className={({ isActive }) =>
                    `label text-[13px] transition hover:opacity-60 ${isActive ? 'underline underline-offset-8' : ''}`
                  }
                >
                  {c.label}
                </NavLink>
              ))}
            <NavLink
              to="/productos"
              className={`label text-[13px] transition-colors duration-500 ${transparent ? 'text-larel' : 'text-larel-dark'}`}
            >
              Ver todo
            </NavLink>
          </nav>

          <div className="ml-auto flex items-center gap-0.5 md:ml-0 md:w-40 md:justify-end">
            <button
              aria-label="Buscar"
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center rounded-full transition hover:bg-current/10 active:scale-90"
            >
              <Search size={20} />
            </button>
            <Link
              to="/cuenta/deseos"
              aria-label="Lista de deseos"
              className="hidden size-10 place-items-center rounded-full transition hover:bg-current/10 md:grid"
            >
              <Heart size={20} />
            </Link>
            <Link
              to="/cuenta"
              aria-label="Mi cuenta"
              className="hidden size-10 place-items-center rounded-full transition hover:bg-current/10 md:grid"
            >
              <User size={20} />
            </Link>
            <button
              aria-label="Carrito"
              onClick={() => setCartOpen(true)}
              className="relative grid size-10 place-items-center rounded-full transition hover:bg-current/10 active:scale-90"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-larel text-[10px] font-bold text-ink">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
