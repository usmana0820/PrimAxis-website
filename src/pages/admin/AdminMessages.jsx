import { useEffect, useMemo, useState } from 'react'
import {
  archiveInquiry,
  markInquiryRead,
  subscribeInquiries,
} from '../../services/inquiries'

function formatWhen(timestamp) {
  if (!timestamp) return 'Just now'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function AdminMessages() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    const unsubscribe = subscribeInquiries(
      (items) => {
        setInquiries(items)
        setLoading(false)
        setError('')
      },
      (err) => {
        setError(err.message || 'Could not load messages.')
        setLoading(false)
      }
    )
    return unsubscribe
  }, [])

  const selected = useMemo(
    () => inquiries.find((item) => item.id === selectedId) || null,
    [inquiries, selectedId]
  )

  const newCount = inquiries.filter((item) => item.status === 'new').length

  const handleSelect = async (item) => {
    setSelectedId(item.id)
    if (item.status === 'new') {
      setUpdatingId(item.id)
      try {
        await markInquiryRead(item.id)
      } catch (err) {
        setError(err.message || 'Could not update message status.')
      } finally {
        setUpdatingId(null)
      }
    }
  }

  const handleArchive = async (id) => {
    setUpdatingId(id)
    try {
      await archiveInquiry(id)
      if (selectedId === id) setSelectedId(null)
    } catch (err) {
      setError(err.message || 'Could not archive message.')
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
            {newCount > 0 && (
              <span className="admin-messages-live-badge">{newCount} new</span>
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
            {inquiries.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`admin-message-item${selectedId === item.id ? ' active' : ''}${item.status === 'new' ? ' is-new' : ''}`}
                onClick={() => handleSelect(item)}
              >
                <div className="admin-message-item-head">
                  <strong>{item.name}</strong>
                  <span>{formatWhen(item.createdAt)}</span>
                </div>
                <p className="admin-message-item-email">{item.email}</p>
                <p className="admin-message-item-preview">{item.message}</p>
                <span className={`admin-status-pill admin-status-${item.status}`}>{item.status}</span>
              </button>
            ))}
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
                    <a href={`mailto:${selected.email}`} className="admin-btn admin-btn-outline">
                      Reply
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
                  <div>
                    <dt>Received</dt>
                    <dd>{formatWhen(selected.createdAt)}</dd>
                  </div>
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
