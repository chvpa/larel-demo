import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Check, CreditCard, Banknote, Smartphone, Store, Truck, PartyPopper } from 'lucide-react'
import { useCart, totals } from '../store/cart'
import { useOrders, type Order } from '../store/orders'
import { getProduct } from '../data/products'
import { demoUser } from '../data/seeds'
import { gs } from '../lib/format'
import { Img } from '../components/Img'

const STEPS = ['Datos', 'Entrega', 'Pago']

export function Checkout() {
  const navigate = useNavigate()
  const { items, coupon, clear } = useCart()
  const place = useOrders((s) => s.place)
  const [step, setStep] = useState(0)
  const [placed, setPlaced] = useState<Order | null>(null)
  const [processing, setProcessing] = useState(false)

  const [form, setForm] = useState({ name: demoUser.name, email: demoUser.email, phone: demoUser.phone, doc: demoUser.doc })
  const [delivery, setDelivery] = useState<'envio' | 'retiro'>('envio')
  const [address, setAddress] = useState(`${demoUser.address}, ${demoUser.city}`)
  const [payment, setPayment] = useState<'tarjeta' | 'transferencia' | 'qr'>('tarjeta')

  const t = totals(items, coupon)

  if (!placed && items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="headline text-xl">Tu carrito está vacío</p>
        <Link to="/productos" className="mt-4 inline-block rounded-full bg-ink px-6 py-3 text-sm font-bold text-white">
          Ir a la tienda
        </Link>
      </div>
    )
  }

  // ── confirmation ──
  if (placed) {
    return (
      <div className="mx-auto max-w-md px-4 py-14 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-larel">
          <PartyPopper size={28} className="text-ink" />
        </div>
        <h1 className="headline mt-4 text-2xl">¡Gracias por tu compra!</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Tu pedido <b className="text-ink">{placed.id}</b> fue confirmado. Te avisamos por WhatsApp cuando esté en camino.
        </p>
        <div className="mt-6 rounded-2xl border border-zinc-100 p-4 text-left text-sm">
          <div className="flex justify-between gap-6 py-1"><span className="shrink-0 text-zinc-500">Total pagado</span><b>{gs(placed.total)}</b></div>
          <div className="flex justify-between gap-6 py-1"><span className="shrink-0 text-zinc-500">Entrega</span><span className="text-right">{placed.delivery}</span></div>
          <div className="flex justify-between gap-6 py-1"><span className="shrink-0 text-zinc-500">Pago</span><span className="text-right">{placed.payment}</span></div>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <Link to="/cuenta/pedidos" className="rounded-full bg-ink py-3.5 font-bold text-white">Seguir mi pedido</Link>
          <Link to="/" className="rounded-full border border-zinc-200 py-3.5 font-bold">Volver al inicio</Link>
        </div>
      </div>
    )
  }

  const confirm = () => {
    setProcessing(true)
    setTimeout(() => {
      const order = place({
        items: items.map((i) => {
          const p = getProduct(i.productId)!
          return { productId: p.id, name: p.name, image: p.images[0], size: i.size, qty: i.qty, price: p.price }
        }),
        subtotal: t.subtotal,
        discount: t.discount,
        shipping: delivery === 'retiro' ? 0 : t.shipping,
        total: delivery === 'retiro' ? t.total - t.shipping : t.total,
        delivery: delivery === 'envio' ? `Envío a domicilio — ${address}` : 'Retiro en sucursal — Av. San Blas km 4, CDE',
        payment:
          payment === 'tarjeta' ? 'Tarjeta de crédito/débito' : payment === 'transferencia' ? 'Transferencia bancaria' : 'Pago QR',
      })
      clear()
      setPlaced(order)
      setProcessing(false)
      window.scrollTo(0, 0)
    }, 1200)
  }

  const input = 'h-12 w-full rounded-xl border border-zinc-200 px-4 text-[15px] focus:border-ink focus:outline-none'
  const canNext = step === 0 ? form.name && form.email && form.phone : true

  return (
    <div className="mx-auto max-w-5xl px-4 py-5">
      <button onClick={() => (step === 0 ? navigate(-1) : setStep(step - 1))} className="flex items-center gap-1 text-sm font-semibold text-zinc-500">
        <ChevronLeft size={16} /> Volver
      </button>

      {/* stepper */}
      <div className="mx-auto mt-4 flex max-w-md items-center">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`grid size-8 place-items-center rounded-full text-xs font-extrabold ${
                  i < step ? 'bg-larel text-ink' : i === step ? 'bg-ink text-white' : 'bg-zinc-100 text-zinc-400'
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={`mt-1 text-[10px] font-bold uppercase ${i <= step ? 'text-ink' : 'text-zinc-400'}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`mx-2 mb-4 h-0.5 flex-1 rounded ${i < step ? 'bg-larel' : 'bg-zinc-100'}`} />}
          </div>
        ))}
      </div>

      <div className="mt-6 gap-10 lg:grid lg:grid-cols-[1fr_360px]">
        <div>
          {step === 0 && (
            <div className="space-y-3">
              <h2 className="headline text-lg">Tus datos</h2>
              <input className={input} placeholder="Nombre y apellido" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className={input} placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <input className={input} placeholder="Teléfono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input className={input} placeholder="C.I. / RUC" value={form.doc} onChange={(e) => setForm({ ...form, doc: e.target.value })} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <h2 className="headline text-lg">¿Cómo lo recibís?</h2>
              <button
                onClick={() => setDelivery('envio')}
                className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${delivery === 'envio' ? 'border-ink' : 'border-zinc-100'}`}
              >
                <Truck size={20} className="mt-0.5 text-larel-dark" />
                <div className="flex-1">
                  <p className="font-bold">Envío a domicilio</p>
                  <p className="text-sm text-zinc-500">24hs hábiles en CDE y alrededores</p>
                  {delivery === 'envio' && (
                    <input
                      className={`${input} mt-3`}
                      placeholder="Dirección de entrega"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </div>
                <span className="text-sm font-bold">{t.shipping === 0 ? 'Gratis' : gs(t.shipping)}</span>
              </button>
              <button
                onClick={() => setDelivery('retiro')}
                className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${delivery === 'retiro' ? 'border-ink' : 'border-zinc-100'}`}
              >
                <Store size={20} className="mt-0.5 text-larel-dark" />
                <div className="flex-1">
                  <p className="font-bold">Retiro en sucursal</p>
                  <p className="text-sm text-zinc-500">Av. San Blas km 4, CDE · listo en 2hs</p>
                </div>
                <span className="text-sm font-bold text-larel-dark">Gratis</span>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h2 className="headline text-lg">Método de pago</h2>
              {[
                { key: 'tarjeta' as const, icon: CreditCard, title: 'Tarjeta de crédito / débito', sub: 'Hasta 6 cuotas sin interés' },
                { key: 'qr' as const, icon: Smartphone, title: 'Pago QR', sub: 'Desde tu app de billetera' },
                { key: 'transferencia' as const, icon: Banknote, title: 'Transferencia bancaria', sub: 'Te pasamos los datos por WhatsApp' },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setPayment(m.key)}
                  className={`flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition ${payment === m.key ? 'border-ink' : 'border-zinc-100'}`}
                >
                  <m.icon size={20} className="text-larel-dark" />
                  <div className="flex-1">
                    <p className="font-bold">{m.title}</p>
                    <p className="text-sm text-zinc-500">{m.sub}</p>
                  </div>
                  <div className={`grid size-5 place-items-center rounded-full border-2 ${payment === m.key ? 'border-ink' : 'border-zinc-200'}`}>
                    {payment === m.key && <div className="size-2.5 rounded-full bg-ink" />}
                  </div>
                </button>
              ))}
              <p className="rounded-xl bg-zinc-50 p-3 text-xs text-zinc-500">
                🔒 Esto es una demo: no se procesa ningún pago real.
              </p>
            </div>
          )}

          <button
            disabled={!canNext || processing}
            onClick={() => (step < 2 ? setStep(step + 1) : confirm())}
            className="mt-6 w-full rounded-full bg-ink py-4 font-bold text-white transition active:scale-[0.98] disabled:opacity-40"
          >
            {processing ? 'Procesando pago…' : step < 2 ? 'Continuar' : `Pagar ${gs(t.total)}`}
          </button>
        </div>

        {/* summary */}
        <aside className="mt-8 lg:mt-0">
          <div className="rounded-2xl border border-zinc-100 p-4">
            <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide">Tu pedido</h3>
            <ul className="space-y-3">
              {items.map((i) => {
                const p = getProduct(i.productId)!
                return (
                  <li key={`${i.productId}-${i.size}`} className="flex items-center gap-3">
                    <div className="relative">
                      <Img src={p.images[0]} alt={p.name} className="size-14 rounded-xl object-cover" />
                      <span className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">
                        {i.qty}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-zinc-500">Talle {i.size}</p>
                    </div>
                    <span className="text-sm font-bold">{gs(p.price * i.qty)}</span>
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 space-y-1 border-t border-zinc-100 pt-3 text-sm">
              <div className="flex justify-between text-zinc-600"><span>Subtotal</span><span>{gs(t.subtotal)}</span></div>
              {t.discount > 0 && (
                <div className="flex justify-between font-semibold text-larel-dark">
                  <span>Descuento {coupon && `(${coupon.code})`}</span>
                  <span>-{gs(t.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-600">
                <span>Envío</span>
                <span>{delivery === 'retiro' || t.shipping === 0 ? 'Gratis' : gs(t.shipping)}</span>
              </div>
              <div className="flex justify-between pt-1 text-base font-extrabold">
                <span>Total</span>
                <span>{gs(delivery === 'retiro' ? t.total - t.shipping : t.total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
