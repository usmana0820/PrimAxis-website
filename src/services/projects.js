import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../lib/firebase'

const COLLECTION = 'projects'

function projectsRef() {
  if (!db) throw new Error('Firestore is not configured')
  return collection(db, COLLECTION)
}

export async function fetchPublishedProjects() {
  try {
    const q = query(
      projectsRef(),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    )
    const snap = await getDocs(q)
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  } catch {
    const q = query(projectsRef(), where('status', '==', 'published'))
    const snap = await getDocs(q)
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => {
        const aTime = a.publishedAt?.toMillis?.() || a.updatedAt?.toMillis?.() || 0
        const bTime = b.publishedAt?.toMillis?.() || b.updatedAt?.toMillis?.() || 0
        return bTime - aTime
      })
  }
}

export async function fetchAllProjects() {
  const q = query(projectsRef(), orderBy('updatedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function fetchProjectById(id) {
  const ref = doc(db, COLLECTION, id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export async function fetchPublishedProjectBySlug(slug) {
  const q = query(
    projectsRef(),
    where('slug', '==', slug),
    where('status', '==', 'published')
  )
  const snap = await getDocs(q)
  if (snap.empty) return null
  const docSnap = snap.docs[0]
  return { id: docSnap.id, ...docSnap.data() }
}

export async function createProject(data, userId) {
  const payload = {
    ...data,
    createdBy: userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    publishedAt: data.status === 'published' ? serverTimestamp() : null,
  }
  const ref = await addDoc(projectsRef(), payload)
  return ref.id
}

export async function updateProject(id, data) {
  const ref = doc(db, COLLECTION, id)
  const payload = {
    ...data,
    updatedAt: serverTimestamp(),
  }
  if (data.status === 'published') {
    payload.publishedAt = serverTimestamp()
  }
  await updateDoc(ref, payload)
}

export async function deleteProject(id) {
  await deleteDoc(doc(db, COLLECTION, id))
}

export async function fetchProjectStats() {
  const all = await fetchAllProjects()
  return {
    total: all.length,
    published: all.filter((p) => p.status === 'published').length,
    draft: all.filter((p) => p.status === 'draft').length,
  }
}
