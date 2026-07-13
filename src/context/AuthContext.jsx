import { createContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { auth, firebaseReady } from '../lib/firebase'
import { createPendingAdminProfile, fetchAdminProfile } from '../services/admins'
import { authLog, authLogError } from '../utils/authLogger'

export const AuthContext = createContext(null)

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

function formatAuthError(err) {
  const code = err?.code || ''

  const messages = {
    'auth/invalid-credential': 'Wrong email or password. Try again or reset your password.',
    'auth/wrong-password': 'Wrong password. Try again or use Forgot password.',
    'auth/user-not-found': 'No account for this email. Request access first.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/too-many-requests': 'Too many attempts. Wait a few minutes and try again.',
    'auth/email-already-in-use': 'This email is already registered. Sign in instead.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'permission-denied': [
      'Firestore rules not published.',
      'Firebase Console → Firestore → Rules → paste firestore.rules → Publish.',
    ].join(' '),
  }

  if (messages[code]) return messages[code]
  return err?.message?.replace(/^Firebase: Error \(|\)\.?$/g, '') || 'Authentication failed'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [debugLogs, setDebugLogs] = useState([])
  const authFlowRef = useRef(null)

  const pushLog = useCallback((message, detail) => {
    const entry = authLog(message, detail)
    setDebugLogs((prev) => [{ ...entry, level: 'info' }, ...prev].slice(0, 12))
  }, [])

  const loadAdminProfile = useCallback(async (firebaseUser) => {
    const adminProfile = await fetchAdminProfile(firebaseUser.uid)
    if (!adminProfile) {
      pushLog('No admin profile document', { uid: firebaseUser.uid })
      setProfile(null)
      return null
    }

    setProfile(adminProfile)

    if (adminProfile.active !== true) {
      pushLog('Signed in — pending approval', {
        uid: firebaseUser.uid,
        role: adminProfile.role,
      })
      return adminProfile
    }

    pushLog('Admin profile loaded', {
      uid: firebaseUser.uid,
      role: adminProfile.role,
      email: adminProfile.email,
    })
    return adminProfile
  }, [pushLog])

  useEffect(() => {
    if (!firebaseReady || !auth) {
      pushLog('Firebase Auth not ready — check .env.local keys')
      setLoading(false)
      return undefined
    }

    pushLog('Auth listener started')

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      setError(null)

      if (firebaseUser) {
        pushLog('Firebase user session detected', {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        })

        if (authFlowRef.current) {
          pushLog(`Auth flow "${authFlowRef.current}" in progress — skipping listener check`)
          setLoading(false)
          return
        }

        try {
          const adminProfile = await loadAdminProfile(firebaseUser)
          if (!adminProfile && !authFlowRef.current) {
            await signOut(auth)
          }
        } catch (err) {
          authLogError('Failed to load admin profile', err)
          setProfile(null)
          setError(formatAuthError(err))
          if (!authFlowRef.current) {
            await signOut(auth)
          }
        }
      } else {
        pushLog('No active Firebase session')
        setProfile(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [pushLog, loadAdminProfile])

  const login = async (email, password) => {
    if (!auth) throw new Error('Firebase Auth is not configured')
    const normalizedEmail = normalizeEmail(email)
    setError(null)
    authFlowRef.current = 'login'
    pushLog('Login attempt', { email: normalizedEmail })

    try {
      const credential = await signInWithEmailAndPassword(auth, normalizedEmail, password)
      pushLog('Firebase sign-in succeeded', { uid: credential.user.uid })

      const adminProfile = await fetchAdminProfile(credential.user.uid)
      if (!adminProfile) {
        await signOut(auth)
        throw new Error(
          'No admin profile found. Use Request access to register, or ask a developer to create your admins document.'
        )
      }

      setProfile(adminProfile)
      setUser(credential.user)

      if (adminProfile.active !== true) {
        pushLog('Login — pending approval', { uid: credential.user.uid })
        return { status: 'pending', profile: adminProfile }
      }

      pushLog('Login complete', { role: adminProfile.role })
      return { status: 'active', profile: adminProfile }
    } catch (err) {
      authLogError('Login failed', err)
      throw new Error(formatAuthError(err))
    } finally {
      authFlowRef.current = null
    }
  }

  const signup = async (email, password, name = '') => {
    if (!auth) throw new Error('Firebase Auth is not configured')
    const normalizedEmail = normalizeEmail(email)
    setError(null)
    authFlowRef.current = 'signup'
    pushLog('Sign up attempt', { email: normalizedEmail })

    try {
      const credential = await createUserWithEmailAndPassword(auth, normalizedEmail, password)
      const { uid } = credential.user
      pushLog('Firebase account created', { uid })

      let adminProfile = await fetchAdminProfile(uid)
      if (!adminProfile) {
        pushLog('Creating pending admin profile in Firestore', { uid })
        adminProfile = await createPendingAdminProfile(uid, normalizedEmail, name)
        pushLog('Pending admin profile saved', { uid })
      }

      setUser(credential.user)
      setProfile(adminProfile)

      if (adminProfile?.active === true) {
        pushLog('Sign up complete — account already active', { uid })
        return { status: 'active', uid, profile: adminProfile }
      }

      pushLog('Sign up complete — pending approval', { uid })
      return {
        status: 'pending',
        uid,
        profile: adminProfile,
        message: 'Your account was created and is waiting for approval.',
      }
    } catch (err) {
      authLogError('Sign up failed', err)
      if (auth.currentUser) await signOut(auth)
      throw new Error(formatAuthError(err))
    } finally {
      authFlowRef.current = null
    }
  }

  const refreshProfile = async () => {
    if (!auth?.currentUser) return null
    pushLog('Refreshing admin profile')
    try {
      const adminProfile = await loadAdminProfile(auth.currentUser)
      if (!adminProfile) {
        await signOut(auth)
      }
      return adminProfile
    } catch (err) {
      authLogError('Refresh profile failed', err)
      throw new Error(formatAuthError(err))
    }
  }

  const resetPassword = async (email) => {
    if (!auth) throw new Error('Firebase Auth is not configured')
    const normalizedEmail = normalizeEmail(email)
    pushLog('Password reset requested', { email: normalizedEmail })
    try {
      await sendPasswordResetEmail(auth, normalizedEmail)
      pushLog('Password reset email sent', { email: normalizedEmail })
      return true
    } catch (err) {
      authLogError('Password reset failed', err)
      throw new Error(formatAuthError(err))
    }
  }

  const logout = async () => {
    if (!auth) return
    pushLog('Logout')
    await signOut(auth)
    setProfile(null)
  }

  const isActive = Boolean(user && profile?.active === true)
  const isPending = Boolean(user && profile && profile.active !== true)
  const isAuthenticated = Boolean(user && profile)

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      error,
      login,
      signup,
      refreshProfile,
      resetPassword,
      logout,
      isAdmin: isActive,
      isActive,
      isPending,
      isAuthenticated,
      firebaseReady,
      debugLogs,
    }),
    [user, profile, loading, error, isActive, isPending, isAuthenticated, debugLogs]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
