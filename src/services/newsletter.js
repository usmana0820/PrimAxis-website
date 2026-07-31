import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

const COLLECTION = 'newsletter_subscribers'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const NEWSLETTER_SUBSCRIBER_PURPOSE = {
  title: 'Newsletter subscriber',
  summary:
    'This person subscribed through the website footer to receive PrimeAxis updates, case studies, and digital transformation tips.',
  contactTips: [
    'Share product updates, new services, or published case studies.',
    'Invite them to consultations, webinars, or relevant offers.',
    'Keep outreach helpful and insight-led — they opted in for value, not spam.',
  ],
}

export const SUBSCRIBER_STATUS_LABELS = {
  active: 'New subscriber',
  contacted: 'Contacted',
  archived: 'Archived',
}

function subscribersRef() {
  if (!db) throw new Error('Firestore is not configured')
  return collection(db, COLLECTION)
}

export function validateNewsletterEmail(email) {
  const normalized = String(email || '').trim().toLowerCase()

  if (!normalized) {
    return { valid: false, error: 'Please enter your email address.' }
  }

  if (normalized.length > 254) {
    return { valid: false, error: 'Email must be 254 characters or less.' }
  }

  if (!EMAIL_PATTERN.test(normalized)) {
    return { valid: false, error: 'Please enter a valid email address.' }
  }

  return { valid: true, value: normalized }
}

export async function submitNewsletterSubscription(email) {
  const validation = validateNewsletterEmail(email)
  if (!validation.valid) {
    throw new Error(validation.error)
  }

  const ref = await addDoc(subscribersRef(), {
    email: validation.value,
    source: 'footer',
    status: 'active',
    createdAt: serverTimestamp(),
  })

  return ref.id
}

export function subscribeNewsletterSubscribers(onData, onError) {
  if (!db) {
    onError?.(new Error('Firestore is not configured'))
    return () => {}
  }

  const q = query(subscribersRef(), orderBy('createdAt', 'desc'))

  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    },
    (err) => onError?.(err),
  )
}

export async function markSubscriberContacted(id) {
  await updateDoc(doc(db, COLLECTION, id), {
    status: 'contacted',
    contactedAt: serverTimestamp(),
  })
}

export async function archiveSubscriber(id) {
  await updateDoc(doc(db, COLLECTION, id), {
    status: 'archived',
    archivedAt: serverTimestamp(),
  })
}

export function getSubscriberStatusLabel(status) {
  return SUBSCRIBER_STATUS_LABELS[status] || status
}

export function isSubscriberPending(item) {
  return item?.status === 'active'
}

export function getSubscriberStatusClass(status) {
  if (status === 'active') return 'new'
  if (status === 'contacted') return 'read'
  return status
}
