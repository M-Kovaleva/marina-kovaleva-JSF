import { useState } from 'react'
import type { Product } from '../types/product'
import { getProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import useFetch from '../hooks/useFetch'

function HomePage() {
  const [search, setSearch] = useState('')
  const { data: products, loading, error } = useFetch<Product[]>(() => getProducts(), [])

  const filteredProducts = (products ?? []).filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <Loader message="Loading products..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <h1 className="h2 mb-0">Catalog</h1>
        <div className="position-relative">
          <input
            type="text"
            className="form-control border-accent"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="btn-close-custom position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          {filteredProducts.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage