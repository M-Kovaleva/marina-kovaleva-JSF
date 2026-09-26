import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import StarRating from './StarRating'
import PriceTag from './PriceTag'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountedPrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0

  return (
    <Link to={`/product/${product.id}`} className="text-decoration-none text-body">
      <div className="product-card h-100 bg-body rounded-4 p-3">
        <div className="position-relative">
          <div className="ratio ratio-1x1 rounded-4 overflow-hidden">
            <img
              src={product.image.url}
              alt={product.image.alt}
              className="object-fit-cover"
            />
          </div>
          {hasDiscount && (
            <span className="badge rounded-pill badge-accent fw-bold position-absolute top-0 end-0 m-2">
              -{discountPercent}%
            </span>
          )}
          <span className="product-card-details-overlay position-absolute bottom-0 end-0 m-2 px-3 py-1 rounded-pill bg-dark bg-opacity-75 text-white small">
            View details for {product.title}
          </span>
        </div>
        <div className="text-center pt-3">
          <h3 className="h5 mb-2 fw-semibold">{product.title}</h3>
          <StarRating rating={product.rating} className="mb-2" />
          <PriceTag product={product} size="sm" />
        </div>
      </div>
    </Link>
  )
}

export default ProductCard