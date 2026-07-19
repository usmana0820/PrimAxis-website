import { formatInquiryDateTime } from './inquiryDates'

/**
 * Opens Gmail compose with recipient, subject, and quoted inquiry pre-filled.
 * @see https://mail.google.com/mail/?view=cm
 */
export function buildGmailReplyUrl(inquiry) {
  const name = inquiry.name || 'there'
  const subject = `Re: Your inquiry — ${name}`

  const metaLines = [
    `From: ${inquiry.name || 'Unknown'}`,
    `Email: ${inquiry.email || ''}`,
    `Received: ${formatInquiryDateTime(inquiry.createdAt)}`,
  ]

  if (inquiry.phone) metaLines.push(`Phone: ${inquiry.phone}`)
  if (inquiry.company) metaLines.push(`Company: ${inquiry.company}`)
  if (inquiry.service) metaLines.push(`Service: ${inquiry.service}`)
  if (inquiry.budget) metaLines.push(`Budget: ${inquiry.budget}`)

  const body = [
    `Hi ${name},`,
    '',
    'Thank you for contacting PrimeAxis Technologies.',
    '',
    '',
    '--- Original message ---',
    ...metaLines,
    '',
    inquiry.message || '',
  ].join('\n')

  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: inquiry.email || '',
    su: subject,
    body,
  })

  return `https://mail.google.com/mail/?${params.toString()}`
}
