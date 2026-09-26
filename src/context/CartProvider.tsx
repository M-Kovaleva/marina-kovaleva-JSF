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
  
/**
 * Adds a product to the cart. If it's already there, increases its quantity by 1
 * Shows a toast message confirming the action
 *
 * @param product - The product to add
 */
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

/**
 * Removes a product from the cart completely, regardless of its quantity
 * Shows a toast message confirming the removal
 *
 * @param productId - The id of the product to remove
 */
  function removeFromCart(productId: string) {
    const removed = items.find((item) => item.product.id === productId)
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
    if (removed) {
      setToastMessage(`${removed.product.title} removed from cart`)
    }
  }

/**
 * Sets the quantity of a product already in the cart
 *
 * @param productId - The id of the product to update
 * @param quantity - The new quantity
 */
  function updateQuantity(productId: string, quantity: number) {
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    )
  }

/** Empties the cart entirely. Used after a successful checkout. */
  const clearCart = useCallback(() => {
    setItems([])
  }, [])

/** Hides the current toast message. */
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
