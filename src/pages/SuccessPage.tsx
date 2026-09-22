import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="container py-5 text-center">
      <i className="bi bi-check-circle text-success" style={{ fontSize: '3rem' }}></i>
      <h1 className="h2 mt-3 mb-3">Your order is on the way!</h1>
      <p className="mb-4">
        Thank you for your purchase. A confirmation and receipt has been sent to your email.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        Back to shopping
      </Link>
    </div>
  )
}

export default SuccessPage