const logs = []
const MAX_LOGS = 40

export function authLog(message, detail) {
  const entry = {
    at: new Date().toISOString(),
    message,
    detail: detail ?? null,
  }
  logs.unshift(entry)
  if (logs.length > MAX_LOGS) logs.pop()

  if (detail !== undefined) {
    console.log(`[PrimeAxis Auth] ${message}`, detail)
  } else {
    console.log(`[PrimeAxis Auth] ${message}`)
  }

  return entry
}

export function authLogError(message, error) {
  const code = error?.code || 'unknown'
  const detail = {
    code,
    message: error?.message || String(error),
  }
  logs.unshift({
    at: new Date().toISOString(),
    message: `ERROR: ${message}`,
    detail,
    level: 'error',
  })
  if (logs.length > MAX_LOGS) logs.pop()
  console.error(`[PrimeAxis Auth] ERROR: ${message}`, detail)
}

export function getAuthLogs() {
  return [...logs]
}

export function clearAuthLogs() {
  logs.length = 0
}
