import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Product } from '../data/products'
import { ProductCard } from './ProductCard'

export function ProductRail({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.8), behavior: 'smooth' })

  return (
    <div>
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 pb-1 [touch-action:pan-x_pan-y] md:px-0"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[58vw] max-w-[230px] shrink-0 snap-start sm:w-[230px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <div className="mt-3 hidden justify-end gap-2 md:flex">
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
    </div>
  )
}
