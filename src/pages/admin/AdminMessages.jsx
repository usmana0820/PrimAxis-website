import { useMemo, useState } from 'react'
import {
  archiveInquiry,
  markInquiryRead,
} from '../../services/inquiries'
import { useInquiries } from '../../context/InquiriesContext'
import {
  formatInquiryDateParts,
  formatInquiryDateTime,
  getInquiryStatusLabel,
  isInquiryUnread,
} from '../../utils/inquiryDates'
import { buildGmailReplyUrl } from '../../utils/gmailReply'

export default function AdminMessages() {
  const { inquiries, loading, error: loadError, unreadCount } = useInquiries()
  const [selectedId, setSelectedId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)
  const [actionError, setActionError] = useState('')

  const selected = useMemo(
    () => inquiries.find((item) => item.id === selectedId) || null,
    [inquiries, selectedId]
  )

  const error = actionError || loadError

  const handleSelect = async (item) => {
    setSelectedId(item.id)
    setActionError('')
    if (isInquiryUnread(item)) {
      setUpdatingId(item.id)
      try {
        await markInquiryRead(item.id)
      } catch (err) {
        setActionError(err.message || 'Could not update message status.')
      } finally {
        setUpdatingId(null)
      }
    }
  }

  const handleArchive = async (id) => {
    setUpdatingId(id)
    setActionError('')
    try {
      await archiveInquiry(id)
      if (selectedId === id) setSelectedId(null)
    } catch (err) {
      setActionError(err.message || 'Could not archive message.')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="admin-page admin-page-wide">
      <header className="admin-page-hero">
        <div>
          <h1>Contact Messages</h1>
          <p>
            Real-time inquiries from the website contact form
            {unreadCount > 0 && (
              <span className="admin-messages-live-badge">{unreadCount} unread</span>
            )}
          </p>
        </div>
      </header>

      {error && <p className="admin-form-error">{error}</p>}

      {loading ? (
        <p>Loading messages…</p>
      ) : inquiries.length === 0 ? (
        <div className="admin-panel admin-empty">
          <p>No contact messages yet. Submissions from the website form will appear here instantly.</p>
        </div>
      ) : (
        <div className="admin-messages-layout">
          <div className="admin-messages-list admin-panel">
            {inquiries.map((item) => {
              const received = formatInquiryDateParts(item.createdAt)
              const unread = isInquiryUnread(item)

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`admin-message-item${selectedId === item.id ? ' active' : ''}${unread ? ' is-unread' : ''}`}
                  onClick={() => handleSelect(item)}
                >
                  <div className="admin-message-item-head">
                    <div className="admin-message-item-title">
                      {unread && <span className="admin-message-unread-dot" aria-hidden="true" />}
                      <strong>{item.name}</strong>
                    </div>
                    <span className={`admin-status-pill admin-status-${item.status}`}>
                      {getInquiryStatusLabel(item.status)}
                    </span>
                  </div>

                  <p className="admin-message-item-email">{item.email}</p>
                  <p className="admin-message-item-preview">{item.message}</p>

                  <div className="admin-message-item-datetime">
                    <span>{received.date}</span>
                    <span className="admin-message-item-datetime-sep" aria-hidden="true">·</span>
                    <span>{received.time}</span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="admin-message-detail admin-panel">
            {selected ? (
              <>
                <div className="admin-message-detail-head">
                  <div>
                    <h2>{selected.name}</h2>
                    <p>{selected.email}</p>
                  </div>
                  <div className="admin-message-detail-actions">
                    <a
                      href={buildGmailReplyUrl(selected)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-btn admin-btn-primary admin-btn-gmail"
                    >
                      Reply in Gmail
                    </a>
                    <a href={`mailto:${selected.email}`} className="admin-btn admin-btn-outline">
                      Email app
                    </a>
                    {selected.status !== 'archived' && (
                      <button
                        type="button"
                        className="admin-btn admin-btn-outline"
                        disabled={updatingId === selected.id}
                        onClick={() => handleArchive(selected.id)}
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </div>

                <dl className="admin-message-meta">
                  <div>
                    <dt>Status</dt>
                    <dd>
                      <span className={`admin-status-pill admin-status-${selected.status}`}>
                        {getInquiryStatusLabel(selected.status)}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt>Received</dt>
                    <dd>{formatInquiryDateTime(selected.createdAt)}</dd>
                  </div>
                  {selected.readAt && (
                    <div>
                      <dt>Read at</dt>
                      <dd>{formatInquiryDateTime(selected.readAt)}</dd>
                    </div>
                  )}
                  {selected.archivedAt && (
                    <div>
                      <dt>Archived at</dt>
                      <dd>{formatInquiryDateTime(selected.archivedAt)}</dd>
                    </div>
                  )}
                  {selected.phone && (
                    <div>
                      <dt>Phone</dt>
                      <dd>{selected.phone}</dd>
                    </div>
                  )}
                  {selected.company && (
                    <div>
                      <dt>Company</dt>
                      <dd>{selected.company}</dd>
                    </div>
                  )}
                  {selected.service && (
                    <div>
                      <dt>Service</dt>
                      <dd>{selected.service}</dd>
                    </div>
                  )}
                  {selected.budget && (
                    <div>
                      <dt>Budget</dt>
                      <dd>{selected.budget}</dd>
                    </div>
                  )}
                </dl>

                <div className="admin-message-body">
                  <h3>Message</h3>
                  <p>{selected.message}</p>
                </div>
              </>
            ) : (
              <div className="admin-empty">
                <p>Select a message to view details.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
