import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Skeleton } from 'boneyard-js/react'
import { products, categories, heroSlides, collections, IMG } from '../data/products'
import { useFakeLoad } from '../lib/useFakeLoad'
import { ProductCard } from '../components/ProductCard'
import { ProductRail } from '../components/ProductRail'
import { SectionHeader } from '../components/SectionHeader'
import { Countdown } from '../components/Countdown'
import { BundleBuilder } from '../components/BundleBuilder'
import { BrandsRail } from '../components/BrandsRail'
import { Reveal } from '../components/Reveal'
import { Img } from '../components/Img'

const delay = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as CSSProperties

function Hero() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative -mt-16 h-[78dvh] min-h-[480px] w-full overflow-hidden bg-ink md:h-[620px]">
      {heroSlides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={s.image} alt="" className={`h-full w-full object-cover ${idx === 0 ? 'enter-hero' : ''}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-14 md:pb-16">
            {/* first slide staggers in on load; later slides just crossfade */}
            <p
              className={`mb-2 inline-block rounded-full bg-larel px-3 py-1 text-[11px] font-bold text-ink ${idx === 0 ? 'enter-item' : ''}`}
              style={delay(350)}
            >
              {s.kicker}
            </p>
            <h1
              className={`headline-xl text-[3.25rem] text-white md:text-7xl ${idx === 0 ? 'enter-item' : ''}`}
              style={delay(450)}
            >
              {s.title}
            </h1>
            <p
              className={`mt-2 max-w-md text-sm text-white/85 md:text-base ${idx === 0 ? 'enter-item' : ''}`}
              style={delay(560)}
            >
              {s.subtitle}
            </p>
            <Link
              to={s.to}
              className={`mt-5 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-larel active:scale-95 ${idx === 0 ? 'enter-item' : ''}`}
              style={delay(670)}
            >
              {s.cta} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
        {heroSlides.map((s, idx) => (
          <button
            key={s.id}
            aria-label={`Banner ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-6 bg-larel' : 'w-1.5 bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  )
}

const PERKS = [
  'Envíos en 24hs a CDE y Hernandarias',
  'Productos 100% originales',
  'Cambios gratis dentro de los 30 días',
  'Retirá en nuestras 2 sucursales',
  'Hasta 6 cuotas sin interés',
]

function Ticker() {
  const row = [...PERKS, ...PERKS]
  return (
    <div className="enter-item overflow-hidden border-y border-zinc-900 bg-ink py-3" style={delay(1150)}>
      <div className="anim-ticker flex w-max gap-8">
        {row.map((p, i) => (
          <span key={i} className="flex shrink-0 items-center gap-8 text-[13px] font-medium text-white">
            {p}
            <span className="size-1.5 rounded-full bg-larel" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function Home() {
  const loading = useFakeLoad(750)
  const nuevo = products.filter((p) => p.tags.includes('new') || p.tags.includes('bestseller')).slice(0, 8)
  const ofertas = products.filter((p) => p.compareAt).slice(0, 8)

  return (
    <div>
      <Hero />
      <Ticker />

      {/* categories — horizontal rail, never scrolls vertically */}
      <Reveal as="section" className="mx-auto mt-10 max-w-6xl md:px-4">
        <SectionHeader title="Elegí tu cancha" subtitle="Comprá por categoría" to="/productos" />
        <div className="no-scrollbar flex gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 [touch-action:pan-x] md:grid md:grid-cols-5 md:overflow-visible md:px-0 md:[touch-action:auto]">
          {categories
            .filter((c) => c.slug !== 'todos')
            .map((c) => (
              <Link key={c.slug} to={`/c/${c.slug}`} className="group w-32 shrink-0 md:w-auto">
                <div className="overflow-hidden rounded-2xl">
                  <Img
                    src={c.thumb}
                    alt={c.label}
                    className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="headline mt-2 text-center text-sm">{c.label}</p>
              </Link>
            ))}
        </div>
      </Reveal>

      {/* nuevo */}
      <Reveal as="section" className="mx-auto mt-12 max-w-6xl md:px-4">
        <SectionHeader title="Nuevo" subtitle="Lo último que llegó a Larel" to="/productos?tag=new" />
        <Skeleton name="home-nuevo" loading={loading}>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 px-4 md:grid-cols-4 md:px-0">
            {nuevo.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Skeleton>
      </Reveal>

      {/* collections — bento on desktop, slider on mobile */}
      <Reveal as="section" className="mx-auto mt-14 max-w-6xl md:px-4">
        <SectionHeader title="Colecciones" subtitle="Armadas para vos" />
        <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-4 [touch-action:pan-x] md:grid md:auto-rows-[168px] md:grid-cols-4 md:overflow-visible md:px-0 md:[touch-action:auto]">
          {collections.map((c, i) => (
            <Link
              key={c.id}
              to={c.to}
              className={`group relative h-64 w-[72vw] shrink-0 snap-start overflow-hidden rounded-2xl md:h-auto md:w-auto ${c.span}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <Img
                src={c.image}
                alt={c.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4">
                <p className="text-[11px] font-medium text-larel">{c.kicker}</p>
                <h3 className="headline text-xl text-white md:text-2xl">{c.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      {/* bundle builder */}
      <Reveal>
        <BundleBuilder />
      </Reveal>

      {/* time discount */}
      <section className="relative mt-14 overflow-hidden bg-ink">
        <img src={IMG.shoeWall} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 py-14 text-center md:py-20">
          <Reveal delay={0}>
            <p className="text-xs font-semibold text-larel">⚡ Oferta relámpago</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="headline-xl mt-2 text-4xl text-white md:text-6xl">Hasta 40% OFF en zapatillas</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-2 text-sm text-white/70">Termina cuando se acabe el reloj. Sin códigos, sin vueltas.</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-6 flex justify-center">
              <Countdown hours={26} />
            </div>
          </Reveal>
          <Reveal delay={400}>
            <Link
              to="/productos?tag=oferta"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-larel px-8 py-4 text-sm font-semibold text-ink transition hover:brightness-110 active:scale-95"
            >
              Quiero mi descuento <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ofertas rail */}
      <Reveal as="section" className="mx-auto mt-12 max-w-6xl md:px-4">
        <SectionHeader title="Outlet Larel" subtitle="Precios que no se repiten" to="/productos?tag=oferta" />
        <Skeleton name="home-ofertas" loading={loading}>
          <ProductRail products={ofertas} />
        </Skeleton>
      </Reveal>

      <Reveal>
        <BrandsRail />
      </Reveal>
    </div>
  )
}
