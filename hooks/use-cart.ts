"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/api"

interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addItem: (product) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === product.id)

        if (existingItem) {
          set({
            items: items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
          })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }

        // Update total
        const newTotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        set({ total: newTotal })
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        })

        // Update total
        const newTotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        set({ total: newTotal })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return

        set({
          items: get().items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        })

        // Update total
        const newTotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        set({ total: newTotal })
      },

      clearCart: () => {
        set({ items: [], total: 0 })
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
