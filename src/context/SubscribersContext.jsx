import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { subscribeNewsletterSubscribers } from '../services/newsletter'

const SubscribersContext = createContext(null)

export function SubscribersProvider({ children }) {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    return subscribeNewsletterSubscribers(
      (items) => {
        setSubscribers(items)
        setLoading(false)
        setError('')
      },
      (err) => {
        setError(err.message || 'Could not load newsletter subscribers.')
        setLoading(false)
      },
    )
  }, [])

  const pendingCount = useMemo(
    () => subscribers.filter((item) => item.status === 'active').length,
    [subscribers],
  )

  const activeSubscribers = useMemo(
    () => subscribers.filter((item) => item.status !== 'archived'),
    [subscribers],
  )

  const value = useMemo(
    () => ({ subscribers, activeSubscribers, loading, error, pendingCount }),
    [subscribers, activeSubscribers, loading, error, pendingCount],
  )

  return <SubscribersContext.Provider value={value}>{children}</SubscribersContext.Provider>
}

export function useSubscribers() {
  const ctx = useContext(SubscribersContext)
  if (!ctx) {
    throw new Error('useSubscribers must be used within SubscribersProvider')
  }
  return ctx
}
