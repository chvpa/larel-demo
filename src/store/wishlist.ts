import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type WishlistState = {
  ids: string[]
  toggle: (id: string) => void
  has: (id: string) => boolean
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: ['zap-jordan', 'buzo-oversize'],
      toggle: (id) =>
        set((st) => ({ ids: st.ids.includes(id) ? st.ids.filter((x) => x !== id) : [...st.ids, id] })),
      has: (id) => get().ids.includes(id),
    }),
    { name: 'larel-wishlist' }
  )
)
