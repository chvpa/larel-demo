import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedOrders } from '../data/seeds'

export type OrderItem = {
  productId: string
  name: string
  image: string
  size: string
  qty: number
  price: number
}

export type OrderStatus = 'confirmado' | 'preparando' | 'en_camino' | 'entregado'

export type Order = {
  id: string
  date: string
  items: OrderItem[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  status: OrderStatus
  delivery: string
  payment: string
}

export const ORDER_STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'confirmado', label: 'Confirmado' },
  { key: 'preparando', label: 'Preparando' },
  { key: 'en_camino', label: 'En camino' },
  { key: 'entregado', label: 'Entregado' },
]

type OrdersState = {
  orders: Order[]
  place: (order: Omit<Order, 'id' | 'date' | 'status'>) => Order
}

export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: seedOrders,
      place: (data) => {
        const order: Order = {
          ...data,
          id: `LR-${10250 + get().orders.length}`,
          date: new Date().toISOString(),
          status: 'confirmado',
        }
        set((st) => ({ orders: [order, ...st.orders] }))
        return order
      },
    }),
    { name: 'larel-orders' }
  )
)
