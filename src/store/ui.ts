import { create } from 'zustand'

type UiState = {
  cartOpen: boolean
  searchOpen: boolean
  setCartOpen: (v: boolean) => void
  setSearchOpen: (v: boolean) => void
}

export const useUi = create<UiState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
}))
