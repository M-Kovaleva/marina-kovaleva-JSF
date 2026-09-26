import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Offcanvas } from 'bootstrap'
import logo from '../assets/logo-gold.png'
import logoBlack from '../assets/logo-black.png'
import { useCart } from '../hooks/useCart'

function closeMobileMenu() {
  const el = document.getElementById('mobileMenu')
  if (el) {
    Offcanvas.getOrCreateInstance(el).hide()
  }
}

function NavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <li className="nav-item">
        <Link to="/" className="nav-link" onClick={onLinkClick}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/contact" className="nav-link" onClick={onLinkClick}>
          Contact us
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/cart" className="nav-link" onClick={onLinkClick}>
          <span className="position-relative d-inline-block">
            <i className="bi bi-cart nav-icon fs-5"></i>
            {itemCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-accent">
                {itemCount}
              </span>
            )}
          </span>
        </Link>
      </li>
    </>
  )
}

function Navbar() {
  useEffect(() => {
    const el = document.getElementById('mobileMenu')
    if (!el) return

    function handleHidden() {
      document.querySelectorAll('.offcanvas-backdrop').forEach((backdrop) => backdrop.remove())
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('padding-right')
    }

    el.addEventListener('hidden.bs.offcanvas', handleHidden)
    return () => el.removeEventListener('hidden.bs.offcanvas', handleHidden)
  }, [])

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: 'var(--bs-body-color)' }}
      >
        <div className="container-fluid py-0">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="MODO" />
          </Link>

          <button
            className="navbar-toggler border-0 p-0 shadow-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list nav-icon fs-5"></i>
          </button>

          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-4 d-none d-lg-flex">
            <NavLinks />
          </ul>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header px-4">
          <Link to="/" className="navbar-brand" id="mobileMenuLabel" onClick={closeMobileMenu}>
            <img src={logoBlack} alt="MODO" />
          </Link>
          <button
            type="button"
            className="btn-close-custom ms-auto"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i className="bi bi-x-lg nav-icon fs-5"></i>
          </button>
        </div>
        <div className="offcanvas-body px-4">
          <ul className="navbar-nav gap-3">
            <NavLinks onLinkClick={closeMobileMenu} />
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Navbar
