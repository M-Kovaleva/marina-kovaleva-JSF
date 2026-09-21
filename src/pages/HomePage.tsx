import { useState, useEffect } from 'react'
import type { Product } from '../types/product'
import { getProducts } from '../services/productService'

function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        setError(null)
        const data = await getProducts()
        setProducts(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (loading) return <p className="p-4">Loading products...</p>
  if (error) return <p className="p-4 text-danger">Error: {error}</p>

  return <div className="p-4">Home page — products loaded: {products.length}</div>
}

export default HomePage