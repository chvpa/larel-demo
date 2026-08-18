import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Check } from 'lucide-react'
import type { Product } from '../data/products'
import { useWishlist } from '../store/wishlist'
import { useCart } from '../store/cart'
import { useUi } from '../store/ui'
import { colorSwatch } from '../lib/colors'
import { Img } from './Img'
import { Price } from './Price'

export function ProductCard({ product }: { product: Product }) {
  const inWishlist = useWishlist((s) => s.ids.includes(product.id))
  const toggle = useWishlist((s) => s.toggle)
  const add = useCart((s) => s.add)
  const setCartOpen = useUi((s) => s.setCartOpen)

  const [color, setColor] = useState(0)
  const [size, setSize] = useState<string | null>(null)
  const [askSize, setAskSize] = useState(false)

  const lastUnits = product.stock <= 2
  const oneSize = product.sizes.length === 1

  const addToCart = () => {
    const chosen = size ?? (oneSize ? product.sizes[0] : null)
    if (!chosen) {
      setAskSize(true)
      return
    }
    add(product.id, chosen)
    setCartOpen(true)
    setAskSize(false)
  }

  return (
    <div className="flex h-full flex-col">
      <Link to={`/p/${product.id}`} className="group relative block overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-100">
        <Img
          src={product.images[color % product.images.length]}
          alt={product.name}
          className="aspect-[4/5] w-full bg-white object-contain transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {lastUnits && (
            <span className="rounded-full bg-larel px-2 py-0.5 text-[11px] font-bold text-ink">Últimas unidades</span>
          )}
        </div>
        <button
          aria-label="Agregar a lista de deseos"
          onClick={(e) => {
            e.preventDefault()
            toggle(product.id)
          }}
          className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition active:scale-90"
        >
          <Heart size={17} className={inWishlist ? 'fill-red-500 stroke-red-500' : 'stroke-ink'} />
        </button>
      </Link>

      <div className="mt-2 flex flex-1 flex-col px-0.5">
        <p className="text-[11px] font-medium text-zinc-400">{product.brand}</p>
        <Link to={`/p/${product.id}`} className="truncate text-sm font-semibold tracking-tight hover:underline">
          {product.name}
        </Link>
        <div className="mt-0.5">
          <Price price={product.price} size="sm" />
        </div>

        {/* colors */}
        {product.colors.length > 1 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {product.colors.map((c, i) => (
              <button
                key={c}
                aria-label={`Color ${c}`}
                title={c}
                onClick={() => setColor(i)}
                style={{ background: colorSwatch(c) }}
                className={`size-6 rounded-md border transition ${
                  i === color ? 'border-ink ring-1 ring-ink' : 'border-zinc-200 hover:border-zinc-400'
                }`}
              />
            ))}
          </div>
        )}

        {/* sizes — every variant is shown, wrapping to as many rows as needed */}
        {!oneSize && (
          <div className="mt-2 mb-2 flex flex-wrap gap-1.5">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSize(s)
                  setAskSize(false)
                }}
                className={`min-w-8 rounded-md border px-1.5 py-1 text-[11px] font-semibold transition ${
                  size === s
                    ? 'border-ink bg-ink text-white'
                    : askSize
                      ? 'border-larel-dark text-larel-dark'
                      : 'border-zinc-200 hover:border-ink'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={addToCart}
          className="mt-auto flex w-full items-center justify-center gap-1.5 rounded-full bg-ink py-2.5 text-xs font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.97]"
        >
          {askSize ? 'Elegí tu talle' : <><Check size={13} className="text-larel" /> Agregar</>}
        </button>
      </div>
    </div>
  )
}
