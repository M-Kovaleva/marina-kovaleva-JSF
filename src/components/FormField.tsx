import type { ChangeEvent } from 'react'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'textarea'
  value: string
  error?: string
  rows?: number
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function FormField({ label, name, type = 'text', value, error, rows = 5, onChange }: FormFieldProps) {
  const controlClass = `form-control border-accent ${error ? 'is-invalid' : ''}`.trim()
  const errorId = `${name}Error`

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          className={controlClass}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={errorId}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className={controlClass}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={errorId}
        />
      )}

      {error && (
        <div id={errorId} className="invalid-feedback" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}

export default FormField