import { useEffect, useRef } from 'react'
import { Toast } from 'bootstrap'
import { useCart } from '../context/CartContext'

function CartToast() {
  const { toastMessage, clearToast } = useCart()
  const toastRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (toastMessage && toastRef.current) {
      const toast = Toast.getOrCreateInstance(toastRef.current)
      toast.show()
    }
  }, [toastMessage])

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }}>
      <div
        ref={toastRef}
        className="toast align-items-center border-0"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        onTransitionEnd={() => {
          if (toastRef.current && !toastRef.current.classList.contains('show')) {
            clearToast()
          }
        }}
      >
        <div className="d-flex">
          <div className="toast-body">{toastMessage}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  )
}

export default CartToast