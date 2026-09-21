import { Link } from 'react-router-dom'
import type { Product } from '../types/product'

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
      <div className="card position-relative h-100">
        {hasDiscount && (
          <span className="discount-badge">-{discountPercent}%</span>
        )}
        <img src={product.image.url} alt={product.image.alt} className="card-image" />
        <div className="card-content">
          <h3 className="card-title h6">{product.title}</h3>
          <div className="product-rating">
            {'★'.repeat(product.rating)}
            {'☆'.repeat(5 - product.rating)}
          </div>
          <div className="card-price">
            {hasDiscount && (
              <span className="old-price">{product.price} kr</span>
            )}
            <span className="new-price">{product.discountedPrice} kr</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard