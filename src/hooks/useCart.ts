import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

/**
 * Gives access to the shopping cart state and actions
 * Must be used inside a component wrapped by `CartProvider`
 *
 * @throws If called outside of `CartProvider`
 */
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
