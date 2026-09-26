import { useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '../types/product'
import type { CartItem } from '../types/cart'
import { CartContext } from './CartContext'

const STORAGE_KEY = 'modo-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(product: Product) {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setToastMessage(`${product.title} added to cart`)
  }

  function removeFromCart(productId: string) {
    const removed = items.find((item) => item.product.id === productId)
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
    if (removed) {
      setToastMessage(`${removed.product.title} removed from cart`)
    }
  }

  function updateQuantity(productId: string, quantity: number) {
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    )
  }

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  function clearToast() {
    setToastMessage(null)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        toastMessage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        clearToast,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
