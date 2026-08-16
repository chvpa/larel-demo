import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock } from 'lucide-react'

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
import { categories } from '../data/products'

export function Footer() {
  return (
    <footer className="mt-14 bg-ink pb-28 text-white md:pb-10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <img src="/larel-logo-black.svg" alt="Larel" className="h-9 w-auto brightness-0 invert" />
            <p className="mt-4 max-w-xs text-sm text-zinc-400">
              Tienda de artículos deportivos. Todas las marcas, en un solo lugar.
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href="https://www.instagram.com/larelpy/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-larel hover:text-ink"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-larel hover:text-ink"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold tracking-tight text-larel">Categorías</h4>
            <ul className="space-y-2 text-sm text-zinc-300">
              {categories
                .filter((c) => c.slug !== 'todos')
                .map((c) => (
                  <li key={c.slug}>
                    <Link to={`/c/${c.slug}`} className="hover:text-larel">
                      {c.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold tracking-tight text-larel">Ayuda</h4>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li><Link to="/cuenta/pedidos" className="hover:text-larel">Seguí tu pedido</Link></li>
              <li><a href="#" className="hover:text-larel">Cambios y devoluciones</a></li>
              <li><a href="#" className="hover:text-larel">Guía de talles</a></li>
              <li><Link to="/admin" className="hover:text-larel">Panel admin (demo)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold tracking-tight text-larel">Sucursales</h4>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-larel" /> Av. San Blas km 4 — Ciudad del Este</li>
              <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-larel" /> Ruta Los Cedrales — Hernandarias</li>
              <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-larel" /> +595 983 000 000</li>
              <li className="flex gap-2"><Clock size={16} className="mt-0.5 shrink-0 text-larel" /> Lun a Sáb · 08:00 a 20:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Larel · Demo de ecommerce — los productos y precios son ilustrativos
        </div>
      </div>
    </footer>
  )
}
