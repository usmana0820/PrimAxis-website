import { useMemo, useState } from 'react'
import {
  archiveSubscriber,
  getSubscriberStatusLabel,
  getSubscriberStatusClass,
  isSubscriberPending,
  markSubscriberContacted,
  NEWSLETTER_SUBSCRIBER_PURPOSE,
} from '../../services/newsletter'
import { useSubscribers } from '../../context/SubscribersContext'
import {
  formatInquiryDateParts,
  formatInquiryDateTime,
} from '../../utils/inquiryDates'
import { buildNewsletterGmailUrl } from '../../utils/newsletterContact'

export default function AdminSubscribers() {
  const { activeSubscribers, loading, error: loadError, pendingCount } = useSubscribers()
  const [selectedId, setSelectedId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)
  const [actionError, setActionError] = useState('')
  const [copied, setCopied] = useState(false)

  const selected = useMemo(
    () => activeSubscribers.find((item) => item.id === selectedId) || null,
    [activeSubscribers, selectedId],
  )

  const error = actionError || loadError

  const handleSelect = (item) => {
    setSelectedId(item.id)
    setActionError('')
    setCopied(false)
  }

  const handleMarkContacted = async (id) => {
    setUpdatingId(id)
    setActionError('')
    try {
      await markSubscriberContacted(id)
    } catch (err) {
      setActionError(err.message || 'Could not update subscriber status.')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleArchive = async (id) => {
    setUpdatingId(id)
    setActionError('')
    try {
      await archiveSubscriber(id)
      if (selectedId === id) setSelectedId(null)
    } catch (err) {
      setActionError(err.message || 'Could not archive subscriber.')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleCopyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      setActionError('Could not copy email to clipboard.')
    }
  }

  return (
    <div className="admin-page admin-page-wide">
      <header className="admin-page-hero">
        <div>
          <h1>Newsletter Subscribers</h1>
          <p>
            Footer newsletter sign-ups you can contact for updates and outreach
            {pendingCount > 0 && (
              <span className="admin-messages-live-badge">{pendingCount} new</span>
            )}
          </p>
        </div>
      </header>

      {error && <p className="admin-form-error">{error}</p>}

      {loading ? (
        <p>Loading subscribers…</p>
      ) : activeSubscribers.length === 0 ? (
        <div className="admin-panel admin-empty">
          <p>No newsletter subscribers yet. Emails from the footer form will appear here in real time.</p>
        </div>
      ) : (
        <div className="admin-messages-layout">
          <div className="admin-messages-list admin-panel">
            {activeSubscribers.map((item) => {
              const received = formatInquiryDateParts(item.createdAt)
              const pending = isSubscriberPending(item)

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`admin-message-item${selectedId === item.id ? ' active' : ''}${pending ? ' is-unread' : ''}`}
                  onClick={() => handleSelect(item)}
                >
                  <div className="admin-message-item-head">
                    <div className="admin-message-item-title">
                      {pending && <span className="admin-message-unread-dot" aria-hidden="true" />}
                      <strong>{item.email}</strong>
                    </div>
                    <span className={`admin-status-pill admin-status-${getSubscriberStatusClass(item.status)}`}>
                      {getSubscriberStatusLabel(item.status)}
                    </span>
                  </div>

                  <p className="admin-message-item-preview">
                    {NEWSLETTER_SUBSCRIBER_PURPOSE.title} · {item.source || 'footer'}
                  </p>

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
                    <h2>{selected.email}</h2>
                    <p>{getSubscriberStatusLabel(selected.status)}</p>
                  </div>
                  <div className="admin-message-detail-actions">
                    <a
                      href={buildNewsletterGmailUrl(selected)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-btn admin-btn-primary admin-btn-gmail"
                    >
                      Contact in Gmail
                    </a>
                    <a href={`mailto:${selected.email}`} className="admin-btn admin-btn-outline">
                      Email app
                    </a>
                    <button
                      type="button"
                      className="admin-btn admin-btn-outline"
                      onClick={() => handleCopyEmail(selected.email)}
                    >
                      {copied ? 'Copied' : 'Copy email'}
                    </button>
                    {selected.status === 'active' && (
                      <button
                        type="button"
                        className="admin-btn admin-btn-outline"
                        disabled={updatingId === selected.id}
                        onClick={() => handleMarkContacted(selected.id)}
                      >
                        Mark contacted
                      </button>
                    )}
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

                <div className="admin-subscriber-purpose">
                  <h3>{NEWSLETTER_SUBSCRIBER_PURPOSE.title}</h3>
                  <p>{NEWSLETTER_SUBSCRIBER_PURPOSE.summary}</p>
                  <ul>
                    {NEWSLETTER_SUBSCRIBER_PURPOSE.contactTips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <dl className="admin-message-meta">
                  <div>
                    <dt>Email purpose</dt>
                    <dd>Newsletter · updates, case studies, and digital tips</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>
                      <span className={`admin-status-pill admin-status-${getSubscriberStatusClass(selected.status)}`}>
                        {getSubscriberStatusLabel(selected.status)}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt>Subscribed</dt>
                    <dd>{formatInquiryDateTime(selected.createdAt)}</dd>
                  </div>
                  <div>
                    <dt>Source</dt>
                    <dd>{selected.source || 'footer'}</dd>
                  </div>
                  {selected.contactedAt && (
                    <div>
                      <dt>Contacted at</dt>
                      <dd>{formatInquiryDateTime(selected.contactedAt)}</dd>
                    </div>
                  )}
                </dl>
              </>
            ) : (
              <div className="admin-empty">
                <p>Select a subscriber to view their email purpose and contact options.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
