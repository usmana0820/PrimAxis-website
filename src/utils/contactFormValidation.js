const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_PATTERN = /^[\p{L}\p{M}\s'.-]+$/u
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/

export const CONTACT_LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  phone: { max: 20 },
  company: { max: 120 },
  message: { min: 10, max: 5000 },
}

function digitsOnly(value) {
  return String(value || '').replace(/\D/g, '')
}

export function validateContactForm(form) {
  const errors = {}
  const name = String(form.name || '').trim()
  const email = String(form.email || '').trim()
  const phone = String(form.phone || '').trim()
  const company = String(form.company || '').trim()
  const message = String(form.message || '').trim()

  if (!name) {
    errors.name = 'Please enter your full name.'
  } else if (name.length < CONTACT_LIMITS.name.min) {
    errors.name = `Name must be at least ${CONTACT_LIMITS.name.min} characters.`
  } else if (name.length > CONTACT_LIMITS.name.max) {
    errors.name = `Name must be ${CONTACT_LIMITS.name.max} characters or less.`
  } else if (!NAME_PATTERN.test(name)) {
    errors.name = 'Name can only include letters, spaces, hyphens, and apostrophes.'
  }

  if (!email) {
    errors.email = 'Please enter your email address.'
  } else if (email.length > CONTACT_LIMITS.email.max) {
    errors.email = `Email must be ${CONTACT_LIMITS.email.max} characters or less.`
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (phone) {
    if (phone.length > CONTACT_LIMITS.phone.max) {
      errors.phone = `Phone must be ${CONTACT_LIMITS.phone.max} characters or less.`
    } else if (!PHONE_PATTERN.test(phone)) {
      errors.phone = 'Please enter a valid phone number.'
    } else if (digitsOnly(phone).length < 7) {
      errors.phone = 'Phone number must include at least 7 digits.'
    }
  }

  if (company && company.length > CONTACT_LIMITS.company.max) {
    errors.company = `Company name must be ${CONTACT_LIMITS.company.max} characters or less.`
  }

  if (!message) {
    errors.message = 'Please enter a message about your project.'
  } else if (message.length < CONTACT_LIMITS.message.min) {
    errors.message = `Message must be at least ${CONTACT_LIMITS.message.min} characters.`
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = `Message must be ${CONTACT_LIMITS.message.max} characters or less.`
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    values: { ...form, name, email, phone, company, message },
  }
}
