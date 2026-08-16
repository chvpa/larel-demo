import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { brandCards } from '../data/products'
import { Img } from './Img'

export function BrandsRail() {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.8), behavior: 'smooth' })

  return (
    <section className="mx-auto mt-14 max-w-6xl md:px-4">
      <div className="mb-4 flex items-end justify-between gap-4 px-4 md:px-0">
        <div>
          <h2 className="headline text-xl md:text-3xl">Nuestras marcas</h2>
          <p className="mt-0.5 text-sm text-zinc-500">Todas originales, en un solo lugar</p>
        </div>
        <Link to="/productos" className="label shrink-0 text-sm underline-offset-4 hover:underline">
          Ver todo
        </Link>
      </div>

      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 [touch-action:pan-x] md:px-0"
      >
        {brandCards.map((b) => (
          <Link
            key={b.name}
            to={`/productos?marca=${encodeURIComponent(b.name)}`}
            className="group relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl md:aspect-[4/5] md:w-[calc((100%-1.5rem)/3)]"
          >
            <Img
              src={b.image}
              alt={b.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

            {/* logo chip */}
            <span className="absolute left-4 top-4 rounded-lg bg-white px-3 py-1.5 text-sm font-bold tracking-tight text-ink">
              {b.name}
            </span>

            <div className="absolute inset-x-4 bottom-4 text-center">
              <p className="mb-2 text-xs text-white/80">{b.tagline}</p>
              <span className="inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-ink transition group-hover:bg-larel">
                Ver productos
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-3 hidden justify-end gap-2 px-4 md:flex md:px-0">
        <button
          aria-label="Anterior"
          onClick={() => scroll(-1)}
          className="grid size-10 place-items-center rounded-full bg-zinc-100 transition hover:bg-zinc-200 active:scale-90"
        >
          <ArrowLeft size={17} />
        </button>
        <button
          aria-label="Siguiente"
          onClick={() => scroll(1)}
          className="grid size-10 place-items-center rounded-full bg-zinc-100 transition hover:bg-zinc-200 active:scale-90"
        >
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  )
}
