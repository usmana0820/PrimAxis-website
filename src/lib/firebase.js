import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

function missingKeys() {
  return Object.entries(firebaseConfig)
    .filter(([key, value]) => !['measurementId', 'databaseURL'].includes(key) && !value)
    .map(([key]) => key)
}

export const firebaseReady = missingKeys().length === 0

export const app = firebaseReady ? initializeApp(firebaseConfig) : null
export const auth = firebaseReady ? getAuth(app) : null
export const db = firebaseReady ? getFirestore(app) : null

/** Lazy-load Analytics in the browser (optional). */
export async function initFirebaseAnalytics() {
  if (!app || !firebaseConfig.measurementId || typeof window === 'undefined') return null
  const { getAnalytics, isSupported } = await import('firebase/analytics')
  if (!(await isSupported())) return null
  return getAnalytics(app)
}
