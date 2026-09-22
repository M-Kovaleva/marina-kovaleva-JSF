import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white py-4">
      <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
        <span>Modo &copy; {year}</span>

        <nav>
          <ul className="nav gap-3">
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

        <div className="d-flex gap-3">
          {/* TODO: change to links*/}
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