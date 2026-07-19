import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { subscribeInquiries } from '../services/inquiries'

const InquiriesContext = createContext(null)

export function InquiriesProvider({ children }) {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    return subscribeInquiries(
      (items) => {
        setInquiries(items)
        setLoading(false)
        setError('')
      },
      (err) => {
        setError(err.message || 'Could not load contact messages.')
        setLoading(false)
      }
    )
  }, [])

  const newCount = useMemo(
    () => inquiries.filter((item) => item.status === 'new').length,
    [inquiries]
  )

  const unreadCount = newCount

  const recent = useMemo(() => inquiries.slice(0, 5), [inquiries])

  const value = useMemo(
    () => ({ inquiries, loading, error, newCount, unreadCount, recent }),
    [inquiries, loading, error, newCount, unreadCount, recent]
  )

  return <InquiriesContext.Provider value={value}>{children}</InquiriesContext.Provider>
}

export function useInquiries() {
  const ctx = useContext(InquiriesContext)
  if (!ctx) {
    throw new Error('useInquiries must be used within InquiriesProvider')
  }
  return ctx
}
