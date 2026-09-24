import { useState, useEffect } from 'react'
import type { Product } from '../types/product'
import { getProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'

const PRODUCTS_PER_PAGE = 6

function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

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

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  if (loading) return <p className="p-4">Loading products...</p>
  if (error) return <p className="p-4 text-danger">Error: {error}</p>

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <h1 className="mb-0">Catalog</h1>
        <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary text-nowrap">
            Search
          </button>
        </form>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {paginatedProducts.map((product) => (
              <div className="col" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Catalog pagination" className="mt-5">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => setCurrentPage((page) => page - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    &laquo;
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => setCurrentPage((page) => page + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  )
}

export default HomePage