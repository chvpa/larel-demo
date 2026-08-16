import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Heart, Truck, RefreshCcw, ShieldCheck, Star, ChevronDown, ShoppingBag } from 'lucide-react'
import { Skeleton } from 'boneyard-js/react'
import { getProduct, related, categories } from '../data/products'
import { useCart } from '../store/cart'
import { useWishlist } from '../store/wishlist'
import { useUi } from '../store/ui'
import { useAdmin } from '../store/admin'
import { useFakeLoad } from '../lib/useFakeLoad'
import { colorSwatch } from '../lib/colors'
import { Img } from '../components/Img'
import { Price } from '../components/Price'
import { ProductRail } from '../components/ProductRail'
import { SectionHeader } from '../components/SectionHeader'

const INFO_TABS: { key: string; label: string; body?: string }[] = [
  {
    key: 'desc',
    label: 'Descripción',
  },
  {
    key: 'envios',
    label: 'Envíos y retiros',
    body:
      'Envío a domicilio en Ciudad del Este, Hernandarias, Presidente Franco y Minga Guazú en 24hs. Retiro gratis en nuestras 2 sucursales. Envíos al resto del país por encomienda (2 a 4 días).',
  },
  {
    key: 'cambios',
    label: 'Cambios y devoluciones',
    body:
      'Tenés 30 días para cambios de talle o color presentando tu comprobante. El producto debe estar sin uso y con etiquetas.',
  },
]

function ProductInfo({ description }: { description: string }) {
  const [tab, setTab] = useState<string>('desc')
  const [openAcc, setOpenAcc] = useState<string | null>(null)
  const bodyFor = (key: string) => (key === 'desc' ? description : INFO_TABS.find((t) => t.key === key)!.body!)

  return (
    <div className="mt-6">
      {/* desktop: tabs */}
      <div className="hidden md:block">
        <div className="flex gap-6 border-b border-zinc-200">
          {INFO_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`-mb-px border-b-2 pb-2.5 text-sm font-semibold transition ${
                tab === t.key ? 'border-ink text-ink' : 'border-transparent text-zinc-400 hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="pt-4 text-sm leading-relaxed text-zinc-600">{bodyFor(tab)}</p>
      </div>

      {/* mobile: accordions */}
      <div className="md:hidden">
        {INFO_TABS.map((t) => {
          const open = openAcc === t.key
          return (
            <div key={t.key} className="border-b border-zinc-100">
              <button
                onClick={() => setOpenAcc(open ? null : t.key)}
                className="flex w-full items-center justify-between py-3.5 text-sm font-semibold"
              >
                {t.label}
                <ChevronDown size={17} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && <p className="pb-4 text-sm leading-relaxed text-zinc-600">{bodyFor(t.key)}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Pdp() {
  const { id } = useParams()
  const product = getProduct(id!)
  const loading = useFakeLoad(600, id)
  const [imgIdx, setImgIdx] = useState(0)
  const [size, setSize] = useState<string | null>(null)
  const [color, setColor] = useState(0)
  const [sizeError, setSizeError] = useState(false)
  const add = useCart((s) => s.add)
  const setCartOpen = useUi((s) => s.setCartOpen)
  const inWishlist = useWishlist((s) => (product ? s.ids.includes(product.id) : false))
  const toggleWishlist = useWishlist((s) => s.toggle)
  const stock = useAdmin((s) => (product ? s.stock[product.id] ?? product.stock : 0))

  if (!product) return <Navigate to="/productos" replace />

  const cat = categories.find((c) => c.slug === product.category)

  const addToCart = () => {
    if (!size) {
      setSizeError(true)
      return
    }
    add(product.id, size)
    setCartOpen(true)
  }

  return (
    <div className="mx-auto max-w-6xl md:px-4 md:pt-6">
      <nav className="mb-4 hidden gap-1.5 text-xs text-zinc-500 md:flex">
        <Link to="/" className="hover:underline">Inicio</Link> /
        <Link to={`/c/${product.category}`} className="hover:underline">{cat?.label}</Link> /
        <span className="text-ink">{product.name}</span>
      </nav>

      <Skeleton
        name="pdp"
        loading={loading}
        // boneClass clamps the radius so the square gallery isn't drawn as a circle
        boneClass="bone-pdp"
        snapshotConfig={{ excludeSelectors: ['[data-no-skeleton]'], captureRoundedBorders: false }}
      >
        <div className="md:grid md:grid-cols-2 md:gap-10">
          {/* gallery */}
          <div>
            <div className="relative">
              <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-2xl [touch-action:pan-x] md:hidden">
                {product.images.map((src, i) => (
                  <Img key={i} src={src} alt={product.name} className="aspect-square w-full shrink-0 snap-center object-cover" />
                ))}
              </div>
              <div className="hidden overflow-hidden rounded-2xl md:block">
                <Img src={product.images[imgIdx]} alt={product.name} className="aspect-square w-full object-cover" />
              </div>
              <button
                aria-label="Lista de deseos"
                data-no-skeleton
                onClick={() => toggleWishlist(product.id)}
                className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-white/90 shadow-md backdrop-blur active:scale-90"
              >
                <Heart size={19} className={inWishlist ? 'fill-red-500 stroke-red-500' : ''} />
              </button>
              {product.compareAt && (
                <span
                  data-no-skeleton
                  className="absolute left-3 top-3 rounded-full bg-larel px-3 py-1 text-xs font-bold text-ink"
                >
                  Oferta
                </span>
              )}
            </div>
            <div className="mt-2 hidden gap-2 md:flex">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`overflow-hidden rounded-xl border-2 ${i === imgIdx ? 'border-ink' : 'border-transparent'}`}
                >
                  <Img src={src} alt="" className="size-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* info */}
          <div className="px-4 pt-4 md:px-0 md:pt-0">
            <p className="text-xs font-medium text-zinc-400">{product.brand}</p>
            <h1 className="headline mt-1 text-2xl md:text-3xl">{product.name}</h1>
            <div className="mt-1.5 flex items-center gap-1.5 text-sm">
              <Star size={15} className="fill-amber-400 stroke-amber-400" />
              <b>{product.rating}</b>
              <span className="text-zinc-400">({product.reviews} opiniones)</span>
            </div>
            <div className="mt-3">
              <Price price={product.price} compareAt={product.compareAt} size="lg" />
              <p className="mt-0.5 text-xs text-zinc-500">Hasta 6 cuotas sin interés con tarjetas asociadas</p>
            </div>

            {/* colors — square semi-rounded swatches with the colour / product image */}
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold">
                Color: <span className="font-normal text-zinc-500">{product.colors[color]}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c}
                    aria-label={`Color ${c}`}
                    title={c}
                    onClick={() => {
                      setColor(i)
                      setImgIdx(i % product.images.length)
                    }}
                    className={`relative size-14 overflow-hidden rounded-xl border-2 transition ${
                      i === color ? 'border-ink' : 'border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <Img
                      src={product.images[i % product.images.length]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <span
                      className="absolute bottom-0 left-0 h-4 w-full border-t border-white/60"
                      style={{ background: colorSwatch(c) }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* sizes */}
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold">Talle</p>
                <button className="text-xs font-medium text-zinc-500 underline">Guía de talles</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s)
                      setSizeError(false)
                    }}
                    className={`h-11 rounded-xl border text-sm font-semibold transition ${
                      size === s ? 'border-ink bg-ink text-white' : 'border-zinc-200 hover:border-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && <p className="mt-2 text-xs font-semibold text-red-500">Elegí un talle para continuar</p>}
              {stock <= 5 && stock > 0 && (
                <p className="mt-2 text-xs font-semibold text-amber-600">⚡ ¡Quedan solo {stock} unidades!</p>
              )}
            </div>

            <div className="mt-6 hidden gap-2 md:flex">
              <button
                onClick={addToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-4 font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98]"
              >
                <ShoppingBag size={18} className="text-larel" /> Agregar al carrito
              </button>
            </div>

            <div className="mt-6 space-y-2.5 rounded-2xl bg-zinc-50 p-4 text-sm">
              <p className="flex items-center gap-2.5"><Truck size={17} className="text-larel-dark" /> Envío en 24hs en CDE y alrededores</p>
              <p className="flex items-center gap-2.5"><RefreshCcw size={17} className="text-larel-dark" /> Cambio gratis dentro de los 30 días</p>
              <p className="flex items-center gap-2.5"><ShieldCheck size={17} className="text-larel-dark" /> Producto 100% original</p>
            </div>

            <ProductInfo description={product.description} />
          </div>
        </div>
      </Skeleton>

      <section className="mt-14">
        <SectionHeader title="También te puede gustar" />
        <ProductRail products={related(product)} />
      </section>

      {/* mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-[57px] z-30 border-t border-zinc-100 bg-white/95 px-4 py-2.5 backdrop-blur-lg md:hidden">
        <button
          onClick={addToCart}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 font-semibold text-white transition active:scale-[0.98]"
        >
          <ShoppingBag size={18} className="text-larel" />
          Agregar al carrito
        </button>
      </div>
      <div className="h-16 md:hidden" />
    </div>
  )
}
