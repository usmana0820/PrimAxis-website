import { CONTACT_EMAIL } from '../constants/contact'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() || ''

export const emailNotificationsReady = Boolean(ACCESS_KEY)

export async function sendContactEmail(data) {
  if (!ACCESS_KEY) {
    throw new Error('Email notifications are not configured.')
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject: `New inquiry from ${data.name}`,
      from_name: data.name,
      email: data.email,
      phone: data.phone || 'Not provided',
      company: data.company || 'Not provided',
      service: data.service || 'Not specified',
      budget: data.budget || 'Not specified',
      message: data.message,
      replyto: data.email,
      to: CONTACT_EMAIL,
    }),
  })

  const result = await response.json()
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Could not send email notification.')
  }

  return true
}
