import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import StarRating from './StarRating'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountedPrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0

  return (
    <Link to={`/product/${product.id}`} className="text-decoration-none">
      <div className="product-card h-100 bg-body rounded-4 p-3">
        <div className="position-relative">
          <img
            src={product.image.url}
            alt={product.image.alt}
            className="product-card-image w-100 d-block rounded-4"
          />
          {hasDiscount && (
            <span className="badge rounded-pill discount-badge fw-bold position-absolute top-0 end-0 m-2">
              -{discountPercent}%
            </span>
          )}
          <span className="product-card-details-overlay position-absolute bottom-0 end-0 m-2 px-3 py-1 rounded-pill bg-dark bg-opacity-75 text-white small">
            View details for {product.title}
          </span>
        </div>
        <div className="text-center pt-3">
          <h3 className="h5 mb-2">{product.title}</h3>
          <StarRating rating={product.rating} className="mb-2" />
          <div className="d-flex gap-2 justify-content-center fw-bold">
            {hasDiscount && (
              <span className="text-decoration-line-through text-body-secondary">
                ${product.price.toFixed(2)}
              </span>
            )}
            <span className="text-body">${product.discountedPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard