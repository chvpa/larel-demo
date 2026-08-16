import { useState } from 'react'
import { demoUser } from '../../data/seeds'

function Toggle({ label, sub, defaultOn = true }: { label: string; sub: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button onClick={() => setOn(!on)} className="flex w-full items-center justify-between gap-4 py-3.5 text-left">
      <div>
        <p className="text-sm font-bold">{label}</p>
        <p className="text-xs text-zinc-500">{sub}</p>
      </div>
      <span className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${on ? 'bg-larel' : 'bg-zinc-200'}`}>
        <span
          className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : 'translate-x-0.5'}`}
        />
      </span>
    </button>
  )
}

export function Settings() {
  const [form, setForm] = useState({ ...demoUser })
  const [saved, setSaved] = useState(false)
  const input = 'h-12 w-full rounded-xl border border-zinc-200 px-4 text-[15px] focus:border-ink focus:outline-none'

  return (
    <div className="max-w-2xl space-y-8">
      <section>
        <h2 className="headline mb-3 text-lg">Datos personales</h2>
        <div className="space-y-3">
          <input className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nombre" />
          <input className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
          <div className="grid grid-cols-2 gap-3">
            <input className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Teléfono" />
            <input className={input} value={form.doc} onChange={(e) => setForm({ ...form, doc: e.target.value })} placeholder="C.I." />
          </div>
        </div>
      </section>

      <section>
        <h2 className="headline mb-3 text-lg">Dirección de entrega</h2>
        <div className="space-y-3">
          <input className={input} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Dirección" />
          <input className={input} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Ciudad" />
        </div>
      </section>

      <section>
        <h2 className="headline mb-1 text-lg">Notificaciones</h2>
        <div className="divide-y divide-zinc-100">
          <Toggle label="Ofertas y promociones" sub="Enterate primero del Mega Outlet" />
          <Toggle label="Estado de pedidos" sub="Seguimiento por WhatsApp" />
          <Toggle label="Novedades New In" sub="Cuando llegan productos de tus marcas" defaultOn={false} />
        </div>
      </section>

      <button
        onClick={() => {
          setSaved(true)
          setTimeout(() => setSaved(false), 2000)
        }}
        className="w-full rounded-full bg-ink py-4 font-bold text-white transition active:scale-[0.98] md:w-auto md:px-10"
      >
        {saved ? '✓ Cambios guardados' : 'Guardar cambios'}
      </button>

      <button className="block text-sm font-semibold text-red-500 underline">Cerrar sesión</button>
    </div>
  )
}
