import type { Product } from '../types/product'

interface PriceTagProps {
  product: Product
  size?: 'sm' | 'lg'
  align?: 'center' | 'start'
}

function PriceTag({ product, size = 'sm', align = 'center' }: PriceTagProps) {
  const hasDiscount = product.discountedPrice < product.price
  const wrapperClass = size === 'lg' ? 'fs-3' : ''
  const oldPriceClass = size === 'lg' ? 'fs-5' : ''
  const justify = align === 'center' ? 'justify-content-center' : ''

  return (
    <div className={`d-flex gap-2 align-items-center fw-bold ${justify} ${wrapperClass}`.trim()}>
      {hasDiscount && (
        <span className={`text-decoration-line-through text-body-secondary ${oldPriceClass}`.trim()}>
          ${product.price.toFixed(2)}
        </span>
      )}
      <span className="text-body">${product.discountedPrice.toFixed(2)}</span>
    </div>
  )
}

export default PriceTag