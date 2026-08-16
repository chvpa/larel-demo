import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedCoupons, type Coupon } from '../data/coupons'
import { products } from '../data/products'

type AdminState = {
  coupons: Coupon[]
  stock: Record<string, number>
  toggleCoupon: (code: string) => void
  saveCoupon: (c: Coupon) => void
  deleteCoupon: (code: string) => void
  setStock: (productId: string, qty: number) => void
}

export const useAdmin = create<AdminState>()(
  persist(
    (set) => ({
      coupons: seedCoupons,
      stock: Object.fromEntries(products.map((p) => [p.id, p.stock])),
      toggleCoupon: (code) =>
        set((st) => ({
          coupons: st.coupons.map((c) => (c.code === code ? { ...c, active: !c.active } : c)),
        })),
      saveCoupon: (c) =>
        set((st) => {
          const exists = st.coupons.some((x) => x.code === c.code)
          return {
            coupons: exists ? st.coupons.map((x) => (x.code === c.code ? c : x)) : [c, ...st.coupons],
          }
        }),
      deleteCoupon: (code) => set((st) => ({ coupons: st.coupons.filter((c) => c.code !== code) })),
      setStock: (productId, qty) =>
        set((st) => ({ stock: { ...st.stock, [productId]: Math.max(0, qty) } })),
    }),
    { name: 'larel-admin' }
  )
)
