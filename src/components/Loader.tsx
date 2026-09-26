interface LoaderProps {
  message?: string
}

function Loader({ message = 'Loading...' }: LoaderProps) {
  return (
    <div className="d-flex flex-column align-items-center py-5">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="mt-3 mb-0">{message}</p>
    </div>
  )
}

export default Loader
