interface ErrorMessageProps {
  message: string
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="container py-5">
      <div className="alert alert-danger" role="alert">
        Error: {message}
      </div>
    </div>
  )
}

export default ErrorMessage