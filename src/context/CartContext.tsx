import { createContext } from 'react'
import type { Product } from '../types/product'
import type { CartItem } from '../types/cart'

export interface CartContextType {
  items: CartItem[]
  toastMessage: string | null
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  clearToast: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)
