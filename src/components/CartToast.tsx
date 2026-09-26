import { useEffect, useRef } from 'react'
import { Toast } from 'bootstrap'
import { useCart } from '../hooks/useCart'

function CartToast() {
  const { toastMessage, clearToast } = useCart()
  const toastRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (toastMessage && toastRef.current) {
      const toast = Toast.getOrCreateInstance(toastRef.current, {
        autohide: true,
        delay: 2000,
      })
      toast.show()
    }
  }, [toastMessage])

  return (
    <div className="toast-container position-fixed end-0 p-3" style={{ zIndex: 1080, top: '40px' }}>
      <div
        ref={toastRef}
        className="toast align-items-center border-0 "
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
        </div>
      </div>
    </div>
  )
}

export default CartToast
