import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { ChangeEvent, SyntheticEvent } from 'react'
import FormField from '../components/FormField'
import CtaButton from '../components/CtaButton'

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

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
    <div className="container py-4" style={{ maxWidth: '600px' }}>
      <Link to="/" className="d-inline-block mb-4 text-body">Catalog</Link>
      <h1 className="h2 mb-4">Contact us</h1>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <form noValidate onSubmit={handleSubmit}>
        <FormField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          error={errors.fullName}
          onChange={handleChange}
        />

        <FormField
          label="Subject"
          name="subject"
          value={formData.subject}
          error={errors.subject}
          onChange={handleChange}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          error={errors.email}
          onChange={handleChange}
        />

        <FormField
          label="Message"
          name="message"
          type="textarea"
          value={formData.message}
          error={errors.message}
          onChange={handleChange}
        />

        <CtaButton type="submit" fullWidth>
          Send Message
        </CtaButton>
      </form>
    </div>
  )
}

export default ContactPage