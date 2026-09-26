import { useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import CtaButton from '../components/CtaButton'

function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="container py-5 text-center">
      <i className="bi bi-check-circle text-success" style={{ fontSize: '3rem' }}></i>
      <h1 className="h2 mt-3 mb-3">Your order is on the way!</h1>
      <p className="mb-4">
        Your order has been placed successfully. A confirmation has been sent to you.
      </p>
      <CtaButton to="/">
        Back to shopping
      </CtaButton>
    </div>
  )
}

export default SuccessPage