/** Shown when VITE_FIREBASE_* env vars are missing at build time. */
export const FIREBASE_SETUP_MESSAGE = import.meta.env.PROD
  ? 'Firebase is not configured for production. In Netlify go to Site configuration → Environment variables, add every VITE_FIREBASE_* key from .env.example (same values as your local .env.local), save, then Deploys → Trigger deploy → Clear cache and deploy site.'
  : 'Firebase is not configured. Copy .env.example to .env.local, fill in your Firebase keys, and restart the dev server.'
