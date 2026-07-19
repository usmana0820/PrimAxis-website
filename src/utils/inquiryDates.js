export const INQUIRY_STATUS_LABELS = {
  new: 'Unread',
  read: 'Read',
  archived: 'Archived',
}

export function inquiryTimestampToDate(timestamp) {
  if (!timestamp) return null
  if (timestamp.toDate) return timestamp.toDate()
  const date = new Date(timestamp)
  return Number.isNaN(date.getTime()) ? null : date
}

/** Full date and time, e.g. "Jul 19, 2026, 6:53 PM" */
export function formatInquiryDateTime(timestamp) {
  const date = inquiryTimestampToDate(timestamp)
  if (!date) return 'Just now'
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

/** Date and time on two lines for list rows */
export function formatInquiryDateParts(timestamp) {
  const date = inquiryTimestampToDate(timestamp)
  if (!date) {
    return { date: 'Today', time: 'Just now' }
  }

  const now = new Date()
  const sameDay =
    date.getFullYear() === now.getFullYear()
    && date.getMonth() === now.getMonth()
    && date.getDate() === now.getDate()

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear()
    && date.getMonth() === yesterday.getMonth()
    && date.getDate() === yesterday.getDate()

  let dateLabel
  if (sameDay) dateLabel = 'Today'
  else if (isYesterday) dateLabel = 'Yesterday'
  else {
    dateLabel = date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const timeLabel = date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })

  return { date: dateLabel, time: timeLabel }
}

export function getInquiryStatusLabel(status) {
  return INQUIRY_STATUS_LABELS[status] || status
}

export function isInquiryUnread(item) {
  return item?.status === 'new'
}
