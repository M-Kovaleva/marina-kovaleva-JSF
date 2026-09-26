import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { getProductById } from '../services/productService'
import { useCart } from '../context/CartContext'
import StarRating from '../components/StarRating'
import PriceTag from '../components/PriceTag'

function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function loadProduct() {
      try {
        setLoading(true)
        setError(null)
        const data = await getProductById(id!)
        setProduct(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) return <p className="p-4">Loading product...</p>
  if (error) return <p className="p-4 text-danger">Error: {error}</p>
  if (!product) return null

  return (
    <div className="container py-4">
      <Link to="/" className="d-inline-block mb-4 text-body">Catalog</Link>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <img
            src={product.image.url}
            alt={product.image.alt}
            className="w-100 rounded-4 object-fit-cover"
            style={{ maxHeight: 480 }}
          />
        </div>
        <div className="col-12 col-md-6">
          <h1 className="h2 mb-3">{product.title}</h1>

          {product.tags.length > 0 && (
            <div className="mb-3">
              <span className="product-tags d-inline-block rounded-2 px-2 py-1">
                {product.tags.join(',')}
              </span>
            </div>
          )}

          <StarRating rating={product.rating} showCount={product.reviews.length > 0} className="mb-3"/>

          <div className="mb-4">
            <PriceTag product={product} size="lg" align="start" />
          </div>

          <p className="mb-4">{product.description}</p>

          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
          <div className="mt-3">
            <Link to="/cart" className="text-body">
               Go to cart
            </Link>
          </div>
        </div>
      </div>

      {product.reviews.length > 0 && (
        <div className="mt-5">
          <h2 className="h3 mb-4">Customer Reviews</h2>
          {product.reviews.map((review) => (
            <div key={review.id} className="mb-4">
              <p className="mb-2">{review.username}</p>
              <StarRating rating={review.rating} className="mb-2" />
              <p className="mb-0">{review.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductPage