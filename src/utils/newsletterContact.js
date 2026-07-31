import { formatInquiryDateTime } from './inquiryDates'

export function buildNewsletterGmailUrl(subscriber) {
  const email = subscriber.email || ''
  const subject = 'Thanks for subscribing to PrimeAxis Technologies'
  const body = [
    'Hi,',
    '',
    'Thank you for subscribing to the PrimeAxis newsletter.',
    '',
    'We share product updates, case studies, and practical digital transformation insights — and we\'re glad to have you on the list.',
    '',
    'If you would like to discuss a project or learn more about our services, just reply to this email.',
    '',
    'Best regards,',
    'PrimeAxis Technologies',
    '',
    '---',
    `Subscriber email: ${email}`,
    `Subscribed: ${formatInquiryDateTime(subscriber.createdAt)}`,
    `Source: ${subscriber.source || 'footer'}`,
  ].join('\n')

  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: email,
    su: subject,
    body,
  })

  return `https://mail.google.com/mail/?${params.toString()}`
}
