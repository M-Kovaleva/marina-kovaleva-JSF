import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white py-4">
      <div className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-md-between gap-4 gap-md-3 text-center text-md-start">
        <span className="order-3 order-md-1">
          Modo &copy; {year}
        </span>

        <nav className="order-1 order-md-2">
          <ul className="nav flex-column flex-md-row gap-2 gap-md-4">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white p-0">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-white p-0">
                Contact us
              </Link>
            </li>
          </ul>
        </nav>

        <div className="d-flex gap-3 order-2 order-md-3">
          <a href="https://www.facebook.com/" className="text-white" aria-label="Facebook">
            <i className="bi bi-facebook fs-5"></i>
          </a>
          <a href="https://www.instagram.com/" className="text-white" aria-label="Instagram">
            <i className="bi bi-instagram fs-5"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer