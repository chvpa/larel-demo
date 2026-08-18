import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown, ChevronLeft, ChevronRight, Grid2x2, Grid3x3, LayoutGrid } from 'lucide-react'
import { products, categories, brands, subcategories, type Category } from '../data/products'
import { useFakeLoad } from '../lib/useFakeLoad'
import { ProductCard } from '../components/ProductCard'

const SORTS = [
  { key: 'relevancia', label: 'Relevancia' },
  { key: 'precio-asc', label: 'Menor precio' },
  { key: 'precio-desc', label: 'Mayor precio' },
  { key: 'nuevo', label: 'Lo más nuevo' },
] as const

const PRICE_RANGES = [
  { key: 'all', label: 'Todos los precios', min: 0, max: Infinity },
  { key: 'r1', label: 'Hasta Gs. 200.000', min: 0, max: 200000 },
  { key: 'r2', label: 'Gs. 200.000 – 500.000', min: 200000, max: 500000 },
  { key: 'r3', label: 'Gs. 500.000 – 800.000', min: 500000, max: 800000 },
  { key: 'r4', label: 'Más de Gs. 800.000', min: 800000, max: Infinity },
]

const PER_PAGE = 24

const CLOTH_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

/** All sizes in the catalog, grouped: calzado (numeric), prendas (letters), otros. */
const SIZE_GROUPS = (() => {
  const all = [...new Set(products.flatMap((p) => p.sizes))].filter((s) => s !== 'Único')
  const numeric = all.filter((s) => /^\d+(\.\d+)?$/.test(s)).sort((a, b) => Number(a) - Number(b))
  const cloth = all.filter((s) => CLOTH_ORDER.includes(s)).sort((a, b) => CLOTH_ORDER.indexOf(a) - CLOTH_ORDER.indexOf(b))
  const other = all.filter((s) => !numeric.includes(s) && !cloth.includes(s)).sort()
  return [
    { label: 'Calzado', sizes: numeric },
    { label: 'Prendas', sizes: cloth },
    { label: 'Otros', sizes: other },
  ].filter((g) => g.sizes.length > 0)
})()

/** Density options → columns per breakpoint. */
/**
 * Esqueleto de card. No usa boneyard: la grilla cambia de cantidad (filtros) y
 * de columnas (densidad), y el runtime escala los huesos capturados al alto del
 * contenedor real — con 8 productos contra los 36 de la captura, los aplastaba
 * a ~1/4 de su alto. Con `aspect-[4/5]` la proporción es correcta siempre.
 */
function CardBones() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] w-full rounded-2xl bg-zinc-100" />
      <div className="mt-2.5 h-2.5 w-1/3 rounded bg-zinc-100" />
      <div className="mt-2 h-3.5 w-3/4 rounded bg-zinc-100" />
      <div className="mt-2 h-3.5 w-1/2 rounded bg-zinc-100" />
      <div className="mt-3 h-9 w-full rounded-full bg-zinc-100" />
    </div>
  )
}

const DENSITY = [
  { key: 'roomy', icon: Grid2x2, mobile: 1, desktop: 3 },
  { key: 'normal', icon: Grid3x3, mobile: 2, desktop: 4 },
  { key: 'dense', icon: LayoutGrid, mobile: 3, desktop: 5 },
] as const

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const on = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return isDesktop
}

function FilterGroup({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(false) // collapsed by default
  return (
    <div className="border-b border-zinc-100">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-3.5 text-sm font-semibold">
        <span className="flex items-center gap-2">
          {title}
          {count > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-larel text-[10px] font-bold text-ink">
              {count}
            </span>
          )}
        </span>
        <ChevronDown size={16} className={`text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  )
}

export function Plp() {
  const { cat } = useParams()
  const [params, setParams] = useSearchParams()
  const category = categories.find((c) => c.slug === (cat ?? 'todos')) ?? categories[0]

  const tag = params.get('tag')
  const marcaParam = params.get('marca')
  const isDesktop = useIsDesktop()

  const [selBrands, setSelBrands] = useState<string[]>(marcaParam ? [marcaParam] : [])
  const [selSubs, setSelSubs] = useState<string[]>([])
  const [selSizes, setSelSizes] = useState<string[]>([])
  const [priceKey, setPriceKey] = useState('all')
  const [sort, setSort] = useState<(typeof SORTS)[number]['key']>('relevancia')
  const [sheetOpen, setSheetOpen] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const [density, setDensity] = useState<(typeof DENSITY)[number]['key']>('normal')
  const [page, setPage] = useState(1)

  const loading = useFakeLoad(650, `${cat}-${tag}-${marcaParam}`)

  const filtered = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.key === priceKey)!
    let list = products.filter((p) => {
      if (category.slug !== 'todos' && p.category !== (category.slug as Category)) return false
      if (tag === 'oferta' && !p.compareAt) return false
      if (selBrands.length && !selBrands.includes(p.brand)) return false
      if (selSubs.length && !selSubs.includes(p.subcategory)) return false
      if (selSizes.length && !p.sizes.some((s) => selSizes.includes(s))) return false
      if (p.price < range.min || p.price >= range.max) return false
      return true
    })
    if (sort === 'precio-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'precio-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'nuevo') list = [...list].sort((a, b) => b.addedAt.localeCompare(a.addedAt) || b.code - a.code)
    return list
  }, [category.slug, tag, selBrands, selSubs, selSizes, priceKey, sort])

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const current = Math.min(page, pages)
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  // cualquier cambio de filtro, orden o categoría vuelve a la primera página
  useEffect(() => setPage(1), [category.slug, tag, selBrands, selSubs, selSizes, priceKey, sort])

  const goTo = (n: number) => {
    setPage(n)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const activeFilters = selBrands.length + selSubs.length + selSizes.length + (priceKey !== 'all' ? 1 : 0)
  const cols = DENSITY.find((d) => d.key === density)![isDesktop ? 'desktop' : 'mobile']

  const toggleIn = (arr: string[], v: string, set: (x: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

  const clearFilters = () => {
    setSelBrands([])
    setSelSubs([])
    setSelSizes([])
    setPriceKey('all')
    if (marcaParam) setParams({}, { replace: true })
  }


  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition ${
      active ? 'border-ink bg-ink text-white' : 'border-zinc-200 hover:border-ink'
    }`

  const Filters = () => (
    <div>
      <FilterGroup title="Tipo de producto" count={selSubs.length}>
        <div className="flex flex-wrap gap-2">
          {subcategories.map((s) => (
            <button key={s} onClick={() => toggleIn(selSubs, s, setSelSubs)} className={chip(selSubs.includes(s))}>
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Talle" count={selSizes.length}>
        <div className="space-y-3">
          {SIZE_GROUPS.map((g) => (
            <div key={g.label}>
              <p className="mb-1.5 text-xs font-medium text-zinc-400">{g.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {g.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleIn(selSizes, s, setSelSizes)}
                    className={`min-w-10 rounded-lg border px-2 py-1.5 text-sm font-medium transition ${
                      selSizes.includes(s) ? 'border-ink bg-ink text-white' : 'border-zinc-200 hover:border-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Marca" count={selBrands.length}>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <button key={b} onClick={() => toggleIn(selBrands, b, setSelBrands)} className={chip(selBrands.includes(b))}>
              {b}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Precio" count={priceKey !== 'all' ? 1 : 0}>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((r) => (
            <label key={r.key} className="flex cursor-pointer items-center gap-2.5 py-1 text-sm">
              <input
                type="radio"
                name="price"
                checked={priceKey === r.key}
                onChange={() => setPriceKey(r.key)}
                className="size-4 accent-ink"
              />
              {r.label}
            </label>
          ))}
        </div>
      </FilterGroup>

      {activeFilters > 0 && (
        <button onClick={clearFilters} className="mt-4 text-sm font-medium text-zinc-500 underline">
          Limpiar filtros ({activeFilters})
        </button>
      )}
    </div>
  )

  return (
    <div>
      {/* category cover */}
      <section className="relative -mt-16 h-56 overflow-hidden bg-ink md:h-72">
        <img src={category.cover} alt={category.label} className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/25" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-5">
          <p className="text-[11px] font-semibold text-larel">
            {tag === 'oferta' ? 'Descuentos en todas las marcas' : category.tagline}
          </p>
          <h1 className="headline-xl text-3xl text-white md:text-5xl">
            {tag === 'oferta' ? 'Ofertas' : category.label}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-4">
        {/* toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-zinc-500">
            <b className="text-ink">{filtered.length}</b> productos
          </p>
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            {/* how many products per row */}
            <div className="flex shrink-0 items-center rounded-full border border-zinc-200 p-0.5">
              {DENSITY.map((d) => (
                <button
                  key={d.key}
                  aria-label={`Ver ${isDesktop ? d.desktop : d.mobile} por fila`}
                  onClick={() => setDensity(d.key)}
                  className={`grid size-8 place-items-center rounded-full transition sm:size-9 ${
                    density === d.key ? 'bg-ink text-white' : 'text-zinc-400 hover:text-ink'
                  }`}
                >
                  <d.icon size={15} />
                </button>
              ))}
            </div>

            <div className="relative min-w-0">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="h-10 w-full appearance-none truncate rounded-full border border-zinc-200 pl-3 pr-8 text-sm font-medium focus:border-ink focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            </div>

            <button
              onClick={() => setSheetOpen(true)}
              className="flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-zinc-200 px-3 text-sm font-medium lg:hidden"
            >
              <SlidersHorizontal size={15} />
              <span className="hidden sm:inline">Filtros</span>
              {activeFilters > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-larel text-[10px] font-bold text-ink">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-8">
          <aside className="hidden w-60 shrink-0 lg:block">
            <Filters />
          </aside>

          <div ref={gridRef} className="min-w-0 flex-1 scroll-mt-24">
            {filtered.length === 0 && !loading ? (
              <div className="py-16 text-center">
                <p className="font-bold">No hay productos con estos filtros</p>
                <button onClick={clearFilters} className="mt-2 text-sm font-medium underline">
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div
                className="grid gap-x-3 gap-y-8"
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
              >
                {loading
                  ? Array.from({ length: Math.min(visible.length, PER_PAGE) || cols * 2 }, (_, i) => <CardBones key={i} />)
                  : visible.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}

            {pages > 1 && !loading && (
              <nav aria-label="Paginación" className="mt-10 flex items-center justify-center gap-1.5">
                <button
                  aria-label="Página anterior"
                  disabled={current === 1}
                  onClick={() => goTo(current - 1)}
                  className="grid size-10 place-items-center rounded-full border border-zinc-200 transition hover:border-ink disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    aria-current={n === current ? 'page' : undefined}
                    onClick={() => goTo(n)}
                    className={`size-10 rounded-full text-sm font-semibold transition ${
                      n === current ? 'bg-ink text-white' : 'border border-zinc-200 hover:border-ink'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  aria-label="Página siguiente"
                  disabled={current === pages}
                  onClick={() => goTo(current + 1)}
                  className="grid size-10 place-items-center rounded-full border border-zinc-200 transition hover:border-ink disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>

      {/* mobile filter sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="anim-fade-in absolute inset-0 bg-black/50" onClick={() => setSheetOpen(false)} />
          <div className="anim-slide-up absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-white p-5 pb-safe">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="headline text-lg">Filtros</h2>
              <button
                aria-label="Cerrar filtros"
                onClick={() => setSheetOpen(false)}
                className="grid size-10 place-items-center rounded-full bg-zinc-100"
              >
                <X size={18} />
              </button>
            </div>
            <Filters />
            <button
              onClick={() => setSheetOpen(false)}
              className="mb-2 mt-6 w-full rounded-full bg-ink py-4 font-semibold text-white active:scale-[0.98]"
            >
              Ver {filtered.length} productos
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
