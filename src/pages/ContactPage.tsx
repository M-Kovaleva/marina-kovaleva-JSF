import { useState } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'

interface ContactFormData {
  fullName: string
  subject: string
  email: string
  message: string
}

interface ContactFormErrors {
  fullName?: string
  subject?: string
  email?: string
  message?: string
}

const initialFormData: ContactFormData = {
  fullName: '',
  subject: '',
  email: '',
  message: '',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function validate(data: ContactFormData): ContactFormErrors {
    const newErrors: ContactFormErrors = {}

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Full name is required.'
    } else if (data.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.'
    }

    if (!data.subject.trim()) {
      newErrors.subject = 'Subject is required.'
    } else if (data.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.'
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!data.message.trim()) {
      newErrors.message = 'Message is required.'
    } else if (data.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.'
    }

    return newErrors
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setSuccessMessage(null)

    const newErrors = validate(formData)
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage('Thank you! Your message has been sent.')
      setFormData(initialFormData)
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: '600px' }}>
      <h1 className="mb-4">Contact Us</h1>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <form noValidate onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={`form-control border-accent ${errors.fullName ? 'is-invalid' : ''}`}
            value={formData.fullName}
            onChange={handleChange}
            aria-invalid={!!errors.fullName}
            aria-describedby="fullNameError"
          />
          {errors.fullName && (
            <div id="fullNameError" className="invalid-feedback" role="alert">
              {errors.fullName}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className={`form-control border-accent ${errors.subject ? 'is-invalid' : ''}`}
            value={formData.subject}
            onChange={handleChange}
            aria-invalid={!!errors.subject}
            aria-describedby="subjectError"
          />
          {errors.subject && (
            <div id="subjectError" className="invalid-feedback" role="alert">
              {errors.subject}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control border-accent ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby="emailError"
          />
          {errors.email && (
            <div id="emailError" className="invalid-feedback" role="alert">
              {errors.email}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={`form-control border-accent ${errors.message ? 'is-invalid' : ''}`}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby="messageError"
          />
          {errors.message && (
            <div id="messageError" className="invalid-feedback" role="alert">
              {errors.message}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-100">
          Send Message
        </button>
      </form>
    </div>
  )
}

export default ContactPage