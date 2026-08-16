import { products } from './products'
import type { OrderItem, Order } from '../store/orders'

// ── deterministic pseudo-random (stable demo data) ──
let s = 42
const rnd = () => {
  s = (s * 16807) % 2147483647
  return s / 2147483647
}

const daysAgo = (n: number) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(9 + Math.floor(rnd() * 10), Math.floor(rnd() * 60))
  return d.toISOString()
}

// ── sales for admin chart: last 30 days ──
export const sales30d = Array.from({ length: 30 }, (_, i) => {
  const weekend = new Date(daysAgo(29 - i)).getDay() % 6 === 0
  return {
    date: daysAgo(29 - i).slice(0, 10),
    total: Math.round((2200000 + rnd() * 4800000 + (weekend ? 2500000 : 0)) / 1000) * 1000,
    orders: Math.round(4 + rnd() * 14 + (weekend ? 6 : 0)),
  }
})

// ── customers ──
const names = [
  'Naty González', 'Carlos Benítez', 'María Duarte', 'Rodrigo Villalba', 'Fátima Ayala',
  'Diego Cáceres', 'Lorena Ríos', 'Marcos Giménez', 'Paola Franco', 'Hugo Martínez',
  'Andrea López', 'Iván Ortiz', 'Camila Rojas', 'Sergio Vera', 'Julia Acosta',
]
const cities = ['Ciudad del Este', 'Hernandarias', 'Presidente Franco', 'Minga Guazú', 'Foz de Iguazú']

export const customers = names.map((name, i) => ({
  id: `c${i + 1}`,
  name,
  email: `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@gmail.com`,
  phone: `+595 98${Math.floor(rnd() * 10)} ${100 + Math.floor(rnd() * 900)} ${100 + Math.floor(rnd() * 900)}`,
  city: cities[Math.floor(rnd() * cities.length)],
  orders: 1 + Math.floor(rnd() * 12),
  spent: Math.round((rnd() * 8000000 + 300000) / 1000) * 1000,
  since: daysAgo(30 + Math.floor(rnd() * 500)).slice(0, 10),
}))

// ── seed orders (history + in-progress for the demo user) ──
const pick = (n: number): OrderItem[] =>
  Array.from({ length: n }, () => {
    const p = products[Math.floor(rnd() * products.length)]
    return {
      productId: p.id,
      name: p.name,
      image: p.images[0],
      size: p.sizes[Math.floor(rnd() * p.sizes.length)],
      qty: 1 + Math.floor(rnd() * 2),
      price: p.price,
    }
  })

const mk = (id: string, day: number, status: Order['status'], items: OrderItem[]): Order => {
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0)
  const shipping = subtotal >= 500000 ? 0 : 25000
  return {
    id,
    date: daysAgo(day),
    items,
    subtotal,
    discount: 0,
    shipping,
    total: subtotal + shipping,
    status,
    delivery: 'Envío a domicilio — Ciudad del Este',
    payment: 'Tarjeta terminada en 4412',
  }
}

export const seedOrders: Order[] = [
  mk('LR-10248', 1, 'preparando', pick(2)),
  mk('LR-10231', 3, 'en_camino', pick(1)),
  mk('LR-10102', 21, 'entregado', pick(3)),
  mk('LR-10054', 47, 'entregado', pick(1)),
  mk('LR-09987', 90, 'entregado', pick(2)),
]

export const demoUser = {
  name: 'Naty González',
  email: 'naty.gonzalez@gmail.com',
  phone: '+595 981 456 789',
  address: 'Av. Monseñor Rodríguez 1245',
  city: 'Ciudad del Este',
  doc: '4.512.887',
}
