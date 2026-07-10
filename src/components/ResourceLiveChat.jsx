import { getWhatsAppUrl } from '../constants/contact'

export default function ResourceLiveChat({ variant = 'default' }) {
  return (
    <aside className={`resource-live-chat resource-live-chat-${variant}`}>
      <div className="resource-live-chat-glow" aria-hidden="true" />
      <div className="resource-live-chat-inner">
        <div className="resource-live-chat-icon" aria-hidden="true">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="resource-live-chat-pulse" />
        </div>
        <div className="resource-live-chat-copy">
          <p className="resource-live-chat-label">Live Chat</p>
          <h3 className="resource-live-chat-title">Questions? Talk to our team in real time</h3>
          <p className="resource-live-chat-desc">
            Get instant answers about Zoho, web projects, mobile apps, or AI solutions via WhatsApp.
          </p>
        </div>
        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="resource-live-chat-btn">
          Start Live Chat
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </aside>
  )
}
