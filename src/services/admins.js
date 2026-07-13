import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

function adminRef(uid) {
  return doc(db, 'admins', uid)
}

export async function fetchAdminProfile(uid) {
  if (!db) return null
  const snap = await getDoc(adminRef(uid))
  if (!snap.exists()) return null
  return { uid, ...snap.data() }
}

export async function createPendingAdminProfile(uid, email, name = '') {
  if (!db) throw new Error('Firestore is not configured')
  await setDoc(adminRef(uid), {
    email,
    name: name || email.split('@')[0],
    role: 'pending',
    active: false,
    createdAt: serverTimestamp(),
  })
  return fetchAdminProfile(uid)
}

export async function isAllowedAdmin(uid) {
  const profile = await fetchAdminProfile(uid)
  return Boolean(profile?.active === true)
}
