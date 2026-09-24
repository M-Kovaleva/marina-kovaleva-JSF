import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart()

  const total = items.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  )
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1 className="h2 mb-3">Your cart is empty</h1>
        <Link to="/" className="btn btn-primary btn-lg">
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <Link to="/" className="d-inline-block mb-4 text-body">Catalog</Link>
      <h1 className="h2 mb-4">Your cart</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="d-flex flex-wrap align-items-center gap-3 border-bottom border-accent pb-3 mb-3"
            >
              <img
                src={item.product.image.url}
                alt={item.product.image.alt}
                className="rounded-4 object-fit-cover flex-shrink-0"
                style={{ width: 90, height: 90 }}
              />

              <div className="flex-grow-1" style={{ minWidth: 120 }}>
                <h3 className="h4 mb-3">{item.product.title}</h3>
                <div className="text-body-secondary">
                  ${item.product.discountedPrice.toFixed(2)}
                </div>
              </div>

              <div className="d-flex flex-wrap align-items-center gap-3 ms-auto">
                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() =>
                      updateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                    }
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="fw-bold" style={{ minWidth: 80, textAlign: 'right' }}>
                  ${(item.product.discountedPrice * item.quantity).toFixed(2)}
                </div>

                <button
                  type="button"
                  className="btn-close-custom text-danger"
                  onClick={() => removeFromCart(item.product.id)}
                  aria-label={`Remove ${item.product.title} from cart`}
                >
                  <i className="bi bi-trash nav-icon"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-12 col-lg-4">
          <div className="bg-body rounded-4 p-4 border border-accent">
            <div className="mb-3">Items: {itemCount}</div>
            <div className="d-flex justify-content-between fs-4 fw-bold mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/success" className="btn btn-primary w-100 btn-lg">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage