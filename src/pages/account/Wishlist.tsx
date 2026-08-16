import { Link } from 'react-router-dom'
import { Trash2, ShoppingBag, HeartOff } from 'lucide-react'
import { Skeleton } from 'boneyard-js/react'
import { useWishlist } from '../../store/wishlist'
import { useCart } from '../../store/cart'
import { useUi } from '../../store/ui'
import { useFakeLoad } from '../../lib/useFakeLoad'
import { getProduct } from '../../data/products'
import { gs } from '../../lib/format'
import { Img } from '../../components/Img'

export function Wishlist() {
  const ids = useWishlist((s) => s.ids)
  const toggle = useWishlist((s) => s.toggle)
  const add = useCart((s) => s.add)
  const setCartOpen = useUi((s) => s.setCartOpen)
  const loading = useFakeLoad(550)

  if (ids.length === 0) {
    return (
      <div className="py-14 text-center">
        <HeartOff size={32} className="mx-auto text-zinc-300" />
        <p className="mt-3 font-bold">Tu lista de deseos está vacía</p>
        <p className="mt-1 text-sm text-zinc-500">Tocá el corazón en cualquier producto para guardarlo acá.</p>
        <Link to="/productos" className="mt-4 inline-block rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">
          Descubrir productos
        </Link>
      </div>
    )
  }

  return (
    <Skeleton name="account-wishlist" loading={loading}>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3">
        {ids.map((id) => {
          const p = getProduct(id)
          if (!p) return null
          return (
            <div key={id} className="group relative">
              <Link to={`/p/${id}`}>
                <Img src={p.images[0]} alt={p.name} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              </Link>
              <button
                aria-label="Quitar de la lista"
                onClick={() => toggle(id)}
                className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur"
              >
                <Trash2 size={15} className="text-zinc-500" />
              </button>
              <div className="mt-2">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <p className="text-sm font-bold">{gs(p.price)}</p>
                <button
                  onClick={() => {
                    add(p.id, p.sizes[0])
                    setCartOpen(true)
                  }}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-full bg-ink py-2.5 text-xs font-bold text-white active:scale-95"
                >
                  <ShoppingBag size={13} className="text-larel" /> Agregar
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </Skeleton>
  )
}
