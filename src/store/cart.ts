import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getProduct } from '../data/products'
import { SHIPPING_COST, FREE_SHIPPING_MIN, type Coupon } from '../data/coupons'
import { useAdmin } from './admin'

export type CartItem = { productId: string; size: string; qty: number }

type CartState = {
  items: CartItem[]
  coupon: Coupon | null
  couponError: string | null
  add: (productId: string, size: string, qty?: number) => void
  remove: (productId: string, size: string) => void
  setQty: (productId: string, size: string, qty: number) => void
  applyCoupon: (code: string) => boolean
  removeCoupon: () => void
  clear: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      couponError: null,
      add: (productId, size, qty = 1) =>
        set((st) => {
          const existing = st.items.find((i) => i.productId === productId && i.size === size)
          if (existing)
            return {
              items: st.items.map((i) =>
                i === existing ? { ...i, qty: i.qty + qty } : i
              ),
            }
          return { items: [...st.items, { productId, size, qty }] }
        }),
      remove: (productId, size) =>
        set((st) => ({ items: st.items.filter((i) => !(i.productId === productId && i.size === size)) })),
      setQty: (productId, size, qty) =>
        set((st) => ({
          items:
            qty <= 0
              ? st.items.filter((i) => !(i.productId === productId && i.size === size))
              : st.items.map((i) => (i.productId === productId && i.size === size ? { ...i, qty } : i)),
        })),
      applyCoupon: (code) => {
        const c = useAdmin.getState().coupons.find((x) => x.code === code.trim().toUpperCase())
        if (!c || !c.active) {
          set({ coupon: null, couponError: 'Cupón inválido o vencido' })
          return false
        }
        const { subtotal } = totals(get().items, null)
        if (c.minSubtotal && subtotal < c.minSubtotal) {
          set({ coupon: null, couponError: `Válido para compras desde Gs. ${new Intl.NumberFormat('es-PY').format(c.minSubtotal)}` })
          return false
        }
        set({ coupon: c, couponError: null })
        return true
      },
      removeCoupon: () => set({ coupon: null, couponError: null }),
      clear: () => set({ items: [], coupon: null, couponError: null }),
    }),
    { name: 'larel-cart' }
  )
)

export function totals(items: CartItem[], coupon: Coupon | null) {
  const subtotal = items.reduce((acc, i) => acc + (getProduct(i.productId)?.price ?? 0) * i.qty, 0)
  const discount = coupon?.type === 'percent' ? Math.round((subtotal * coupon.value) / 100) : 0
  const freeShipping = subtotal - discount >= FREE_SHIPPING_MIN || coupon?.type === 'shipping'
  const shipping = items.length === 0 || freeShipping ? 0 : SHIPPING_COST
  return { subtotal, discount, shipping, total: subtotal - discount + shipping, freeShipping }
}

export const useCartCount = () => useCart((s) => s.items.reduce((a, i) => a + i.qty, 0))
