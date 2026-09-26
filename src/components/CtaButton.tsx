import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

interface CtaButtonProps {
  children: ReactNode
  to?: string
  fullWidth?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: () => void
}

function CtaButton({ children, to, fullWidth = false, type = 'button', onClick }: CtaButtonProps) {
  const className = `btn btn-primary btn-lg ${fullWidth ? 'w-100' : ''}`.trim()

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default CtaButton
