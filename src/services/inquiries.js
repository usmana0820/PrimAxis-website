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

const COLLECTION = 'inquiries'

function inquiriesRef() {
  if (!db) throw new Error('Firestore is not configured')
  return collection(db, COLLECTION)
}

export async function submitInquiry(data) {
  const payload = {
    name: String(data.name || '').trim(),
    email: String(data.email || '').trim().toLowerCase(),
    phone: String(data.phone || '').trim(),
    company: String(data.company || '').trim(),
    service: String(data.service || '').trim(),
    budget: String(data.budget || '').trim(),
    message: String(data.message || '').trim(),
    status: 'new',
    source: 'website',
    createdAt: serverTimestamp(),
  }

  if (!payload.name || !payload.email || !payload.message) {
    throw new Error('Name, email, and message are required.')
  }

  const ref = await addDoc(inquiriesRef(), payload)
  return ref.id
}

export function subscribeInquiries(onData, onError) {
  if (!db) {
    onError?.(new Error('Firestore is not configured'))
    return () => {}
  }

  const q = query(inquiriesRef(), orderBy('createdAt', 'desc'))

  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    },
    (err) => onError?.(err)
  )
}

export async function updateInquiryStatus(id, status) {
  await updateDoc(doc(db, COLLECTION, id), { status })
}

export async function markInquiryRead(id) {
  return updateInquiryStatus(id, 'read')
}

export async function archiveInquiry(id) {
  return updateInquiryStatus(id, 'archived')
}
