import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface BackLinkProps {
  to: string
  children: ReactNode
  className?: string
}

function BackLink({ to, children, className = 'd-inline-block mb-4 text-body' }: BackLinkProps) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

export default BackLink